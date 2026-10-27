/**
 * /connexion — la coquille SERVEUR de la page de connexion.
 *
 * Elle n'existe que pour ce que le client ne peut pas faire : exporter une
 * `metadata` (interdite à côté de "use client") et lire le corpus sur disque
 * pour les deux manifestes du header. Le formulaire — toute la logique
 * AUTH-SPEC, tout l'état — vit dans `FormulaireConnexion.tsx`.
 *
 * Sans ces deux manifestes, le header rend ses commandes dans le vide :
 * `PanneauNotions` renvoie `null` pour chaque matière quand le manifeste est
 * vide, donc le bouton « Notions » ouvre un panneau de 720 px sur rien, et
 * la palette ⌘K n'a ni notion ni épreuve à proposer. Les huit autres pages
 * les passaient ; celle-ci héritait du silence.
 */
import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { FormulaireConnexion } from "./FormulaireConnexion";

export const metadata: Metadata = {
  title: "Se connecter",
};

export default function ConnexionPage() {
  return (
    <PageShell epreuves={manifesteEpreuves()} notions={manifestePourHeader()} width="content">
      <FormulaireConnexion />
    </PageShell>
  );
}
