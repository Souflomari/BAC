/**
 * /examens — les épreuves réelles reconstituées (EXAM-MODE-SPEC §2, rapport 04
 * G-04-014).
 *
 * Page serveur : assemble les 39 épreuves depuis les banques (`listEpreuves`)
 * et passe des résumés sérialisés à `ListeExamens` (filtre par filière côté
 * client). Les partielles portent leur « X pts sur 20 disponibles » en clair.
 */

import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { listEpreuves, filiereLabel, type Epreuve } from "@/lib/examens";
import { ListeExamens, type EpreuveResume, type GroupeExamens } from "@/components/examens/ListeExamens";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";

export const metadata: Metadata = {
  title: "Examens blancs",
  description:
    "Les épreuves du bac national, reconstituées depuis les sujets réels : chronométrées, corrigées et auto-évaluées au barème.",
  alternates: { canonical: "/examens" },
};

const LIBELLE_ONGLET: Record<string, string> = {
  SPC: "Physique-Chimie · PC",
  SExp: "Maths · PC / SVT",
  SM: "Maths · SM",
};

function resumer(ep: Epreuve): EpreuveResume {
  return {
    id: ep.id,
    filiere: ep.filiere,
    year: ep.year,
    session: ep.session,
    pts: ep.pts,
    nbExercices: ep.nbExercices,
    nbParties: ep.exercices.length,
    dureeOfficielleMin: ep.dureeOfficielleMin,
    complete: ep.complete,
  };
}

export default function ExamensPage() {
  const epreuves = listEpreuves();
  const completes = epreuves.filter((e) => e.complete).length;

  const groupes: GroupeExamens[] = ["SPC", "SExp", "SM"]
    .map((id) => {
      const liste = epreuves.filter((e) => e.filiere === id).map(resumer);
      const libelleComplet = filiereLabel(id);
      const [matiere, filiere] = libelleComplet.split(" · ");
      return {
        id,
        libelleComplet,
        matiere,
        filiere: filiere ?? matiere,
        onglet: LIBELLE_ONGLET[id] ?? libelleComplet,
        liste,
      };
    })
    .filter((g) => g.liste.length > 0);

  return (
    <PageShell epreuves={manifesteEpreuves()} notions={manifestePourHeader()} width="page">
      <Breadcrumb segments={[{ label: "Accueil", href: "/" }, { label: "Examens blancs" }]} />

      <header className="mb-8 bp-medium:mb-10 grid grid-cols-1 items-end gap-x-12 gap-y-5 bp-large:grid-cols-12">
        <div className="bp-large:col-span-7">
          <h1 className="font-display text-h1 font-bold text-primary bp-medium:text-display">
            Examens blancs
          </h1>
          <p className="mt-3 max-w-[60ch] text-lead text-secondary">
            Les épreuves du bac national, reconstituées exercice par exercice
            depuis les sujets réels. Chronomètre calme, correction après
            l’épreuve, auto-évaluation au barème.
          </p>
        </div>
        <p className="border-t-2 border-accent pt-3 text-body-sm text-secondary bp-large:col-span-5">
          <span className="font-display text-h1 bp-medium:text-display font-bold leading-none text-primary wdth-62 tnum">
            {epreuves.length}
          </span>{" "}
          épreuves réelles, dont{" "}
          <span className="font-semibold text-primary tnum">{completes}</span>{" "}
          complètes sur 20.
        </p>
      </header>

      <ListeExamens groupes={groupes} total={epreuves.length} />
    </PageShell>
  );
}
