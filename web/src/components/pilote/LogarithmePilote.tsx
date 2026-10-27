"use client";

/**
 * LogarithmePilote — la leçon pilote maths « Fonction logarithme népérien »
 * (refonte 2026-10, deuxième version), sur le squelette commun.
 * Le moteur vit dans `logarithme-moteur.js`, sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./logarithme-moteur";

export function LogarithmePilote() {
  return (
    <PiloteCoquille
      nom="logarithme"
      matiere="Maths · 2ᵉ Bac"
      titre="Fonction logarithme népérien"
      filieres="SM · PC · SVT"
      exercices="/pilote/logarithme/exercices"
      monter={monterPilote}
      pourquoi={
        <>
          <li>
            <b>L’histoire comme moteur.</b> Chaque idée arrive parce que quelqu’un en a eu besoin — Napier,
            Gunter, Oughtred, Saint-Vincent.
          </li>
          <li>
            <b>Le pourquoi d’abord, la définition du bac ensuite.</b> Quand elle arrive, elle paraît évidente.
          </li>
        </>
      }
    />
  );
}
