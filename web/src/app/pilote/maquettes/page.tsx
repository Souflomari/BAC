/**
 * /pilote/maquettes — trois maquettes animées d'exploration (rapport 10 : vidéo et mouvement),
 * isolées dans leur propre dossier sans modifier aucune leçon ni noyau.js.
 */

import type { Metadata } from "next";
import Link from "next/link";
import "./maquettes.css";
import { PageShell } from "@/components/ui/PageShell";
import { MaquettesPageView } from "@/components/pilote/maquettes/MaquettesPageView";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";

export const metadata: Metadata = {
  title: "Maquettes animées : méiose, dipôle RC et suites",
  description:
    "Trois maquettes SVG pilotées par l’élève explorant le mouvement pédagogique en SVT (méiose I), physique-chimie (charge du condensateur) et mathématiques (escalier de suite récurrente).",
  alternates: { canonical: "/pilote/maquettes" },
  robots: { index: false, follow: false },
};

export default function PiloteMaquettesPage() {
  return (
    <PageShell epreuves={manifesteEpreuves()} notions={manifestePourHeader()} width="page">
      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-subtle pb-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Link href="/" className="text-body-sm text-secondary hover:text-primary focus-ring">
            Accueil
          </Link>
          <span aria-hidden="true" className="text-tertiary">
            /
          </span>
          <h1 className="font-display text-h2 font-bold text-primary">
            Maquettes de mouvement
          </h1>
        </div>
        <p className="text-caption text-secondary">
           Pilotage élève · jetons clair / sombre · zéro lecture automatique
        </p>
      </header>

      <MaquettesPageView />
    </PageShell>
  );
}
