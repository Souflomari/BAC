/**
 * /examens — les épreuves réelles reconstituées (EXAM-MODE-SPEC §2).
 *
 * Liste par matière, motif ProgrammeMap : cartes claires, faits en mono,
 * complètes d'abord. Une épreuve n'apparaît que parce que ses exercices
 * existent en banque (vérifiés) — les partielles portent leur « X pts sur
 * 20 disponibles » en clair, honest-state.
 */

import type { Metadata } from "next";
import { Link } from "@/components/ui/Lien";
import { PageShell } from "@/components/ui/PageShell";
import { listNotions } from "@/lib/content";
import { listEpreuves, epreuveTitre, filiereLabel, type Epreuve } from "@/lib/examens";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Examens blancs",
  description:
    "Les épreuves du bac national, reconstituées depuis les sujets réels — chronométrées, corrigées, auto-évaluées au barème.",
  alternates: { canonical: "/examens" },
};

function manifestePourHeader() {
  return listNotions().map((n) => ({
    subject: n.subject,
    slug: n.slug,
    title: n.title,
    readingMinutes: n.readingMinutes,
  }));
}

function CarteEpreuve({ ep }: { ep: Epreuve }) {
  return (
    <li className="min-w-0">
      <Link
        href={`/examens/${ep.id}`}
        data-epreuve={ep.id}
        className={cn(
          "flex w-full min-w-0 items-baseline gap-3 rounded-lg px-3 py-3 -mx-3",
          "state-layer focus-ring [--focus-radius:8px]"
        )}
      >
        <span className="min-w-0 flex-1">
          <span className="block text-body font-medium text-primary">
            {epreuveTitre(ep)}
          </span>
          <span className="mt-0.5 block text-body-sm text-secondary">
            <span data-epreuve-exos>
              {ep.nbExercices} exercice{ep.nbExercices > 1 ? "s" : ""}
              {/* Le sujet compte N exercices ; le produit les sert en M
                  morceaux quand un exercice se répartit entre plusieurs
                  notions. On dit les deux — sinon la carte annonce 4 et la
                  page en montre 10. */}
              {ep.exercices.length > ep.nbExercices &&
                ` · ${ep.exercices.length} parties`}
            </span>{" "}
            ·{" "}
            <span className="mono-inline tabular-nums" data-epreuve-pts>
              {ep.complete
                ? `${Math.round(ep.pts)} pts`
                : `${String(ep.pts).replace(".", ",")} pts sur 20 disponibles`}
            </span>{" "}
            · {ep.dureeOfficielleMin / 60} h
          </span>
        </span>
        {!ep.complete && (
          <span className="shrink-0 rounded-full border border-subtle px-2.5 py-0.5 text-caption font-medium text-tertiary">
            Partielle
          </span>
        )}
      </Link>
    </li>
  );
}

export default function ExamensPage() {
  const epreuves = listEpreuves();
  const groupes = [
    { titre: filiereLabel("SPC"), liste: epreuves.filter((e) => e.filiere === "SPC") },
    { titre: filiereLabel("SExp"), liste: epreuves.filter((e) => e.filiere === "SExp") },
    { titre: filiereLabel("SM"), liste: epreuves.filter((e) => e.filiere === "SM") },
  ].filter((g) => g.liste.length > 0);

  return (
    <PageShell notions={manifestePourHeader()} width="page">
      <header className="mb-10">
        <h1 className="font-display text-h1 bp-medium:text-display font-bold text-primary">
          Examens blancs
        </h1>
        <p className="mt-3 max-w-lead text-lead text-secondary">
          Les épreuves du bac national, reconstituées exercice par exercice
          depuis les sujets réels. Chronomètre calme, correction après
          l’épreuve, auto-évaluation au barème.
        </p>
      </header>

      <div className="space-y-4 bp-large:columns-2 bp-large:gap-4 bp-large:space-y-0">
        {groupes.map((g) => (
          <section
            key={g.titre}
            aria-label={g.titre}
            className="min-w-0 break-inside-avoid rounded-xl border border-subtle bg-surface-raised p-5 shadow-elevation-1 bp-large:mb-4"
          >
            <h2 className="mb-2 border-b border-subtle pb-2 text-caption font-medium uppercase tracking-eyebrow text-secondary">
              {g.titre}
            </h2>
            <ul role="list" className="divide-y divide-border-subtle">
              {g.liste.map((ep) => (
                <CarteEpreuve key={ep.id} ep={ep} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
