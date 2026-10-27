"use client";

/**
 * LogarithmePilote — la leçon maths « Fonction logarithme népérien », séance 1
 * « Pourquoi ln » (refonte 2026-10, V3), sur le squelette commun.
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
            <b>Ce qu’il faut savoir, d’abord.</b> Un test sur les puissances ouvre la séance : réussi du premier
            coup, il te permet de passer le rappel.
          </li>
          <li>
            <b>L’histoire sert à prédire.</b> Chaque idée arrive parce que quelqu’un en a eu besoin (Napier, Gunter,
            Oughtred, Saint-Vincent et Sarasa), et tu paries avant de voir ce qu’ils ont trouvé.
          </li>
          <li>
            <b>Le pourquoi d’abord, la définition du bac ensuite.</b> Quand elle arrive, elle paraît évidente. La
            séance finit sur une équation du bac, rédigée comme sur une copie.
          </li>
          <li>
            <b>Deux séances.</b> Celle-ci, « Pourquoi ln » : d’où vient ln, ce que dit sa courbe, ses règles. La
            suivante, « ln comme fonction » : les limites, la dérivée de ln <i>u</i>, l’étude complète.
          </li>
        </>
      }
    />
  );
}
