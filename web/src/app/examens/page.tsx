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
import { listEpreuves, filiereLabel, type Epreuve } from "@/lib/examens";
import { cn } from "@/lib/utils";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";

export const metadata: Metadata = {
  title: "Examens blancs",
  description:
    "Les épreuves du bac national, reconstituées depuis les sujets réels — chronométrées, corrigées, auto-évaluées au barème.",
  alternates: { canonical: "/examens" },
};

/**
 * GRILLE (refonte 2026-10) — une ligne d'horaire : l'année en grand, la
 * session, puis les faits (exercices, points, durée) alignés en colonnes.
 * Les contrats de la porte restent sur la ligne : `data-epreuve` sur le lien,
 * `data-epreuve-exos` (« 4 exercices · 10 parties », le sujet puis les
 * morceaux) et `data-epreuve-pts` (« 20 pts » ou « 10,5 pts sur 20
 * disponibles »).
 */
function LigneEpreuve({ ep }: { ep: Epreuve }) {
  return (
    <li className="min-w-0 border-b border-subtle">
      <Link
        href={`/examens/${ep.id}`}
        data-epreuve={ep.id}
        className={cn(
          // Flex à retour, pas une grille à deux pistes : à 200 % de texte
          // sur 320 px, « Rattrapage » ne tient plus à côté de l'année et
          // débordait de 51 px. La base en rem (8rem) ne fait passer le
          // libellé sous l'année QUE quand le texte est agrandi.
          "flex min-h-touch flex-wrap items-baseline gap-x-4 py-3",
          "state-layer focus-ring"
        )}
      >
        <span className="w-[4.5rem] shrink-0 font-display text-h2 font-bold leading-none text-primary wdth-62 tnum">
          {ep.year}
        </span>
        <span className="min-w-0 flex-1 basis-32">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-body font-semibold text-primary">
              {ep.session === "normale" ? "Session normale" : "Rattrapage"}
            </span>
            {!ep.complete && (
              <span className="border border-field px-1.5 text-caption font-semibold uppercase tracking-eyebrow text-secondary">
                Partielle
              </span>
            )}
          </span>
          <span className="mt-0.5 block text-body-sm text-secondary tnum">
            <span data-epreuve-exos>
              {ep.nbExercices} exercice{ep.nbExercices > 1 ? "s" : ""}
              {/* Le sujet compte N exercices ; le produit les sert en M
                  morceaux quand un exercice se répartit entre plusieurs
                  notions. On dit les deux — sinon la ligne annonce 4 et la
                  page en montre 10. */}
              {ep.exercices.length > ep.nbExercices &&
                ` · ${ep.exercices.length} parties`}
            </span>{" "}
            ·{" "}
            <span data-epreuve-pts>
              {ep.complete
                ? `${Math.round(ep.pts)} pts`
                : `${String(ep.pts).replace(".", ",")} pts sur 20 disponibles`}
            </span>{" "}
            · {ep.dureeOfficielleMin / 60} h
          </span>
        </span>
      </Link>
    </li>
  );
}

export default function ExamensPage() {
  const epreuves = listEpreuves();
  const groupes = [
    { id: "SPC", liste: epreuves.filter((e) => e.filiere === "SPC") },
    { id: "SExp", liste: epreuves.filter((e) => e.filiere === "SExp") },
    { id: "SM", liste: epreuves.filter((e) => e.filiere === "SM") },
  ].filter((g) => g.liste.length > 0);

  return (
    <PageShell epreuves={manifesteEpreuves()} notions={manifestePourHeader()} width="page">
      <header className="mb-12 grid grid-cols-1 items-end gap-x-12 gap-y-6 bp-large:grid-cols-12">
        <div className="bp-large:col-span-7">
          <h1 className="font-display text-h1 font-bold text-primary bp-medium:text-display">
            Examens blancs
          </h1>
          <p className="mt-4 max-w-[60ch] text-lead text-secondary">
            Les épreuves du bac national, reconstituées exercice par exercice
            depuis les sujets réels. Chronomètre calme, correction après
            l’épreuve, auto-évaluation au barème.
          </p>
        </div>
        <p className="border-t-2 border-accent pt-3 text-body-sm text-secondary bp-large:col-span-5">
          <span className="font-display text-display font-bold leading-none text-primary wdth-62 tnum">
            {epreuves.length}
          </span>{" "}
          épreuves réelles, dont{" "}
          <span className="font-semibold text-primary tnum">
            {epreuves.filter((e) => e.complete).length}
          </span>{" "}
          complètes sur 20.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-x-12 gap-y-12 bp-large:grid-cols-3">
        {groupes.map((g) => {
          const [matiere, filiere] = filiereLabel(g.id).split(" · ");
          return (
            <section key={g.id} aria-label={filiereLabel(g.id)} className="min-w-0">
              <div className="border-b-2 border-accent pb-3">
                <p className="text-caption font-semibold uppercase tracking-eyebrow text-secondary">
                  {matiere}
                </p>
                <h2 className="mt-1 flex items-baseline justify-between gap-3 font-display text-h2 font-bold text-primary">
                  <span className="min-w-0">{filiere ?? matiere}</span>
                  <span className="shrink-0 text-body-sm font-semibold text-secondary tnum">
                    {g.liste.length} épreuve{g.liste.length > 1 ? "s" : ""}
                  </span>
                </h2>
              </div>
              <ul role="list">
                {g.liste.map((ep) => (
                  <LigneEpreuve key={ep.id} ep={ep} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}
