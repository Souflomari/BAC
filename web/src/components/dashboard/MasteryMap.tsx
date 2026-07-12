/**
 * MasteryMap — « Carte de maîtrise » (DASHBOARD-SPEC §1.3 / LEARNER-MODEL-SPEC
 * §4). Per-notion tokens, one per real notion. Zero-state (`useStudentState()`
 * resolves `state: null` — every "off"/"mock" build and every signed-out or
 * loading render, exactly as the old always-`null` `getStudentState()` did):
 * EVERY token is `non-ouvert`, rendered as a calm TABLE OF CONTENTS grouped
 * by subject — headings + quiet links, no grey deficit chips, no invented
 * state label. `non-ouvert` is the DEFAULT state (DASHBOARD-SPEC §5): it is
 * not printed as a status word and carries no `data-state-source` — only a
 * non-default state (entamé, lu, exercé, à revoir) would earn a visible
 * label + its `data-state-source` anchor, once `state.perNotion[n.id]` is
 * ever non-null. (That label rendering itself is NOT wired up in this pass —
 * `learner-model.ts`'s `notionMasteryState` computes it and is unit-tested,
 * but attaching it to this token is left for a follow-up so this file's
 * markup stays untouched here, per the read-layer task's "minimal adapt,
 * no markup change" instruction.)
 *
 * Token count is exactly `notions.length` (DASHBOARD-SPEC §5's dom-truth
 * invariant) — every notion in the prop list renders exactly one
 * `[data-mastery-token]`, once, in its subject group, WHEN NO FILTER IS
 * ACTIVE. The subject-filter dropdown (craft addition) narrows the visible
 * groups only on explicit user choice — the default render (filter = null,
 * i.e. on first paint) is byte-identical to the unfiltered table of
 * contents, so the dom-truth "tokens == notions on disk" sweep still holds.
 *
 * Filière narrowing (ADR 0025 §2.11 golden rule): the device's chosen
 * filière (useFiliere) additionally narrows OUT any notion whose chapter
 * isn't in that filière (e.g. the two SM-only "Approfondissement" chapters
 * for a PC/SVT student) — never gates, narrows: no filière chosen renders
 * every notion, same as today. `mounted` gates this so the server render and
 * first client paint agree (no hydration flash) — the dom-truth token-count
 * invariant is asserted with NO filière set in a fresh browser context, which
 * this fallback preserves byte-for-byte.
 *
 * Client component: needs local filter state. Still receives `notions` as a
 * plain prop from the server-component parent (page.tsx → listNotions()),
 * so nothing about the data source changes.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useStudentState } from "@/lib/student-state";
import { subjectLabel, notionHref } from "@/lib/subjects";
import { isNotionInFiliere } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Icon } from "@/components/ui/Icon";
import type { NotionMeta } from "@/lib/content";

const SUBJECT_ORDER = ["maths", "pc", "svt", "philo", "si"];

export function MasteryMap({ notions }: { notions: NotionMeta[] }) {
  // Consumed through the contract (DASHBOARD-SPEC §2) via the live read
  // layer: `null` in "off"/"mock" builds and every signed-out/loading
  // render, exactly like the old always-`null` `getStudentState()`. See the
  // per-token lookup below — that is where a real non-null state attaches
  // its data-state-source without restructuring the token.
  const { state } = useStudentState();

  // null = "toutes les matières" (the default, unfiltered render).
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  // Device filière preference — narrows, never gates (see file header).
  const { filiere, mounted } = useFiliere();
  const activeFiliere = mounted ? filiere : null;
  const filieredNotions = notions.filter((n) => isNotionInFiliere(n.id, activeFiliere));

  const bySubject = new Map<string, NotionMeta[]>();
  for (const n of filieredNotions) {
    const list = bySubject.get(n.subject) ?? [];
    list.push(n);
    bySubject.set(n.subject, list);
  }
  // Only subjects that actually have built notions — never the 5 hard-coded
  // subject ids, so the filter menu never offers an empty matière.
  const subjects = SUBJECT_ORDER.filter((id) => bySubject.has(id));
  const visibleSubjects = subjects.filter(
    (id) => !activeSubject || id === activeSubject
  );

  return (
    <section aria-label="Carte de maîtrise">
      <div className="flex items-center justify-between gap-3 mb-2 pb-3 border-b border-[var(--color-border-subtle)]">
        <h2 className="text-h4 font-semibold text-[var(--color-text-primary)]">
          Carte de maîtrise
        </h2>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-label={frenchTypography("Filtrer la carte de maîtrise par matière")}
              className={cn(
                "group inline-flex items-center gap-1 rounded-md px-2 py-1 -mx-2",
                "state-layer focus-ring [--focus-radius:6px]",
                "text-body-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                "transition-colors duration-micro ease-enter"
              )}
            >
              {activeSubject ? subjectLabel(activeSubject) : frenchTypography("Toutes les matières")}
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
                "border border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)]",
                "shadow-elevation-2",
                // Calm opacity/scale settle — no bounce/overshoot (§5). Plain
                // CSS transition (no framer-motion/GSAP) keyed to Radix's
                // own data-state attribute.
                "transition-[opacity,transform] duration-micro ease-enter",
                "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
                "data-[state=open]:scale-100 data-[state=closed]:scale-95"
              )}
            >
              <DropdownMenu.Item
                onSelect={() => setActiveSubject(null)}
                className={cn(
                  "rounded-md px-2.5 py-2",
                  "state-layer focus-ring [--focus-radius:6px]",
                  "text-body-sm transition-colors duration-micro ease-between",
                  activeSubject === null
                    ? "bg-[var(--color-accent-subtle)] text-accent"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {frenchTypography("Toutes les matières")}
              </DropdownMenu.Item>
              {subjects.map((id) => (
                <DropdownMenu.Item
                  key={id}
                  onSelect={() => setActiveSubject(id)}
                  className={cn(
                    "rounded-md px-2.5 py-2",
                    "state-layer focus-ring [--focus-radius:6px]",
                    "text-body-sm transition-colors duration-micro ease-between",
                    activeSubject === id
                      ? "bg-[var(--color-accent-subtle)] text-accent"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  {subjectLabel(id)}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <p className="mt-2 mb-6 text-caption text-[var(--color-text-secondary)]">
        Le sommaire des notions déjà écrites, matière par matière.
      </p>

      {/* Bounded + internally scrollable from the 1280px two-column tier up
          (mastery-map-scroll, globals.css) — otherwise this list (currently
          61 links) stretches the shared grid row far taller than the primary
          column, leaving a large dead gap above the shelf (owner feedback,
          2026-07-07: "do we need to show everything?"). Unbounded on mobile/
          narrow, where the whole page already scrolls as one column. */}
      <div className="space-y-6 mastery-map-scroll">
        {visibleSubjects.map((subjectId) => {
          const list = bySubject.get(subjectId)!;
          return (
            <div key={subjectId}>
              <h3 className="mb-2 text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                {subjectLabel(subjectId)}
              </h3>
              <ul role="list" className="space-y-0.5">
                {list.map((n) => {
                  // Always undefined this session (state is null) — the
                  // lookup exists so a future non-null state attaches its
                  // data-state-source here without restructuring the token.
                  const perNotion = state?.perNotion[n.id];
                  return (
                    <li key={n.id}>
                      <Link
                        href={notionHref(n.subject, n.slug)}
                        data-mastery-token=""
                        data-state-source={perNotion ? n.id : undefined}
                        className={cn(
                          "group block rounded-md px-2 py-1.5 -mx-2",
                          "state-layer focus-ring [--focus-radius:6px]",
                          "text-body-sm text-[var(--color-text-secondary)]",
                          "transition-colors duration-micro ease-between"
                        )}
                      >
                        <span className="group-hover:text-accent transition-colors duration-micro">
                          {n.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
