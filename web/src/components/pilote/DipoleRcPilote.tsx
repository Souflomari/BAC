"use client";

/**
 * DipoleRcPilote : la leçon « Le dipôle RC » (format v3), qui ouvre le sous-domaine Électricité,
 * sur le squelette commun. Le moteur vit dans `dipole-rc-moteur.js` (scènes :
 * `dipole-rc-scenes-{a,b,c}.js`, données sourcées et calculs : `dipole-rc-outils.js`), sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./dipole-rc-moteur";

export function DipoleRcPilote() {
  return (
    <PiloteCoquille
      nom="dipole-rc"
      matiere="Physique-chimie · 2ᵉ Bac"
      titre="Le dipôle RC"
      filieres="SM · PC · SVT"
      exercices="/pilote/dipole-rc/exercices"
      monter={monterPilote}
      touches="← → pour avancer · 1 2 3 pour répondre"
      pourquoi={
        <>
          <li>
            <b>Une énigme, et son calcul.</b> Une lampe s’allume puis s’éteint dans un circuit coupé par un
            isolant, et se rallume sans générateur. Tu paries, puis tu construis la courbe de la charge pas à pas,
            et tu reviens à la lampe à la fin.
          </li>
          <li>
            <b>Une figure pour six lectures.</b> La courbe de la tension aux bornes du condensateur sert la tangente
            à l’origine, les 63&#8239;%, les 37&#8239;%, le régime permanent, l’influence de <i>R</i>, de <i>C</i> et de
            <i> E</i>, puis la décharge. Les valeurs sont calculées par le programme, aucune n’est recopiée à la main.
          </li>
          <li>
            <b>Le bac en ligne de mire.</b> Deux sujets de la série PC (2022 et 2021), cités avec leur barème, et la
            copie d’un autre sujet et ses pièges. En SVT, l’établissement de l’expression de l’énergie se saute&#8239;:
            il n’est pas à ton programme.
          </li>
        </>
      }
    />
  );
}
