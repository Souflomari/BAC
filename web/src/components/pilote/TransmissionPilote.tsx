"use client";

/**
 * TransmissionPilote : la leçon SVT « Les lois statistiques de la transmission des caractères
 * héréditaires » (format v3), sur le squelette commun, suite de la leçon sur la méiose.
 * Le moteur vit dans `transmission-moteur.js` (scènes : `transmission-scenes-{a,b,c}.js`, outils et
 * nombres : `transmission-outils.js`), sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./transmission-moteur";

export function TransmissionPilote() {
  return (
    <PiloteCoquille
      nom="transmission"
      matiere="SVT · 2ᵉ Bac"
      titre="Les lois de la transmission des caractères"
      filieres="SVT · PC"
      exercices="/pilote/transmission/exercices"
      monter={monterPilote}
      pourquoi={
        <>
          <li>
            <b>Une énigme de pois.</b> Un caractère disparaît en première génération et revient au quart en seconde.
            Tu paries d’abord, puis tu comptes les graines, avec les vrais effectifs de Mendel.
          </li>
          <li>
            <b>Tes mains sur l’échiquier.</b> Tu remplis les cases d’un échiquier de croisement, tu fais glisser un
            gène sur un chromosome et tu vois les recombinés changer. Toutes les proportions sont calculées, aucune
            n’est recopiée.
          </li>
          <li>
            <b>La rigueur du bac.</b> Lire les résultats, déduire, écrire les génotypes et l’échiquier, conclure :
            un exemple commenté d’un vrai sujet, puis un second que tu complètes, avec le barème imprimé du corrigé.
          </li>
        </>
      }
    />
  );
}
