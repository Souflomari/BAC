"use client";

/**
 * ComplexesPilote — la leçon maths « Nombres complexes, première partie » : forme algébrique et
 * équations (format v3), sur le squelette commun.
 * Le moteur vit dans `complexes-moteur.js` (scènes : `complexes-scenes-{a,b,c}.js`, outils et nombres :
 * `complexes-outils.js`), sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./complexes-moteur";

export function ComplexesPilote() {
  return (
    <PiloteCoquille
      nom="complexes"
      matiere="Maths · 2ᵉ Bac"
      titre="Nombres complexes : forme algébrique et équations"
      filieres="SM · PC · SVT"
      exercices="/pilote/complexes/exercices"
      monter={monterPilote}
      pourquoi={
        <>
          <li>
            <b>Une énigme d’abord.</b> L’équation <i>x</i>³ = 15<i>x</i> + 4 a pour solution 4, et la formule de
            Cardan la donne en passant par √−121. Tu paries ce que vaut cette expression, et trois questions restent
            ouvertes jusqu’à la fin de la séance.
          </li>
          <li>
            <b>Un plan pour tout lire.</b> Un complexe est un point. Multiplier par <i>i</i> tourne d’un quart de tour,
            le conjugué est un miroir, le module une distance : chaque calcul se lit comme un geste dans le plan.
          </li>
          <li>
            <b>La rigueur du bac.</b> Chaque calcul se fait ligne par ligne. La séance finit sur la fin de deux exercices
            du bac (2022 et 2018), cités avec leur barème. Une partie réservée à la filière SM (coefficients complexes)
            se saute en PC et SVT.
          </li>
          <li>
            <b>Deux séances.</b> Celle-ci : la forme algébrique et les équations. La suivante : l’argument, les formes
            trigonométrique et exponentielle, et les transformations du plan.
          </li>
        </>
      }
    />
  );
}
