// @ts-nocheck
/**
 * Les exercices de chaque leçon pilote, par nom de pilote. Le composant
 * ExercicesPilote les lit ici (les fonctions des gabarits ne peuvent pas
 * passer du serveur au navigateur) ; la page serveur n'y lit que les
 * identifiants de capacités, pour afficher leur libellé officiel.
 */
import { EXERCICES as logarithme } from "./logarithme.js";

export const CATALOGUE = {
  logarithme,
  radioactivite: [],
  "expression-genetique": [],
};
