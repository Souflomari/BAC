/**
 * Page matière — /matieres/[subject] (rapport 04 : G-04-008, G-04-014, ADR 0045).
 *
 * Catalogue des unités et chapitres d'une matière :
 *   - en-tête sobre avec la couverture réelle du cadre affichée une seule fois
 *     en `GeistMono` (`header [data-couverture]`, contrat `dom-truth.mjs:426`) ;
 *   - accès discret à la leçon interactive lorsqu'elle existe pour la matière
 *     (nombre d'exercices lu depuis `CATALOGUE`, jamais saisi en dur) ;
 *   - liste des unités et chapitres (`ChapterList`).
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listNotions } from "@/lib/content";
import { CATALOGUE } from "@/components/pilote/exercices/catalogue";

import { getSubject, subjectChapterCount, subjectAvailableCount, SUBJECTS, type SubjectId } from "@/lib/curriculum";
import { subjectLabel } from "@/lib/subjects";
import { Link } from "@/components/ui/Lien";
import { PageShell } from "@/components/ui/PageShell";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ChapterList, type UnitView } from "@/components/curriculum/ChapterList";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";

// Toutes les valeurs valides sont connues au build (`generateStaticParams`) ;
// une adresse inconnue reçoit la page « introuvable » prérendue.
export const dynamicParams = false;

const CATALOGUE_EXERCICES = CATALOGUE as Record<string, unknown[]>;

const PILOTE_PAR_MATIERE: Partial<
  Record<
    SubjectId,
    {
      cle: string;
      href: string;
      slugChapitre?: string;
      titre: string;
      description: string;
    }
  >
> = {
  maths: {
    cle: "logarithme",
    href: "/pilote/logarithme",
    slugChapitre: "fonction-logarithme",
    titre: "Fonction logarithme",
    description: "De Napier à la définition du bac",
  },
  pc: {
    cle: "radioactivite",
    href: "/pilote/radioactivite",
    slugChapitre: "decroissance-radioactive",
    titre: "Décroissance radioactive",
    description: "De Becquerel au carbone 14",
  },
  svt: {
    cle: "expression-genetique",
    href: "/pilote/expression-genetique",
    titre: "Expression de l’information génétique",
    description: "Du gène à la protéine, la drépanocytose lettre par lettre",
  },
};

export function generateStaticParams() {
  return (Object.keys(SUBJECTS) as SubjectId[]).map((subject) => ({ subject }));
}

export function generateMetadata({ params }: { params: { subject: string } }): Metadata {
  const s = getSubject(params.subject);
  if (!s) return { title: "Matière introuvable" };
  return {
    title: s.label,
    description: `${s.label} (2ᵉ Bac sciences, Maroc) : ${s.blurb}`,
    alternates: { canonical: `/matieres/${params.subject}` },
  };
}

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subject = getSubject(params.subject);
  if (!subject) notFound();

  const notions = listNotions();
  const builtIds = new Set(notions.map((n) => n.id));
  const metaBySlug = new Map(
    notions
      .filter((n) => n.subject === subject.id)
      .map((n) => [n.slug, n])
  );

  const pilote = PILOTE_PAR_MATIERE[subject.id];
  const nbExercicesPilote = pilote ? (CATALOGUE_EXERCICES[pilote.cle]?.length ?? 0) : 0;

  // Chaque chapitre conserve sa restriction `filieres` ; le resserrement par
  // filière se fait côté client dans `ChapterList` (composant client).
  const units: UnitView[] = subject.units.map((u) => ({
    title: u.title,
    chapters: u.chapters.map((c) => {
      const available = builtIds.has(`${subject.id}/${c.slug}`);
      const piloteChapitre =
        pilote && pilote.slugChapitre === c.slug
          ? { href: pilote.href, nbExercices: nbExercicesPilote }
          : undefined;
      return {
        slug: c.slug,
        title: c.title,
        available,
        minutes: available ? metaBySlug.get(c.slug)?.readingMinutes : undefined,
        filieres: c.filieres,
        pilote: piloteChapitre,
      };
    }),
  }));

  const total = subjectChapterCount(subject);
  const available = subjectAvailableCount(subject, builtIds);
  const metaLine =
    total === 0
      ? "Programme à venir"
      : available === total
        ? `${total} chapitre${total > 1 ? "s" : ""}`
        : `${available}/${total} chapitres disponibles`;

  return (
    <PageShell epreuves={manifesteEpreuves()} notions={manifestePourHeader()} width="page">
      <header className="mb-8 bp-medium:mb-10">
        <Breadcrumb segments={[{ label: "Accueil", href: "/" }, { label: subjectLabel(subject.id) }]} />
        <div className="max-w-lead">
          {/* `min-w-0 break-words` : « Physique-Chimie » à 200 % de texte
              (SC 1.4.4) doit pouvoir se couper plutôt que déborder. */}
          <h1 className="min-w-0 break-words font-display text-h1 bp-medium:text-display font-bold text-primary">
            {subjectLabel(subject.id)}
          </h1>
          <p className="mt-3 text-lead text-secondary">
            {subject.blurb}
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-caption text-secondary">
            <span>2ᵉ Bac · Sciences</span>
            <span aria-hidden="true" className="text-tertiary">·</span>
            {/* L'attribut garde la fraction machine (balayage dom-truth) et la
                police GeistMono (dom-truth.mjs:426) — affiché une seule fois. */}
            <span data-couverture={`${available}/${total}`} className="tnum whitespace-nowrap text-primary">
              {metaLine}
            </span>
            {total > 0 && (
              <>
                <span aria-hidden="true" className="text-tertiary">·</span>
                <span className="tnum whitespace-nowrap">
                  {subject.units.length} {subject.units.length > 1 ? "unités" : "unité"}
                </span>
              </>
            )}
          </p>
        </div>

        {total > 0 && available < total && (
          <div
            className="mt-5 h-1 max-w-[420px] overflow-hidden bg-surface-container-lowest"
            role="img"
            aria-label={`${available} chapitres disponibles sur ${total}`}
          >
            <div
              className="h-full bg-accent"
              style={{ width: `${Math.round((available / Math.max(total, 1)) * 100)}%` }}
            />
          </div>
        )}
        <div aria-hidden="true" className="mt-6 h-0.5 bg-accent" />
      </header>

      {pilote && (
        <aside
          aria-label="Leçon interactive disponible"
          className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border border-subtle bg-surface-raised p-4 bp-medium:p-5"
        >
          <div className="min-w-0">
            <p className="font-mono text-caption uppercase tracking-eyebrow text-tertiary">
              Nouveau format guidé{nbExercicesPilote > 0 ? ` · ${nbExercicesPilote} exercices` : ""}
            </p>
            <p className="mt-0.5 font-display text-h4 font-bold text-primary">
              {pilote.titre}
            </p>
            <p className="text-body-sm text-secondary">
              {pilote.description}
            </p>
          </div>
          <Link
            href={pilote.href}
            className="inline-flex min-h-touch items-center whitespace-nowrap text-body-sm font-semibold text-primary underline decoration-border-soft underline-offset-4 hover:text-signal focus-ring"
          >
            Ouvrir la leçon interactive →
          </Link>
        </aside>
      )}

      <ChapterList subject={subject.id} units={units} />
    </PageShell>
  );
}
