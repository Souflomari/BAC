/**
 * OPTION SET B — home anatomy, variant B1: "SESSION-FIRST".
 *
 * Philosophy: the app LEADS (VISION guided-primary). Home is the door to
 * today's work — the ONE primary element is the "Reprendre la session" card
 * with the page's single filled-accent action. Everything else (next up, the
 * library) is quiet furniture below it. Bible §8 periphery: progress made
 * vivid, honestly; no streaks, no scores.
 *
 * TEMPORARY option route (mock data), deleted after the owner's Set-B pick.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Option — accueil B1",
  robots: { index: false, follow: false },
};

// Mock session state (static — B variants judge anatomy, not data plumbing)
const CONTINUE = {
  notion: "Oscillations libres dans un circuit RLC série",
  subject: "Physique-Chimie",
  position: "Les trois régimes",
  step: 5,
  totalSteps: 10,
  href: "/notions/pc/rlc-serie",
};

export default function HomeB1() {
  const pct = Math.round((CONTINUE.step / CONTINUE.totalSteps) * 100);
  return (
    <PageShell width="content">
      <header className="mb-10">
        <h1 className="font-serif text-display font-bold text-[var(--color-text-primary)]">
          Ta session
        </h1>
        <p className="mt-4 text-lead text-[var(--color-text-secondary)] max-w-lead">
          On reprend là où tu t’es arrêté — deux heures calmes, une notion à
          fond.
        </p>
      </header>

      {/* ── THE primary element: the continue-session card ── */}
      <section aria-label="Reprendre la session" className="max-w-list">
        <div
          className={cn(
            "rounded-xl px-8 py-8",
            "bg-surface-container-high shadow-elevation-2"
          )}
        >
          <p className="text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
            En cours · {CONTINUE.subject}
          </p>
          <h2 className="mt-2 font-serif text-h2 font-bold text-[var(--color-text-primary)]">
            {CONTINUE.notion}
          </h2>
          <p className="mt-2 text-body text-[var(--color-text-secondary)]">
            Reprise à « {CONTINUE.position} » — section {CONTINUE.step} sur{" "}
            {CONTINUE.totalSteps}.
          </p>

          {/* Honest progress: one thin bar, fraction stated, no celebration */}
          <div
            className="mt-5 h-1 rounded-full bg-[var(--color-border-subtle)]"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression : ${pct} %`}
          >
            <div
              className="h-1 rounded-full bg-accent"
              style={{ width: `${pct}%` }}
            />
          </div>

          <Link href={CONTINUE.href} className={cn("mt-6 btn-primary focus-ring")}>
            Reprendre la session
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>

        {/* Next up — quiet, one suggestion, the app's plan */}
        <div className="mt-6 flex items-baseline gap-3 px-2">
          <span className="text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
            Ensuite
          </span>
          <span className="text-body-sm text-[var(--color-text-secondary)]">
            Révision courte — Probabilités conditionnelles (15 min)
          </span>
        </div>
      </section>

      {/* ── The library — compact rows, no cards ── */}
      <section aria-label="Toutes les notions" className="mt-16 max-w-list">
        <h2 className="mb-4 pb-3 border-b border-[var(--color-border-subtle)] text-h4 font-semibold text-[var(--color-text-secondary)]">
          Toutes les notions
        </h2>
        <ul role="list" className="divide-y divide-[var(--color-border-subtle)]">
          <li>
            <Link
              href="/notions/pc/rlc-serie"
              className="state-layer rounded flex items-baseline justify-between gap-4 py-3 px-2 focus-ring [--focus-radius:8px]"
            >
              <span className="text-body text-[var(--color-text-primary)]">
                Oscillations libres dans un circuit RLC série
              </span>
              <span className="text-caption text-[var(--color-text-secondary)] flex-shrink-0">
                en cours
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/notions/maths/probabilites-conditionnelles"
              className="state-layer rounded flex items-baseline justify-between gap-4 py-3 px-2 focus-ring [--focus-radius:8px]"
            >
              <span className="text-body text-[var(--color-text-primary)]">
                Probabilités conditionnelles
              </span>
              <span className="text-caption text-[var(--color-text-secondary)] flex-shrink-0">
                vu récemment
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </PageShell>
  );
}
