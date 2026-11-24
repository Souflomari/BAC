"use client";

import { useState } from "react";
import { MaquetteMeiose } from "./MaquetteMeiose";
import { MaquetteDipoleRc } from "./MaquetteDipoleRc";
import { MaquetteSuites } from "./MaquetteSuites";
import { useHydrated } from "@/lib/useHydrated";
import { ty } from "./outils";

type OngletId = "meiose" | "dipole-rc" | "suites";

const ONGLETS: { id: OngletId; label: string; matiere: string }[] = [
  { id: "meiose", label: "Méiose I", matiere: "SVT" },
  { id: "dipole-rc", label: "Dipôle RC", matiere: "PC" },
  { id: "suites", label: "Suites", matiere: "Maths" },
];

export function MaquettesPageView() {
  const [onglet, setOnglet] = useState<OngletId>("meiose");
  // Aucune commande active dans le HTML prérendu (dom-truth) : les maquettes n'existent qu'une fois
  // la page prise en main par React, on ne sert donc aucun bouton avant.
  const pret = useHydrated();
  if (!pret) {
    return (
      <p className="text-body-sm text-secondary" aria-busy="true">
        {ty("Chargement des maquettes…")}
      </p>
    );
  }

  return (
    <div className="mq-page space-y-6">
      {/* Sélecteur compact tenant sur une seule ligne dès 360–390 px */}
      <nav aria-label={ty("Choix de la maquette animée")} className="grid grid-cols-3 gap-2 bp-medium:flex bp-medium:flex-wrap">
        {ONGLETS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={onglet === tab.id}
            onClick={() => setOnglet(tab.id)}
            className="mq-seg px-2 bp-medium:px-4"
          >
            <span className="font-mono text-caption text-tertiary mr-1.5">{tab.matiere}</span>
            <span>{ty(tab.label)}</span>
          </button>
        ))}
      </nav>

      {onglet === "meiose" && <MaquetteMeiose />}
      {onglet === "dipole-rc" && <MaquetteDipoleRc />}
      {onglet === "suites" && <MaquetteSuites />}

      {/* Bilan de production et passage à l'échelle (× 100) */}
      <section aria-labelledby="mq-echelle-titre" className="border-t border-subtle pt-5">
        <h2 id="mq-echelle-titre" className="font-display text-h3 font-semibold text-primary">
          {ty("Temps passé et passage à cent scènes")}
        </h2>
        <p className="mt-1 max-w-prose text-body-sm text-secondary">
          {ty(
            "Support retenu : SVG paramétrique piloté en direct (10,4 Ko compilés pour les trois maquettes réunies, netteté vectorielle à toute taille et bascule instantanée clair / sombre)."
          )}
        </p>

        <div className="mt-3 overflow-x-auto border border-subtle bg-surface-raised">
          <table className="w-full text-left text-body-sm">
            <thead className="border-b border-subtle bg-surface-container-low font-mono text-caption text-secondary">
              <tr>
                <th className="px-4 py-2.5">{ty("Maquette")}</th>
                <th className="px-4 py-2.5">{ty("Temps passé")}</th>
                <th className="px-4 py-2.5">{ty("Poids JS")}</th>
                <th className="px-4 py-2.5">{ty("Pour en produire 100")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              <tr>
                <td className="px-4 py-2.5 font-medium text-primary">{ty("Méiose I (SVT)")}</td>
                <td className="px-4 py-2.5 font-mono text-secondary">{ty("35 min")}</td>
                <td className="px-4 py-2.5 font-mono text-secondary">{ty("~3,5 Ko")}</td>
                <td className="px-4 py-2.5 text-secondary">
                  {ty(
                    "Primitives biologiques réutilisables (chromosome bichromatidien, fuseau, membrane bilobée) + vérification automatique de non-chevauchement aux 6 paliers."
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-primary">{ty("Dipôle RC (PC)")}</td>
                <td className="px-4 py-2.5 font-mono text-secondary">{ty("40 min")}</td>
                <td className="px-4 py-2.5 font-mono text-secondary">{ty("~3,6 Ko")}</td>
                <td className="px-4 py-2.5 text-secondary">
                  {ty(
                    "Gabarit « schéma couplé + double chronogramme » alimenté par une loi exacte x(t) (RC, RL, RLC, décroissance N(t), cinétique chimique)."
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-primary">{ty("Suites (Maths)")}</td>
                <td className="px-4 py-2.5 font-mono text-secondary">{ty("30 min")}</td>
                <td className="px-4 py-2.5 font-mono text-secondary">{ty("~3,3 Ko")}</td>
                <td className="px-4 py-2.5 text-secondary">
                  {ty(
                    "Moteur de repère orthonormé déclaratif (courbe, bissectrice, tangente, intégrale, escalier) paramétré par f(x) et u0."
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
