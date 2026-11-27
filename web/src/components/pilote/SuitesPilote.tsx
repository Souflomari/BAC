"use client";

/**
 * SuitesPilote — la leçon maths « Les suites numériques », séance 1 « La machine u(n+1) = f(u(n)) »
 * (format v3), sur le squelette commun.
 * Le moteur vit dans `suites-moteur.js` (scènes : `suites-scenes-{a,b,c}.js`, outils et nombres :
 * `suites-outils.js`), sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./suites-moteur";

export function SuitesPilote() {
  return (
    <PiloteCoquille
      nom="suites"
      matiere="Maths · 2ᵉ Bac"
      titre="Les suites numériques"
      filieres="SM · PC · SVT"
      exercices="/pilote/suites/exercices"
      monter={monterPilote}
      pourquoi={
        <>
          <li>
            <b>Une énigme de pharmacie d’abord.</b> Un comprimé chaque matin, et le corps en élimine la moitié chaque
            jour : la quantité grandit-elle sans limite ? Tu paries, tu fais glisser le nombre de jours, et trois
            questions restent ouvertes jusqu’à la fin de la séance.
          </li>
          <li>
            <b>Un dessin pour tout lire.</b> Une suite <i>u</i>
            <sub>
              <i>n</i>+1
            </sub>
             = 
            <i>f</i>(<i>u</i>
            <sub>
              <i>n</i>
            </sub>
            ) se dessine en escalier entre la courbe de <i>f</i> et la droite <i>y</i> = 
            <i>x</i>. La récurrence, le sens de variation, la convergence et la limite se lisent ensuite sur ce dessin.
          </li>
          <li>
            <b>La rigueur du bac.</b> Chaque preuve se fait ligne par ligne, avec la rédaction attendue : initialisation,
            hérédité, conclusion. La séance finit sur la fin de deux problèmes du bac (2022 et 2019), cités avec leur
            barème.
          </li>
          <li>
            <b>Deux séances.</b> Celle-ci, « La machine » : les outils généraux. La suivante, « Encadrer,
            comparer » : les suites homographiques, les encadrements et, en SM seulement, les suites adjacentes.
          </li>
        </>
      }
    />
  );
}
