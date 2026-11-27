export const entete = (lecon, n, enCorrection) => `/**
 * Catalogue d'apprentissage de la leçon \`${lecon}\` (format v3${enCorrection ? ", leçon en cours de correction" : ""})
 * et de ses ${n} gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de \`components/pilote/${lecon}-moteur.js\` (les étapes à options, leur
 * \`indice\` et leur \`fb\`) et de \`components/pilote/exercices/${lecon}.js\` (les libellés \`erreur\`,
 * énumérés sur 400 graines par gabarit le 2026-11-24). Aucun de ces fichiers n'est modifié.
 * Le contrôle \`web/scripts/apprentissage-catalogue.mjs\` vérifie que chaque \`cle\`, chaque option
 * (nombre, ordre, début du texte, option juste), chaque gabarit et chaque libellé d'erreur existe
 * encore : si la leçon change${enCorrection ? " (elle est en correction)" : ""}, ce catalogue échoue au lieu de dériver
 * en silence.
 *
 * Étiquettes : mêmes règles que \`logarithme.ts\`. Une option fausse reçoit un identifiant de
 * conception (registre dans \`graphe-transversal.ts\`) seulement quand son texte et son \`fb\` montrent
 * sans ambiguïté cette erreur de raisonnement ; « inattention » pour un compte, une lecture ou un
 * signe isolé ; « aucune » sinon (on préfère ne rien dire que d'attribuer une idée fausse au
 * hasard), et pour l'option juste. Les paris sans bonne réponse (\`juste: null\`) ne sont jamais notés.
 * Capacités : celles des gabarits de la leçon qui exercent le même geste ; les paris de découverte
 * (posés avant que la leçon enseigne la règle) n'en portent aucune.
 */`;
