"use client";

/**
 * ExpressionGenetiquePilote — la leçon pilote SVT « Du gène à la protéine »
 * (refonte 2026-10, deuxième version), sur le squelette commun.
 * Le moteur vit dans `expression-genetique-moteur.js`, sur `noyau.js` ; les scènes dans
 * `expression-genetique-scenes-*.js`, la donnée génétique dans `expression-genetique-code.js`,
 * les fiches de mots dans `expression-genetique-mots.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./expression-genetique-moteur";

export function ExpressionGenetiquePilote() {
  return (
    <PiloteCoquille
      nom="expression-genetique"
      matiere="SVT · 2ᵉ Bac"
      titre="Du gène à la protéine"
      monter={monterPilote}
      pourquoi={
        <>
          <li>
            <b>Tes mains sur le code.</b> Tu lis toi-même le tableau du code, tu fais avancer le ribosome, tu
            mutes le gène lettre par lettre : chaque séquence affichée est calculée, aucune n’est recopiée.
          </li>
          <li>
            <b>Une vraie énigme, un vrai gène.</b> La drépanocytose, Pauling, Ingram, Nirenberg — et le gène de
            la chaîne β, tel que les bases de données le publient.
          </li>
          <li>
            <b>Le raisonnement du bac à la fin.</b> L’exercice « maladie héréditaire » qui revient presque chaque
            année, montré comme le ferait un expert.
          </li>
        </>
      }
    />
  );
}
