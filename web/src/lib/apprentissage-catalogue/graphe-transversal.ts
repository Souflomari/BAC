/**
 * Le graphe des prérequis transversaux des neuf leçons au format v3 : PROPOSITION À RELIRE.
 *
 * Deux parties :
 *   1. le REGISTRE des conceptions erronées (identifiant stable, phrase calme, capacités, leçon où
 *      elle s'enseigne, où elle apparaît dans les exercices, source) ;
 *   2. les ARÊTES « ce prérequis en amont est requis par cette erreur en aval », chacune avec sa
 *      raison, un exemple concret et sa source.
 *
 * Sources : la bible (`docs/bible/01-maths.md` A6, A7 ; `02-physique.md` §2.5, N1, E1 ;
 * `04-svt.md` T1, T2, T3), les spécifications de leçon (`docs/refonte/specs/*.md`, sections
 * « Capacités réutilisées »), et les libellés `erreur` des exercices tels qu'ils existent le
 * 2026-11-24 (`components/pilote/exercices/*.js`). Le dossier des rapports de critique
 * (`docs/revue-externe/rapports/`) ne contient encore aucun rapport : aucune arête n'en vient.
 * Aucune arête n'est mesurée : c'est l'hypothèse d'un auteur, que les données de population
 * devront confirmer ou défaire (spécification §10). Le contrôle
 * `web/scripts/apprentissage-catalogue.mjs` vérifie que chaque gabarit et chaque libellé cités
 * existent encore.
 *
 * Cinq leçons sont en cours de correction (méiose, exponentielle, noyaux, dipôle RC,
 * transmission) : on ne cite AUCUNE de leurs étapes dans le champ `etapes`, seulement leurs
 * gabarits d'exercices (le champ `source` peut nommer une étape, pour la relecture seulement).
 *
 * 2026-11-24, avec les catalogues des huit autres leçons : 45 conceptions ajoutées (marquées
 * « ajoutées avec le catalogue de la leçon »), chacune parce que plusieurs leurres ou libellés
 * d'exercices la nomment et qu'aucune conception du registre ne la disait. Relecture du même jour :
 * 3 fusions, 1 conception créée (meiose.division-i-mitose), 4 arêtes ajoutées, 5 retirées
 * (jugées fausses), 1 réorientée.
 */
import type { Arete, Conception, Matiere } from "../apprentissage";

export const MATIERES: Record<string, Matiere> = {
  logarithme: "maths",
  exponentielle: "maths",
  suites: "maths",
  radioactivite: "physique",
  noyaux: "physique",
  "dipole-rc": "physique",
  "dipole-rl": "physique",
  "transformations-non-totales": "physique",
  "expression-genetique": "svt",
  meiose: "svt",
  transmission: "svt",
};

const REGLES = ["maths-sexp 1.2.16", "maths-sm 1.3.9"];
const RESOUDRE = ["maths-sexp 1.2.17", "maths-sm 1.3.10"];
const ETUDE = ["maths-sexp 1.2.22", "maths-sm 1.3.16"];
const EXP = ["maths-sexp 1.2.20", "maths-sm 1.3.13"];
const BIBLE_LN = "docs/bible/01-maths.md A6 (conceptions erronées)";

export const CONCEPTIONS: Conception[] = [
  // ── logarithme (catalogue complet : apprentissage-catalogue/logarithme.ts) ──
  { id: "ln.produit-en-produit", lecon: "logarithme", libelle: "ln d’un produit écrit comme un produit de ln", capacites: REGLES, etapes: ["r-prod", "retour"], source: BIBLE_LN },
  { id: "ln.somme-en-somme", lecon: "logarithme", libelle: "ln d’une somme ou d’une différence découpé en somme ou différence de ln", capacites: REGLES, etapes: ["r-somme"], source: BIBLE_LN },
  { id: "ln.quotient-en-quotient", lecon: "logarithme", libelle: "ln d’un quotient écrit comme un quotient de ln", capacites: REGLES, etapes: ["r-quotient"], exercices: [["suites", "seuil-ln", "ln(a/b) = ln a / ln b"]], source: "logarithme.js ln-quotient ; suites.js seuil-ln" },
  { id: "ln.exposant-reste-puissance", lecon: "logarithme", libelle: "l’exposant laissé en puissance au lieu de descendre devant ln", capacites: REGLES, etapes: ["r-puissance", "r-puissance2"], source: "logarithme.js ln-produit-puissance" },
  { id: "ln.inverse-mal-traite", lecon: "logarithme", libelle: "ln de l’inverse pris pour l’inverse de ln, ou son signe oublié", capacites: REGLES, etapes: ["r-puissance2"], source: "logarithme.js ln-quotient, ln-simplifier" },
  { id: "ln.racine", lecon: "logarithme", libelle: "ln d’une racine carrée : la moitié, pas le double", capacites: REGLES, etapes: ["r-racine"], source: "logarithme.js ln-simplifier" },
  { id: "ln.domaine-oublie", lecon: "logarithme", libelle: "les conditions d’existence de ln oubliées ou incomplètes", capacites: RESOUDRE, etapes: ["domaine", "bac-rejet"], source: `${BIBLE_LN} : « sans écrire les conditions d’existence »` },
  { id: "ln.inegalite-stricte", lecon: "logarithme", libelle: "ln demande un nombre strictement positif : > et non ≥", capacites: RESOUDRE, etapes: ["domaine"], source: "logarithme.js ln-domaine" },
  { id: "ln.signe-sur-0-1", lecon: "logarithme", libelle: "ln est négatif entre 0 et 1", capacites: ETUDE, etapes: ["gauche", "croissance"], source: `${BIBLE_LN} : « ln x < 0 pour 0 < x < 1 : souvent oublié »` },
  { id: "ln.zero-et-un", lecon: "logarithme", libelle: "ln vaut 0 en 1, pas en 0", capacites: REGLES, etapes: ["reve"], source: "logarithme.js ln-signe ; leçon, étape v-regle" },
  { id: "ln.croissance-renversee", lecon: "logarithme", libelle: "ln et exp sont croissantes : elles gardent le sens d’une inégalité", capacites: [...RESOUDRE, ...EXP], etapes: ["croissance", "croissance-2"], exercices: [["exponentielle", "exp-inequation", "sens renversé sans raison"]], source: "logarithme.js ln-inequation, log-decimal ; exponentielle.js exp-inequation ; leçon exponentielle, étapes ek-ineq, inequation (fb « exp est croissante : elle garde l’ordre ») ; fusion de exp.croissance-renversee (relecture 2026-11-24)" },
  { id: "ln.nombre-et-logarithme", lecon: "logarithme", libelle: "un nombre confondu avec son logarithme (les valeurs et les pas)", capacites: RESOUDRE, etapes: ["table", "nom"], source: "logarithme.js ln-systeme, ln-simplifier ; leçon, étapes v-table, v-trous" },
  { id: "ln.argument-oublie", lecon: "logarithme", libelle: "raisonner sur x au lieu de ce qui est dans le ln", capacites: RESOUDRE, etapes: ["v-courbe"], source: "logarithme.js ln-signe" },
  { id: "ln.derivee", lecon: "logarithme", libelle: "la dérivée de ln u est u′/u", capacites: ETUDE, source: "logarithme.js ln-derivee, ln-etude" },
  { id: "isoler.ln-un-seul-cote", lecon: "logarithme", libelle: "ln enlevé d’un seul côté d’une égalité", capacites: RESOUDRE, etapes: ["bac-2-suite", "bac-sol"], source: "logarithme.js ln-equation" },
  { id: "isoler.coefficient-oublie", lecon: "logarithme", libelle: "le coefficient de l’inconnue oublié au moment de l’isoler", capacites: RESOUDRE, exercices: [["exponentielle", "exp-equation", "diviser par a oublié"]], source: "logarithme.js ln-systeme ; exponentielle.js exp-equation" },
  { id: "ineq.sens-diviser-negatif", lecon: "logarithme", libelle: "le sens d’une inégalité gardé en divisant par un nombre négatif", capacites: RESOUDRE, etapes: ["q2"], exercices: [["exponentielle", "exp-inequation", "sens gardé en divisant par un négatif"]], source: "logarithme.js ln-domaine ; leçon, étape q2" },
  { id: "log.puissance-de-dix", lecon: "logarithme", libelle: "log d’un nombre écrit m × 10^k : il manque log m", capacites: ["maths-sexp 1.2.18"], source: "logarithme.js log-decimal" },
  { id: "log.confondre-ln", lecon: "logarithme", libelle: "log et ln confondus", capacites: ["maths-sexp 1.2.18"], source: "logarithme.js log-decimal" },
  { id: "lim.croissances-comparees-envers", lecon: "logarithme", libelle: "les croissances comparées lues à l’envers", capacites: ["maths-sexp 1.2.19", "maths-sm 1.3.11"], exercices: [["exponentielle", "exp-limites", "croissances comparées à l’envers"]], source: `${BIBLE_LN} : « croissances comparées appliquées à l’envers »` },
  { id: "lim.forme-indeterminee-nulle", lecon: "logarithme", libelle: "une forme indéterminée prise pour 0", capacites: ["maths-sexp 1.2.19", "maths-sm 1.3.11"], exercices: [["exponentielle", "exp-limites", "forme 0/0 prise pour 0"], ["exponentielle", "exp-limite-facteur", "∞ − ∞ pris pour 0"]], source: "logarithme.js ln-limites ; exponentielle.js exp-limites" },
  { id: "graphe.asymptote", lecon: "logarithme", libelle: "asymptote verticale et horizontale confondues", capacites: ETUDE, source: "logarithme.js ln-etude" },
  { id: "etude.signe-sans-minimum", lecon: "logarithme", libelle: "le signe d’une fonction conclu sans son minimum", capacites: ETUDE, source: "logarithme.js ln-etude" },
  { id: "prim.facteur-oublie", lecon: "logarithme", libelle: "le facteur devant ln|u| oublié dans une primitive", capacites: ["maths-sexp 1.2.15", "maths-sm 1.3.8"], source: "logarithme.js ln-primitive" },
  { id: "prim.derivee-primitive", lecon: "logarithme", libelle: "dérivée et primitive confondues", capacites: ["maths-sexp 1.2.15", "maths-sm 1.3.8"], source: "logarithme.js ln-primitive" },
  { id: "graphe.pente-hauteur", lecon: "logarithme", libelle: "la pente d’une courbe confondue avec sa hauteur", capacites: ETUDE, etapes: ["pente", "derivee"], source: "logarithme.js ln-tangente ; leçon, étape pente" },
  { id: "deriv.u-prime-oublie", lecon: "logarithme", libelle: "la dérivée de l’intérieur oubliée en dérivant une composée", capacites: ["maths-sexp 1.2.6", "maths-sm 1.3.16"], exercices: [["exponentielle", "exp-derivee", "(e^u)′ = e^u"]], source: "logarithme.js ln-derivee ; exponentielle.js exp-derivee ; bible 01 A6 prérequis « dérivée d’une fonction composée »" },
  { id: "puiss.exposants-multiplies", lecon: "logarithme", libelle: "les exposants multipliés au lieu d’être additionnés", capacites: [], etapes: ["savoir", "sav-rappel"], source: "bible 01 A6 prérequis « 2³ × 2⁴ ? » ; leçon, étape savoir" },
  { id: "puiss.bases-multipliees", lecon: "logarithme", libelle: "les bases multipliées dans un produit de puissances", capacites: [], etapes: ["savoir", "sav-rappel"], source: "leçon, étape savoir" },

  // ── exponentielle (leçon en correction : exercices seulement) ──
  { id: "exp.exposant-facteur", lecon: "exponentielle", libelle: "un exposant lu comme un facteur : e^{2x} lu 2eˣ, eˣ lu e × x, (eᵃ)ⁿ lu n·eᵃ", capacites: EXP, exercices: [["exponentielle", "exp-trinome", "e^{2x} = 2eˣ"], ["exponentielle", "exp-ln-retour", "e^{k ln a} = ka"]], source: "docs/refonte/specs/fonction-exponentielle.md (vérifie e2x, l. 262 ; tableau l. 401)" },
  { id: "exp.produit-exposants", lecon: "exponentielle", libelle: "eᵃ × eᵇ écrit e^{ab} au lieu de e^{a+b}", capacites: EXP, exercices: [["exponentielle", "exp-regles", "eᵃeᵇ = e^{ab}"]], source: "exponentielle.js exp-regles" },
  { id: "exp.somme-en-somme", lecon: "exponentielle", libelle: "exp d’une somme découpée en somme d’exp", capacites: EXP, exercices: [["exponentielle", "exp-regles", "e^{a+b} = eᵃ + eᵇ"], ["exponentielle", "exp-systeme", "eˣ + eʸ = e^{x+y}"]], source: "docs/bible/01-maths.md A7 : « e^{a+b} = eᵃ + eᵇ »" },
  { id: "exp.t-negatif", lecon: "exponentielle", libelle: "une valeur négative gardée pour eˣ, qui est toujours positive", capacites: EXP, exercices: [["exponentielle", "exp-trinome", "garder t < 0"], ["exponentielle", "exp-equation", "x = ln(−k) quand k ≤ 0"]], source: "docs/refonte/specs/fonction-exponentielle.md (exp-trinome, l. 462) ; bible A7 « eˣ > 0 oublié » ; libellés tels que les tirages les produisent (la liste `erreurs` du gabarit en écrit une forme plus longue)" },

  // ajoutées avec le catalogue de la leçon (2026-11-24) : chacune nommée par au moins deux leurres ou libellés
  { id: "exp.conditions-ajoutees", lecon: "exponentielle", libelle: "des conditions d’existence ajoutées pour exp, qui existe sur ℝ (le réflexe de ln transféré)", capacites: EXP, exercices: [["exponentielle", "exp-inequation", "conditions d’existence ajoutées"]], source: "exponentielle.js exp-inequation ; leçon, étape inequation (fb « Tu as transféré le réflexe de ln »)" },
  { id: "exp.retour-t-x", lecon: "exponentielle", libelle: "après le changement t = eˣ, la réponse laissée en t sans revenir à x", capacites: EXP, exercices: [["exponentielle", "exp-trinome", "oublier de revenir de t à x"], ["exponentielle", "exp-trinome-ineq", "S donné en t au lieu de x"]], source: "exponentielle.js exp-trinome, exp-trinome-ineq ; leçon, étapes bac-sol, bac-ineq, bac-2-ineq" },
  { id: "exp.reciproque-confondue", lecon: "exponentielle", libelle: "pour défaire exp, on applique ln, pas exp", capacites: EXP, exercices: [["exponentielle", "exp-equation", "x = eᵏ"], ["exponentielle", "exp-trinome", "exp au lieu de ln"]], source: "exponentielle.js exp-equation, exp-trinome ; leçon, étapes ek, bac-sol" },
  { id: "exp.exposant-negatif", lecon: "exponentielle", libelle: "un exposant négatif ne rend pas eˣ négatif : e^{−a} = 1/eᵃ > 0", capacites: EXP, exercices: [["exponentielle", "exp-regles", "e^{−a} = −eᵃ"], ["exponentielle", "exp-ln-retour", "e^{−ln a} = −a"], ["exponentielle", "exp-limites", "lim_{−∞} eˣ = −∞"]], source: "exponentielle.js exp-regles, exp-ln-retour, exp-limites ; leçon, étapes notation, domaine-exp" },
  { id: "exp.derivee-regle-puissance", lecon: "exponentielle", libelle: "eˣ dérivée comme une puissance de x, alors que la variable est dans l’exposant", capacites: ["maths-sexp 1.2.6", "maths-sm 1.3.16"], exercices: [["exponentielle", "exp-derivee", "(eˣ)′ = x e^{x−1}"], ["exponentielle", "exp-base-a", "(aˣ)′ = x a^{x−1}"]], source: "exponentielle.js exp-derivee, exp-base-a ; leçon, étapes derivee, eu, q3" },
  { id: "exp.positivite-etendue", lecon: "exponentielle", libelle: "eˣ > 0 étendu à une expression qui contient eˣ, comme eˣ − 1 ou (x − 2)eˣ", capacites: ["maths-sexp 1.2.22", "maths-sm 1.3.16"], exercices: [["exponentielle", "exp-signe", "« toujours positif car eˣ > 0 »"], ["exponentielle", "exp-signe", "eˣ − 1 > 0 partout"]], source: "exponentielle.js exp-signe ; leçon, étapes v-equations, preuve-tangente, q2" },
  { id: "deriv.terme-a-terme", lecon: "exponentielle", libelle: "la dérivée d’un produit ou d’un quotient prise facteur par facteur", capacites: ["maths-sexp 1.2.6", "maths-sm 1.3.16"], exercices: [["exponentielle", "exp-derivee", "produit dérivé comme un produit des dérivées"], ["exponentielle", "exp-derivee", "quotient dérivé terme à terme"]], source: "exponentielle.js exp-derivee ; leçon, étape v-derivee" },

  // ── suites ──
  { id: "suites.sens-ln-q", lecon: "suites", libelle: "le sens gardé en divisant par ln q, négatif quand 0 < q < 1", capacites: ["maths-sexp 1.1.5", "maths-sm 1.1.5"], exercices: [["suites", "seuil-ln", "le sens gardé en divisant par ln q < 0"]], source: "docs/refonte/specs/suites-numeriques.md l. 43-45 (inéquations logarithmiques réutilisées)" },

  // ajoutées avec le catalogue de la leçon (2026-11-24) : chacune nommée par au moins deux leurres ou libellés
  { id: "suites.arith-geo-confondues", lecon: "suites", libelle: "arithmétique et géométrique confondues : on ajoute r, on multiplie par q", capacites: ["maths-sexp 1.1.1", "maths-sm 1.1.1"], etapes: ["sav-rappel"], exercices: [["suites", "suites-base", "arithmétique et géométrique confondues"], ["suites", "majoration-geometrique", "arithmétique et géométrique confondues"]], source: "suites.js suites-base, majoration-geometrique ; leçon, étape savoir" },
  { id: "suites.heredite-sans-hypothese", lecon: "suites", libelle: "une hérédité écrite sans partir de l’hypothèse de récurrence", capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"], etapes: ["heredite-debut", "heredite"], exercices: [["suites", "recurrence-affine", "hérédité sans hypothèse"], ["suites", "recurrence-f-croissante", "f(x) < b pour tout x"]], source: "suites.js recurrence-affine, recurrence-f-croissante, fin-de-probleme ; leçon, étapes heredite, bac-heredite, q2" },
  { id: "suites.initialisation-oubliee", lecon: "suites", libelle: "une récurrence sans initialisation : l’hérédité seule ne prouve rien", capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"], etapes: ["dominos", "init-oubliee"], exercices: [["suites", "recurrence-affine", "initialisation oubliée"]], source: "suites.js recurrence-affine ; leçon, étapes init-oubliee, v-recurrence" },
  { id: "suites.croissante-renverse-ordre", lecon: "suites", libelle: "une fonction croissante garde l’ordre : a ≤ b donne f(a) ≤ f(b)", capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"], etapes: ["heredite"], exercices: [["suites", "recurrence-f-croissante", "ordre renversé (f traitée comme décroissante)"]], source: "suites.js recurrence-f-croissante, fin-de-probleme ; leçon, étapes heredite, bac-heredite, bac-2, q2" },
  { id: "suites.sens-f-sens-suite", lecon: "suites", libelle: "le sens de variation de f pris pour celui de la suite", capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"], etapes: ["difference", "depart-mono"], exercices: [["suites", "monotonie", "f croissante donc suite croissante"], ["suites", "fin-de-probleme", "f croissante donc suite croissante"]], source: "suites.js monotonie, fin-de-probleme ; leçon, étapes difference, depart-mono, rappel, bac-mono, bac-2-mono" },
  { id: "suites.majorant-limite", lecon: "suites", libelle: "un majorant (ou une borne) pris pour la limite", capacites: ["maths-sexp 1.1.2", "maths-sm 1.1.2"], etapes: ["majorant-3"], exercices: [["suites", "critere-convergence", "un majorant pris pour la limite"], ["suites", "point-fixe", "un majorant pris pour la limite"]], source: "suites.js critere-convergence, point-fixe, fin-de-probleme ; leçon, étapes majorant-3, bac-lim, q1" },
  { id: "suites.critere-incomplet", lecon: "suites", libelle: "le critère de convergence appliqué avec une seule de ses deux hypothèses : monotone et bornée", capacites: ["maths-sexp 1.1.2", "maths-sm 1.1.2"], etapes: ["theoreme", "bornee-oscille"], exercices: [["suites", "critere-convergence", "une seule hypothèse suffit"], ["suites", "critere-convergence", "croissante donc +∞"]], source: "suites.js critere-convergence, fin-de-probleme ; leçon, étapes majorant-3, bornee-oscille, limite-dose, bac-2-lim, q1, q3" },
  { id: "suites.point-fixe-convergence", lecon: "suites", libelle: "résoudre ℓ = f(ℓ) pris pour une preuve de convergence", capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4", "maths-sexp 1.1.2", "maths-sm 1.1.2"], etapes: ["piege-2u"], exercices: [["suites", "point-fixe", "un point fixe prouve la convergence"], ["suites", "suite-auxiliaire-affine", "un point fixe prouve la convergence"]], source: "suites.js point-fixe, suite-auxiliaire-affine ; leçon, étapes limite-dose, piege-2u, q3" },
  { id: "suites.depart-limite", lecon: "suites", libelle: "le premier terme pris pour la limite : la limite vérifie ℓ = f(ℓ)", capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"], etapes: ["depart"], exercices: [["suites", "point-fixe", "la limite dépend du terme initial"], ["suites", "limite-composee", "g(u_0) au lieu de g(ℓ)"]], source: "suites.js point-fixe, limite-composee, suite-auxiliaire-affine ; leçon, étapes piege-2u, bac-lim, bac-2-lim" },

  // ── radioactivité ──
  { id: "rad.signe-log", lecon: "radioactivite", libelle: "le signe du logarithme perdu en isolant le temps", capacites: ["pc-pc 1.2.1.13", "pc-sm 1.2.1.13", "pc-svt 1.2.1.13"], exercices: [["radioactivite", "instant-seuil", "signe du logarithme"], ["radioactivite", "datation-c14", "signe du logarithme"]], source: "docs/bible/02-physique.md N1, prérequis « Résoudre e^(−0,1t) = 0,5 » (l. 494)" },
  { id: "rad.puissance-demivies", lecon: "radioactivite", libelle: "après n demi-vies, il reste N₀/2ⁿ, pas N₀/n", capacites: ["pc-pc 1.2.1.12", "pc-sm 1.2.1.12", "pc-svt 1.2.1.12"], exercices: [["radioactivite", "fraction-demivies", "N₀/n au lieu de N₀/2ⁿ"], ["radioactivite", "desintegres-entre-dates", "N₀/n au lieu de N₀/2ⁿ"]], source: "docs/bible/02-physique.md N1 : « Après n demi-vies, il reste N₀/n »" },
  { id: "phys.tau-demivie", lecon: "radioactivite", libelle: "la constante de temps τ confondue avec la demi-vie", capacites: ["pc-pc 1.2.1.13", "pc-sm 1.2.1.13", "pc-svt 1.2.1.13"], exercices: [["radioactivite", "lire-demivie-tau", "τ confondu avec t½"], ["radioactivite", "lambda-unites", "τ confondu avec t½"], ["radioactivite", "bac-complet", "τ confondu avec t½"]], source: "docs/bible/02-physique.md §1 piège 6 : « Confondre τ (63 %) et t₁/₂ (50 %) »" },
  { id: "noy.composition", lecon: "radioactivite", libelle: "le nombre de neutrons est A − Z, pas A", capacites: ["pc-pc 1.2.1.1", "pc-sm 1.2.1.1", "pc-svt 1.2.1.1"], exercices: [["radioactivite", "noyau-composition", "nombre de neutrons = A"], ["radioactivite", "noyau-composition", "Z et A inversés"]], source: "radioactivite.js noyau-composition ; bible 02 N1 prérequis « Combien de neutrons dans ¹⁴₆C ? »" },

  // ajoutées avec le catalogue de la leçon (2026-11-24)
  { id: "rad.restants-desintegres", lecon: "radioactivite", libelle: "les noyaux qui restent confondus avec ceux qui se sont désintégrés", capacites: ["pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10"], etapes: ["demivie"], exercices: [["radioactivite", "fraction-demivies", "restants pris pour désintégrés"], ["radioactivite", "instant-seuil", "restants pris pour désintégrés"]], source: "radioactivite.js fraction-demivies, instant-seuil, desintegres-entre-dates, bac-complet ; leçon, étapes v-demivie, v-tau, bac-litteral, q1" },
  { id: "rad.part-du-depart", lecon: "radioactivite", libelle: "à chaque instant il part une part de ce qui reste, pas une part du départ", capacites: ["pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10"], etapes: ["compte", "deltaN"], source: "leçon, étapes v-des (fb « C’est le piège ») et deltaN" },
  { id: "rad.conditions-exterieures", lecon: "radioactivite", libelle: "la désintégration est spontanée : ni la température ni la chimie ne changent son rythme", capacites: ["pc-pc 1.2.1.5", "pc-sm 1.2.1.5", "pc-svt 1.2.1.5"], etapes: ["spontanee"], exercices: [["radioactivite", "noyau-composition", "radioactivité provoquée ou prévisible"]], source: "radioactivite.js noyau-composition ; leçon, étape spontanee" },

  // ── noyaux (leçon en correction : exercices seulement) ──
  { id: "noy.composition-defaut", lecon: "noyaux", libelle: "dans le défaut de masse, N = A − Z neutrons", capacites: ["pc-pc 1.2.2.1", "pc-sm 1.2.2.1"], exercices: [["noyaux", "nme-defaut-masse", "N = A (A neutrons)"], ["noyaux", "nme-defaut-masse", "Z et N inversés"]], source: "docs/refonte/specs/noyaux-masse-energie.md l. 45-46 (composition réutilisée de la leçon voisine)" },

  // ajoutées avec le catalogue de la leçon (2026-11-24)
  { id: "noy.stabilite-el-totale", lecon: "noyaux", libelle: "la stabilité se compare par nucléon (Eℓ/A), pas par l’énergie de liaison totale", capacites: [...["pc-pc 1.2.2.2", "pc-sm 1.2.2.2", "pc-svt 1.2.2.2"], ...["pc-pc 1.2.2.4", "pc-sm 1.2.2.4", "pc-svt 1.2.2.4"]], exercices: [["noyaux", "nme-stabilite", "comparer E_ℓ au lieu de E_ℓ/A"], ["noyaux", "nme-vrai-faux", "comparer E_ℓ au lieu de E_ℓ/A"]], source: "noyaux.js nme-stabilite, nme-vrai-faux ; leçon, étapes par-nucleon, rn-po, rappel" },
  { id: "noy.el-par-nucleon-additionnees", lecon: "noyaux", libelle: "dans un bilan, ce sont les Eℓ qui s’additionnent, pas les Eℓ/A", capacites: ["pc-pc 1.2.2.10", "pc-sm 1.2.2.10", "pc-svt 1.2.2.6"], exercices: [["noyaux", "nme-bilan-liaisons", "E_ℓ/A additionnées"]], source: "noyaux.js nme-bilan-liaisons ; leçon, étapes deux-routes, fission-bilan, bac-2b, bac-erreur" },
  { id: "noy.signe-delta-e", lecon: "noyaux", libelle: "le sens du bilan inversé : ΔE est négatif quand de l’énergie est libérée", capacites: ["pc-pc 1.2.2.10", "pc-sm 1.2.2.10", "pc-svt 1.2.2.6"], exercices: [["noyaux", "nme-bilan-masses", "produits − réactifs inversé (signe de ΔE)"], ["noyaux", "nme-bilan-liaisons", "sens inversé (ΔE de signe faux)"]], source: "noyaux.js nme-bilan-masses, nme-bilan-liaisons ; leçon, étapes signe, deux-routes, retour-de, bac-2022-lit, q3" },
  { id: "noy.masse-conservee", lecon: "noyaux", libelle: "un noyau pèse moins que ses nucléons séparés : la masse ne se conserve pas", capacites: ["pc-pc 1.2.2.1", "pc-sm 1.2.2.1", "pc-svt 1.2.2.1"], exercices: [["noyaux", "nme-vrai-faux", "la masse se conserve"]], source: "noyaux.js nme-vrai-faux ; leçon, étape q1" },
  { id: "noy.el-reserve", lecon: "noyaux", libelle: "l’énergie de liaison vue comme une réserve que le noyau libère, alors qu’elle est sortie à sa formation", capacites: ["pc-pc 1.2.2.1", "pc-sm 1.2.2.1", "pc-svt 1.2.2.1"], exercices: [["noyaux", "nme-vrai-faux", "E_ℓ vue comme une réserve que le noyau libère"]], source: "noyaux.js nme-vrai-faux ; leçon, étape formation" },

  // ── dipôle RC (leçon en correction : exercices seulement) ──
  { id: "rc.coefficient-exposant", lecon: "dipole-rc", libelle: "le coefficient de t dans l’exposant vaut 1/RC, pas RC", capacites: ["pc-pc 1.3.1.7", "pc-sm 1.3.1.7"], exercices: [["dipole-rc", "rc-solution", "α = RC"], ["dipole-rc", "rc-equation", "RC multiplié au lieu de divisé"]], source: "docs/refonte/specs/dipole-rc.md l. 68-71 ; bible 02 E1 prérequis « Dériver E(1 − e^(−t/τ)) »" },
  { id: "rc.pente-lue", lecon: "dipole-rc", libelle: "la pente d’une droite confondue avec son ordonnée à l’origine", capacites: ["pc-pc 1.3.1.9", "pc-sm 1.3.1.9"], exercices: [["dipole-rc", "rc-droite-dudt", "pente prise pour RC"], ["dipole-rc", "rc-droite-dudt", "ordonnée prise pour 1/(RC)"]], source: "docs/bible/02-physique.md §1 point 6-7 (exploiter un graphe : pente, ordonnée à l’origine)" },
  { id: "rc.tau-moitie", lecon: "dipole-rc", libelle: "τ lu à la moitié de la tension au lieu de 63 %", capacites: ["pc-pc 1.3.1.9", "pc-sm 1.3.1.9"], exercices: [["dipole-rc", "rc-lecture-tau", "lecture à la moitié"], ["dipole-rc", "rc-bac", "τ lu à 37 % ou à la moitié"]], source: "docs/refonte/specs/dipole-rc.md l. 457 (« lu à 6 V : c’est τ·ln 2 ») ; bible 02 §1 piège 6" },

  // ajoutées avec le catalogue de la leçon (2026-11-24)
  { id: "rc.i-comme-uc", lecon: "dipole-rc", libelle: "le courant traité comme uC : à t = 0, i = E/R, puis il décroît", capacites: ["pc-pc 1.3.1.10", "pc-sm 1.3.1.10", "pc-svt 1.3.1.10"], exercices: [["dipole-rc", "rc-expressions", "i part de zéro"]], source: "dipole-rc.js rc-expressions ; leçon, étapes i0, i-t, rappel, i-decharge" },
  { id: "rc.condensateur-conduit", lecon: "dipole-rc", libelle: "un condensateur chargé ne laisse pas passer le courant : en régime permanent, i = 0", capacites: ["pc-pc 1.3.1.10", "pc-sm 1.3.1.10", "pc-svt 1.3.1.10"], exercices: [["dipole-rc", "rc-regimes", "régime permanent avec i ≠ 0"]], source: "dipole-rc.js rc-regimes ; leçon, étape permanent" },
  { id: "rc.repere-63-37", lecon: "dipole-rc", libelle: "63 % se lit sur une courbe qui monte, 37 % sur une courbe qui descend", capacites: ["pc-pc 1.3.1.9", "pc-sm 1.3.1.9", "pc-svt 1.3.1.9"], exercices: [["dipole-rc", "rc-lecture-tau", "63 % lu sur une descente"], ["dipole-rc", "rc-lecture-tau", "37 % lu sur une montée"], ["dipole-rc", "rc-regimes", "63 % et 37 % échangés"]], source: "dipole-rc.js rc-lecture-tau, rc-regimes ; leçon, étapes val-tau, lecture-63, v-37, bac-C, q1" },
  { id: "rc.tau-fin-charge", lecon: "dipole-rc", libelle: "à t = τ la charge n’est faite qu’à 63 % : elle est pratiquement finie vers 5τ", capacites: ["pc-pc 1.3.1.11", "pc-sm 1.3.1.11", "pc-svt 1.3.1.11"], exercices: [["dipole-rc", "rc-regimes", "τ = fin de la charge"]], source: "dipole-rc.js rc-regimes ; leçon, étapes val-tau, cinq-tau" },
  { id: "rc.e-change-tau", lecon: "dipole-rc", libelle: "la tension E prise pour ce qui règle la durée de la charge : τ = RC ne contient pas E", capacites: ["pc-pc 1.3.1.16", "pc-sm 1.3.1.16", "pc-svt 1.3.1.17"], exercices: [["dipole-rc", "rc-influence", "E change τ"]], source: "dipole-rc.js rc-influence ; leçon, étapes influence-E, retour-lampe" },

  // ── dipôle RL (leçon stable : étapes et exercices) ──
  { id: "rl.r-oubliee", lecon: "dipole-rl", libelle: "la résistance r de la bobine oubliée : dans τ, dans le palier, dans u_L ou dans l’équation", capacites: ["pc-pc 1.3.2.2", "pc-sm 1.3.2.2", "pc-svt 1.3.2.2", "pc-pc 1.3.2.9", "pc-sm 1.3.2.9", "pc-svt 1.3.2.9"], etapes: ["bobine-reelle", "permanent", "verif", "q1", "q3"], exercices: [["dipole-rl", "rl-unites", "r oubliée dans τ"], ["dipole-rl", "rl-tension-bobine", "r·i oublié"], ["dipole-rl", "rl-equation", "r oubliée dans l’équation"], ["dipole-rl", "rl-solution", "r oubliée"], ["dipole-rl", "rl-expressions", "u_L(∞) = 0 (r oubliée)"]], source: "docs/refonte/specs/dipole-rl.md §5 (B-4) ; bible 02 E2 « Conceptions erronées et pièges »" },
  { id: "rl.courant-saute", lecon: "dipole-rl", libelle: "le courant d’une bobine saute, comme la tension d’un condensateur ne le fait pas : c’est i qui est continu, pas u_L", capacites: ["pc-pc 1.3.2.8", "pc-sm 1.3.2.8", "pc-svt 1.3.2.8"], etapes: ["allure", "rappel", "rupture-pari"], exercices: [["dipole-rl", "rl-rupture", "i tombe à 0 aussitôt"], ["dipole-rl", "rl-expressions", "u_L(0) = 0 comme i"]], source: "docs/refonte/specs/dipole-rl.md §5 (B-1, +2, +7)" },
  { id: "rl.ul-continue", lecon: "dipole-rl", libelle: "la tension de la bobine prise pour une grandeur continue : u_L saute, et change de signe à la rupture", capacites: ["pc-pc 1.3.2.8", "pc-sm 1.3.2.8", "pc-svt 1.3.2.8"], etapes: ["u0", "uL-rupture"], exercices: [["dipole-rl", "rl-tension-bobine", "u continue"], ["dipole-rl", "rl-rupture", "u_L continue"]], source: "docs/refonte/specs/dipole-rl.md §5 (+2)" },
  { id: "rl.li-ldidt", lecon: "dipole-rl", libelle: "L multiplie i au lieu de multiplier di/dt : la bobine répond à la variation du courant", capacites: ["pc-pc 1.3.2.2", "pc-sm 1.3.2.2", "pc-svt 1.3.2.2"], etapes: ["pente-tension", "bobine-reelle"], exercices: [["dipole-rl", "rl-tension-bobine", "L·i au lieu de L·di/dt"], ["dipole-rl", "rl-triangle", "u triangle comme i"]], source: "docs/refonte/specs/dipole-rl.md §5 (+1)" },
  { id: "rl.r-seul-tau", lecon: "dipole-rl", libelle: "R pris pour une grandeur qui ne règle que τ, comme en RC : ici R change aussi le palier", capacites: ["pc-pc 1.3.2.14", "pc-sm 1.3.2.14", "pc-svt 1.3.2.15"], etapes: ["double-R"], exercices: [["dipole-rl", "rl-influence", "R ne change que τ (comme en RC)"]], source: "docs/refonte/specs/dipole-rl.md §5 (+3)" },
  { id: "rl.e-change-tau", lecon: "dipole-rl", libelle: "la tension E prise pour ce qui règle la durée de la montée : τ = L/(R + r) ne contient pas E", capacites: ["pc-pc 1.3.2.14", "pc-sm 1.3.2.14", "pc-svt 1.3.2.15"], etapes: ["influence-E"], exercices: [["dipole-rl", "rl-influence", "E change τ"]], source: "docs/refonte/specs/dipole-rl.md §5 (+4)" },
  { id: "rl.l-change-palier", lecon: "dipole-rl", libelle: "l’inductance L prise pour ce qui règle la hauteur du palier : L ne règle que la durée", capacites: ["pc-pc 1.3.2.14", "pc-sm 1.3.2.14", "pc-svt 1.3.2.15"], etapes: ["double-L"], exercices: [["dipole-rl", "rl-influence", "L change le palier"]], source: "docs/refonte/specs/dipole-rl.md §5 (B-3)" },
  { id: "rl.surtension", lecon: "dipole-rl", libelle: "la bobine supposée incapable de donner plus de tension que le générateur : à la rupture, |u_L| dépasse E si la maille résiste", capacites: ["pc-pc 1.3.2.8", "pc-sm 1.3.2.8", "pc-svt 1.3.2.8"], etapes: ["surtension"], exercices: [["dipole-rl", "rl-rupture", "|u_L| ≤ E"]], source: "docs/refonte/specs/dipole-rl.md §5 (+8)" },

  // ── transformations non totales (leçon stable : étapes et exercices) ──
  { id: "tnt.ph-concentration", lecon: "transformations-non-totales", libelle: "le pH pris pour une concentration, ou une différence de pH lue comme un rapport : [H₃O⁺] = 10^(−pH)", capacites: ["pc-pc 2.2.1.3", "pc-sm 2.2.1.3", "pc-svt 2.2.3.3"], etapes: ["ecart", "sav-ph", "si-totale", "xf"], exercices: [["transformations-non-totales", "tnt-ph", "pH pris pour une concentration (+2)"], ["transformations-non-totales", "tnt-ph", "différence de pH lue comme un rapport (+2)"], ["transformations-non-totales", "tnt-xf", "pH pris pour une concentration (+2)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+2)" },
  { id: "tnt.base-ho", lecon: "transformations-non-totales", libelle: "une base prise pour une espèce qui contient HO⁻ (le réflexe d’avant Brønsted) : une base capte un proton", capacites: ["pc-pc 2.2.1.1", "pc-sm 2.2.1.1", "pc-svt 2.2.3.1"], etapes: ["acide", "couple", "q2"], exercices: [["transformations-non-totales", "tnt-bronsted", "base = HO⁻ (+3)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+3)" },
  { id: "tnt.demi-equation", lecon: "transformations-non-totales", libelle: "la demi-équation du couple prise pour l’équation de la réaction : un proton H⁺ ne reste pas seul", capacites: ["pc-pc 2.2.1.2", "pc-sm 2.2.1.2", "pc-svt 2.2.3.2"], etapes: ["bac-eq", "eau-base"], exercices: [["transformations-non-totales", "tnt-equation", "demi-équation (+4)"], ["transformations-non-totales", "tnt-bac", "demi-équation (+4)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+4)" },
  { id: "tnt.equation-dosage", lecon: "transformations-non-totales", libelle: "la réaction de l’acide avec l’eau confondue avec celle du dosage par les ions HO⁻", capacites: ["pc-pc 2.2.1.2", "pc-sm 2.2.1.2", "pc-svt 2.2.3.2"], etapes: ["bac-eq", "eau-base"], exercices: [["transformations-non-totales", "tnt-equation", "équation de dosage (+9)"], ["transformations-non-totales", "tnt-bac", "équation de dosage (+9)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+9)" },
  { id: "tnt.couples-croises", lecon: "transformations-non-totales", libelle: "des couples formés avec les deux réactifs, ou avec deux acides : un couple a un acide et sa base", capacites: ["pc-pc 2.2.1.2", "pc-sm 2.2.1.2", "pc-svt 2.2.3.2"], etapes: ["couples-eq"], exercices: [["transformations-non-totales", "tnt-equation", "couples croisés (+8)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+8)" },
  { id: "tnt.eau-solvant", lecon: "transformations-non-totales", libelle: "l’eau prise pour un simple solvant, ou pour une espèce au rôle fixe : elle capte ou cède un proton selon le partenaire", capacites: ["pc-pc 2.2.1.2", "pc-sm 2.2.1.2", "pc-svt 2.2.3.2"], etapes: ["ampholyte", "dilution-pourquoi", "transfert"], exercices: [["transformations-non-totales", "tnt-bronsted", "eau à rôle fixe (+5)"], ["transformations-non-totales", "tnt-bronsted", "eau solvant seulement"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+5)" },
  { id: "tnt.eau-limitante", lecon: "transformations-non-totales", libelle: "l’eau cherchée parmi les réactifs limitants : elle est le solvant, en excès", capacites: ["pc-pc 2.2.1.4", "pc-sm 2.2.1.4", "pc-svt 2.2.3.4"], etapes: ["tableau"], exercices: [["transformations-non-totales", "tnt-tableau", "eau limitante (+6)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+6)" },
  { id: "tnt.quantite-concentration", lecon: "transformations-non-totales", libelle: "une concentration prise pour une quantité de matière : le volume oublié, laissé en mL, ou divisé", capacites: ["pc-pc 2.2.1.4", "pc-sm 2.2.1.4", "pc-svt 2.2.3.4"], etapes: ["sav-test", "tableau", "xf"], exercices: [["transformations-non-totales", "tnt-tableau", "V en mL (+7)"], ["transformations-non-totales", "tnt-tableau", "C divisée par V (+7)"], ["transformations-non-totales", "tnt-xf", "concentration prise pour quantité (+7)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+7) ; bible C3 §2.3" },
  { id: "tnt.x-colonne-acide", lecon: "transformations-non-totales", libelle: "ce qui s’est formé (x_f) pris pour ce qui reste de l’acide, dans le tableau ou dans α", capacites: ["pc-pc 2.2.1.4", "pc-sm 2.2.1.4", "pc-svt 2.2.3.4"], etapes: ["bac-2a"], exercices: [["transformations-non-totales", "tnt-tableau", "x_f dans la colonne de l’acide (+10)"], ["transformations-non-totales", "tnt-bac", "x_f dans la colonne de l’acide (+10)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+10)" },
  { id: "tnt.tau-c-oubliee", lecon: "transformations-non-totales", libelle: "τ calculé avec C oubliée ou avec le rapport inversé : τ = 10^(−pH)/C, et τ ≤ 1", capacites: ["pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"], etapes: ["bac-2b", "rappel", "tau-def", "tau-formule"], exercices: [["transformations-non-totales", "tnt-tau", "C oubliée (B-7)"], ["transformations-non-totales", "tnt-tau", "rapport inversé"], ["transformations-non-totales", "tnt-bac", "C oubliée (B-7)"], ["transformations-non-totales", "tnt-bac", "rapport inversé"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (B-7) ; bible C3" },
  { id: "tnt.il-manque-v", lecon: "transformations-non-totales", libelle: "refuser de conclure : « il manque le volume V », alors qu’il se simplifie dans τ", capacites: ["pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"], etapes: ["q1", "tau-formule"], exercices: [["transformations-non-totales", "tnt-tau", "« il manque V » (I-conclusion)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (I-conclusion)" },
  { id: "tnt.tau-pourcentage", lecon: "transformations-non-totales", libelle: "τ en fraction et en pourcentage mélangés : 0,0132 et 1,32 % sont la même valeur", capacites: ["pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"], etapes: ["q3"], exercices: [["transformations-non-totales", "tnt-tau", "% mal placé (B-9)"], ["transformations-non-totales", "tnt-bac", "% mal placé (B-9)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (B-9) ; bible C3" },
  { id: "tnt.limitee-rien", lecon: "transformations-non-totales", libelle: "« limitée » prise pour « il ne se passe presque rien », ou une grande part réagie prise pour une transformation totale", capacites: ["pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"], etapes: ["bac-conclure", "limitee", "q1"], exercices: [["transformations-non-totales", "tnt-limitee", "limitée = rien (B-4)"], ["transformations-non-totales", "tnt-bac", "limitée = rien (B-4)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (B-4)" },
  { id: "tnt.vitesse-avancement", lecon: "transformations-non-totales", libelle: "la vitesse d’une réaction prise pour ce qui fixe son avancement final : τ ne dit rien de la durée", capacites: ["pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"], etapes: ["bac-conclure", "comparer", "vitesse-avancement"], exercices: [["transformations-non-totales", "tnt-xf", "pas encore fini (I-vitesse)"], ["transformations-non-totales", "tnt-limitee", "rapide donc totale (I-vitesse)"], ["transformations-non-totales", "tnt-bac", "rapide donc totale (I-vitesse)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (I-vitesse)" },
  { id: "tnt.attendre", lecon: "transformations-non-totales", libelle: "il suffit d’attendre : toute réaction finit par consommer ses réactifs, l’écart n’étant qu’une imprécision de mesure", capacites: ["pc-pc 2.2.1.4", "pc-sm 2.2.1.4", "pc-svt 2.2.3.4", "pc-pc 2.2.1.6", "pc-sm 2.2.1.6"], etapes: ["catalyseur", "comparer"], exercices: [["transformations-non-totales", "tnt-xf", "x_f = x_max à la mesure près (B-1)"], ["transformations-non-totales", "tnt-equilibre", "attendre (B-1)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (B-1)" },
  { id: "tnt.catalyseur", lecon: "transformations-non-totales", libelle: "un catalyseur, en assez grande quantité, pousse la transformation jusqu’au bout : il accélère les deux sens autant", capacites: ["pc-pc 2.2.1.6", "pc-sm 2.2.1.6"], etapes: ["catalyseur"], exercices: [["transformations-non-totales", "tnt-equilibre", "catalyseur (B-2)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (B-2)" },
  { id: "tnt.equilibre-fige", lecon: "transformations-non-totales", libelle: "à l’équilibre, plus rien ne réagit : les molécules sont figées, ou les vitesses sont nulles", capacites: ["pc-pc 2.2.1.6", "pc-sm 2.2.1.6"], etapes: ["equilibre", "hcl-zoom"], exercices: [["transformations-non-totales", "tnt-equilibre", "équilibre figé (B-3)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (B-3)" },
  { id: "tnt.sens-fixe", lecon: "transformations-non-totales", libelle: "le sens d’une réaction pris pour une propriété fixe, ou imposé par l’espèce ajoutée en dernier", capacites: ["pc-pc 2.2.1.6", "pc-sm 2.2.1.6"], etapes: ["double-fleche", "inverse", "sens"], exercices: [["transformations-non-totales", "tnt-equilibre", "sens fixe (B-5)"], ["transformations-non-totales", "tnt-equilibre", "espèce ajoutée (B-6)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (B-5, B-6)" },
  { id: "tnt.double-fleche-lente", lecon: "transformations-non-totales", libelle: "la double flèche ⇄ lue comme « réaction lente »", capacites: ["pc-pc 2.2.1.6", "pc-sm 2.2.1.6", "pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"], etapes: ["double-fleche", "vitesse-avancement"], exercices: [["transformations-non-totales", "tnt-equilibre", "⇄ = lente (I-lente)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (I-lente)" },
  { id: "tnt.double-fleche-loin", lecon: "transformations-non-totales", libelle: "⇄ lue comme « τ reste loin de 1 » : τ ne se lit pas sur la flèche, il se calcule", capacites: ["pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"], etapes: ["quasi-totale"], exercices: [["transformations-non-totales", "tnt-limitee", "⇄ donc τ loin de 1 (I-quasi)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (I-quasi)" },
  { id: "tnt.conditions-sans-effet", lecon: "transformations-non-totales", libelle: "l’état final fixé par l’équation seule, quelles que soient les conditions : la dilution change τ", capacites: ["pc-svt 2.2.3.6"], etapes: ["dilution-calc"], exercices: [["transformations-non-totales", "tnt-dilution", "τ inchangé (I-conditions)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (I-conditions)" },
  { id: "tnt.dilution-diminue", lecon: "transformations-non-totales", libelle: "diluer fait baisser τ parce qu’il y a moins d’acide par litre", capacites: ["pc-svt 2.2.3.6"], exercices: [["transformations-non-totales", "tnt-dilution", "τ diminue (+11)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+11)" },
  { id: "tnt.acide-plus-fort", lecon: "transformations-non-totales", libelle: "la dilution change la nature de l’acide : c’est l’état de départ qui change", capacites: ["pc-svt 2.2.3.6"], etapes: ["dilution-pourquoi"], exercices: [["transformations-non-totales", "tnt-dilution", "la nature de l’acide change (+12)"]], source: "docs/refonte/specs/transformations-non-totales.md §5 (+12)" },
  { id: "tnt.meme-ph", lecon: "transformations-non-totales", libelle: "même concentration, même pH : la force d’un acide et sa concentration confondues", capacites: ["pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5", "pc-pc 2.2.1.6", "pc-sm 2.2.1.6"], etapes: ["hcl-zoom", "retour-ph"], exercices: [], source: "docs/refonte/specs/transformations-non-totales.md §5 (+1) ; bible C5" },

  // ── méiose (leçon en correction : exercices seulement) ──
  { id: "meiose.haploide-une-chromatide", lecon: "meiose", libelle: "la ploïdie lue sur les chromatides : haploïde veut dire un chromosome de chaque paire, pas une seule chromatide", capacites: ["svt-svt 3.1.1", "svt-pc 2.3.1"], exercices: [["meiose", "meiose-comptes", "haploïde = une chromatide"], ["meiose", "meiose-document", "haploïde = q"]], source: "docs/bible/04-svt.md T1 : « Une cellule haploïde a des chromosomes à une seule chromatide »" },
  { id: "meiose.soeurs-homologues", lecon: "meiose", libelle: "chromatides sœurs et chromosomes homologues confondus", capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3"], exercices: [["meiose", "crossing-over", "échange entre chromatides sœurs"]], source: "docs/bible/04-svt.md T1 : « Homologues = chromatides sœurs : la confusion qui fausse tout le reste »" },
  { id: "meiose.additionner-choix", lecon: "meiose", libelle: "2 choix par paire, n paires : 2ⁿ (ni 2n, ni n²)", capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3"], exercices: [["meiose", "gametes-2n", "le nombre de types s’additionne (2 × n)"], ["meiose", "fecondation-combinaisons", "le nombre de combinaisons s’additionne (2 × 2ⁿ)"], ["meiose", "gametes-2n", "n² au lieu de 2ⁿ"], ["meiose", "meiose-document", "n² au lieu de 2ⁿ"]], source: "docs/bible/04-svt.md T1 prérequis « Puissances de 2, dénombrement » ; meiose.js gametes-2n, meiose-document ; fusion de meiose.puissance-inversee (relecture 2026-11-24)" },

  // ajoutées avec le catalogue de la leçon (2026-11-24)
  { id: "meiose.division-i-mitose", lecon: "meiose", libelle: "la division I traitée comme une mitose : ce sont les homologues qui se séparent", capacites: ["svt-svt 3.1.1", "svt-pc 2.3.1"], exercices: [["meiose", "anaphase-alleles", "chromatides séparées en anaphase I"], ["meiose", "meiose-phase", "la méiose, c’est deux mitoses"], ["meiose", "meiose-document", "la méiose, c’est deux mitoses"]], source: "meiose.js anaphase-alleles, meiose-phase, meiose-document ; leçon, étapes anaphase1, telophase1 (fb « Tu as appliqué ce que fait la mitose », « Tu as pensé mitose ») ; relecture 2026-11-24" },
  { id: "meiose.brassage-mutation", lecon: "meiose", libelle: "le brassage combine des allèles qui existent déjà ; seule une mutation en crée un nouveau", capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3"], exercices: [["meiose", "brassage-identifier", "« mutation » pour une combinaison nouvelle"]], source: "meiose.js brassage-identifier ; leçon, étapes v-inter, bac-copie" },
  { id: "meiose.adn-chromosomes", lecon: "meiose", libelle: "quantité d’ADN et nombre de chromosomes confondus", capacites: ["svt-svt 3.1.1", "svt-pc 2.3.1"], exercices: [["meiose", "meiose-comptes", "la quantité d’ADN suit le nombre de chromosomes"], ["meiose", "meiose-courbe", "la réduction placée à la division II"]], source: "meiose.js meiose-comptes, meiose-courbe ; leçon, étapes interphase, ou-reduction, courbe, retour-moitie ; fusion de meiose.reduction-division-ii (relecture 2026-11-24)" },

  // ── transmission (leçon en correction : exercices seulement) ──
  { id: "trans.alleles-par-cellule", lecon: "transmission", libelle: "deux allèles d’un gène par individu, un seul par gamète", capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1"], exercices: [["transmission", "gametes-genotype", "gamète à deux allèles d’un gène"], ["transmission", "f1-dominance", "un seul allèle par individu"]], source: "docs/bible/04-svt.md T2 prérequis « Méiose : un allèle par gamète » (T1)" },
  { id: "trans.recombines-moitie", lecon: "transmission", libelle: "les d % de recombinés se partagent entre deux types : d/2 chacun", capacites: ["svt-svt 3.2.2", "svt-pc 2.4.2"], exercices: [["transmission", "gametes-genotype", "d au lieu de d/2 par gamète recombiné"]], source: "docs/bible/04-svt.md T1 (crossing-over entre chromatides non sœurs, « combien des 4 gamètes sont recombinés ? (2) ») et T3" },
  { id: "trans.addition-pour-et", lecon: "transmission", libelle: "les probabilités additionnées pour « et » au lieu d’être multipliées", capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1"], exercices: [["transmission", "f2-monohybride", "addition pour « et »"], ["transmission", "f2-deux-genes", "addition pour « et »"]], source: "docs/bible/04-svt.md T2 : « On additionne les probabilités pour “et” »" },
  // ajoutées avec le catalogue de la leçon (2026-11-24)
  { id: "trans.phenotype-genotype", lecon: "transmission", libelle: "un même phénotype pris pour un même génotype : un individu dominant peut cacher un allèle récessif", capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1"], exercices: [["transmission", "f1-dominance", "même phénotype, même génotype"], ["transmission", "interpretation-complete", "génotype des parents copié sur leur phénotype"]], source: "transmission.js f1-dominance, test-cross-un-gene, interpretation-complete ; leçon, étapes dominance, lisses-purs, bac-q2" },
  { id: "trans.rapport-exact-exige", lecon: "transmission", libelle: "un compte réel exigé exactement égal à l’attendu, alors qu’il s’en écarte un peu", capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1", "svt-svt 3.2.2", "svt-pc 2.4.2"], exercices: [["transmission", "test-cross-un-gene", "rapport exact exigé"], ["transmission", "interpretation-complete", "rapport exact exigé"]], source: "transmission.js test-cross-un-gene, interpretation-complete ; leçon, étapes v-testcross, retour-556, demarche" },
  { id: "trans.quatre-classes-independants", lecon: "transmission", libelle: "quatre classes lues comme « gènes indépendants », sans regarder si elles sont égales", capacites: ["svt-svt 3.2.2", "svt-pc 2.4.2"], exercices: [["transmission", "interpretation-complete", "« quatre classes, donc indépendants »"]], source: "transmission.js interpretation-complete ; leçon, étapes quatre-classes, q1" },
  { id: "trans.rapport-f2-generalise", lecon: "transmission", libelle: "le rapport de la F2 (¾ et ¼, ou 9:3:3:1) appliqué à un croisement qui n’est pas une F2", capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1", "svt-svt 3.2.2", "svt-pc 2.4.2"], exercices: [["transmission", "test-cross-un-gene", "¾ / ¼ attendus au test-cross"], ["transmission", "f2-deux-genes", "9:3:3:1 appliqué à tout croisement"]], source: "transmission.js test-cross-un-gene, f2-deux-genes ; leçon, étapes deux-hypotheses, rappel, absolu-f2" },

  // ── expression génétique ──
  // ajoutées avec le catalogue de la leçon (2026-11-24)
  { id: "gen.brin-transcrit", lecon: "expression-genetique", libelle: "brin transcrit et brin non transcrit confondus : on complémente le premier, on recopie le second avec U pour T", capacites: ["svt-svt 2.2.1", "svt-pc 2.2.1"], etapes: ["pari-brin", "reflexe-brin"], exercices: [["expression-genetique", "brin-non-transcrit", "complémenter le brin non transcrit"], ["expression-genetique", "brin-transcrit", "recopier le brin transcrit en changeant T en U"]], source: "expression-genetique.js brin-non-transcrit, brin-transcrit, complementer-ou-non, bac-2026 ; leçon, étapes pari-brin (« le piège le plus courant »), v-transcription, rappel, q1" },
  { id: "gen.t-dans-arn", lecon: "expression-genetique", libelle: "un T écrit dans l’ARN, qui porte U à sa place", capacites: ["svt-svt 2.2.1", "svt-pc 2.2.1"], etapes: ["pari-u"], exercices: [["expression-genetique", "adn-arn", "mettre T dans l’ARN"], ["expression-genetique", "brin-transcrit", "garder T dans l’ARNm"]], source: "expression-genetique.js adn-arn, brin-transcrit, brin-non-transcrit, anticodon ; leçon, étapes pari-u, v-transcription, rappel, q1" },
  { id: "gen.codon-stop", lecon: "expression-genetique", libelle: "un codon stop ne désigne aucun acide aminé : la lecture s’arrête là", capacites: ["svt-svt 2.2.2", "svt-pc 2.2.2"], etapes: ["stop"], exercices: [["expression-genetique", "arnm-chaine", "compter le codon stop comme un acide aminé"], ["expression-genetique", "arnm-chaine", "lire après le codon stop"]], source: "expression-genetique.js arnm-chaine, decalage, bac-2026 ; leçon, étapes v-code, stop, q2" },
  { id: "gen.codon-initiation", lecon: "expression-genetique", libelle: "la lecture commence au codon AUG, pas au premier nucléotide", capacites: ["svt-svt 2.2.2", "svt-pc 2.2.2"], etapes: ["v-code"], exercices: [["expression-genetique", "arnm-chaine", "lire avant le codon d’initiation"]], source: "expression-genetique.js arnm-chaine ; leçon, étapes v-code, q2" },
  { id: "gen.anticodon-codon", lecon: "expression-genetique", libelle: "l’anticodon lu dans le tableau du code, qui se lit en codons d’ARNm", capacites: ["svt-svt 2.2.3", "svt-pc 2.2.3"], etapes: ["v-traduction"], exercices: [["expression-genetique", "anticodon", "lire l’anticodon dans le tableau"]], source: "expression-genetique.js anticodon ; leçon, étape v-traduction" },
  { id: "gen.decalage-cadre", lecon: "expression-genetique", libelle: "une insertion ou une délétion décale tout le cadre de lecture, pas un seul codon", capacites: ["svt-svt 2.1.9", "svt-pc 2.1.9"], etapes: ["decalage", "v-insertion"], exercices: [["expression-genetique", "decalage", "ne décaler qu’un codon"], ["expression-genetique", "type-mutation", "ne pas voir le décalage du cadre de lecture"]], source: "expression-genetique.js decalage, type-mutation, bac-2026 ; leçon, étape v-insertion" },
  { id: "gen.allele-code", lecon: "expression-genetique", libelle: "une mutation crée un autre allèle du même gène : ni un autre gène, ni un autre code", capacites: ["svt-svt 2.1.9", "svt-pc 2.1.9"], exercices: [["expression-genetique", "bac-2026", "confondre allèle et code"]], source: "expression-genetique.js bac-2026 ; leçon, étape q3" },
];

const P = "proposition à relire" as const;

export const ARETES: Arete[] = [
  {
    amont: { conception: "ineq.sens-diviser-negatif" }, aval: "suites.sens-ln-q", statut: P,
    raison: "Le seuil qⁿ < a se résout en n ln q < ln a ; pour 0 < q < 1, ln q < 0 et diviser renverse le sens.",
    exemple: "0,8ⁿ < 0,1 ⇔ n > ln 0,1 / ln 0,8 ≈ 10,3, donc n ≥ 11 ; garder « < » donne n ≤ 10.",
    source: "docs/refonte/specs/suites-numeriques.md l. 43-45 (inéquations logarithmiques sexp 1.2.17, partie 8)",
  },
  {
    amont: { conception: "ineq.sens-diviser-negatif" }, aval: "rad.signe-log", statut: P,
    raison: "Isoler t dans N₀e^{−λt} = N demande de diviser ln(N/N₀) par −λ : le signe moins est celui qu’on perd.",
    exemple: "N/N₀ = 0,25 : −λt = ln 0,25, donc t = ln 4 / λ ; un temps négatif trahit le signe perdu.",
    source: "docs/bible/02-physique.md N1 prérequis « Résoudre e^(−0,1t) = 0,5 » (l. 494) ; bible 01 A6 liens (PC : demi-vie)",
  },
  {
    amont: { conception: "ln.signe-sur-0-1" }, aval: "rad.signe-log", statut: P,
    raison: "N/N₀ est entre 0 et 1, donc ln(N/N₀) est négatif ; l’oublier fait sortir un âge négatif ou faux.",
    exemple: "ln 0,25 ≈ −1,39 : t = −ln 0,25 / λ est bien positif.",
    source: "docs/bible/01-maths.md A6 : « ln x < 0 pour 0 < x < 1 : souvent oublié » ; 02 N1 prérequis",
  },
  {
    amont: { conception: "ln.signe-sur-0-1" }, aval: "suites.sens-ln-q", statut: P,
    raison: "Savoir que ln q < 0 pour 0 < q < 1 est ce qui oblige à renverser l’inégalité.",
    exemple: "ln 0,8 ≈ −0,22 : on divise par un négatif.",
    source: "docs/bible/01-maths.md A6 ; spec suites l. 43-45",
  },
  {
    amont: { capacite: "maths-sexp 1.2.17" }, aval: "suites.sens-ln-q", statut: P,
    raison: "Le seuil d’une suite géométrique est une inéquation logarithmique (capacité réutilisée, non retestée seule).",
    exemple: "qⁿ < a ⇔ n ln q < ln a.",
    source: "docs/refonte/specs/suites-numeriques.md l. 43-44",
  },
  {
    amont: { capacite: "maths-sexp 1.2.17" }, aval: "rad.signe-log", statut: P,
    raison: "La datation et l’instant seuil sont des équations avec ln, enseignées en maths, souvent après le nucléaire.",
    exemple: "e^{−λt} = 0,5 ⇔ t = ln 2 / λ.",
    source: "docs/bible/02-physique.md §2.5 tableau (exponentielle et ln, l. 137) et N1 (l. 494)",
  },
  {
    amont: { capacite: "maths-sm 1.3.10" }, aval: "suites.sens-ln-q", statut: P,
    raison: "Même lien en SM : le seuil est une inéquation logarithmique.", exemple: "qⁿ < a ⇔ n ln q < ln a.",
    source: "docs/refonte/specs/suites-numeriques.md l. 43-44 (sm 1.3.10)",
  },
  {
    amont: { capacite: "maths-sm 1.3.10" }, aval: "rad.signe-log", statut: P,
    raison: "Même lien en SM : isoler t dans une exponentielle.", exemple: "e^{−λt} = 0,5 ⇔ t = ln 2 / λ.",
    source: "docs/bible/02-physique.md N1 (l. 494)",
  },
  {
    amont: { conception: "graphe.pente-hauteur" }, aval: "rc.pente-lue", statut: P,
    raison: "Linéariser du_C/dt en fonction de u_C ou lire τ par la tangente demande de lire une pente (Δy/Δx), pas une ordonnée.",
    exemple: "La tangente à l’origine a pour pente E/τ et coupe u = E en t = τ ; ln 10 ≈ 2,30 est la hauteur de ln en 10, pas sa pente 0,1.",
    source: "docs/bible/02-physique.md §1 points 6-7 (tangente, pente, ordonnée à l’origine) ; spec dipole-rc l. 451-452",
  },
  {
    amont: { conception: "phys.tau-demivie" }, aval: "rc.tau-moitie", statut: P,
    raison: "τ (63 % atteints, 37 % restants) et la demi-vie (50 %) sont la même confusion dans les deux leçons ; la radioactivité vient d’abord.",
    exemple: "Lire τ à la moitié de E donne τ·ln 2 ≈ 0,69 τ.",
    source: "docs/refonte/specs/dipole-rc.md l. 70-71 (τ = 1/λ, étapes tau de la radioactivité) et l. 457 ; bible 02 §1 piège 6",
  },
  {
    amont: { conception: "meiose.additionner-choix" }, aval: "trans.addition-pour-et", statut: P,
    raison: "Compter les gamètes (2ⁿ) et calculer « A et B » (½ × ½) sont le même geste : des choix indépendants se multiplient.",
    exemple: "Deux gènes indépendants : P(a et b) = ½ × ½ = ¼, pas ½ + ½.",
    source: "docs/bible/04-svt.md T1 prérequis (dénombrement) et T2 prérequis « ½ × ½ = ? et ½ + ½ = ? »",
  },
  {
    amont: { conception: "puiss.exposants-multiplies" }, aval: "exp.produit-exposants", statut: P,
    raison: "eᵃ × eᵇ = e^{a+b} est la règle des puissances du collège appliquée à e.",
    exemple: "2⁴ × 2³ = 2⁷, et de même e² × e³ = e⁵, pas e⁶.",
    source: "docs/bible/01-maths.md A6 prérequis « 2³ × 2⁴ ? » et A7 conceptions",
  },
  {
    amont: { conception: "ln.somme-en-somme" }, aval: "exp.somme-en-somme", statut: P,
    raison: "Les deux erreurs distribuent une fonction sur une somme : ln(a + b) n’est pas ln a + ln b, et e^{a+b} n’est pas eᵃ + eᵇ.",
    exemple: "ln(1 + 1) = ln 2 ≠ 0 = ln 1 + ln 1 ; e^{0+0} = 1 ≠ 2 = e⁰ + e⁰.",
    source: "docs/bible/01-maths.md A6 et A7 (conceptions « ln(a + b) = ln a + ln b » et « e^{a+b} = eᵃ + eᵇ ») ; leçon exponentielle, étape somme-produit (indice « Teste a = b = 0 ») ; réorientée à la relecture 2026-11-24 (l’amont était ln.produit-en-produit)",
  },
  {
    amont: { conception: "ln.domaine-oublie" }, aval: "exp.t-negatif", statut: P,
    raison: "Après le changement t = eˣ, revenir à x demande ln t, qui n’existe que pour t > 0.",
    exemple: "t² − 4t + 3 = 0 donne t = 1 ou t = 3, puis x = 0 ou x = ln 3 ; une racine t < 0 se rejette.",
    source: "docs/refonte/specs/fonction-exponentielle.md l. 415-436 ; bible 01 A6 (conditions d’existence)",
  },
  {
    amont: { conception: "noy.composition" }, aval: "noy.composition-defaut", statut: P,
    raison: "Le défaut de masse se calcule avec Z protons et A − Z neutrons, notation vue dans la leçon de radioactivité.",
    exemple: "⁵⁶₂₆Fe : 26 protons, 30 neutrons ; prendre 56 neutrons fausse Δm.",
    source: "docs/refonte/specs/noyaux-masse-energie.md l. 45-46",
  },
  // ajoutées à la relecture du 2026-11-24
  {
    amont: { conception: "rad.restants-desintegres" }, aval: "rc.repere-63-37", statut: P,
    raison: "63 % atteints et 37 % restants sont les deux faces d’une même décroissance ; confondre ce qui reste et ce qui est parti fait lire le mauvais repère.",
    exemple: "À t = τ : 37 % des noyaux restent, 63 % sont partis ; de même u_C a atteint 63 % de E à la charge, et il reste 37 % à la décharge.",
    source: "leçon radioactivite, étape v-tau (« 37 %, c’est ce qui reste ») ; leçon dipole-rc, étapes val-tau, reste, v-37",
  },
  {
    amont: { conception: "graphe.pente-hauteur" }, aval: "rc.i-comme-uc", statut: P,
    raison: "i = C du_C/dt est la pente de u_C, pas sa hauteur : u_C part de 0 avec sa plus grande pente, donc i part de E/R.",
    exemple: "À t = 0, u_C = 0 mais du_C/dt = E/τ : i = C·E/τ = E/R.",
    source: "leçon logarithme, étape pente ; leçon dipole-rc, étapes i0, tangente, i-t ; dipole-rc.js rc-expressions",
  },
  {
    amont: { conception: "suites.arith-geo-confondues" }, aval: "rad.part-du-depart", statut: P,
    raison: "La décroissance radioactive est géométrique : à chaque pas on multiplie ce qui reste par le même facteur ; retirer une quantité fixe, c’est la traiter comme arithmétique.",
    exemple: "100 dés, un sixième part à chaque tic : 100, 83, 69, … (× 5/6), et non 100, 83, 66, … (− 17).",
    source: "leçon radioactivite, étapes v-des, deltaN ; radioactivite.js instant-seuil, datation-c14 (« décroissance prise pour linéaire ») ; leçon suites, étape savoir",
  },
  {
    amont: { conception: "gen.allele-code" }, aval: "meiose.brassage-mutation", statut: P,
    raison: "Savoir qu’une mutation crée un nouvel allèle (et rien d’autre) est ce qui permet de dire que le brassage, lui, n’en crée aucun : il combine ceux qui existent.",
    exemple: "GAG → GTG crée l’allèle βS ; la méiose d’un parent βA//βS ne donne que des gamètes βA ou βS.",
    source: "leçon expression-genetique, étape q3 ; meiose.js brassage-identifier ; leçon meiose, étapes v-inter, bac-copie",
  },
];

export const GRAPHE = { conceptions: CONCEPTIONS, aretes: ARETES, matieres: MATIERES };
