/**
 * /ou-j-en-suis — ce que le journal de cet appareil permet de dire à l'élève.
 *
 * La page serveur ne fait que deux choses : poser la coquille du site et lire, au build, les libellés
 * officiels des capacités (le référentiel est sur disque, il ne peut pas être lu côté client). Tout le
 * reste se passe dans le composant client, après l'hydratation : le journal n'existe que sur l'appareil.
 * Non liée depuis l'accueil ni le menu tant que les leçons v3 ne sont pas montrées aux élèves.
 */
import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { libellesLisibles } from "@/lib/referentiel-libelles";
import { capacitesConnues } from "@/lib/apprentissage";
import { CATALOGUE } from "@/lib/apprentissage-catalogue";
import { OuJEnSuis } from "./OuJEnSuis";

export const metadata: Metadata = {
  title: "Où j’en suis",
  description: "Ce que tu as compris, ce qui est fragile, ce qui reste à voir, et la prochaine chose à faire.",
  alternates: { canonical: "/ou-j-en-suis" },
  robots: { index: false, follow: false },
};

export default function OuJEnSuisPage() {
  const ids = new Set<string>(capacitesConnues(CATALOGUE).keys());
  for (const k of Object.values(CATALOGUE.conceptions)) k.capacites.forEach((c) => ids.add(c));
  return (
    <PageShell epreuves={manifesteEpreuves()} notions={manifestePourHeader()} width="content">
      <OuJEnSuis libelles={libellesLisibles(ids)} />
    </PageShell>
  );
}
