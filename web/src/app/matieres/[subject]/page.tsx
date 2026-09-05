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

/** Le manifeste léger pour le header (panneau Notions + palette ⌘K). */
function manifestePourHeader() {
  return listNotions().map((n) => ({ subject: n.subject, slug: n.slug, title: n.title, readingMinutes: n.readingMinutes }));
}
import { getSubject, subjectChapterCount, subjectAvailableCount, SUBJECTS, type SubjectId } from "@/lib/curriculum";
import { subjectLabel } from "@/lib/subjects";
import { PageShell } from "@/components/ui/PageShell";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ChapterList, type UnitView } from "@/components/curriculum/ChapterList";

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
  // Audit R6 (les trois critics convergent) : « 25 chapitres ·
  // 25 disponibles » disait deux fois le même nombre, et la forme N/N
  // parle la langue du score. Quand dispo == total il n'y a RIEN à
  // signaler : le fait honnête n'a de valeur que lorsqu'il diffère.
  const metaLine =
    total === 0
      ? "Programme à venir"
      : available === total
        ? `${total} chapitre${total > 1 ? "s" : ""}`
        : `${available}/${total} chapitres disponibles`;

  return (
    <PageShell notions={manifestePourHeader()} width="page">
      {/* En-tête matière (Studio, R6 — STUDIO-SPEC §6.1) : le motif de la
          ProgrammeMap agrandi. La bande pleine-largeur grise du squelette
          Day-9 est partie — l'accueil et les matières parlent le même
          langage : point de couleur matière, display, couverture RÉELLE en
          mono, barre fine. Données du cadre, jamais de % fabriqué. */}
      <header className="mb-10">
        <Breadcrumb segments={[{ label: "Accueil", href: "/" }, { label: subjectLabel(subject.id) }]} />
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-3 w-3 shrink-0 rounded-full"
            style={{ background: `var(--subject-${subject.id})` }}
          />
          {/* h1 en h1 à compact (« Mathématiques » à 48 px remplissait les
              390 px au pixel près), display à partir de medium. */}
          {/* `min-w-0 break-words` : item flex, sinon « Physique-Chimie » à 200 % de
              texte (SC 1.4.4) refuse de se couper et déborde de 54 px à 360 px. */}
          <h1 className="min-w-0 break-words font-display text-h1 bp-medium:text-display font-bold text-primary">
            {subjectLabel(subject.id)}
          </h1>
        </div>
        <p className="mt-3 max-w-lead text-lead text-secondary">
          {subject.blurb}
        </p>
        <p className="mt-3 text-body-sm text-secondary">
          2ᵉ Bac · Sciences ·{" "}
          {/* L'attribut garde la fraction machine (sweep dom-truth) ; le
              TEXTE visible est calme. nowrap : un « 25 » orphelin en tête
              de ligne à 390 px se lisait comme une nouvelle donnée. */}
          <span data-couverture={`${available}/${total}`} className="mono-inline whitespace-nowrap">
            {metaLine}
          </span>
        </p>
        {/* La barre n'existe que si elle PORTE une information : couverture
            partielle. Pleine à 100 %, elle n'était qu'un trait décoratif —
            l'événement chromatique le plus fort de la page (audit P1-2). */}
        {total > 0 && available < total && (
          <div
            className="mt-4 h-0.5 max-w-[420px] overflow-hidden rounded-full"
            style={{ background: `var(--subject-${subject.id}-subtle)` }}
            role="img"
            aria-label={`${available} chapitres disponibles sur ${total}`}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: `var(--subject-${subject.id})`,
                width: `${Math.round((available / Math.max(total, 1)) * 100)}%`,
              }}
            />
          </div>
        )}
      </header>

      <ChapterList subject={subject.id} units={units} />
    </PageShell>
  );
}
