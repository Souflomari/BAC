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
 * transmission) : on ne cite AUCUNE de leurs étapes, seulement leurs gabarits d'exercices.
 */
import type { Arete, Conception, Matiere } from "../apprentissage";

export const MATIERES: Record<string, Matiere> = {
  logarithme: "maths",
  exponentielle: "maths",
  suites: "maths",
  radioactivite: "physique",
  noyaux: "physique",
  "dipole-rc": "physique",
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
  { id: "ln.somme-en-somme", lecon: "logarithme", libelle: "ln d’une somme découpé comme une somme de ln", capacites: REGLES, etapes: ["r-somme"], source: BIBLE_LN },
  { id: "ln.quotient-en-quotient", lecon: "logarithme", libelle: "ln d’un quotient écrit comme un quotient de ln", capacites: REGLES, etapes: ["r-quotient"], exercices: [["suites", "seuil-ln", "ln(a/b) = ln a / ln b"]], source: "logarithme.js ln-quotient ; suites.js seuil-ln" },
  { id: "ln.exposant-reste-puissance", lecon: "logarithme", libelle: "l’exposant laissé en puissance au lieu de descendre devant ln", capacites: REGLES, etapes: ["r-puissance", "r-puissance2"], source: "logarithme.js ln-produit-puissance" },
  { id: "ln.inverse-mal-traite", lecon: "logarithme", libelle: "ln de l’inverse pris pour l’inverse de ln, ou son signe oublié", capacites: REGLES, etapes: ["r-puissance2"], source: "logarithme.js ln-quotient, ln-simplifier" },
  { id: "ln.racine", lecon: "logarithme", libelle: "ln d’une racine carrée : la moitié, pas le double", capacites: REGLES, etapes: ["r-racine"], source: "logarithme.js ln-simplifier" },
  { id: "ln.domaine-oublie", lecon: "logarithme", libelle: "les conditions d’existence de ln oubliées ou incomplètes", capacites: RESOUDRE, etapes: ["domaine", "bac-rejet"], source: `${BIBLE_LN} : « sans écrire les conditions d’existence »` },
  { id: "ln.inegalite-stricte", lecon: "logarithme", libelle: "ln demande un nombre strictement positif : > et non ≥", capacites: RESOUDRE, etapes: ["domaine"], source: "logarithme.js ln-domaine" },
  { id: "ln.signe-sur-0-1", lecon: "logarithme", libelle: "ln est négatif entre 0 et 1", capacites: ETUDE, etapes: ["gauche", "croissance"], source: `${BIBLE_LN} : « ln x < 0 pour 0 < x < 1 : souvent oublié »` },
  { id: "ln.zero-et-un", lecon: "logarithme", libelle: "ln vaut 0 en 1, pas en 0", capacites: REGLES, etapes: ["reve"], source: "logarithme.js ln-signe ; leçon, étape v-regle" },
  { id: "ln.croissance-renversee", lecon: "logarithme", libelle: "ln est croissante : elle garde le sens d’une inégalité", capacites: RESOUDRE, etapes: ["croissance", "croissance-2"], source: "logarithme.js ln-inequation, log-decimal" },
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
  { id: "graphe.pente-hauteur", lecon: "logarithme", libelle: "la pente d’une courbe confondue avec sa hauteur", capacites: ETUDE, etapes: ["pente", "derivee"], exercices: [["exponentielle", "exp-tangente", "pente a au lieu de eᵃ"], ["exponentielle", "exp-tangente", "ordonnée eᵃ oubliée"]], source: "logarithme.js ln-tangente ; leçon, étape pente ; exponentielle.js exp-tangente" },
  { id: "deriv.u-prime-oublie", lecon: "logarithme", libelle: "la dérivée de l’intérieur oubliée en dérivant une composée", capacites: ["maths-sexp 1.2.6", "maths-sm 1.3.16"], exercices: [["exponentielle", "exp-derivee", "(e^u)′ = e^u"]], source: "logarithme.js ln-derivee ; exponentielle.js exp-derivee ; bible 01 A6 prérequis « dérivée d’une fonction composée »" },
  { id: "puiss.exposants-multiplies", lecon: "logarithme", libelle: "les exposants multipliés au lieu d’être additionnés", capacites: [], etapes: ["savoir", "sav-rappel"], source: "bible 01 A6 prérequis « 2³ × 2⁴ ? » ; leçon, étape savoir" },
  { id: "puiss.bases-multipliees", lecon: "logarithme", libelle: "les bases multipliées dans un produit de puissances", capacites: [], etapes: ["savoir", "sav-rappel"], source: "leçon, étape savoir" },

  // ── exponentielle (leçon en correction : exercices seulement) ──
  { id: "exp.exposant-facteur", lecon: "exponentielle", libelle: "un facteur dans l’exposant lu comme un facteur devant : e^{2x} lu 2eˣ", capacites: EXP, exercices: [["exponentielle", "exp-trinome", "e^{2x} = 2eˣ"], ["exponentielle", "exp-ln-retour", "e^{k ln a} = ka"]], source: "docs/refonte/specs/fonction-exponentielle.md (vérifie e2x, l. 262 ; tableau l. 401)" },
  { id: "exp.produit-exposants", lecon: "exponentielle", libelle: "eᵃ × eᵇ écrit e^{ab} au lieu de e^{a+b}", capacites: EXP, exercices: [["exponentielle", "exp-regles", "eᵃeᵇ = e^{ab}"]], source: "exponentielle.js exp-regles" },
  { id: "exp.somme-en-somme", lecon: "exponentielle", libelle: "exp d’une somme découpée en somme d’exp", capacites: EXP, exercices: [["exponentielle", "exp-regles", "e^{a+b} = eᵃ + eᵇ"], ["exponentielle", "exp-systeme", "eˣ + eʸ = e^{x+y}"]], source: "docs/bible/01-maths.md A7 : « e^{a+b} = eᵃ + eᵇ »" },
  { id: "exp.t-negatif", lecon: "exponentielle", libelle: "une valeur négative gardée pour eˣ, qui est toujours positive", capacites: EXP, exercices: [["exponentielle", "exp-trinome", "garder t < 0"], ["exponentielle", "exp-equation", "x = ln(−k) quand k ≤ 0"]], source: "docs/refonte/specs/fonction-exponentielle.md (exp-trinome, l. 462) ; bible A7 « eˣ > 0 oublié » ; libellés tels que les tirages les produisent (la liste `erreurs` du gabarit en écrit une forme plus longue)" },

  // ── suites ──
  { id: "suites.sens-ln-q", lecon: "suites", libelle: "le sens gardé en divisant par ln q, négatif quand 0 < q < 1", capacites: ["maths-sexp 1.1.5", "maths-sm 1.1.5"], exercices: [["suites", "seuil-ln", "le sens gardé en divisant par ln q < 0"]], source: "docs/refonte/specs/suites-numeriques.md l. 43-45 (inéquations logarithmiques réutilisées)" },

  // ── radioactivité ──
  { id: "rad.signe-log", lecon: "radioactivite", libelle: "le signe du logarithme perdu en isolant le temps", capacites: ["pc-pc 1.2.1.13", "pc-sm 1.2.1.13", "pc-svt 1.2.1.13"], exercices: [["radioactivite", "instant-seuil", "signe du logarithme"], ["radioactivite", "datation-c14", "signe du logarithme"]], source: "docs/bible/02-physique.md N1, prérequis « Résoudre e^(−0,1t) = 0,5 » (l. 494)" },
  { id: "rad.puissance-demivies", lecon: "radioactivite", libelle: "après n demi-vies, il reste N₀/2ⁿ, pas N₀/n", capacites: ["pc-pc 1.2.1.12", "pc-sm 1.2.1.12", "pc-svt 1.2.1.12"], exercices: [["radioactivite", "fraction-demivies", "N₀/n au lieu de N₀/2ⁿ"], ["radioactivite", "desintegres-entre-dates", "N₀/n au lieu de N₀/2ⁿ"]], source: "docs/bible/02-physique.md N1 : « Après n demi-vies, il reste N₀/n »" },
  { id: "phys.tau-demivie", lecon: "radioactivite", libelle: "la constante de temps τ confondue avec la demi-vie", capacites: ["pc-pc 1.2.1.13", "pc-sm 1.2.1.13", "pc-svt 1.2.1.13"], exercices: [["radioactivite", "lire-demivie-tau", "τ confondu avec t½"], ["radioactivite", "lambda-unites", "τ confondu avec t½"], ["radioactivite", "bac-complet", "τ confondu avec t½"]], source: "docs/bible/02-physique.md §1 piège 6 : « Confondre τ (63 %) et t₁/₂ (50 %) »" },
  { id: "noy.composition", lecon: "radioactivite", libelle: "le nombre de neutrons est A − Z, pas A", capacites: ["pc-pc 1.2.1.1", "pc-sm 1.2.1.1", "pc-svt 1.2.1.1"], exercices: [["radioactivite", "noyau-composition", "nombre de neutrons = A"], ["radioactivite", "noyau-composition", "Z et A inversés"]], source: "radioactivite.js noyau-composition ; bible 02 N1 prérequis « Combien de neutrons dans ¹⁴₆C ? »" },

  // ── noyaux (leçon en correction : exercices seulement) ──
  { id: "noy.composition-defaut", lecon: "noyaux", libelle: "dans le défaut de masse, N = A − Z neutrons", capacites: ["pc-pc 1.2.2.1", "pc-sm 1.2.2.1"], exercices: [["noyaux", "nme-defaut-masse", "N = A (A neutrons)"], ["noyaux", "nme-defaut-masse", "Z et N inversés"]], source: "docs/refonte/specs/noyaux-masse-energie.md l. 45-46 (composition réutilisée de la leçon voisine)" },

  // ── dipôle RC (leçon en correction : exercices seulement) ──
  { id: "rc.coefficient-exposant", lecon: "dipole-rc", libelle: "le coefficient de t dans l’exposant vaut 1/RC, pas RC", capacites: ["pc-pc 1.3.1.7", "pc-sm 1.3.1.7"], exercices: [["dipole-rc", "rc-solution", "α = RC"], ["dipole-rc", "rc-equation", "RC multiplié au lieu de divisé"]], source: "docs/refonte/specs/dipole-rc.md l. 68-71 ; bible 02 E1 prérequis « Dériver E(1 − e^(−t/τ)) »" },
  { id: "rc.pente-lue", lecon: "dipole-rc", libelle: "la pente d’une droite confondue avec son ordonnée à l’origine", capacites: ["pc-pc 1.3.1.9", "pc-sm 1.3.1.9"], exercices: [["dipole-rc", "rc-droite-dudt", "pente prise pour RC"], ["dipole-rc", "rc-droite-dudt", "ordonnée prise pour 1/(RC)"]], source: "docs/bible/02-physique.md §1 point 6-7 (exploiter un graphe : pente, ordonnée à l’origine)" },
  { id: "rc.tau-moitie", lecon: "dipole-rc", libelle: "τ lu à la moitié de la tension au lieu de 63 %", capacites: ["pc-pc 1.3.1.9", "pc-sm 1.3.1.9"], exercices: [["dipole-rc", "rc-lecture-tau", "lecture à la moitié"], ["dipole-rc", "rc-bac", "τ lu à 37 % ou à la moitié"]], source: "docs/refonte/specs/dipole-rc.md l. 457 (« lu à 6 V : c’est τ·ln 2 ») ; bible 02 §1 piège 6" },

  // ── méiose (leçon en correction : exercices seulement) ──
  { id: "meiose.haploide-une-chromatide", lecon: "meiose", libelle: "haploïde lu comme « une seule chromatide » au lieu de « un chromosome de chaque paire »", capacites: ["svt-svt 3.1.1", "svt-pc 2.3.1"], exercices: [["meiose", "meiose-comptes", "haploïde = une chromatide"], ["meiose", "meiose-document", "haploïde = q"]], source: "docs/bible/04-svt.md T1 : « Une cellule haploïde a des chromosomes à une seule chromatide »" },
  { id: "meiose.soeurs-homologues", lecon: "meiose", libelle: "chromatides sœurs et chromosomes homologues confondus", capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3"], exercices: [["meiose", "crossing-over", "échange entre chromatides sœurs"], ["meiose", "crossing-over", "4 recombinés sur 4"], ["meiose", "anaphase-alleles", "chromatides séparées en anaphase I"]], source: "docs/bible/04-svt.md T1 : « Homologues = chromatides sœurs : la confusion qui fausse tout le reste »" },
  { id: "meiose.additionner-choix", lecon: "meiose", libelle: "des choix indépendants additionnés au lieu d’être multipliés", capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3"], exercices: [["meiose", "gametes-2n", "le nombre de types s’additionne (2 × n)"], ["meiose", "fecondation-combinaisons", "le nombre de combinaisons s’additionne (2 × 2ⁿ)"]], source: "docs/bible/04-svt.md T1 prérequis « Puissances de 2, dénombrement »" },

  // ── transmission (leçon en correction : exercices seulement) ──
  { id: "trans.alleles-par-cellule", lecon: "transmission", libelle: "deux allèles d’un gène par individu, un seul par gamète", capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1"], exercices: [["transmission", "gametes-genotype", "gamète à deux allèles d’un gène"], ["transmission", "f1-dominance", "un seul allèle par individu"]], source: "docs/bible/04-svt.md T2 prérequis « Méiose : un allèle par gamète » (T1)" },
  { id: "trans.recombines-moitie", lecon: "transmission", libelle: "un crossing-over donne deux gamètes recombinés sur quatre : d/2 par type", capacites: ["svt-svt 3.2.2", "svt-pc 2.4.2"], exercices: [["transmission", "gametes-genotype", "d au lieu de d/2 par gamète recombiné"]], source: "docs/bible/04-svt.md T1 (crossing-over entre chromatides non sœurs, « combien des 4 gamètes sont recombinés ? (2) ») et T3" },
  { id: "trans.addition-pour-et", lecon: "transmission", libelle: "les probabilités additionnées pour « et » au lieu d’être multipliées", capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1"], exercices: [["transmission", "f2-monohybride", "addition pour « et »"], ["transmission", "f2-deux-genes", "addition pour « et »"]], source: "docs/bible/04-svt.md T2 : « On additionne les probabilités pour “et” »" },
];

const P = "proposition à relire" as const;

export const ARETES: Arete[] = [
  {
    amont: { conception: "exp.exposant-facteur" }, aval: "rc.coefficient-exposant", statut: P,
    raison: "Dans u_C = E(1 − e^{−t/RC}), le coefficient de t est dans l’exposant ; le confondre avec un facteur devant fait écrire α = RC, ou multiplier par RC dans l’équation.",
    exemple: "Dériver E e^{−t/τ} donne −(E/τ) e^{−t/τ} : le 1/τ de l’exposant descend devant, comme le 2 de e^{2x} n’est pas un 2 devant eˣ.",
    source: "docs/refonte/specs/dipole-rc.md l. 68-71 (dérivée de e^u réutilisée, étape eu de l’exponentielle) ; bible 02 E1 prérequis",
  },
  {
    amont: { conception: "exp.exposant-facteur" }, aval: "rad.puissance-demivies", statut: P,
    raison: "N = N₀e^{−λt} ; à t = n·t½, l’exposant n multiplie λt½ : N = N₀(e^{−λt½})ⁿ = N₀/2ⁿ. Lire l’exposant n comme un facteur donne N₀/n.",
    exemple: "Après 3 demi-vies il reste N₀/8, pas N₀/3.",
    source: "docs/bible/02-physique.md N1 (« Après n demi-vies, il reste N₀/n » ; prérequis exponentielle, l. 494)",
  },
  {
    amont: { conception: "deriv.u-prime-oublie" }, aval: "rc.coefficient-exposant", statut: P,
    raison: "Vérifier une solution de RC·du/dt + u = E demande de dériver e^{−t/RC} ; oublier la dérivée de l’intérieur fait perdre le 1/RC.",
    exemple: "(e^{−t/τ})′ = −(1/τ)e^{−t/τ}, comme (ln u)′ = u′/u et non 1/u.",
    source: "docs/bible/02-physique.md E1 prérequis « Dériver E(1 − e^(−t/τ)) » (l. 674) ; spec dipole-rc l. 69-70",
  },
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
    amont: { conception: "meiose.haploide-une-chromatide" }, aval: "trans.alleles-par-cellule", statut: P,
    raison: "Un gamète haploïde porte un chromosome de chaque paire, donc un allèle de chaque gène ; lire « haploïde » comme « une chromatide » brouille ce compte.",
    exemple: "Un parent A//a donne des gamètes A et a, chacun à 1/2, jamais un gamète Aa.",
    source: "docs/bible/04-svt.md T1 (conception « haploïde = une chromatide ») et T2 prérequis « Méiose : un allèle par gamète »",
  },
  {
    amont: { conception: "meiose.soeurs-homologues" }, aval: "trans.recombines-moitie", statut: P,
    raison: "Le crossing-over se fait entre chromatides non sœurs de deux homologues : deux des quatre chromatides seulement sont recombinées.",
    exemple: "Distance d = 20 cM : chaque type recombiné vaut d/2 = 10 % des gamètes, pas 20 %.",
    source: "docs/bible/04-svt.md T1 (« Homologues = chromatides sœurs » ; pari « combien des 4 gamètes sont recombinés ? (2) ») ; T3",
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
    amont: { conception: "ln.produit-en-produit" }, aval: "exp.somme-en-somme", statut: P,
    raison: "exp défait ln : ln change les produits en sommes, exp les sommes en produits ; brouiller l’une brouille souvent l’autre.",
    exemple: "ln(ab) = ln a + ln b, donc e^{a+b} = eᵃ × eᵇ.",
    source: "docs/bible/01-maths.md A7, idée-clé « exp défait ln : elle transforme les sommes en produits »",
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
];

export const GRAPHE = { conceptions: CONCEPTIONS, aretes: ARETES, matieres: MATIERES };
