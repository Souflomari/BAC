/**
 * OPTION SET B — home anatomy, variant B3: "PROGRESS-LED".
 *
 * Philosophy: the periphery's job is progress made vivid (bible §8) — the
 * student lands on an honest mastery map and the map hands them today's move.
 * The ONE primary element is the "Aujourd'hui" panel (recommendation + the
 * page's single filled action); the subject strips beneath are calm bars with
 * stated fractions — no streaks, no scores, no theater.
 *
 * TEMPORARY option route (mock data), deleted after the owner's Set-B pick.
 */

import type { Metadata } from "next";
import { Link } from "@/components/ui/Lien";
import { PageShell } from "@/components/ui/PageShell";
import { listNotions } from "@/lib/content";

/** Le manifeste léger pour le header (panneau Notions + palette ⌘K). */
function manifestePourHeader() {
  return listNotions().map((n) => ({ subject: n.subject, slug: n.slug, title: n.title, readingMinutes: n.readingMinutes }));
}
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Option — accueil B3",
  robots: { index: false, follow: false },
};

function SubjectStrip({
  label,
  done,
  total,
  detail,
}: {
  label: string;
  done: number;
  total: number;
  detail: string;
}) {
  const pct = Math.round((done / total) * 100);
  return (
    <div className="py-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-body font-semibold text-primary">
          {label}
        </h3>
        <span className="text-caption text-secondary tabular-nums">
          {done} / {total} notions
        </span>
      </div>
      <div
        className="mt-3 h-1 rounded-full bg-border-subtle"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} : ${done} notions sur ${total}`}
      >
        <div className="h-1 rounded-full bg-accent/70" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-body-sm text-secondary">{detail}</p>
    </div>
  );
}

export default function HomeB3() {
  return (
    <PageShell notions={manifestePourHeader()} width="content">
      <header className="mb-10">
        <h1 className="font-display text-display font-bold text-primary">
          Où tu en es
        </h1>
        <p className="mt-4 text-lead text-secondary max-w-lead">
          Une vue honnête de ta préparation — et le prochain pas, déjà choisi.
        </p>
      </header>

      {/* ── THE primary element: today's move ── */}
      <section aria-label="Aujourd'hui" className="max-w-list">
        <div
          className={cn(
            "rounded-xl px-8 py-7",
            "bg-surface-container-high shadow-elevation-2",
            "flex flex-wrap items-center justify-between gap-6"
          )}
        >
          <div className="min-w-0">
            <p className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
              Aujourd’hui
            </p>
            <p className="mt-2 font-display text-h3 font-semibold text-primary">
              Terminer « Oscillations libres » — les trois régimes
            </p>
            <p className="mt-1 text-body-sm text-secondary">
              ≈ 40 min · reprend à la section 5 sur 10
            </p>
          </div>
          <Link
            href="/notions/pc/rlc-serie"
            className={cn("btn-primary focus-ring flex-shrink-0")}
          >
            Continuer
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </section>

      {/* ── The honest map — calm strips, stated fractions ── */}
      <section aria-label="Progression par matière" className="mt-14 max-w-list">
        <h2 className="mb-2 pb-3 border-b border-subtle text-h4 font-semibold text-secondary">
          Par matière
        </h2>
        <div className="divide-y divide-border-subtle">
          <SubjectStrip
            label="Physique-Chimie"
            done={0}
            total={1}
            detail="Oscillations libres — en cours (section 5 sur 10)."
          />
          <SubjectStrip
            label="Mathématiques"
            done={1}
            total={1}
            detail="Probabilités conditionnelles — vue ; une révision courte est prête."
          />
        </div>
      </section>

      {/* Library escape hatch — quiet, never trapping (VISION: free-secondary) */}
      <p className="mt-12 max-w-list">
        <Link
          href="/"
          className={cn(
            "text-body-sm font-medium text-secondary hover:text-primary",
            "state-layer rounded px-2 py-1 focus-ring [--focus-radius:8px]",
            "transition-colors duration-micro ease-enter"
          )}
        >
          Parcourir toutes les notions
        </Link>
      </p>
    </PageShell>
  );
}
