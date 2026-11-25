"use client";

/**
 * DipoleRlPilote : la leçon « Le dipôle RL » (format v3), deuxième chapitre du sous-domaine Électricité,
 * sur le squelette commun. Le moteur vit dans `dipole-rl-moteur.js` (scènes :
 * `dipole-rl-scenes-{a,b,c,d}.js`, données sourcées et calculs : `dipole-rl-outils.js`), sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./dipole-rl-moteur";

export function DipoleRlPilote() {
  return (
    <PiloteCoquille
      nom="dipole-rl"
      matiere="Physique-chimie · 2ᵉ Bac"
      titre="Le dipôle RL"
      filieres="SM · PC · SVT"
      exercices="/pilote/dipole-rl/exercices"
      monter={monterPilote}
      touches="← → pour avancer · 1 2 3 4 pour répondre"
      pourquoi={
        <>
          <li>
            <b>Une énigme, et son calcul.</b> Deux lampes branchées sur le même générateur ne s’allument pas
            ensemble&#8239;: celle qui est en série avec une bobine traîne. Tu paries, puis tu construis la courbe de
            l’intensité pas à pas, et tu reviens aux lampes à la fin.
          </li>
          <li>
            <b>Une figure pour plusieurs lectures.</b> Le courant et la tension aux bornes de la bobine se lisent
            au même instant&#8239;: l’un est continu, l’autre saute. La même figure sert la constante de temps, l’influence
            de <i>R</i>, de <i>L</i> et de <i>E</i>, la rupture et la surtension. Les valeurs sont calculées par le
            programme, aucune n’est recopiée à la main.
          </li>
          <li>
            <b>Le bac en ligne de mire.</b> Deux sujets de la série PC (2023 et 2024), cités avec leur barème. En SVT,
            l’établissement de l’expression de l’énergie se saute&#8239;: il n’est pas à ton programme.
          </li>
        </>
      }
    />
  );
}
