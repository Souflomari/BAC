/**
 * Home — la session + LE programme (refonte Studio, R6 avancé).
 *
 * L'ancienne page composait QUATRE modules dont trois disaient la même
 * chose (audit Fable §3.5) : MasteryMap (liste plate à scroll imbriqué),
 * AvailableShelf (accordéons d'illustrations répétées), SubjectProgress
 * (texte sans visualisation) — plus une grille CSS à trois zones pour les
 * tenir ensemble. Le tout est remplacé par DEUX choses :
 *
 *   1. SessionCard — l'action primaire, texte d'abord (le Cover est parti).
 *      NextUp reste sa ligne discrète en dessous, contrat inchangé
 *      ([data-primary-action], [data-reco-source]).
 *   2. ProgrammeMap — le programme par matière, couleur sémantique +
 *      couverture RÉELLE du cadre (« M/N chapitres », barre à l'appui).
 *      Chaque notion garde [data-mastery-token].
 *
 * Honest-state, revérifié à l'inventaire du 2026-08-18 : signé-déconnecté
 * il n'existe AUCUNE donnée de progression — cette page n'affiche donc
 * jamais un « % lu » ni un état de maîtrise ; la couverture du cadre est
 * la seule barre, et c'est un FAIT de contenu, pas un progrès d'élève.
 */

import type { Metadata } from "next";
import { listNotions } from "@/lib/content";

import { Link } from "@/components/ui/Lien";
import { frenchTypography } from "@/lib/frenchTypography";
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

export default function HomePage() {
  const notions = listNotions();
  const epreuves = manifesteEpreuves();

  return (
    <PageShell epreuves={epreuves} notions={manifestePourHeader()} width="page">
      {/* GRILLE (refonte 2026-10, docs/refonte/design/grille) — une grille de
          12 colonnes au bureau : le compte à rebours en très grand à gauche
          (4), la session du jour à droite (8) ; puis la note en jeu (7) et le
          sujet de maths (5) ; puis le programme en colonnes. Tout ce qui est
          affiché est un FAIT (coefficients, poids officiels, couverture du
          cadre) ou un état réel — jamais une progression fabriquée. */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 bp-large:grid-cols-12">
        <ExamCountdown className="bp-large:col-span-4 bp-large:pt-2" />

        <div className="min-w-0 bp-large:col-span-8">
          <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h1 className="min-w-0 font-display text-display font-bold text-primary">Ta session</h1>
            <p className="text-lead text-secondary">Deux heures calmes, une notion à fond.</p>
          </header>
          <SessionCard notions={notions} />
          <div className="mt-4">
            <NextUp notions={notions} />
          </div>
          {/* Le format de leçon en test (refonte 2026-10) : une entrée
              discrète, jamais une seconde action primaire. */}
          <p className="mt-6 border-l-2 border-signal pl-4 text-body text-secondary">
            {frenchTypography("Nouveau format, en test :")}{" "}
            <Link
              href="/pilote/logarithme"
              data-lien-pilote
              className="font-semibold text-primary underline underline-offset-4 hover:text-signal focus-ring"
            >
              la fonction logarithme en 34 étapes, de Napier à la définition du bac →
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 bp-large:grid-cols-12">
        <NoteEnJeu className="bp-large:col-span-7" />
        <SujetMaths className="bp-large:col-span-5" />
      </div>

      <ProgrammeMap notions={notions} />

      {/* Examens blancs — l'entrée périphérique du mode épreuve (C5), après
          le programme : la répétition d'examen vient quand les notions sont
          travaillées (§8 périphérie). Une rangée sur filet noir. */}
      <section aria-label="Examens blancs" className="mt-16 border-t-2 border-accent pt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <div>
            <h2 className="font-display text-h2 font-bold text-primary">Examens blancs</h2>
            <p className="mt-1 text-body text-secondary">
              {epreuves.length} épreuves réelles du bac, en conditions d’examen.
            </p>
          </div>
          <Link
            href="/examens"
            data-lien-examens
            className="text-body font-semibold text-primary underline underline-offset-4 hover:text-signal focus-ring"
          >
            Examens blancs — les épreuves réelles →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
