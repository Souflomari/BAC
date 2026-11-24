/** Les titres des leçons pilotes tels que l'élève les lit (ceux de la barre de chaque leçon). */
export const TITRES_LECONS: Record<string, string> = {
  logarithme: "Fonction logarithme népérien",
  exponentielle: "Fonction exponentielle",
  suites: "Les suites numériques",
  radioactivite: "Décroissance radioactive",
  noyaux: "Noyaux, masse et énergie",
  "dipole-rc": "Le dipôle RC",
  "expression-genetique": "Du gène à la protéine",
  meiose: "La méiose, la fécondation et les brassages",
  transmission: "Les lois de la transmission des caractères",
};

export const titreLecon = (nom: string): string => TITRES_LECONS[nom] ?? nom;
