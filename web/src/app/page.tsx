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
import { CATALOGUE } from "@/components/pilote/exercices/catalogue";

import { Link } from "@/components/ui/Lien";
import { PageShell } from "@/components/ui/PageShell";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { NextUp } from "@/components/dashboard/NextUp";
import { ProgrammeMap } from "@/components/dashboard/ProgrammeMap";
import { ExamCountdown } from "@/components/dashboard/ExamCountdown";
import { NoteEnJeu } from "@/components/dashboard/NoteEnJeu";
import { SujetMaths } from "@/components/dashboard/SujetMaths";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";

export const metadata: Metadata = {
  title: "Ta session",
};

const CATALOGUE_EXERCICES = CATALOGUE as Record<string, unknown[]>;

const LECONS_INTERACTIVES = [
  {
    cle: "logarithme",
    href: "/pilote/logarithme",
    matiere: "Maths",
    titre: "Fonction logarithme",
    description: "De Napier à la définition du bac",
  },
  {
    cle: "radioactivite",
    href: "/pilote/radioactivite",
    matiere: "Physique-Chimie",
    titre: "Décroissance radioactive",
    description: "De Becquerel au carbone 14",
  },
  {
    cle: "expression-genetique",
    href: "/pilote/expression-genetique",
    matiere: "SVT",
    titre: "Expression de l’information génétique",
    description: "Du gène à la protéine, la drépanocytose lettre par lettre",
  },
] as const;

export default function HomePage() {
  const notions = listNotions();
  const epreuves = manifesteEpreuves();

  return (
    <PageShell epreuves={epreuves} notions={manifestePourHeader()} width="page">
      <ExamCountdown />

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
            aria-label="Leçons interactives"
            className="min-w-0 border border-subtle bg-surface-raised p-5 bp-medium:p-6 bp-large:col-span-5"
          >
            <h2 className="font-display text-h3 font-bold text-primary">Leçons interactives</h2>
            <p className="mt-1 text-body-sm text-secondary">
              Trois chapitres existent déjà au nouveau format guidé. Les autres sont dans le programme ci-dessous.
            </p>
            <ul role="list" className="mt-4 divide-y divide-subtle border-t border-subtle">
              {LECONS_INTERACTIVES.map((lecon) => {
                const nbExercices = CATALOGUE_EXERCICES[lecon.cle]?.length ?? 0;
                return (
                  <li key={lecon.href}>
                    <Link
                      href={lecon.href}
                      data-lien-pilote=""
                      className="group flex min-h-touch items-center justify-between gap-4 py-3 text-left state-layer focus-ring"
                    >
                      <span className="min-w-0">
                        <span className="block font-mono text-caption uppercase tracking-eyebrow text-tertiary">
                          {lecon.matiere}
                          {nbExercices > 0 ? ` · ${nbExercices} exercices` : ""}
                        </span>
                        <span className="mt-0.5 block text-body font-semibold text-primary group-hover:text-signal">
                          {lecon.titre}
                        </span>
                        <span className="block text-body-sm text-secondary">
                          {lecon.description}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-mono text-body text-tertiary group-hover:text-signal"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>

      <ProgrammeMap notions={notions} />

      <section aria-label="Examens blancs" className="mt-12 bp-large:mt-16 border-t-2 border-accent pt-5">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <div>
            <h2 className="font-display text-h2 font-bold text-primary">Examens blancs</h2>
            <p className="mt-1 text-body text-secondary">
              {epreuves.length} épreuves réelles du bac, en conditions d’examen.
            </p>
          </div>
          <Link
            href="/examens"
            data-lien-examens=""
            className="inline-flex min-h-touch items-center text-body font-semibold text-primary underline underline-offset-4 hover:text-signal focus-ring"
          >
            Ouvrir les examens blancs →
          </Link>
        </div>
      </section>

      <div className="mt-12 bp-large:mt-16 grid grid-cols-1 gap-x-8 gap-y-12 bp-large:grid-cols-12">
        <NoteEnJeu className="bp-large:col-span-7" />
        <SujetMaths className="bp-large:col-span-5" />
      </div>
    </PageShell>
  );
}
