/**
 * AvailableShelf — « Disponible maintenant » (DASHBOARD-SPEC §1.4), collapsed
 * per matière (owner feedback, 2026-07-07): at 61 notions the shelf listed
 * every cover flat, and `Cover` (COVER-SPEC) resolves to a SHARED per-SUBJECT
 * motif for all but two notions (`rlc-serie`, `rc-charge`) — so the flat grid
 * repeated the same 4–5 illustrations dozens of times, mostly noise, and made
 * the dashboard very long. Each matière is now an Accordion.Item, collapsed
 * by default: the trigger carries the shared motif ONCE (as a small preview,
 * an honest label for what's inside, not a claim of per-notion uniqueness)
 * plus the real count; expanding reveals that matière's full cover grid,
 * unchanged from the previous flat layout.
 *
 * Radix Accordion (`@radix-ui/react-accordion`, already a dependency, first
 * real use) unmounts closed content entirely (`Presence` without
 * `forceMount`) — the DOM cost of the 59 repeated covers only exists once a
 * matière is actually opened, not on every load. `type="multiple"` (several
 * matières can be open at once) + `collapsible` per item; a calm height
 * reveal (`.shelf-accordion-content`, globals.css) — no bounce/overshoot,
 * `prefers-reduced-motion` respected.
 *
 * Filière narrowing (ADR 0025 §2.11 golden rule): the device's chosen
 * filière (useFiliere) narrows out any notion outside it (e.g. the two
 * SM-only "Approfondissement" chapters for a PC/SVT student) — never gates:
 * no filière chosen shows every built notion, same as before this existed.
 * `mounted` gates the narrowing so server and first client paint agree.
 */

"use client";

import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { subjectLabel, notionHref } from "@/lib/subjects";
import { isNotionInFiliere } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { Cover } from "@/components/covers/Cover";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { NotionMeta } from "@/lib/content";

export function AvailableShelf({ notions }: { notions: NotionMeta[] }) {
  const { filiere, mounted } = useFiliere();
  const activeFiliere = mounted ? filiere : null;
  const filieredNotions = notions.filter((n) => isNotionInFiliere(n.id, activeFiliere));

  if (filieredNotions.length === 0) return null;
  const bySubject: Record<string, NotionMeta[]> = {};
  for (const n of filieredNotions) (bySubject[n.subject] ??= []).push(n);
  const subjects = Object.keys(bySubject).sort();

  return (
    <section aria-label="Notions disponibles">
      <h2 className="mb-2 pb-3 border-b border-subtle text-h4 font-semibold text-primary">
        Disponible maintenant
      </h2>
      <p className="mt-2 mb-6 text-caption text-secondary">
        Les notions déjà écrites, groupées par matière — déplie une matière pour les voir.
      </p>

      <Accordion.Root type="multiple" className="space-y-3">
        {subjects.map((subject) => {
          const list = bySubject[subject];
          return (
            <Accordion.Item
              key={subject}
              value={subject}
              className={cn(
                "rounded-xl overflow-hidden",
                "bg-surface-raised shadow-elevation-1"
              )}
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className={cn(
                    "group flex w-full items-center gap-4 px-4 py-3",
                    "state-layer focus-ring [--focus-radius:12px]",
                    "text-left"
                  )}
                >
                  <div className="w-14 flex-shrink-0 rounded-md overflow-hidden border border-subtle">
                    <Cover subject={subject} />
                  </div>
                  <span className="flex-1 min-w-0">
                    <span
                      data-shelf-subject-label=""
                      className="block font-display text-lead leading-tight text-primary"
                    >
                      {subjectLabel(subject)}
                    </span>
                    <span
                      data-shelf-subject-count=""
                      className="block text-caption text-secondary tabular-nums"
                    >
                      {list.length} leçon{list.length > 1 ? "s" : ""}
                    </span>
                  </span>
                  {/* No dedicated "chevron-down" glyph — chevron-right rotated,
                      same convention as the header/filière/mastery dropdowns. */}
                  <Icon
                    name="chevron-right"
                    size={16}
                    className={cn(
                      "flex-shrink-0 text-secondary",
                      "rotate-90 transition-transform duration-micro ease-enter",
                      "group-data-[state=open]:rotate-[270deg]"
                    )}
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="shelf-accordion-content">
                <ul
                  role="list"
                  className="grid gap-4 px-4 pb-4 pt-1 bp-medium:grid-cols-2 bp-large:grid-cols-3 bp-xl:grid-cols-4"
                  aria-label={`Notions de ${subjectLabel(subject)}`}
                >
                  {list.map((n) => (
                    <li key={n.id}>
                      <Link
                        href={notionHref(n.subject, n.slug)}
                        className={cn(
                          "group/card block rounded-xl overflow-hidden",
                          "bg-surface-container-low shadow-elevation-1",
                          "hover:shadow-elevation-2 hover:-translate-y-px",
                          "transition-all duration-micro ease-out",
                          "state-layer focus-ring [--focus-radius:16px]"
                        )}
                      >
                        <div className="aspect-[8/5] overflow-hidden border-b border-subtle">
                          <Cover subject={n.subject} slug={n.slug} />
                        </div>
                        <div className="px-5 py-4">
                          <span className="block font-display text-lead leading-snug text-primary group-hover/card:text-accent transition-colors duration-micro">
                            {n.title}
                          </span>
                          {n.readingMinutes && (
                            <span className="mt-1 block text-caption text-secondary tabular-nums">
                              {n.readingMinutes} min de lecture
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </section>
  );
}
