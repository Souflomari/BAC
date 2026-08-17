/**
 * Subject index — /matieres/[subject] (Day-9 site skeleton).
 *
 * The chapter catalogue for one matière: a masthead band (same A3 grammar as
 * the notion page — one display moment) + the units → chapters list, with
 * built chapters linking to their notions and un-built ones shown as honest
 * "À venir" rows. Static per subject.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listNotions } from "@/lib/content";
import { getSubject, subjectChapterCount, subjectAvailableCount, SUBJECTS, type SubjectId } from "@/lib/curriculum";
import { subjectLabel } from "@/lib/subjects";
import { PageShell } from "@/components/ui/PageShell";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ChapterList, type UnitView } from "@/components/curriculum/ChapterList";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return (Object.keys(SUBJECTS) as SubjectId[]).map((subject) => ({ subject }));
}

export function generateMetadata({ params }: { params: { subject: string } }): Metadata {
  const s = getSubject(params.subject);
  if (!s) return { title: "Matière introuvable" };
  return {
    title: s.label,
    description: `${s.label} — programme 2ᵉ Bac sciences (Maroc) · ${s.blurb}`,
    alternates: { canonical: `/matieres/${params.subject}` },
  };
}

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subject = getSubject(params.subject);
  if (!subject) notFound();

  const builtIds = new Set(listNotions().map((n) => n.id));
  const metaBySlug = new Map(
    listNotions()
      .filter((n) => n.subject === subject.id)
      .map((n) => [n.slug, n])
  );

  // Every chapter is passed through, including its `filieres` restriction
  // (absent = common to all) — the actual narrowing by the device's chosen
  // filière happens client-side, inside ChapterList (this is a server
  // component and can't read localStorage; see ChapterList.tsx's header).
  const units: UnitView[] = subject.units.map((u) => ({
    title: u.title,
    chapters: u.chapters.map((c) => {
      const available = builtIds.has(`${subject.id}/${c.slug}`);
      return {
        slug: c.slug,
        title: c.title,
        available,
        minutes: available ? metaBySlug.get(c.slug)?.readingMinutes : undefined,
        filieres: c.filieres,
      };
    }),
  }));

  const total = subjectChapterCount(subject);
  const available = subjectAvailableCount(subject, builtIds);
  const metaLine =
    total === 0
      ? "Programme à venir"
      : `${total} chapitre${total > 1 ? "s" : ""} · ${available} disponible${available > 1 ? "s" : ""}`;

  return (
    <PageShell width="content">
      {/* Masthead band — the subject surface's one display moment (A3 grammar). */}
      <div
        data-band="masthead"
        className={cn(
          "-mt-12 bp-medium:-mt-16 mb-12 py-12",
          "mx-[calc(50%-50vw)] px-[calc(50vw-50%)]",
          "bg-surface-container-low",
          "border-b border-subtle"
        )}
      >
        {/* Content sits on the page spine by construction — the band's
            full-bleed calc padding re-aligns it to main's content box
            (same trick as NotionPageView; no extra container). */}
        <Breadcrumb segments={[{ label: "Accueil", href: "/" }, { label: subjectLabel(subject.id) }]} />
        <h1 className="font-serif text-display-lg font-bold text-primary max-w-[26ch]">
          {subjectLabel(subject.id)}
        </h1>
        <p className="mt-4 max-w-lead text-lead text-secondary">
          {subject.blurb}
        </p>
        <p className="mt-3 text-body-sm text-secondary tabular-nums">
          2ᵉ Bac · Sciences · {metaLine}
        </p>
      </div>

      <ChapterList subject={subject.id} units={units} />
    </PageShell>
  );
}
