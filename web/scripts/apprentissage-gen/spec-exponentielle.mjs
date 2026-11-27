import { entete } from "./entete.mjs";
const N = ["ln.croissance-renversee","exp.conditions-ajoutees","exp.retour-t-x","exp.reciproque-confondue","exp.exposant-negatif","exp.derivee-regle-puissance","exp.positivite-etendue","deriv.terme-a-terme"];
export default {
  nom: "EXPONENTIELLE", matiere: "maths", nouvelles: [],
  entete: entete("exponentielle", 14, true),
  caps: {
    EXP: ["maths-sexp 1.2.20", "maths-sm 1.3.13"],
    LIM: ["maths-sexp 1.2.21", "maths-sm 1.3.14"],
    ETUDE: ["maths-sexp 1.2.22", "maths-sm 1.3.16"],
    DERIV: ["maths-sexp 1.2.6", "maths-sm 1.3.16"],
    REGLES: ["maths-sexp 1.2.16", "maths-sm 1.3.9"],
  },
  q: {
    savoir: ["REGLES", "-", "ln.exposant-reste-puissance", "ln.nombre-et-logarithme"],
    semestre: ["", "-", "-", "-"],
    defaire: ["", "-", "ln.zero-et-un", "-"],
    cent: ["", "-", "-", "-"],
    "aller-retour": ["EXP", "-", "ln.domaine-oublie", "ln.domaine-oublie"],
    diag: ["", "-", "-", "i"],
    "domaine-exp": ["", "-", "-", "exp.exposant-negatif"],
    asymptotes: ["", "-", "-", "-"],
    passage: ["EXP", "-", "-", "-"],
    "somme-produit": ["", "-", "exp.somme-en-somme", "exp.produit-exposants"],
    "preuve-produit": ["", "-", "-", "-"],
    notation: ["EXP", "-", "exp.exposant-negatif", "i"],
    e2x: ["EXP", "-", "exp.exposant-facteur", "-"],
    ek: ["EXP", "-", "exp.exposant-facteur", "exp.reciproque-confondue"],
    "k-negatif": ["EXP", "-", "exp.t-negatif", "-"],
    "ek-ineq": ["EXP", "-", "ln.croissance-renversee", "-"],
    inequation: ["EXP", "-", "ln.croissance-renversee", "exp.conditions-ajoutees"],
    systeme: ["EXP", "-", "-", "-"],
    "v-equations": ["EXP", "-", "-", "exp.positivite-etendue"],
    rappel: ["EXP", "-", "-", "i"],
    "reflet-pente": ["", "-", "-", "-"],
    "pente-hauteur": ["", "-", "-", "-"],
    derivee: ["ETUDE", "-", "-", "exp.derivee-regle-puissance"],
    eu: ["DERIV", "-", "deriv.u-prime-oublie", "exp.derivee-regle-puissance"],
    h0: ["LIM", "-", "lim.forme-indeterminee-nulle", "-"],
    "v-derivee": ["DERIV", "-", "deriv.terme-a-terme", "-"],
    "preuve-tangente": ["ETUDE", "-", "exp.positivite-etendue", "-"],
    "retour-plafond": ["", "-", "-", "exp.exposant-facteur"],
    "retour-limite": ["", "-", "-", "-"],
    "x-sur-ex": ["LIM", "-", "lim.croissances-comparees-envers", "-"],
    "x-ex-moins": ["LIM", "-", "lim.croissances-comparees-envers", "-"],
    "bac-sol": ["EXP", "-", "exp.retour-t-x", "exp.reciproque-confondue"],
    "bac-ineq": ["EXP", "-", "exp.retour-t-x", "-"],
    "bac-2": ["EXP", "-", "exp.exposant-facteur", "ln.somme-en-somme"],
    "bac-2-suite": ["EXP", "-", "exp.t-negatif", "-"],
    "bac-2-ineq": ["EXP", "-", "exp.retour-t-x", "-"],
    q1: ["EXP", "-", "exp.somme-en-somme", "exp.produit-exposants"],
    q2: ["ETUDE", "-", "exp.positivite-etendue", "-"],
    q3: ["DERIV", "-", "deriv.u-prime-oublie", "exp.derivee-regle-puissance"],
  },
  g: {
    // eᵃeᵇ=e^{ab}, e^{a+b}=eᵃ+eᵇ, diviser par eʳ en ajoutant r, (eᵃ)ⁿ=n eᵃ, (eᵃ)ⁿ=e^{a+n}, e^{−a}=eᵃ, e^{−a}=−eᵃ
    "exp-regles": ["exp.produit-exposants", "exp.somme-en-somme", "-", "exp.exposant-facteur", "-", "i", "exp.exposant-negatif"],
    // aᵏ/kᵃ, e^{k ln a}=ka, ln(eˣ) pris pour eˣ, e^{−ln a}=−a, e^{−ln a}=a, exp(ln x)=x pour x≤0
    "exp-ln-retour": ["i", "exp.exposant-facteur", "ln.nombre-et-logarithme", "exp.exposant-negatif", "i", "ln.domaine-oublie"],
    // signe de b, x=eᵏ, ln(−k), diviser par a oublié, eᵘ=0
    "exp-equation": ["i", "exp.reciproque-confondue", "exp.t-negatif", "isoler.coefficient-oublie", "-"],
    // borne, sens renversé, conditions ajoutées, sens gardé /négatif
    "exp-inequation": ["i", "ln.croissance-renversee", "exp.conditions-ajoutees", "ineq.sens-diviser-negatif"],
    // poser t oublié, e^{2x}=2eˣ, garder t<0, revenir à x oublié, exp au lieu de ln
    "exp-trinome": ["-", "exp.exposant-facteur", "exp.t-negatif", "exp.retour-t-x", "exp.reciproque-confondue"],
    "exp-trinome-ineq": ["exp.retour-t-x", "-"],
    // eˣ−k>0 partout, eˣ−k signe de x−k, eˣ−1>0 partout, produit mal lu, comptées deux fois, toujours positif, facteur inversé, eˣ facteur nul
    "exp-signe": ["exp.positivite-etendue", "-", "exp.positivite-etendue", "i", "i", "exp.positivite-etendue", "i", "-"],
    // (e^u)′=e^u, (eˣ)′=xe^{x−1}, signe u′v−uv′, quotient terme à terme, produit des dérivées
    "exp-derivee": ["deriv.u-prime-oublie", "exp.derivee-regle-puissance", "i", "deriv.terme-a-terme", "deriv.terme-a-terme"],
    // lim −∞ = −∞, e^{−x} lu eˣ, 0/0→∞, 0/0→0, lim −∞ = 1, croissances envers, ∞/∞=1
    "exp-limites": ["exp.exposant-negatif", "i", "-", "lim.forme-indeterminee-nulle", "-", "lim.croissances-comparees-envers", "-"],
    // ordonnée oubliée, pente a, ordonnée à l'origine, courbe sous tangente
    "exp-tangente": { "ordonnée eᵃ oubliée": "-", "pente a au lieu de eᵃ": "-", "ordonnée à l’origine prise pour l’ordonnée du point": "-", "courbe sous sa tangente": "-" },
    // inconnues eˣ eʸ, système non résolu, eˣ+eʸ, somme racine
    "exp-systeme": ["-", "i", "exp.somme-en-somme", "i"],
    // 0/0→0, facteur k oublié, ∞−∞→0, croissances envers
    "exp-limite-facteur": ["lim.forme-indeterminee-nulle", "-", "lim.forme-indeterminee-nulle", "lim.croissances-comparees-envers"],
    // produit mal lu, lim −∞ = −∞ (x gagne), f et f′, asymptote oubliée, verticale inventée, horizontale supposée, e⁰ oublié, ∞−∞, croissances envers
    "exp-etude": ["i", "lim.croissances-comparees-envers", "-", "-", "graphe.asymptote", "-", "i", "lim.forme-indeterminee-nulle", "lim.croissances-comparees-envers"],
    // exposant sorti en facteur, aˣ/xᵃ, (aˣ)′=xa^{x−1}, (e^u)′=e^u, (x^a)′=ln x·x^a, aˣ pour a≤0
    "exp-base-a": ["exp.exposant-facteur", "-", "exp.derivee-regle-puissance", "deriv.u-prime-oublie", "-", "ln.domaine-oublie"],
  },
};
