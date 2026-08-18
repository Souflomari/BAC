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

/** Le manifeste léger pour le header (panneau Notions + palette ⌘K). */
function manifestePourHeader() {
  return listNotions().map((n) => ({ subject: n.subject, slug: n.slug, title: n.title, readingMinutes: n.readingMinutes }));
}
import { PageShell } from "@/components/ui/PageShell";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { NextUp } from "@/components/dashboard/NextUp";
import { ProgrammeMap } from "@/components/dashboard/ProgrammeMap";

export const metadata: Metadata = {
  title: "Ta session",
};

export default function HomePage() {
  const notions = listNotions();

  return (
    <PageShell notions={manifestePourHeader()} width="page">
      <header className="mb-10 max-w-lead">
        <h1 className="font-display text-display font-bold text-primary">
          Ta session
        </h1>
        <p className="mt-4 text-lead text-secondary">
          Deux heures calmes, une notion à fond. Voilà par où commencer.
        </p>
      </header>

      <SessionCard notions={notions} />
      <div className="mt-4">
        <NextUp notions={notions} />
      </div>

      <ProgrammeMap notions={notions} />
    </PageShell>
  );
}
