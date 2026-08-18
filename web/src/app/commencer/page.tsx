/**
 * /commencer — filière onboarding (Day-9 site skeleton).
 *
 * The dedicated "choose / change your stream" page. Reachable from the header
 * and the dashboard. Picking a filière persists the device preference and
 * returns to the dashboard (FiliereChooser redirectOnPick). The app is never
 * gated behind this — it only personalises.
 */

import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { listNotions } from "@/lib/content";

/** Le manifeste léger pour le header (panneau Notions + palette ⌘K). */
function manifestePourHeader() {
  return listNotions().map((n) => ({ subject: n.subject, slug: n.slug, title: n.title, readingMinutes: n.readingMinutes }));
}
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FiliereChooser } from "@/components/dashboard/FiliereChooser";

export const metadata: Metadata = {
  title: "Choisis ta filière",
  description: "Choisis ta filière scientifique — 2ᵉ Bac (Maroc) — pour personnaliser ton programme.",
  alternates: { canonical: "/commencer" },
};

export default function CommencerPage() {
  return (
    <PageShell notions={manifestePourHeader()} width="content">
      <Breadcrumb segments={[{ label: "Accueil", href: "/" }, { label: "Ta filière" }]} />
      <header className="mb-10 max-w-lead">
        <h1 className="font-display text-display font-bold text-primary">
          Choisis ta filière
        </h1>
        <p className="mt-4 text-lead text-secondary">
          Ton programme et tes coefficients s’adaptent à ta filière. Tu pourras
          en changer à tout moment.
        </p>
      </header>

      <FiliereChooser redirectOnPick />
    </PageShell>
  );
}
