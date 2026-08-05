"use client";

/**
 * ChapterShell
 *
 * LESSON-EXPERIENCE-SPEC.md §1.3 — the client coquille around a paginated
 * lesson. It owns which chapter is current and hands that state to whatever
 * client descendants need it (`useChapter`, below) — it does NOT render the
 * chapters themselves. NotionBody/NotionPageView (server) render every
 * chapter as a `<section data-chapter-section data-chapter-index=…>` up
 * front, all present in the DOM (§1.3: SSG, print, anchors all need every
 * chapter to exist); ChapterShell only ever flips `hidden` / `data-chapter-
 * active` on those EXISTING nodes via a ref-free `document.querySelectorAll`
 * pass — the heavy prose/figure/KaTeX tree is passed through as `children`
 * and is never imported by this "use client" module, so none of it inflates
 * the client bundle.
 *
 * URL: `?chapitre=<n>` (1-based), read once on mount, written via
 * `history.pushState` (no full navigation — a single static SSG page stays
 * one page); `popstate` is listened so back/forward work. A deep-link
 * `#heading-id` (rehype-slug ids, LessonRenderer.tsx:135) is resolved to its
 * containing chapter on mount, same priority pass.
 *
 * The chapter-sync effect runs in `useLayoutEffect` (isomorphic-guarded — see
 * below) rather than `useEffect`: for the common case (`?chapitre=<n>` deep
 * link or a `#anchor` in a chapter other than the first), this paints the
 * CORRECT chapter on the very first frame instead of flashing chapter 1 and
 * swapping a tick later. It cannot help the raw pre-hydration HTML (always
 * chapter 1, server-rendered, SSG has no per-request query string to read) —
 * that residual flash is a documented, accepted trade-off, not a silent gap.
 *
 * `current` STARTS AT 0 UNCONDITIONALLY (both server render and the client's
 * hydration render) — never `readChapterFromLocation` in the state
 * initializer. Found 2026-07-07: reading `window.location` inside a
 * `useState` initializer runs it AGAIN during the client's hydration render
 * (hooks don't carry values across the SSR/hydration boundary), so on any
 * `?chapitre=N` with N>1 the hydration render computed a DIFFERENT `current`
 * than the server did — a real value baked into visible text
 * (`ChapterPosition`'s "Chapitre N / M"), not just an attribute. That's a
 * genuine React hydration mismatch (errors #418/#423/#425), and React's
 * recovery is a full client-side re-render of the whole tree — which also
 * wipes unrelated DOM state other code sets on `<html>` (the dark-theme
 * class), a much stranger-looking symptom than the mismatch that caused it.
 * The real chapter is resolved from the URL/hash in the sync effect below,
 * STRICTLY POST-HYDRATION (an ordinary effect-driven re-render, not a second
 * hydration render) — `useLayoutEffect` still flushes it before paint, so
 * the "no flash of chapter 1" goal holds; only the MECHANISM changed.
 */

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { TransportButton } from "./TransportButton";

// React warns if useLayoutEffect runs during server rendering; Next.js does
// server-render "use client" components for the initial HTML pass. The
// standard isomorphic-layout-effect guard avoids the warning while keeping
// the pre-paint timing on the client (same pattern used by e.g. Redux).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ── Context ───────────────────────────────────────────────────────────────

interface ChapterContextValue {
  /** 0-based current chapter index. */
  current: number;
  /** Total chapter count (real chapters + the synthetic "S'entraîner" one, when present). */
  total: number;
  /** Activate a chapter by 0-based index (clamped). No-ops if already current. */
  goTo: (index: number) => void;
}

const ChapterContext = createContext<ChapterContextValue | null>(null);

/**
 * Read chapter context. Descendants rendered OUTSIDE a ChapterShell (should
 * not happen in this product) get an inert single-chapter fallback rather
 * than throwing — consistent with every other marker/slug lookup in this
 * codebase being fail-safe, never a crash.
 */
export function useChapter(): ChapterContextValue {
  const ctx = useContext(ChapterContext);
  return ctx ?? { current: 0, total: 1, goTo: () => {} };
}

// ── URL + deep-link resolution (client-only) ────────────────────────────────
// Exported for AttemptEvents.tsx's ChapterVisitRecorder, whose first-run
// deep-link guard must resolve the URL/hash EXACTLY the way this shell does
// (a re-implementation would drift). No behavior change to the shell itself.

export function readChapterFromLocation(total: number): number {
  if (typeof window === "undefined") return 0;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("chapitre");
  if (raw) {
    const n = parseInt(raw, 10);
    if (Number.isFinite(n) && n >= 1 && n <= total) return n - 1;
  }
  // Deep-link `#heading-id` → the chapter section containing that heading.
  const hash = window.location.hash.replace(/^#/, "");
  if (hash) {
    const target = document.getElementById(hash);
    const section = target?.closest("[data-chapter-section]");
    if (section) {
      const idx = parseInt(section.getAttribute("data-chapter-index") ?? "", 10);
      if (Number.isFinite(idx)) return Math.min(Math.max(idx, 0), total - 1);
    }
  }
  return 0;
}

const FOCUSABLE_INPUT_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

// ── ChapterShell ─────────────────────────────────────────────────────────────

export function ChapterShell({
  totalChapters,
  children,
}: {
  totalChapters: number;
  children: ReactNode;
}) {
  const total = Math.max(1, totalChapters);
  // Always 0 on both the server render and the client's hydration render —
  // see the class doc comment above (the SSR-mismatch fix). The real
  // URL/hash-derived chapter is applied by the sync effect below, once,
  // strictly after hydration.
  const [current, setCurrent] = useState(0);
  const prevRef = useRef(0);
  // False until the FIRST chapter-sync pass has run — gates the enter
  // transition and the focus-transfer so neither fires on initial load
  // (§1.3 wants movement on NAVIGATION, not on mount; moving focus away from
  // the skip-link/URL bar on load would itself be an accessibility fault —
  // WCAG discourages hijacking focus without a user action).
  const mountedRef = useRef(false);
  // True once the initial URL/hash chapter has been resolved — gates the
  // one-time resolution in the sync effect so later legitimate `goTo`/
  // `popstate` updates don't re-read the URL from scratch.
  const initialSyncRef = useRef(false);

  function goTo(index: number) {
    const clamped = Math.min(Math.max(index, 0), total - 1);
    if (clamped === current) return;
    setCurrent(clamped);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("chapitre", String(clamped + 1));
      url.hash = "";
      window.history.pushState({}, "", url);
    }
  }

  // ── DOM sync: toggle hidden/data-chapter-active + the direction-aware
  //    enter transition on the newly active section. Server-rendered nodes
  //    are never recreated — only their attributes/classes are flipped. ──
  useIsoLayoutEffect(() => {
    // One-time resolution, strictly post-hydration: if the URL/hash names a
    // chapter other than 0, jump straight there. Runs before paint (layout
    // effect), and the setCurrent below flushes synchronously before the
    // browser paints — so there is still no visible flash of chapter 1 even
    // though the state now starts at 0 on every render.
    if (!initialSyncRef.current) {
      initialSyncRef.current = true;
      const initial = readChapterFromLocation(total);
      if (initial !== current) {
        prevRef.current = initial;
        setCurrent(initial);
        return;
      }
    }

    const sections = document.querySelectorAll<HTMLElement>("[data-chapter-section]");
    const forward = current >= prevRef.current;
    sections.forEach((el) => {
      const idx = parseInt(el.getAttribute("data-chapter-index") ?? "-1", 10);
      const isActive = idx === current;
      el.hidden = !isActive;
      el.setAttribute("data-chapter-active", isActive ? "true" : "false");
      el.classList.remove("chapter-enter-forward", "chapter-enter-back");
      if (isActive && mountedRef.current) {
        el.classList.add(forward ? "chapter-enter-forward" : "chapter-enter-back");
        const heading = el.querySelector<HTMLElement>("h1, h2, h3");
        if (heading) {
          heading.tabIndex = -1;
          heading.focus({ preventScroll: false });
        }
      }
    });
    prevRef.current = current;
    mountedRef.current = true;
  }, [current]);

  // ── popstate: back/forward respected ────────────────────────────────────
  useEffect(() => {
    function onPopState() {
      setCurrent(readChapterFromLocation(total));
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [total]);

  // ── Keyboard: ArrowRight/ArrowLeft = next/prev chapter. First `keydown`
  //    listener in this codebase (no prior pattern to match — ledger §11). ──
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (FOCUSABLE_INPUT_TAGS.has(target.tagName) || target.isContentEditable)) {
        return;
      }
      if (e.key === "ArrowRight") goTo(current + 1);
      else if (e.key === "ArrowLeft") goTo(current - 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, total]);

  return (
    <ChapterContext.Provider value={{ current, total, goTo }}>
      {children}
    </ChapterContext.Provider>
  );
}

// ── ChapterPosition — the calm "Chapitre n / N" affordance ──────────────────
// Rendered twice: once inside MarginRail (desktop, ≥600px — the rail's own
// visibility rules already hide it below that breakpoint), once directly by
// NotionPageView above the content column (mobile, <600px — the rail is
// `display:none` there, so its copy of this text is hidden too). Both read
// the SAME context, so they can never disagree.
export function ChapterPosition({ className }: { className?: string }) {
  const { current, total } = useChapter();
  if (total <= 1) return null; // nothing to navigate — no progress theater
  return (
    <p
      aria-live="polite"
      className={cn(
        "chapter-position text-body-sm text-secondary",
        className
      )}
    >
      {`Chapitre ${current + 1} / ${total}`}
    </p>
  );
}

// ── ChapterTransport — prev/next at chapter end ─────────────────────────────
// Same visual transport grammar as MotionStage/StagedFigure (TransportButton +
// chevrons) — one transport language across the product (§1.3).
export function ChapterTransport({ index }: { index: number }) {
  const { total, goTo } = useChapter();
  const hasPrev = index > 0;
  const hasNext = index < total - 1;
  if (!hasPrev && !hasNext) return null;

  return (
    <div className="chapter-transport mt-12 flex items-center justify-between gap-4">
      {hasPrev ? (
        <TransportButton onClick={() => goTo(index - 1)} aria-label="Chapitre précédent">
          <Icon name="chevron-left" size={14} />
          <span>Chapitre précédent</span>
        </TransportButton>
      ) : (
        <span aria-hidden="true" />
      )}
      {hasNext && (
        <TransportButton onClick={() => goTo(index + 1)} aria-label="Chapitre suivant">
          <span>Chapitre suivant</span>
          <Icon name="chevron-right" size={14} />
        </TransportButton>
      )}
    </div>
  );
}
