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
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";

// Toutes les valeurs valides sont connues au build (generateStaticParams) ;
// une adresse inconnue reçoit alors la page « introuvable » PRÉRENDUE — en-tête,
// message, liens — au lieu d'un HTML vide que seul le JavaScript remplit
// (HANDOFF §11.32 : sur 3G lente, un élève au lien périmé regardait une page
// blanche 10 à 20 s ; sans JavaScript, pour toujours).
export const dynamicParams = false;

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
    <PageShell epreuves={manifesteEpreuves()} notions={manifestePourHeader()} width="page">
      {/* GRILLE (refonte 2026-10) — l'en-tête matière : le nom en très grand
          (Archivo serrée), la phrase de la matière, puis les FAITS du
          programme en grands chiffres (chapitres du programme, chapitres
          disponibles s'il en manque, unités). Monochrome : plus de pastille
          de couleur matière. La couverture garde sa fraction machine dans
          `data-couverture` (balayage dom-truth) et sa barre n'existe que si
          la couverture est partielle — alors elle porte une information. */}
      <header className="mb-10 bp-medium:mb-12">
        <Breadcrumb segments={[{ label: "Accueil", href: "/" }, { label: subjectLabel(subject.id) }]} />
        <div className="grid gap-8 bp-large:grid-cols-12 bp-large:items-end">
          <div className="min-w-0 bp-large:col-span-8">
            {/* `min-w-0 break-words` : « Physique-Chimie » à 200 % de texte
                (SC 1.4.4) doit pouvoir se couper plutôt que déborder. */}
            <h1 className="min-w-0 break-words font-display text-h1 bp-medium:text-display font-bold text-primary">
              {subjectLabel(subject.id)}
            </h1>
            <p className="mt-4 max-w-lead text-lead text-secondary">
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
          </div>
          {total > 0 && (
            <dl className="grid grid-cols-3 gap-x-6 border-t border-subtle pt-4 bp-large:col-span-4">
              <div className="min-w-0">
                <dt className="sr-only">chapitres au programme</dt>
                <dd className="font-display wdth-62 text-h1 font-bold leading-none text-primary tnum">{total}</dd>
                <dd className="mt-2 text-body-sm text-secondary">{total > 1 ? "chapitres" : "chapitre"}</dd>
              </div>
              {available < total && (
                <div className="min-w-0">
                  <dt className="sr-only">chapitres disponibles</dt>
                  <dd className="font-display wdth-62 text-h1 font-bold leading-none text-primary tnum">{available}</dd>
                  <dd className="mt-2 text-body-sm text-secondary">{available > 1 ? "disponibles" : "disponible"}</dd>
                </div>
              )}
              <div className="min-w-0">
                <dt className="sr-only">unités du programme</dt>
                <dd className="font-display wdth-62 text-h1 font-bold leading-none text-primary tnum">{subject.units.length}</dd>
                <dd className="mt-2 text-body-sm text-secondary">{subject.units.length > 1 ? "unités" : "unité"}</dd>
              </div>
            </dl>
          )}
        </div>
        {/* La barre n'existe que si elle PORTE une information : couverture
            partielle (audit P1-2). Carrée, encre sur gris clair. */}
        {total > 0 && available < total && (
          <div
            className="mt-6 h-1 max-w-[420px] overflow-hidden bg-surface-container-lowest"
            role="img"
            aria-label={`${available} chapitres disponibles sur ${total}`}
          >
            <div
              className="h-full bg-accent"
              style={{ width: `${Math.round((available / Math.max(total, 1)) * 100)}%` }}
            />
          </div>
        )}
        <div aria-hidden="true" className="mt-8 h-0.5 bg-accent" />
      </header>

      <ChapterList subject={subject.id} units={units} />
    </PageShell>
  );
}
