/**
 * Accueil — téléphone d'abord, séance du jour en premier (ADR 0045, rapport 04).
 *
 * Structure :
 *   1. ExamCountdown — une seule ligne factuelle (filière active, semaines
 *      estimées avant l'examen national, accès au choix de filière).
 *   2. Séance du jour (`SessionCard` + `NextUp`, action primaire unique
 *      `[data-primary-action]`) et accès aux trois leçons interactives au
 *      nouveau format guidé (effectifs d'exercices lus depuis `CATALOGUE`).
 *   3. ProgrammeMap (Option A) — quatre cartes matières avec couverture réelle
 *      (`M/N chapitres`), coefficient officiel si filière choisie, et liste
 *      des chapitres repliée dans un `<details>` fermé (les 62 liens
 *      `[data-mastery-token]` restent dans le DOM).
 *   4. Examens blancs — accès aux épreuves réelles (nombre issu du corpus).
 *   5. Repères de l'examen — coefficients officiels (`NoteEnJeu`, sans colonne
 *      de maîtrise vide) et barème de l'épreuve de maths (`SujetMaths`).
 *
 * Honest-state : hors session connectée, aucune progression n'est fabriquée ;
 * chaque nombre affiché provient directement des données du dépôt.
 */

import type { Metadata } from "next";
import { listNotions } from "@/lib/content";
import { LeconsVitrine } from "@/components/dashboard/LeconsVitrine";

import { Link } from "@/components/ui/Lien";
import { PageShell } from "@/components/ui/PageShell";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { NextUp } from "@/components/dashboard/NextUp";
import { ProgrammeMap } from "@/components/dashboard/ProgrammeMap";
import { ExamCountdown } from "@/components/dashboard/ExamCountdown";
import { semainesRestantes } from "@/lib/compte-a-rebours";
import { NoteEnJeu } from "@/components/dashboard/NoteEnJeu";
import { SujetMaths } from "@/components/dashboard/SujetMaths";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";

export const metadata: Metadata = {
  title: "Ta session",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const notions = listNotions();
  const epreuves = manifesteEpreuves();

  return (
    <PageShell epreuves={epreuves} notions={manifestePourHeader()} width="page">
      <ExamCountdown initial={semainesRestantes(Date.now())} />

      <div className="mt-6 bp-large:mt-8">
        <header className="mb-4 bp-medium:mb-6">
          <h1 className="min-w-0 font-display text-display font-bold text-primary">Ta session</h1>
        </header>

        <div className="grid grid-cols-1 gap-8 bp-large:grid-cols-12 bp-large:items-start">
          <div className="min-w-0 bp-large:col-span-7">
            <SessionCard notions={notions} />
            <div className="mt-2">
              <NextUp notions={notions} />
            </div>
          </div>

          <section
            aria-label="Examens blancs"
            className="flex min-w-0 flex-col justify-between gap-6 border border-subtle bg-surface-container-low p-6 bp-medium:p-8 bp-large:col-span-5 bp-large:self-stretch"
          >
            <div>
              <p className="font-mono text-caption uppercase tracking-eyebrow text-tertiary">Le jour J, en vrai</p>
              <h2 className="mt-2 font-display text-h2 font-bold text-primary">Examens blancs</h2>
              <p className="mt-2 text-body text-secondary">
                {epreuves.length} épreuves réelles du bac, chronométrées, corrigées au barème.
              </p>
            </div>
            <Link
              href="/examens"
              data-lien-examens=""
              className="group inline-flex min-h-touch items-center gap-2 self-start text-body font-semibold text-primary underline underline-offset-4 hover:text-signal focus-ring"
            >
              Ouvrir les examens blancs
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </section>
        </div>
      </div>

      <LeconsVitrine className="mt-12 bp-large:mt-16" />

      <ProgrammeMap notions={notions} />

      <div className="mt-12 bp-large:mt-16 grid grid-cols-1 gap-x-8 gap-y-12 bp-large:grid-cols-12">
        <NoteEnJeu className="bp-large:col-span-7" />
        <SujetMaths className="bp-large:col-span-5" />
      </div>
    </PageShell>
  );
}
