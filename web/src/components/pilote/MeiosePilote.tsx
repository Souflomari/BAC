"use client";

/**
 * MeiosePilote — la leçon SVT « La méiose, la fécondation et les brassages » (format v3), sur le
 * squelette commun.
 * Le moteur vit dans `meiose-moteur.js` (scènes : `meiose-scenes-{a,b,c}.js`, outils et nombres :
 * `meiose-outils.js`), sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./meiose-moteur";

export function MeiosePilote() {
  return (
    <PiloteCoquille
      nom="meiose"
      matiere="SVT · 2ᵉ Bac"
      titre="La méiose, la fécondation et les brassages"
      filieres="SVT · PC"
      exercices="/pilote/meiose/exercices"
      monter={monterPilote}
      pourquoi={
        <>
          <li>
            <b>Une énigme de chromosomes.</b> En 1883, Van Beneden compte les chromosomes d’un œuf fécondé. Tu paries,
            puis tu regardes la méiose se faire sous tes yeux, phase après phase, sur une cellule à 4 chromosomes.
          </li>
          <li>
            <b>Tes mains sur le hasard.</b> Tu retournes une paire de chromosomes et tu vois les gamètes changer.
            Tous les nombres (2ⁿ, quantités d’ADN, comptes de chromosomes) sont calculés, aucun n’est recopié.
          </li>
          <li>
            <b>La rigueur du bac.</b> Deux exercices types, dits tels (ce ne sont pas des sujets) : un document commenté,
            puis un second que tu complètes, au barème indicatif.
          </li>
        </>
      }
    />
  );
}
