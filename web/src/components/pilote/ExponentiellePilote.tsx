"use client";

/**
 * ExponentiellePilote — la leçon maths « Fonction exponentielle », séance 1 « Pourquoi exp »
 * (format v3), sur le squelette commun.
 * Le moteur vit dans `exponentielle-moteur.js` (scènes : `exponentielle-scenes-{a,b,c}.js`),
 * sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./exponentielle-moteur";

export function ExponentiellePilote() {
  return (
    <PiloteCoquille
      nom="exponentielle"
      matiere="Maths · 2ᵉ Bac"
      titre="Fonction exponentielle"
      filieres="SM · PC · SVT"
      exercices="/pilote/exponentielle/exercices"
      monter={monterPilote}
      pourquoi={
        <>
          <li>
            <b>Une énigme de banque d’abord.</b> En 1683, Jacob Bernoulli se demande ce que devient un capital
            capitalisé de plus en plus souvent. Tu paries, tu fais glisser <i>n</i>, et la réponse reste ouverte
            jusqu’à la fin de la séance.
          </li>
          <li>
            <b>Le miroir.</b> L’exponentielle défait ln : sa courbe est le reflet de celle de ln dans la droite{" "}
            <i>y</i>&#8239;=&#8239;<i>x</i>. Son domaine, son signe, ses limites et sa pente s’y lisent.
          </li>
          <li>
            <b>La rigueur du bac.</b> Les règles, les équations et inéquations, la dérivée, la tangente en 0 et les
            limites de base. La séance finit sur une équation du bac rédigée comme sur une copie.
          </li>
          <li>
            <b>Deux séances.</b> Celle-ci, « Pourquoi exp » : d’où vient exp et ce qu’elle sait faire. La suivante,
            « exp comme fonction » : l’étude complète, les limites habillées et les primitives de{" "}
            <i>u</i>′e<sup><i>u</i></sup>.
          </li>
        </>
      }
    />
  );
}
