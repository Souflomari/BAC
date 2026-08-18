/**
 * OPTION SET B — home anatomy, variant B2: "EDITORIAL CONTENTS".
 *
 * Philosophy: the product is a book you are working through. Home is its
 * table of contents — pure typography, zero cards, zero chrome. The ONE
 * primary element is the continue ROW at the top (the only accent + arrow on
 * the page); every notion is a quiet list row with an honest state word.
 * Bible §8: progress is visible as states, not celebrated.
 *
 * TEMPORARY option route (mock data), deleted after the owner's Set-B pick.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";
import { listNotions } from "@/lib/content";

/** Le manifeste léger pour le header (panneau Notions + palette ⌘K). */
function manifestePourHeader() {
  return listNotions().map((n) => ({ subject: n.subject, slug: n.slug, title: n.title, readingMinutes: n.readingMinutes }));
}
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Option — accueil B2",
  robots: { index: false, follow: false },
};

function StateWord({ state }: { state: "en cours" | "vu" | "à venir" }) {
  return (
    <span
      className={cn(
        "text-caption flex-shrink-0 tabular-nums",
        state === "en cours"
          ? "text-accent font-medium"
          : "text-secondary"
      )}
    >
      {state}
    </span>
  );
}

function ContentsRow({
  href,
  title,
  state,
}: {
  href: string;
  title: string;
  state: "en cours" | "vu" | "à venir";
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "state-layer rounded flex items-baseline justify-between gap-6 py-3.5 px-2",
          "focus-ring [--focus-radius:8px]"
        )}
      >
        <span className="font-display text-lead text-primary">
          {title}
        </span>
        <StateWord state={state} />
      </Link>
    </li>
  );
}

export default function HomeB2() {
  return (
    <PageShell notions={manifestePourHeader()} width="content">
      <header className="mb-12">
        <h1 className="font-display text-display font-bold text-primary">
          Notions
        </h1>
        <p className="mt-4 text-lead text-secondary max-w-lead">
          Chaque notion est enseignée jusqu’au bout — décortiquée, illustrée,
          exercée.
        </p>
      </header>

      {/* ── THE primary element: the continue row — the page's one accent ── */}
      <section aria-label="Reprendre" className="max-w-list mb-14">
        <Link
          href="/notions/pc/rlc-serie"
          className={cn(
            "group flex items-center justify-between gap-6",
            "border-t-2 border-b border-accent/70 border-b-subtle",
            "py-5 px-2",
            "state-layer focus-ring [--focus-radius:8px]"
          )}
        >
          <div>
            <p className="text-caption font-medium uppercase tracking-eyebrow text-accent">
              Reprendre
            </p>
            <p className="mt-1 font-display text-h3 font-semibold text-primary">
              Oscillations libres dans un circuit RLC série
            </p>
            <p className="mt-1 text-body-sm text-secondary">
              « Les trois régimes » — section 5 sur 10
            </p>
          </div>
          <Icon
            name="arrow-right"
            size={22}
            className="flex-shrink-0 text-accent translate-x-0 group-hover:translate-x-1 transition-transform duration-micro ease-out"
          />
        </Link>
      </section>

      {/* ── The contents — subjects as running sections, rows not cards ── */}
      <div className="space-y-12 max-w-list">
        <section aria-labelledby="b2-pc">
          <h2
            id="b2-pc"
            className="mb-2 text-caption font-medium uppercase tracking-eyebrow text-secondary"
          >
            Physique-Chimie
          </h2>
          <ul role="list" className="divide-y divide-border-subtle border-y border-subtle">
            <ContentsRow
              href="/notions/pc/rlc-serie"
              title="Oscillations libres dans un circuit RLC série"
              state="en cours"
            />
          </ul>
        </section>

        <section aria-labelledby="b2-maths">
          <h2
            id="b2-maths"
            className="mb-2 text-caption font-medium uppercase tracking-eyebrow text-secondary"
          >
            Mathématiques
          </h2>
          <ul role="list" className="divide-y divide-border-subtle border-y border-subtle">
            <ContentsRow
              href="/notions/maths/probabilites-conditionnelles"
              title="Probabilités conditionnelles"
              state="vu"
            />
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
