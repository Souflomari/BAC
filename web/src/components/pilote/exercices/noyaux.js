// @ts-nocheck
/**
 * Les exercices de la leçon « Noyaux, masse et énergie » (V3). Format : voir modele.js.
 * Chaque réponse est calculée ici, à partir des données sourcées de noyaux-outils.js (CODATA 2022 ;
 * AME2020) ; le vérificateur (scripts/pilotes-exercices.mjs) rejoue des centaines de tirages.
 * Un leurre calculé qui retombe sur la bonne réponse (à 2 tolérances près) est retiré du tirage
 * (`pieges`) : c'est le cas, par exemple, de « Z et N inversés » pour un noyau tel que Z = N.
 *
 * Capacités : pc-pc / pc-sm 1.2.2.x, et pc-svt avec la numérotation du cadre SVT (1.2.2.6 à 1.2.2.9 de
 * PC et SM n'existent pas en SVT : les gabarits qui les travaillent portent `filieres: ["PC", "SM"]`).
 * Le facteur 1 u ↔ c² est tiré dans {931,41 ; 931,49 ; 931,5} MeV/c² et écrit dans l'énoncé, comme les
 * sujets. Les constantes (c, 1 eV, 1 u en kg, N_A) sont toujours DONNÉES dans l'énoncé.
 *
 * Décision du relecteur : l'énergie de liaison du deutérium n'est affichée nulle part hors du sujet 2023
 * (2,366 MeV, donnée du sujet) : le deutérium est absent des tirages, et la fusion du gabarit 10 reprend
 * les trois valeurs imprimées de ce sujet.
 */
import { fr, frTex, sciTex, sig } from "./nombre.js";
import {
  NUCL, mNoyau, defaut, EL, ELA, ELT, F931, UMEV, MEV_J, EV_J, C, U_KG, NA, MP_X, MN_X, ME_X, MD_X, MT_X, MHE_X, S23, S19, S20,
  ASTON_NOYAUX, ALPHA, bilan, fg,
} from "../noyaux-outils.js";

const LN2 = Math.LN2;
const MAP_SVT = { "1.2.2.1": "1.2.2.1", "1.2.2.2": "1.2.2.2", "1.2.2.3": "1.2.2.3", "1.2.2.4": "1.2.2.4", "1.2.2.5": "1.2.2.5", "1.2.2.10": "1.2.2.6", "1.2.2.11": "1.2.2.7", "1.2.2.12": "1.2.2.8", "1.2.2.13": "1.2.2.9" };
/** les capacités d'un gabarit, dans les trois cadres (PC et SM : mêmes identifiants ; SVT : décalés, et sans 1.2.2.6 à 1.2.2.9) */
const CAPN = (...ids) => ids.flatMap((id) => [`pc-pc ${id}`, `pc-sm ${id}`, ...(MAP_SVT[id] ? [`pc-svt ${MAP_SVT[id]}`] : [])]);
const CAPN_PCSM = (...ids) => ids.flatMap((id) => [`pc-pc ${id}`, `pc-sm ${id}`]);
const nuc = (A, Z, X) => {
  const a = String(A), z = String(Z);
  return `{}^{${"\\phantom{0}".repeat(Math.max(0, z.length - a.length))}${a}}_{${"\\phantom{0}".repeat(Math.max(0, a.length - z.length))}${z}}\\mathrm{${X}}`;
};
const $k = (k) => `$${nuc(NUCL[k].A, NUCL[k].Z, NUCL[k].X)}$`;
const nk = (k) => nuc(NUCL[k].A, NUCL[k].Z, NUCL[k].X);
const NOMS = { "3He": "l’hélium 3", "4He": "l’hélium 4", "3H": "le tritium", "7Li": "le lithium 7", "16O": "l’oxygène 16", "56Fe": "le fer 56", "235U": "l’uranium 235", "210Po": "le polonium 210", "222Rn": "le radon 222", "238U": "l’uranium 238", "208Pb": "le plomb 208", "92Kr": "le krypton 92", "94Sr": "le strontium 94", "218Po": "le polonium 218" };
const NOM_SEUL = (k) => NOMS[k].replace(/^(le |la |l’)/, "");
/** « d’hélium 3 », « de fer 56 » */
const deN = (k) => (/^[aeiouyhéèêâîôû]/i.test(NOM_SEUL(k)) ? "d’" : "de ") + NOM_SEUL(k);
const sci = (x, c = 2) => sciTex(x, c);
/** retire les pièges qui tombent dans la tolérance de la bonne réponse (ou qui se répètent) */
function pieges(rep, tol, liste) {
  const seuil = tol.abs != null ? tol.abs : Math.abs(rep) * tol.rel;
  const garde = [];
  for (const p of liste) {
    if (!Number.isFinite(p.v)) continue;
    if (Math.abs(p.v - rep) <= 2 * seuil) continue;
    if (garde.some((q) => Math.abs(q.v - p.v) <= (tol.abs != null ? tol.abs : Math.abs(q.v) * tol.rel))) continue;
    garde.push(p);
  }
  return garde;
}
/** un nombre à n chiffres significatifs, pour KaTeX, en notation décimale ou scientifique */
const num = (x, n = 3) => {
  const a = Math.abs(x);
  if (a !== 0 && (a >= 1e5 || a < 1e-3)) return sci(x, n);
  const e = Math.floor(Math.log10(a || 1));
  return frTex(x, Math.max(0, n - 1 - e));
};
const FACS = [931.41, 931.49, 931.5];
const facTex = (f) => `${frTex(f, f === 931.5 ? 1 : 2)}\\ \\text{MeV/c}^{2}`;
const DONNEES_C = "$c = 3{,}00 \\times 10^{8}\\ \\text{m·s}^{-1}$";
/** la masse de la leçon : arrondie à cinq décimales, comme dans un énoncé */
const m5 = (k) => Math.round(mNoyau(k) * 1e5) / 1e5;
const MP5 = Math.round(MP_X * 1e5) / 1e5, MN5 = Math.round(MN_X * 1e5) / 1e5;
const dm5 = (k) => NUCL[k].Z * MP5 + (NUCL[k].A - NUCL[k].Z) * MN5 - m5(k);
const g6 = (x) => frTex(x, 6).replace(/(\{,\})(\d{3})(\d{3})/, "$1$2\\,$3");
const f5 = (x) => frTex(x, 5).replace(/(\{,\})(\d{3})(\d+)/, "$1$2\\,$3");

/* ---------- la courbe d'Aston, dessinée (jetons de couleur seulement) ---------- */
function figureAston({ inv, marques = [] }) {
  const L = 76, R = 600, T = 30, B = 300, X = (a) => L + ((R - L) * a) / 240, Y = (e) => (inv ? B - ((B - T) * e) / 9.5 : T + ((B - T) * e) / 9.5);
  const f = (v) => v.toFixed(1);
  const P = ASTON_NOYAUX.map((k) => [X(NUCL[k].A), Y(ELA(k)), k]);
  let g = "";
  g += `<line x1="${L}" x2="${R}" y1="${B + 8}" y2="${B + 8}" stroke="var(--color-text-primary)" stroke-width="1.5"/><line x1="${L}" x2="${L}" y1="${T - 12}" y2="${B + 8}" stroke="var(--color-text-primary)" stroke-width="1.5"/>`;
  for (let a = 0; a <= 240; a += 40) g += `<text x="${f(X(a))}" y="${B + 28}" text-anchor="middle" font-size="15" fill="var(--color-text-secondary)">${a}</text>`;
  for (let e = 0; e <= 8; e += 2) g += `<text x="${L - 10}" y="${f(Y(e) + 5)}" text-anchor="end" font-size="15" fill="var(--color-text-secondary)">${inv ? e : e === 0 ? "0" : "−" + e}</text>`;
  g += `<path d="${P.map((p, i) => `${i ? "L" : "M"}${f(p[0])} ${f(p[1])}`).join(" ")}" fill="none" stroke="var(--color-text-primary)" stroke-width="2.5"/>`;
  P.forEach(([x, y]) => { g += `<circle cx="${f(x)}" cy="${f(y)}" r="4.5" fill="var(--color-text-primary)"/>`; });
  marques.forEach(([A, lab]) => { const k = ASTON_NOYAUX.reduce((b, c) => (Math.abs(NUCL[c].A - A) < Math.abs(NUCL[b].A - A) ? c : b)); g += `<text x="${f(X(A))}" y="${f(Y(ELA(k)) + (inv ? 24 : -14))}" text-anchor="middle" font-size="15" fill="var(--color-signal)">${lab}</text>`; });
  g += `<text x="${R}" y="${B + 50}" text-anchor="end" font-size="15" fill="var(--color-text-primary)">A (nombre de nucléons)</text>`;
  g += `<text x="${L - 8}" y="${T - 20}" font-size="15" fill="var(--color-text-primary)">${inv ? "E<tspan dy=\"4\" font-size=\"11\">ℓ</tspan><tspan dy=\"-4\">/A (MeV/nucléon)</tspan>" : "−E<tspan dy=\"4\" font-size=\"11\">ℓ</tspan><tspan dy=\"-4\">/A (MeV/nucléon)</tspan>"}</text>`;
  return `<svg viewBox="0 0 640 ${B + 60}" role="img" aria-label="Courbe d’Aston : l’énergie de liaison par nucléon en fonction du nombre de nucléons">${g}</svg>`;
}

/* ---------- le diagramme d'énergie du sujet 2020, dessiné ---------- */
function figureDiagramme({ niveaux, coupe }) {
  // niveaux : [{ y (px), nom, val }] du plus haut au plus bas
  const L = 90, R = 560;
  let g = `<line x1="${L - 40}" x2="${L - 40}" y1="20" y2="270" stroke="var(--color-text-secondary)" stroke-width="1.5"/>`;
  if (coupe) g += `<line x1="${L - 50}" x2="${L - 30}" y1="205" y2="195" stroke="var(--color-text-primary)" stroke-width="2"/><line x1="${L - 50}" x2="${L - 30}" y1="214" y2="204" stroke="var(--color-text-primary)" stroke-width="2"/>`;
  niveaux.forEach((n) => { g += `<line x1="${L}" x2="${R}" y1="${n.y}" y2="${n.y}" stroke="var(--color-text-primary)" stroke-width="3"/><text x="${R + 10}" y="${n.y + 5}" font-size="15" fill="var(--color-text-primary)">${n.nom}</text><text x="${L + 6}" y="${n.y - 8}" font-size="15" fill="var(--color-text-secondary)">${n.val}</text>`; });
  return `<svg viewBox="0 0 700 290" role="img" aria-label="Diagramme d’énergie à trois niveaux">${g}</svg>`;
}

export const EXERCICES = [
  /* 1 — unités de masse et d'énergie */
  {
    id: "nme-unites",
    titre: "Les unités : u, MeV/c², eV, J",
    niveau: 1,
    capacites: CAPN("1.2.2.3"),
    erreurs: ["931,5 oublié (u lu comme MeV)", "MeV et eV confondus", "diviser au lieu de multiplier"],
    gen(h) {
      const F = h.pick(FACS), m = h.pick([0.001, 0.03, 1, 4.0015, 235.0439]), E = h.pick([5.4, 17.6, 200]);
      const tol = { rel: 0.012 };
      const mev = m * F, kg = m * 1.66e-27, J = E * 1.6e-13;
      return {
        enonce: `<p>On donne : $1\\ \\text{u} = ${facTex(F)}$ ; $1\\ \\text{u} = 1{,}66 \\times 10^{-27}\\ \\text{kg}$ ; $1\\ \\text{MeV} = 1{,}60 \\times 10^{-13}\\ \\text{J}$ ; $1\\ \\text{eV} = 1{,}60 \\times 10^{-19}\\ \\text{J}$.</p><p>Une masse vaut $m = ${num(m, 4)}\\ \\text{u}$. Une énergie vaut $E = ${num(E, 3)}\\ \\text{MeV}$.</p>`,
        questions: [
          { type: "nombre", q: "Exprime $m$ en MeV/c² : donne la valeur numérique.", reponse: mev, tol, unite: "MeV/c²", indice: "$1\\ \\text{u}$ correspond à plusieurs centaines de MeV/c².",
            pieges: pieges(mev, tol, [{ v: m, fb: "Tu as pris u pour des MeV/c² : il faut multiplier par la valeur de 1 u en MeV/c².", erreur: "931,5 oublié (u lu comme MeV)" }, { v: m / F, fb: "Le facteur est dans le mauvais sens : 1 u vaut plusieurs centaines de MeV/c², on multiplie.", erreur: "diviser au lieu de multiplier" }]) },
          { type: "nombre", q: "Exprime $m$ en kilogrammes.", reponse: kg, tol, unite: "kg", indice: "On multiplie par la valeur de 1 u en kg.",
            pieges: pieges(kg, tol, [{ v: mev * 1.66e-27, fb: "Tu as converti la valeur en MeV/c² : pour passer de u à kg, on part de la valeur en u.", erreur: "931,5 oublié (u lu comme MeV)" }, { v: m / 1.66e-27, fb: "On multiplie par 1 u en kg, on ne divise pas.", erreur: "diviser au lieu de multiplier" }]) },
          { type: "nombre", q: "Exprime $E$ en joules.", reponse: J, tol, unite: "J", indice: "$1\\ \\text{MeV}$ vaut $10^{6}$ eV.",
            pieges: pieges(J, tol, [{ v: E * 1.6e-19, fb: "Tu as converti avec la valeur de l’eV : un MeV est un million de fois plus grand, $1{,}60 \\times 10^{-13}\\ \\text{J}$.", erreur: "MeV et eV confondus" }, { v: E / 1.6e-13, fb: "On multiplie par la valeur de 1 MeV en joules, on ne divise pas.", erreur: "diviser au lieu de multiplier" }]) },
        ],
        correction: [
          { tex: `E_m = m \\times ${num(F, 5)} = ${num(m, 4)} \\times ${num(F, 5)} \\approx ${num(mev, 4)}\\ \\text{MeV/c}^{2}`, r: "On multiplie par la valeur de 1 u en MeV/c²." },
          { tex: `m = ${num(m, 4)} \\times 1{,}66 \\times 10^{-27} \\approx ${num(kg, 3)}\\ \\text{kg}`, r: "u vers kg : on multiplie par $1{,}66 \\times 10^{-27}$." },
          { tex: `E = ${num(E, 3)} \\times 1{,}60 \\times 10^{-13} \\approx ${num(J, 3)}\\ \\text{J}`, r: "MeV vers J : $10^{6}$ eV, donc $1{,}60 \\times 10^{-13}$ J par MeV." },
        ],
      };
    },
  },

  /* 2 — énergie de masse */
  {
    id: "nme-energie-masse",
    titre: "L’énergie de masse : E = mc²",
    niveau: 1,
    capacites: CAPN("1.2.2.5"),
    erreurs: ["gramme non converti en kilogramme", "c non élevée au carré", "c en km·s⁻¹ avec m en kg"],
    gen(h) {
      const cas = h.pick([["1\\ \\mu\\text{g}", 1e-9], ["1\\ \\text{mg}", 1e-6], ["1\\ \\text{g}", 1e-3], ["1\\ \\text{kg}", 1]]);
      const c = 3e8, E = cas[1] * c * c, tol = { rel: 0.02 };
      const dE = h.pick([4.5e9, 9e13, 3.6e15, 1.8e12]), dm = dE / (c * c);
      return {
        enonce: `<p>On donne ${DONNEES_C}. Une masse $m = ${cas[0]}$ de matière est au repos.</p>`,
        questions: [
          { type: "nombre", q: "Calcule son énergie de masse, en joules.", reponse: E, tol, unite: "J", indice: "$E = mc^{2}$, avec $m$ en kilogrammes.",
            pieges: pieges(E, tol, [...(cas[1] !== 1 ? [{ v: c * c, fb: "Tu as pris la masse en kilogrammes sans la convertir : $m$ doit être en kilogrammes (1 g = 10⁻³ kg).", erreur: "gramme non converti en kilogramme" }] : []), { v: cas[1] * c, fb: "Tu n’as pas élevé $c$ au carré : $E = mc^{2}$, pas $mc$.", erreur: "c non élevée au carré" }, { v: cas[1] * (c / 1e3) ** 2, fb: "Avec $m$ en kilogrammes, $c$ doit être en m·s⁻¹, pas en km·s⁻¹.", erreur: "c en km·s⁻¹ avec m en kg" }]) },
          { type: "nombre", q: `Un système perd l’énergie $\\Delta E = ${sci(dE, 2)}\\ \\text{J}$ : de combien sa masse diminue-t-elle, en kilogrammes ?`, reponse: dm, tol, unite: "kg", indice: "$\\Delta m = \\Delta E / c^{2}$.",
            pieges: pieges(dm, tol, [{ v: dE * c * c, fb: "On divise par $c^{2}$, on ne multiplie pas : $\\Delta m = \\Delta E / c^{2}$.", erreur: "c non élevée au carré" }, { v: dE / c, fb: "Il faut diviser par $c^{2}$, pas par $c$.", erreur: "c non élevée au carré" }]) },
        ],
        correction: [
          { tex: `E = mc^{2} = ${num(cas[1], 1)}\\ \\text{kg} \\times \\left(3{,}00 \\times 10^{8}\\right)^{2} \\approx ${num(E, 3)}\\ \\text{J}`, r: "$m$ en kilogrammes, $c$ en m·s⁻¹ : l’énergie sort en joules." },
          { tex: `\\Delta m = \\dfrac{\\Delta E}{c^{2}} = \\dfrac{${sci(dE, 2)}}{\\left(3{,}00 \\times 10^{8}\\right)^{2}} \\approx ${num(dm, 3)}\\ \\text{kg}`, r: "La masse perdue est l’énergie perdue divisée par $c^{2}$." },
        ],
      };
    },
  },

  /* 3 — défaut de masse */
  {
    id: "nme-defaut-masse",
    titre: "Le défaut de masse d’un noyau",
    niveau: 2,
    capacites: CAPN("1.2.2.1", "1.2.2.3"),
    erreurs: ["N = A (A neutrons)", "Z et N inversés", "signe de la soustraction inversé", "u non converti en kg"],
    gen(h) {
      const k = h.pick(["3H", "3He", "4He", "7Li", "16O", "56Fe", "235U"]), { Z, A } = NUCL[k], N = A - Z, m = m5(k);
      const dm = Z * MP5 + N * MN5 - m, tol = { rel: 0.02 }, kg = dm * 1.66e-27;
      return {
        enonce: `<p>On donne les masses (en u) : $m_{\\mathrm p} = ${f5(MP5)}$ ; $m_{\\mathrm n} = ${f5(MN5)}$ ; $m\\left(${nk(k)}\\right) = ${f5(m)}$ (masse du noyau), et $1\\ \\text{u} = 1{,}66 \\times 10^{-27}\\ \\text{kg}$.</p><p>On étudie le noyau ${deN(k)}, ${$k(k)}.</p>`,
        questions: [
          { type: "nombre", q: "Calcule son défaut de masse $\\Delta m$, en u.", reponse: dm, tol, unite: "u", indice: `Ce noyau contient $Z = ${Z}$ protons et $N = A - Z = ${N}$ neutrons : $\\Delta m = Z\\,m_{\\mathrm p} + N\\,m_{\\mathrm n} - m$.`,
            pieges: pieges(dm, tol, [{ v: Z * MP5 + A * MN5 - m, fb: `Tu as compté ${A} neutrons : $A$ compte tous les nucléons. Les neutrons sont $N = A - Z = ${N}$.`, erreur: "N = A (A neutrons)" }, { v: N * MP5 + Z * MN5 - m, fb: `Tu as inversé protons et neutrons : ce noyau a ${Z} protons et ${N} neutrons.`, erreur: "Z et N inversés" }, { v: -dm, fb: "L’ordre de la soustraction est inversé : $\\Delta m$ est positif, nucléons moins noyau.", erreur: "signe de la soustraction inversé" }]) },
          { type: "nombre", q: "Exprime ce défaut de masse en kilogrammes.", reponse: kg, tol, unite: "kg", indice: "On multiplie la valeur en u par $1{,}66 \\times 10^{-27}$.",
            pieges: pieges(kg, tol, [{ v: dm, fb: "Cette valeur est en u : il reste à la convertir en kilogrammes.", erreur: "u non converti en kg" }, { v: dm / 1.66e-27, fb: "On multiplie par $1{,}66 \\times 10^{-27}$ kg par u, on ne divise pas.", erreur: "u non converti en kg" }]) },
        ],
        correction: [
          { tex: `\\Delta m = Z\\,m_{\\mathrm p} + (A - Z)\\,m_{\\mathrm n} - m\\left(${nk(k)}\\right)`, r: "La définition : les nucléons séparés, moins le noyau." },
          { tex: `\\Delta m = ${Z} \\times ${f5(MP5)} + ${N} \\times ${f5(MN5)} - ${f5(m)} \\approx ${num(dm, 4)}\\ \\text{u}`, r: `${Z} protons et ${N} neutrons.` },
          { tex: `\\Delta m \\approx ${num(dm, 4)} \\times 1{,}66 \\times 10^{-27} \\approx ${num(kg, 3)}\\ \\text{kg}`, r: "La conversion en kilogrammes." },
        ],
      };
    },
  },

  /* 4 — énergie de liaison, énergie de liaison par nucléon */
  {
    id: "nme-liaison",
    titre: "L’énergie de liaison et l’énergie de liaison par nucléon",
    niveau: 2,
    capacites: CAPN("1.2.2.1", "1.2.2.2", "1.2.2.3"),
    erreurs: ["Δm non converti (× 931,5 oublié)", "E_ℓ/A : division par Z", "E_ℓ/A : division par N", "E_ℓ/A : E_ℓ non divisée"],
    gen(h) {
      const k = h.pick(["3H", "3He", "4He", "7Li", "16O", "56Fe", "235U"]), F = h.pick(FACS), { Z, A } = NUCL[k], N = A - Z, m = m5(k);
      const dm = dm5(k), E = dm * F, e = E / A, tolE = { rel: 0.015 };
      return {
        enonce: `<p>On donne : $m_{\\mathrm p} = ${f5(MP5)}\\ \\text{u}$ ; $m_{\\mathrm n} = ${f5(MN5)}\\ \\text{u}$ ; $m\\left(${nk(k)}\\right) = ${f5(m)}\\ \\text{u}$ (masse du noyau) ; $1\\ \\text{u} = ${facTex(F)}$.</p><p>On étudie le noyau ${deN(k)}, ${$k(k)}.</p>`,
        questions: [
          { type: "nombre", q: "Calcule son énergie de liaison $E_\\ell$, en MeV.", reponse: E, tol: tolE, unite: "MeV", indice: "$E_\\ell = \\Delta m\\,c^{2}$ : le défaut de masse en u, multiplié par la valeur de 1 u en MeV/c².",
            pieges: pieges(E, tolE, [{ v: dm, fb: "Tu as laissé le défaut de masse en u : il reste à le convertir en MeV (× la valeur de 1 u en MeV/c²).", erreur: "Δm non converti (× 931,5 oublié)" }, { v: dm / F, fb: "Le facteur est dans le mauvais sens : 1 u vaut plusieurs centaines de MeV/c², on multiplie.", erreur: "Δm non converti (× 931,5 oublié)" }]) },
          { type: "nombre", q: "Calcule son énergie de liaison par nucléon $E_\\ell / A$, en MeV/nucléon.", reponse: e, tol: tolE, unite: "MeV/nucléon", indice: "On divise $E_\\ell$ par le nombre total de nucléons, $A$.",
            pieges: pieges(e, tolE, [{ v: E / Z, fb: `Tu as divisé par $Z = ${Z}$ : $A$ compte tous les nucléons, ${A}.`, erreur: "E_ℓ/A : division par Z" }, ...(N !== Z ? [{ v: E / N, fb: `Tu as divisé par le nombre de neutrons, ${N} : on divise par $A = ${A}$.`, erreur: "E_ℓ/A : division par N" }] : []), { v: E, fb: "C’est l’énergie de liaison totale : il reste à la diviser par $A$.", erreur: "E_ℓ/A : E_ℓ non divisée" }]) },
        ],
        correction: [
          { tex: `\\Delta m = ${num(dm, 4)}\\ \\text{u}`, r: `${Z} protons et ${N} neutrons, moins la masse du noyau.` },
          { tex: `E_\\ell = \\Delta m\\,c^{2} = ${num(dm, 4)} \\times ${num(F, 5)} \\approx ${num(E, 4)}\\ \\text{MeV}`, r: "u vers MeV : on multiplie." },
          { tex: `\\dfrac{E_\\ell}{A} = \\dfrac{${num(E, 4)}}{${A}} \\approx ${num(e, 3)}\\ \\text{MeV/nucléon}`, r: "On divise par le nombre total de nucléons." },
        ],
      };
    },
  },

  /* 5 — lequel est le plus stable ? */
  {
    id: "nme-stabilite",
    titre: "Lequel est le plus stable ?",
    niveau: 2,
    capacites: CAPN("1.2.2.2", "1.2.2.4"),
    erreurs: ["comparer E_ℓ au lieu de E_ℓ/A", "plus lourd = plus stable", "E_ℓ/A : division par Z"],
    gen(h) {
      // l'ordre des E_ℓ est l'inverse de celui des E_ℓ/A : le leurre « la plus grande E_ℓ » mène toujours au faux
      const [a, b] = h.pick([["208Pb", "56Fe"], ["235U", "92Kr"], ["238U", "94Sr"], ["222Rn", "218Po"]]);
      const [x, y] = h.int(0, 1) ? [a, b] : [b, a];
      const stable = ELA(x) > ELA(y) ? x : y, autre = stable === x ? y : x;
      const tol = { rel: 0.01 }, e = ELA(stable), r1 = (v) => Math.round(v * 10) / 10;
      const opts = [{ t: `${$k(stable)}`, ok: true }, { t: `${$k(autre)}`, fb: `Tu as comparé les énergies de liaison totales : ${$k(autre)} en a une plus grande parce qu’il a plus de nucléons. On compare $E_\\ell / A$.`, erreur: "comparer E_ℓ au lieu de E_ℓ/A" }, { t: "On ne peut pas savoir sans connaître les masses.", fb: "Il suffit de diviser chaque énergie de liaison par le nombre de nucléons.", erreur: "comparer E_ℓ au lieu de E_ℓ/A" }];
      return {
        enonce: `<p>Deux noyaux ont pour énergie de liaison : ${$k(x)} : $E_\\ell = ${frTex(r1(ELT(x)), 1)}\\ \\text{MeV}$ ; ${$k(y)} : $E_\\ell = ${frTex(r1(ELT(y)), 1)}\\ \\text{MeV}$.</p>`,
        questions: [
          { type: "qcm", q: "Lequel de ces deux noyaux est le plus stable ?", options: h.melange(opts) },
          { type: "nombre", q: "Calcule l’énergie de liaison par nucléon de ce noyau le plus stable, en MeV/nucléon.", reponse: e, tol, unite: "MeV/nucléon", indice: "On divise $E_\\ell$ par $A$.",
            pieges: pieges(e, tol, [{ v: ELT(stable) / NUCL[stable].Z, fb: "Tu as divisé par $Z$ : $A$ compte tous les nucléons.", erreur: "E_ℓ/A : division par Z" }, { v: ELA(autre), fb: "C’est $E_\\ell / A$ de l’autre noyau.", erreur: "comparer E_ℓ au lieu de E_ℓ/A" }, { v: ELT(stable), fb: "C’est l’énergie de liaison totale : il reste à la diviser par $A$.", erreur: "comparer E_ℓ au lieu de E_ℓ/A" }]) },
        ],
        correction: [
          { tex: `\\dfrac{E_\\ell}{A}\\left(${nk(x)}\\right) = \\dfrac{${frTex(r1(ELT(x)), 1)}}{${NUCL[x].A}} \\approx ${num(ELA(x), 3)}\\ \\text{MeV/nucléon}`, r: "On divise par le nombre de nucléons." },
          { tex: `\\dfrac{E_\\ell}{A}\\left(${nk(y)}\\right) = \\dfrac{${frTex(r1(ELT(y)), 1)}}{${NUCL[y].A}} \\approx ${num(ELA(y), 3)}\\ \\text{MeV/nucléon}`, r: "Même calcul pour l’autre noyau." },
          { t: `Le plus stable est celui qui a la plus grande $E_\\ell / A$ : ${$k(stable)}.` },
        ],
      };
    },
  },

  /* 6 — la courbe d'Aston : fusion et fission (PC, SM) */
  {
    id: "nme-aston",
    titre: "La courbe d’Aston : où libère-t-on de l’énergie ?",
    niveau: 2,
    filieres: ["PC", "SM"],
    capacites: CAPN_PCSM("1.2.2.4", "1.2.2.7"),
    erreurs: ["toute fusion libère de l’énergie", "plus lourd = plus stable", "fission et fusion confondues"],
    gen(h) {
      const inv = h.int(0, 1) === 1;
      const cas = h.pick([
        { t: "deux noyaux légers (de nombre de nucléons voisin de 10) s’unissent en un noyau plus lourd", type: "fusion", libere: true, why: "À gauche du creux de la courbe, un noyau plus lourd est plus lié par nucléon : la réaction descend vers le creux." },
        { t: "un noyau lourd (de nombre de nucléons voisin de 235) se casse en deux noyaux de nombre de nucléons voisin de 120", type: "fission", libere: true, why: "À droite du creux, les noyaux moyens sont plus liés par nucléon que le noyau lourd : la réaction descend vers le creux." },
        { t: "deux noyaux de nombre de nucléons voisin de 56 s’unissent en un noyau de nombre de nucléons voisin de 112", type: "fusion", libere: false, why: "Les noyaux de nombre de nucléons voisin de 56 sont déjà au creux : le noyau obtenu est moins lié par nucléon, il faut fournir de l’énergie." },
        { t: "un noyau de nombre de nucléons voisin de 60 se casse en deux noyaux de nombre de nucléons voisin de 30", type: "fission", libere: false, why: "Un noyau voisin du creux est le plus lié par nucléon : le casser donne des noyaux moins liés, il faut fournir de l’énergie." },
      ]);
      const sens = inv ? "plus un point est haut, plus le noyau est stable" : "plus un point est bas, plus le noyau est stable";
      const oui = { t: "Oui, de l’énergie est libérée.", ok: cas.libere, fb: cas.libere ? undefined : "Tu as supposé que toute fusion ou toute fission libère de l’énergie : tout dépend de la position sur la courbe.", erreur: "toute fusion libère de l’énergie" };
      const non = { t: "Non, il faut fournir de l’énergie.", ok: !cas.libere, fb: cas.libere ? "La réaction va vers les noyaux les plus stables par nucléon : de l’énergie est libérée." : undefined, erreur: "plus lourd = plus stable" };
      const types = [{ t: "Une fusion", ok: cas.type === "fusion", fb: "Un seul noyau se forme à partir de deux : c’est une fusion.", erreur: "fission et fusion confondues" }, { t: "Une fission", ok: cas.type === "fission", fb: "Un noyau se casse en deux : c’est une fission.", erreur: "fission et fusion confondues" }, { t: "Une désintégration α", ok: false, fb: "Une désintégration α est spontanée et n’émet qu’un noyau d’hélium.", erreur: "fission et fusion confondues" }];
      return {
        enonce: `<p>La courbe d’Aston donne $${inv ? "" : "-"}E_\\ell / A$ en fonction du nombre de nucléons $A$ pour quinze noyaux : ${sens}.</p><p>On étudie la réaction où ${cas.t}.</p>`,
        figure: figureAston({ inv, marques: [[56, "fer"]] }),
        questions: [
          { type: "qcm", q: "De quel type de réaction s’agit-il ?", options: h.melange(types) },
          { type: "qcm", q: "De l’énergie est-elle libérée par cette réaction ?", options: h.melange([oui, non]) },
        ],
        correction: [
          { t: `Sur cette courbe, ${sens}.` },
          { t: cas.why },
          { t: cas.libere ? "L’énergie libérée est celle des noyaux qui passent à une plus grande $E_\\ell / A$." : "Pour aller vers un noyau moins lié par nucléon, il faut fournir de l’énergie." },
        ],
      };
    },
  },

  /* 7 — équations de fission et de fusion (PC, SM) */
  {
    id: "nme-equation",
    titre: "Écrire une réaction de fission ou de fusion",
    niveau: 2,
    filieres: ["PC", "SM"],
    capacites: CAPN_PCSM("1.2.2.8"),
    erreurs: ["neutron incident oublié", "Z du neutron pris égal à 1", "une seule loi de conservation appliquée"],
    gen(h) {
      const fis = h.int(0, 1) === 0;
      if (fis) {
        const [X, Y, x] = h.pick([["94Sr", "140Xe", 2], ["92Kr", "141Ba", 3], ["95Zr", "138Te", 3]]);
        const A = 1 + NUCL["235U"].A, tol = { abs: 0.01 }, Zy = NUCL["235U"].Z - NUCL[X].Z;
        return {
          enonce: `<p>Un neutron frappe un noyau d’uranium 235 : $${nuc(1, 0, "n")} + ${nk("235U")} \\longrightarrow ${nk(X)} + {}^{${NUCL[Y].A}}_{Z'}\\mathrm{Y} + x\\,${nuc(1, 0, "n")}$.</p><p>Le second fragment Y a pour nombre de masse $A' = ${NUCL[Y].A}$.</p>`,
          questions: [
            { type: "nombre", q: "Combien de neutrons $x$ sont émis ?", reponse: x, tol, indice: "Les nucléons se conservent, neutron incident compris.",
              pieges: pieges(x, tol, [{ v: x - 1, fb: `Tu as oublié le neutron incident : à gauche, $1 + ${NUCL["235U"].A} = ${A}$ nucléons.`, erreur: "neutron incident oublié" }, { v: 0, fb: "La loi de $Z$ ne voit pas les neutrons : c’est la loi de $A$ qui donne $x$.", erreur: "une seule loi de conservation appliquée" }]) },
            { type: "nombre", q: "Que vaut le nombre de charge $Z'$ du second fragment Y ?", reponse: Zy, tol, indice: "La charge se conserve : le neutron n’a pas de charge.",
              pieges: pieges(Zy, tol, [{ v: Zy + 1 - x, fb: "Le neutron a un nombre de charge nul : $Z(\\mathrm{n}) = 0$, et non 1.", erreur: "Z du neutron pris égal à 1" }, { v: NUCL["235U"].Z, fb: "Tu as oublié la charge du premier fragment : $92 = Z(\\text{X}) + Z'$.", erreur: "une seule loi de conservation appliquée" }]) },
          ],
          correction: [
            { tex: `A\\ :\\ 1 + ${NUCL["235U"].A} = ${NUCL[X].A} + ${NUCL[Y].A} + x \\Rightarrow x = ${x}`, r: "Le nombre de nucléons se conserve, neutron incident compris." },
            { tex: `Z\\ :\\ 0 + ${NUCL["235U"].Z} = ${NUCL[X].Z} + Z' + 0 \\Rightarrow Z' = ${Zy}`, r: "Le neutron n’a pas de charge : seule celle de l’uranium se répartit entre les fragments." },
          ],
        };
      }
      const [r1, r2, p1, p2] = h.pick([[[2, 1, "H"], [3, 1, "H"], [4, 2, "He"], [1, 0, "n"]], [[2, 1, "H"], [2, 1, "H"], [3, 2, "He"], [1, 0, "n"]], [[2, 1, "H"], [2, 1, "H"], [3, 1, "H"], [1, 1, "H"]]]);
      const A = r1[0] + r2[0] - p2[0], Z = r1[1] + r2[1] - p2[1], tol = { abs: 0.01 };
      const nm = (n) => (n[2] === "H" && n[0] === 2 ? "le deutérium" : n[2] === "H" && n[0] === 3 ? "le tritium" : n[2] === "n" ? "le neutron" : "le proton");
      return {
        enonce: `<p>Réaction de fusion : $${nuc(...r1)} + ${nuc(...r2)} \\longrightarrow {}^{A}_{Z}\\mathrm{X} + ${nuc(...p2)}$.</p>`,
        questions: [
          { type: "nombre", q: "Que vaut le nombre de masse $A$ du noyau X ?", reponse: A, tol, indice: "Les nucléons se conservent : $A_1 + A_2 = A + A_3$.",
            pieges: pieges(A, tol, [{ v: r1[0] + r2[0], fb: "Tu as oublié la deuxième particule produite : elle emporte aussi des nucléons.", erreur: "neutron incident oublié" }]) },
          { type: "nombre", q: "Que vaut son nombre de charge $Z$ ?", reponse: Z, tol, indice: "La charge se conserve, et le neutron n’a pas de charge.",
            pieges: pieges(Z, tol, [{ v: r1[1] + r2[1], fb: "Tu as oublié la charge de la deuxième particule produite.", erreur: "une seule loi de conservation appliquée" }, ...(p2[2] === "n" ? [{ v: Z - 1, fb: "Le neutron a un nombre de charge nul, $Z(\\mathrm{n}) = 0$, pas 1.", erreur: "Z du neutron pris égal à 1" }] : [])]) },
        ],
        correction: [
          { tex: `A\\ :\\ ${r1[0]} + ${r2[0]} = A + ${p2[0]} \\Rightarrow A = ${A}`, r: "Conservation du nombre de nucléons." },
          { tex: `Z\\ :\\ ${r1[1]} + ${r2[1]} = Z + ${p2[1]} \\Rightarrow Z = ${Z}`, r: "Conservation du nombre de charge." },
          { t: `Le noyau X est ${Z === 2 ? "un noyau d’hélium" : "le tritium"} : ${nm(r1)} et ${nm(r2)} fusionnent.` },
        ],
      };
    },
  },

  /* 8 — reconnaître le type d'une réaction (PC, SM) */
  {
    id: "nme-type",
    titre: "Reconnaître le type de réaction nucléaire",
    niveau: 1,
    filieres: ["PC", "SM"],
    capacites: [...CAPN_PCSM("1.2.2.9"), "pc-pc 1.2.1.9", "pc-sm 1.2.1.9"],
    erreurs: ["désintégration α prise pour une fission", "fusion prise pour une fission", "β⁺ prise pour une fusion"],
    gen(h) {
      const E = [
        { k: "alpha", eq: `${nk("238U")} \\longrightarrow ${nuc(234, 90, "Th")} + ${nk("4He")}`.replace(nk("4He"), nuc(4, 2, "He")) },
        { k: "bm", eq: `${nuc(14, 6, "C")} \\longrightarrow ${nuc(14, 7, "N")} + ${nuc(0, -1, "e")}` },
        { k: "bp", eq: `${nuc(18, 9, "F")} \\longrightarrow ${nuc(18, 8, "O")} + ${nuc(0, "+1", "e")}` },
        { k: "fission", eq: h.pick([`${nuc(1, 0, "n")} + ${nk("235U")} \\longrightarrow ${nk("94Sr")} + ${nk("140Xe")} + 2\\,${nuc(1, 0, "n")}`, `${nuc(1, 0, "n")} + ${nk("235U")} \\longrightarrow ${nk("92Kr")} + ${nk("141Ba")} + 3\\,${nuc(1, 0, "n")}`]) },
        { k: "fusion", eq: h.pick([`${nuc(2, 1, "H")} + ${nuc(3, 1, "H")} \\longrightarrow ${nuc(4, 2, "He")} + ${nuc(1, 0, "n")}`, `${nuc(2, 1, "H")} + ${nuc(2, 1, "H")} \\longrightarrow ${nuc(3, 2, "He")} + ${nuc(1, 0, "n")}`]) },
      ];
      const c = h.pick(E);
      const noms = { alpha: "une désintégration $\\alpha$", bm: "une désintégration $\\beta^-$", bp: "une désintégration $\\beta^+$", fission: "une fission", fusion: "une fusion" };
      const raison = { alpha: "Un seul noyau à gauche, et un noyau d’hélium émis : c’est une désintégration α, spontanée.", bm: "Un seul noyau à gauche, et un électron émis : c’est une désintégration β⁻.", bp: "Un seul noyau à gauche, et un positon émis : c’est une désintégration β⁺, pas une fusion.", fission: "Un neutron frappe un noyau lourd, qui se casse en deux noyaux moyens : c’est une fission.", fusion: "Deux noyaux légers à gauche, un noyau plus lourd à droite : c’est une fusion." };
      const erreur = { alpha: "désintégration α prise pour une fission", bm: "désintégration α prise pour une fission", bp: "β⁺ prise pour une fusion", fission: "fusion prise pour une fission", fusion: "fusion prise pour une fission" };
      const fbPour = (k) => (k === "fission" ? "Une fission est provoquée par un neutron et donne deux noyaux moyens ; ce n’est pas le cas ici." : k === "fusion" ? "Une fusion réunit deux noyaux légers ; ce n’est pas le cas ici." : `Cette réaction n’est pas ${noms[k]} : ${raison[c.k]}`);
      const opts = Object.keys(noms).map((k) => (k === c.k ? { t: noms[k], ok: true } : { t: noms[k], fb: fbPour(k), erreur: erreur[c.k] }));
      return {
        enonce: `<p>Voici une équation de réaction nucléaire :</p>$$${c.eq}$$`,
        questions: [{ type: "qcm", q: "De quel type de réaction s’agit-il ?", options: h.melange(opts) }],
        correction: [{ tex: c.eq, r: "L’équation à analyser." }, { t: raison[c.k] }],
      };
    },
  },

  /* 9 — bilan énergétique par les masses */
  {
    id: "nme-bilan-masses",
    titre: "Le bilan énergétique par les masses",
    niveau: 3,
    capacites: CAPN("1.2.2.10", "1.2.2.11", "1.2.2.3"),
    erreurs: ["produits − réactifs inversé (signe de ΔE)", "particule émise oubliée (neutron, α, β)", "× 931,5 oublié"],
    gen(h) {
      const F = h.pick(FACS);
      const R = h.pick([
        { nom: "la désintégration α du polonium 210", re: ["210Po"], pr: ["206Pb", "4He"], eq: `${nk("210Po")} \\longrightarrow ${nk("206Pb")} + ${nk("4He")}`, part: "4He" },
        { nom: "la désintégration α du radon 222", re: ["222Rn"], pr: ["218Po", "4He"], eq: `${nk("222Rn")} \\longrightarrow ${nk("218Po")} + ${nk("4He")}`, part: "4He" },
        { nom: "la désintégration β⁻ de l’iode 131", re: ["131I"], pr: ["131Xe", "e-"], eq: `${nk("131I")} \\longrightarrow ${nk("131Xe")} + ${nuc(0, -1, "e")}`, part: "e-" },
        { nom: "la fusion d’un noyau de deutérium et d’un noyau de tritium", fus: true, eq: `${nuc(2, 1, "H")} + ${nuc(3, 1, "H")} \\longrightarrow ${nuc(4, 2, "He")} + ${nuc(1, 0, "n")}` },
      ]);
      const masses = [];
      let mRe, mPr, dE, mPart = 0, lignes;
      const r6 = (x) => Math.round(x * 1e6) / 1e6;
      if (R.fus) {
        const d = r6(MD_X), t = r6(MT_X), he = r6(MHE_X), n = r6(MN_X);
        mRe = d + t; mPr = he + n; mPart = n;
        lignes = `$m\\left({}^{2}_{1}\\mathrm H\\right) = ${g6(d)}\\ \\text{u}$ ; $m\\left({}^{3}_{1}\\mathrm H\\right) = ${g6(t)}\\ \\text{u}$ ; $m\\left({}^{4}_{2}\\mathrm{He}\\right) = ${g6(he)}\\ \\text{u}$ ; $m(\\mathrm n) = ${g6(n)}\\ \\text{u}$`;
      } else {
        const mm = (k) => (k === "e-" ? r6(ME_X) : r6(mNoyau(k)));
        mRe = R.re.reduce((s, k) => s + mm(k), 0); mPr = R.pr.reduce((s, k) => s + mm(k), 0); mPart = mm(R.part);
        lignes = [...R.re, ...R.pr].map((k) => (k === "e-" ? `$m\\left(\\mathrm e\\right) = ${g6(mm(k))}\\ \\text{u}$` : `$m\\left(${nk(k)}\\right) = ${g6(mm(k))}\\ \\text{u}$`)).join(" ; ");
      }
      const dm = mPr - mRe; dE = dm * F;
      const tol = { rel: 0.015 };
      return {
        enonce: `<p>On étudie ${R.nom} :</p>$$${R.eq}$$<p>Masses des noyaux et de la particule : ${lignes}. On donne $1\\ \\text{u} = ${facTex(F)}$.</p>`,
        questions: [
          { type: "nombre", q: "Calcule $\\Delta E$ pour cette réaction, en MeV (avec son signe).", reponse: dE, tol, unite: "MeV", indice: "$\\Delta E = \\Delta m\\,c^{2}$, avec $\\Delta m = \\sum m(\\text{produits}) - \\sum m(\\text{réactifs})$.",
            pieges: pieges(dE, tol, [{ v: -dE, fb: "Tu as pris réactifs moins produits. $\\Delta E$ est négatif quand de l’énergie est libérée.", erreur: "produits − réactifs inversé (signe de ΔE)" }, { v: (mPr - mPart - mRe) * F, fb: "Tu as oublié la particule émise : elle pèse aussi, il faut la compter parmi les produits.", erreur: "particule émise oubliée (neutron, α, β)" }, { v: dm, fb: "Tu as laissé $\\Delta m$ en u : il reste à le convertir en MeV, en multipliant par la valeur de 1 u en MeV/c².", erreur: "× 931,5 oublié" }]) },
          { type: "nombre", q: "Calcule l’énergie libérée $E_{\\text{lib}} = |\\Delta E|$, en MeV.", reponse: Math.abs(dE), tol, unite: "MeV", indice: "L’énergie libérée est la valeur absolue de $\\Delta E$, quand $\\Delta E < 0$.",
            pieges: pieges(Math.abs(dE), tol, [{ v: (mPr - mPart - mRe) * F, fb: "Tu as oublié la particule émise dans le bilan des masses.", erreur: "particule émise oubliée (neutron, α, β)" }, { v: Math.abs(dm), fb: "Il reste à convertir $\\Delta m$ en MeV.", erreur: "× 931,5 oublié" }]) },
        ],
        correction: [
          { tex: `\\Delta m = \\sum m(\\text{produits}) - \\sum m(\\text{réactifs}) = ${g6(mPr)} - ${g6(mRe)} = ${g6(dm)}\\ \\text{u}`, r: "Après moins avant, particule émise comprise." },
          { tex: `\\Delta E = \\Delta m\\,c^{2} = ${g6(dm)} \\times ${num(F, 5)} \\approx ${num(dE, 3)}\\ \\text{MeV}`, r: "$\\Delta E < 0$ : de l’énergie est libérée." },
          { tex: `E_{\\text{lib}} = |\\Delta E| \\approx ${num(Math.abs(dE), 3)}\\ \\text{MeV}`, r: "L’énergie libérée est positive." },
        ],
      };
    },
  },

  /* 10 — bilan par les énergies de liaison (forme du sujet 2019 ou 2023) */
  {
    id: "nme-bilan-liaisons",
    titre: "Le bilan par les énergies de liaison",
    niveau: 3,
    capacites: CAPN("1.2.2.10", "1.2.2.11", "1.2.2.2"),
    erreurs: ["E_ℓ/A additionnées", "toutes les énergies additionnées", "sens inversé (ΔE de signe faux)"],
    gen(h) {
      const cas = h.pick(["rn", "po", "u", "fus"]);
      if (cas === "fus") {
        const lib = S23.lib, tol = { rel: 0.01 };
        return {
          enonce: `<p>Forme du sujet 2023 (valeurs imprimées dans le sujet) : fusion $${nuc(2, 1, "H")} + ${nuc(3, 1, "H")} \\longrightarrow ${nuc(4, 2, "He")} + ${nuc(1, 0, "n")}$. Énergies de liaison : $E_\\ell(^{2}\\mathrm{H}) = ${frTex(S23.h2, 3)}\\ \\text{MeV}$ ; $E_\\ell(^{3}\\mathrm{H}) = ${frTex(S23.h3, 3)}\\ \\text{MeV}$ ; $E_\\ell(^{4}\\mathrm{He}) = ${frTex(S23.he, 3)}\\ \\text{MeV}$.</p>`,
          questions: [
            { type: "nombre", q: "Calcule $\\Delta E$ pour cette réaction, en MeV (avec son signe).", reponse: -lib, tol, unite: "MeV", indice: "$\\Delta E = \\sum E_\\ell(\\text{réactifs}) - \\sum E_\\ell(\\text{produits})$ ; l’énergie de liaison du neutron seul est nulle.",
              pieges: pieges(-lib, tol, [{ v: lib, fb: "Tu as pris le sens inversé : on monte de ce qu’on défait (les réactifs), on descend de ce qu’on forme.", erreur: "sens inversé (ΔE de signe faux)" }, { v: S23.tout, fb: "Tu as tout additionné : on fournit celles des réactifs, on récupère celle du produit.", erreur: "toutes les énergies additionnées" }, { v: -S23.parA, fb: "Tu as additionné des $E_\\ell / A$ : ce sont les $E_\\ell$ qui s’additionnent.", erreur: "E_ℓ/A additionnées" }]) },
            { type: "nombre", q: "Calcule l’énergie libérée $E_{\\text{lib}}$, en MeV.", reponse: lib, tol, unite: "MeV", indice: "$E_{\\text{lib}} = |\\Delta E|$.",
              pieges: pieges(lib, tol, [{ v: S23.tout, fb: "Tu as tout additionné : l’énergie libérée est une différence.", erreur: "toutes les énergies additionnées" }, { v: S23.parA, fb: "Tu as additionné des $E_\\ell / A$ : on additionne les $E_\\ell$.", erreur: "E_ℓ/A additionnées" }]) },
          ],
          correction: [{ tex: `\\Delta E = \\left[E_\\ell(^{2}\\mathrm H) + E_\\ell(^{3}\\mathrm H)\\right] - E_\\ell(^{4}\\mathrm{He}) = ${frTex(S23.h2, 3)} + ${frTex(S23.h3, 3)} - ${frTex(S23.he, 3)} = ${frTex(-lib, 3)}\\ \\text{MeV}`, r: "On fournit celles des réactifs, on récupère celle du produit ; le neutron seul a une énergie de liaison nulle." }, { tex: `E_{\\text{lib}} = |\\Delta E| = ${frTex(lib, 3)}\\ \\text{MeV}`, r: "L’énergie libérée est positive." }],
        };
      }
      const [pere, fils] = { rn: ["222Rn", "218Po"], po: ["210Po", "206Pb"], u: ["238U", "234Th"] }[cas];
      const r2 = (k) => Math.round(ELA(k) * 100) / 100;
      const He = "4He", ePere = NUCL[pere].A * r2(pere), eFils = NUCL[fils].A * r2(fils), eHe = 4 * r2(He);
      const lib = Math.abs(eFils + eHe - ePere), tol = { rel: 0.02 };
      const fausse1 = Math.abs(r2(fils) + r2(He) - r2(pere)), fausse2 = ePere + eFils + eHe;
      return {
        enonce: `<p>Forme du sujet 2019 : la désintégration $${nk(pere)} \\longrightarrow ${nk(fils)} + ${nk(He)}$. Énergies de liaison par nucléon, en MeV/nucléon : ${$k(pere)} : $${frTex(r2(pere), 2)}$ ; ${$k(fils)} : $${frTex(r2(fils), 2)}$ ; ${$k(He)} : $${frTex(r2(He), 2)}$.</p>`,
        questions: [
          { type: "nombre", q: "Calcule $\\Delta E$ pour cette désintégration, en MeV (avec son signe).", reponse: -lib, tol, unite: "MeV", indice: "$\\Delta E = E_\\ell(\\text{père}) - \\left[E_\\ell(\\text{fils}) + E_\\ell(\\alpha)\\right]$, avec $E_\\ell = A \\times E_\\ell / A$.",
            pieges: pieges(-lib, tol, [{ v: lib, fb: "Tu as pris le sens inversé : $\\Delta E$ est négatif quand de l’énergie est libérée.", erreur: "sens inversé (ΔE de signe faux)" }, { v: -fausse1, fb: "Tu as additionné des $E_\\ell / A$ : il faut multiplier chacune par son nombre de nucléons $A$.", erreur: "E_ℓ/A additionnées" }, { v: fausse2, fb: "Tu as tout additionné : on fournit $E_\\ell$ du père, on récupère celles des fils.", erreur: "toutes les énergies additionnées" }]) },
          { type: "nombre", q: "Calcule l’énergie libérée $E_{\\text{lib}}$, en MeV.", reponse: lib, tol, unite: "MeV", indice: "$E_{\\text{lib}} = |\\Delta E|$.",
            pieges: pieges(lib, tol, [{ v: fausse1, fb: "Tu as additionné des $E_\\ell / A$ (le piège d’un QCM du bac 2019) : multiplie chacune par $A$.", erreur: "E_ℓ/A additionnées" }, { v: fausse2, fb: "Tu as tout additionné : l’énergie libérée est une différence.", erreur: "toutes les énergies additionnées" }]) },
        ],
        correction: [
          { tex: `E_\\ell(\\text{père}) = ${NUCL[pere].A} \\times ${frTex(r2(pere), 2)} = ${frTex(ePere, 2)}\\ \\text{MeV}`, r: "On multiplie par le nombre de nucléons." },
          { tex: `E_\\ell(\\text{fils}) + E_\\ell(\\alpha) = ${NUCL[fils].A} \\times ${frTex(r2(fils), 2)} + 4 \\times ${frTex(r2(He), 2)} = ${frTex(eFils + eHe, 2)}\\ \\text{MeV}`, r: "Les produits, particule α comprise." },
          { tex: `E_{\\text{lib}} = |\\Delta E| = \\left|${frTex(ePere, 2)} - ${frTex(eFils + eHe, 2)}\\right| = ${frTex(lib, 2)}\\ \\text{MeV}`, r: "Le père moins les produits, en valeur absolue." },
        ],
      };
    },
  },

  /* 11 — un diagramme d'énergie (forme du sujet 2020) */
  {
    id: "nme-diagramme",
    titre: "Lire un diagramme d’énergie",
    niveau: 3,
    capacites: CAPN("1.2.2.1", "1.2.2.3", "1.2.2.10", "1.2.2.11"),
    erreurs: ["l’écart le plus grand lu comme E_lib", "E_ℓ des produits prise pour celle du père", "MeV/c² lus comme des u", "facteur 931,41 dans le mauvais sens"],
    gen(h) {
      const F = h.pick(FACS), cle = h.pick(["210Po", "222Rn", "238U"]), [fils, , ] = ALPHA[cle];
      const nu = (k) => (NUCL[k].Z * MP_X + (NUCL[k].A - NUCL[k].Z) * MN_X) * F;     // énergie des nucléons séparés, en MeV
      const dmP = defaut(cle), dmF = defaut(fils), dmHe = defaut("4He");
      const eSep = nu(cle), ePere = eSep - dmP * F, eProd = eSep - dmF * F - dmHe * F;
      // on imprime les niveaux comme dans un sujet : 7 chiffres significatifs, en unités de 10⁵ MeV
      const rel = h.int(0, 1) === 1;
      const imp = (x) => Math.round((x / 1e5) * 1e6) / 1e6;
      const nSep = imp(eSep), nPere = imp(ePere), nProd = imp(eProd);
      const lib = Math.round((nPere - nProd) * 1e5 * 10) / 10, elP = Math.round((nSep - nPere) * 1e5 * 10) / 10, elProd = Math.round((nSep - nProd) * 1e5 * 10) / 10;
      const dmu = elP / F, dkg = dmu * 1.66e-27;
      const tolL = { abs: Math.max(0.25, 0.04 * lib) }, tolE = { rel: 0.01 }, tolM = { rel: 0.015 };
      const valTxt = (v) => (rel ? `${fg(Math.round((v - nSep) * 1e5 * 10) / 10, 1)} MeV` : `${fg(v, 6)} × 10⁵ MeV`);
      const y = [40, 40 + 150, 40 + 150 + 70];
      const fig = figureDiagramme({ coupe: !rel, niveaux: [{ y: y[0], nom: "nucléons séparés", val: valTxt(nSep) }, { y: y[1], nom: `${NUCL[cle].X}-${NUCL[cle].A}`, val: valTxt(nPere) }, { y: y[2], nom: `${NUCL[fils].X}-${NUCL[fils].A} + He-4`, val: valTxt(nProd) }] });
      return {
        enonce: `<p>Le diagramme d’énergie ci-dessous (forme du sujet 2020) concerne la désintégration α d’un noyau : $${nk(cle)} \\longrightarrow ${nk(fils)} + ${nk("4He")}$. Les niveaux ${rel ? "sont relatifs aux nucléons séparés" : "sont des énergies absolues, en MeV"}. On donne $1\\ \\text{u} = ${facTex(F)}$ et $1\\ \\text{u} = 1{,}66 \\times 10^{-27}\\ \\text{kg}$.</p>`,
        figure: fig,
        questions: [
          { type: "nombre", q: "Calcule l’énergie libérée $E_{\\text{lib}}$ par la désintégration d’un noyau, en MeV.", reponse: lib, tol: tolL, unite: "MeV", indice: "L’énergie libérée va du noyau père aux produits de la désintégration.",
            pieges: pieges(lib, tolL, [{ v: elProd, fb: "Tu as pris l’écart entre les nucléons séparés et les produits : ce n’est pas l’énergie libérée.", erreur: "l’écart le plus grand lu comme E_lib" }, { v: elP, fb: "C’est l’écart entre les nucléons séparés et le noyau père : $E_\\ell$ du père, pas l’énergie libérée.", erreur: "E_ℓ des produits prise pour celle du père" }]) },
          { type: "nombre", q: "Calcule l’énergie de liaison $E_\\ell$ du noyau père, en MeV.", reponse: elP, tol: tolE, unite: "MeV", indice: "L’énergie de liaison est l’écart entre les nucléons séparés et le noyau.",
            pieges: pieges(elP, tolE, [{ v: elProd, fb: "Tu as pris l’écart jusqu’aux produits : l’énergie de liaison du père s’arrête au noyau père.", erreur: "E_ℓ des produits prise pour celle du père" }, { v: lib, fb: "C’est l’énergie libérée, pas l’énergie de liaison du père.", erreur: "l’écart le plus grand lu comme E_lib" }]) },
          { type: "nombre", q: "Calcule le défaut de masse $\\Delta m$ du noyau père, en u.", reponse: dmu, tol: tolM, unite: "u", indice: "$E_\\ell = \\Delta m\\,c^{2}$ : on divise l’énergie de liaison par la valeur de 1 u en MeV/c².",
            pieges: pieges(dmu, tolM, [{ v: elP, fb: "Tu as lu des MeV/c² comme des u : divise par la valeur de 1 u en MeV/c².", erreur: "MeV/c² lus comme des u" }, { v: elP * F, fb: "Le facteur est dans le mauvais sens : pour passer de MeV/c² à u, on divise.", erreur: "facteur 931,41 dans le mauvais sens" }]) },
          { type: "nombre", q: "Exprime ce défaut de masse en kilogrammes.", reponse: dkg, tol: tolM, unite: "kg", indice: "On multiplie la valeur en u par $1{,}66 \\times 10^{-27}$.",
            pieges: pieges(dkg, tolM, [{ v: elP * 1.66e-27, fb: "Tu as converti des MeV/c² comme des u. Passe d’abord aux u.", erreur: "MeV/c² lus comme des u" }, { v: elP * F * 1.66e-27, fb: "Le facteur est dans le mauvais sens : on divise par la valeur de 1 u en MeV/c².", erreur: "facteur 931,41 dans le mauvais sens" }]) },
        ],
        correction: [
          { tex: `E_{\\text{lib}} = E(\\text{père}) - E(\\text{produits}) = ${frTex(lib, 1)}\\ \\text{MeV}`, r: "Du noyau père aux produits." },
          { tex: `E_\\ell(\\text{père}) = E(\\text{nucléons séparés}) - E(\\text{père}) = ${frTex(elP, 1)}\\ \\text{MeV}`, r: "Des nucléons séparés au noyau père." },
          { tex: `\\Delta m = \\dfrac{E_\\ell}{c^{2}} = \\dfrac{${frTex(elP, 1)}}{${num(F, 5)}} \\approx ${num(dmu, 4)}\\ \\text{u} \\approx ${num(dkg, 3)}\\ \\text{kg}`, r: "$E_\\ell = \\Delta m\\,c^{2}$ : on divise par la valeur de 1 u en MeV/c², puis on convertit en kilogrammes." },
        ],
      };
    },
  },

  /* 12 — l'énergie d'un échantillon */
  {
    id: "nme-echantillon",
    titre: "L’énergie libérée par un échantillon",
    niveau: 3,
    capacites: CAPN("1.2.2.11", "1.2.2.3"),
    erreurs: ["N_A oublié (calcul en moles)", "MeV non convertis en joules", "masse non convertie en grammes"],
    gen(h) {
      const cle = h.pick(["210Po", "222Rn", "238U"]), [fils] = ALPHA[cle];
      const lib = Math.round(-bilan([cle], [fils, "4He"], F931) * 100) / 100;
      const cas = cle === "238U" ? h.pick([[1, "1\\ \\text{g}"], [1e3, "1\\ \\text{kg}"]]) : h.pick([[1e-6, "1\\ \\mu\\text{g}"], [1e-3, "1\\ \\text{mg}"]]);
      const A = NUCL[cle].A, N = (cas[0] / A) * NA, E = N * lib * 1.6e-13, tol = { rel: 0.03 };
      const mol = cas[0] / A;
      return {
        enonce: `<p>Un échantillon de $m = ${cas[1]}$ ${deN(cle)} ${$k(cle)} se désintègre par radioactivité α. Chaque désintégration libère $E_{\\text{lib}} = ${frTex(lib, 2)}\\ \\text{MeV}$. On donne : $M = ${A}\\ \\text{g·mol}^{-1}$ ; $N_{\\mathrm A} = 6{,}02 \\times 10^{23}\\ \\text{mol}^{-1}$ ; $1\\ \\text{MeV} = 1{,}60 \\times 10^{-13}\\ \\text{J}$.</p><p>On suppose que tous les noyaux se désintègrent.</p>`,
        questions: [
          { type: "nombre", q: "Calcule le nombre $N$ de noyaux de l’échantillon.", reponse: N, tol, indice: "$N = \\dfrac{m}{M} \\times N_{\\mathrm A}$, avec $m$ en grammes.",
            pieges: pieges(N, tol, [{ v: mol, fb: "C’est la quantité de matière, en moles : il reste à multiplier par $N_{\\mathrm A}$.", erreur: "N_A oublié (calcul en moles)" }, { v: (cas[0] * 1e3 / A) * NA, fb: "Convertis la masse en grammes : $m$ et $M$ doivent avoir la même unité de masse.", erreur: "masse non convertie en grammes" }, { v: (cas[0] / 1e3 / A) * NA, fb: "Tu as converti en kilogrammes ; $M$ est en g·mol⁻¹, donc $m$ doit être en grammes.", erreur: "masse non convertie en grammes" }]) },
          { type: "nombre", q: "Calcule l’énergie totale libérée, en joules.", reponse: E, tol, unite: "J", indice: "$E = N \\times E_{\\text{lib}}$, avec $E_{\\text{lib}}$ converti en joules.",
            pieges: pieges(E, tol, [{ v: N * lib, fb: "Tu as laissé des MeV : il faut des joules, $1\\ \\text{MeV} = 1{,}60 \\times 10^{-13}\\ \\text{J}$.", erreur: "MeV non convertis en joules" }, { v: N * lib * 1.6e-19, fb: "Tu as converti avec la valeur de l’eV : un MeV vaut $1{,}60 \\times 10^{-13}$ J.", erreur: "MeV non convertis en joules" }, { v: mol * lib * 1.6e-13, fb: "Tu as oublié $N_{\\mathrm A}$ : $E$ se calcule avec le nombre de noyaux.", erreur: "N_A oublié (calcul en moles)" }]) },
        ],
        correction: [
          { tex: `N = \\dfrac{m}{M}\\,N_{\\mathrm A} = \\dfrac{${num(cas[0], 1)}\\ \\text{g}}{${A}\\ \\text{g·mol}^{-1}} \\times 6{,}02 \\times 10^{23} \\approx ${num(N, 3)}`, r: "$m$ en grammes, $M$ en g·mol⁻¹." },
          { tex: `E = N \\times E_{\\text{lib}} = ${num(N, 3)} \\times ${frTex(lib, 2)} \\times 1{,}60 \\times 10^{-13} \\approx ${num(E, 3)}\\ \\text{J}`, r: "On convertit les MeV en joules." },
        ],
      };
    },
  },

  /* 13 — usages et dangers de la radioactivité */
  {
    id: "nme-usages-dangers",
    titre: "Usages et dangers de la radioactivité : vrai ou faux",
    niveau: 1,
    capacites: CAPN("1.2.2.12", "1.2.2.13"),
    erreurs: ["désintégration prise pour une fission", "irradiation et contamination confondues"],
    gen(h) {
      const L = [
        { a: "Un stimulateur cardiaque au plutonium 238 fonctionne grâce à des fissions de noyaux de plutonium.", v: false, why: "Le plutonium 238 émet des particules α : c’est une désintégration, pas une fission.", erreur: "désintégration prise pour une fission" },
        { a: "Une personne qui a inhalé des poussières radioactives reste exposée après avoir quitté la zone.", v: true, why: "La source est dans son corps : c’est une contamination interne, qui dure tant que la source y est.", erreur: "irradiation et contamination confondues" },
        { a: "Une irradiation externe cesse quand la source est écartée ou protégée.", v: true, why: "L’irradiation externe dépend de la position de la source par rapport à la personne.", erreur: "irradiation et contamination confondues" },
        { a: "L’imagerie médicale TEP utilise le fluor 18, un émetteur β⁺.", v: true, why: "Le fluor 18 émet un positon : c’est la radioactivité β⁺.", erreur: "désintégration prise pour une fission" },
        { a: "L’iode 131 est utilisé pour soigner la thyroïde.", v: true, why: "L’iode 131 est un émetteur β⁻ utilisé en médecine nucléaire (sujet 2022).", erreur: "désintégration prise pour une fission" },
        { a: "À faible dose, les rayonnements ionisants ne présentent aucun risque pour la santé.", v: false, why: "À faible dose, ils peuvent accroître le risque de cancer à long terme (OMS).", erreur: "irradiation et contamination confondues" },
        { a: "Une centrale nucléaire produit de l’électricité à partir de fissions de noyaux lourds.", v: true, why: "La fission libère environ 185 MeV par noyau d’uranium 235 : c’est l’énergie récupérée.", erreur: "désintégration prise pour une fission" },
      ];
      const choisis = h.melange(L).slice(0, 4);
      return {
        enonce: "<p>Pour chaque affirmation, réponds par vrai ou faux.</p>",
        questions: choisis.map((c, i) => ({
          type: "qcm", q: `Affirmation ${i + 1} : ${c.a}`,
          options: [{ t: "Vrai", ok: c.v, fb: c.v ? undefined : `Cette affirmation est fausse. ${c.why}`, erreur: c.erreur }, { t: "Faux", ok: !c.v, fb: c.v ? `Cette affirmation est vraie. ${c.why}` : undefined, erreur: c.erreur }],
        })),
        correction: choisis.map((c, i) => ({ t: `Affirmation ${i + 1} : ${c.v ? "vrai" : "faux"}. ${c.why}` })),
      };
    },
  },

  /* 14 — vrai ou faux avec justification (forme du sujet 2023) */
  {
    id: "nme-vrai-faux",
    titre: "Vrai ou faux, en justifiant (forme du bac)",
    niveau: 2,
    capacites: CAPN("1.2.2.1", "1.2.2.2", "1.2.2.5"),
    erreurs: ["E_ℓ vue comme une réserve que le noyau libère", "la masse se conserve", "comparer E_ℓ au lieu de E_ℓ/A"],
    gen(h) {
      const k = h.pick(["3H", "3He", "4He", "7Li", "16O", "56Fe", "235U"]), Ek = EL(k);
      const vrai = h.int(0, 1) === 1;
      const [a, b] = h.pick([["208Pb", "56Fe"], ["235U", "92Kr"], ["238U", "94Sr"]]);
      const [x, y] = h.int(0, 1) ? [a, b] : [b, a];
      const plusStable = ELA(x) > ELA(y) ? x : y, moins = plusStable === x ? y : x;
      const bVrai = h.int(0, 1) === 1, claim = bVrai ? plusStable : moins, ref = bVrai ? moins : plusStable;
      const cVrai = h.int(0, 1) === 1;
      const Q = (q, v, justif, erreur) => ({ type: "qcm", q, options: [{ t: "Vrai", ok: v, fb: v ? undefined : `Cette affirmation est fausse. ${justif}`, erreur }, { t: "Faux", ok: !v, fb: v ? `Cette affirmation est vraie. ${justif}` : undefined, erreur }] });
      const r1 = (v) => Math.round(v * 10) / 10;
      return {
        enonce: `<p>Pour chaque affirmation, réponds par vrai ou faux, en t’appuyant sur la justification de la correction.</p>`,
        questions: [
          Q(vrai ? `L’énergie qu’il faut fournir à un noyau ${deN(k)} au repos pour le dissocier en ses nucléons au repos est de $${num(Ek, 3)}\\ \\text{MeV}$.` : `Un noyau ${deN(k)} au repos libère $${num(Ek, 3)}\\ \\text{MeV}$ en se dissociant en ses nucléons au repos.`, vrai, vrai ? `C’est la définition de l’énergie de liaison.` : `Pour dissocier un noyau, il faut lui fournir son énergie de liaison : il ne la libère pas.`, "E_ℓ vue comme une réserve que le noyau libère"),
          Q(`${$k(claim)} ($E_\\ell = ${frTex(r1(ELT(claim)), 1)}\\ \\text{MeV}$) est plus stable que ${$k(ref)} ($E_\\ell = ${frTex(r1(ELT(ref)), 1)}\\ \\text{MeV}$).`, bVrai, `On compare $E_\\ell / A$ : ${$k(plusStable)} a ${frTex(ELA(plusStable), 2)} MeV/nucléon, ${$k(moins)} a ${frTex(ELA(moins), 2)}.`, "comparer E_ℓ au lieu de E_ℓ/A"),
          cVrai ? Q("Lors d’une réaction de fission nucléaire, de la masse est convertie en énergie.", true, "La masse des produits est plus petite que celle des réactifs : la différence devient de l’énergie, $E = \\Delta m\\,c^{2}$.", "la masse se conserve")
            : Q("La masse d’un noyau atomique est égale à la somme des masses de ses nucléons.", false, "La masse d’un noyau est plus petite que la somme des masses de ses nucléons : le défaut de masse est positif.", "la masse se conserve"),
        ],
        correction: [
          { t: vrai ? `L’énergie à fournir pour dissocier le noyau est son énergie de liaison : $E_\\ell \\approx ${num(Ek, 3)}\\ \\text{MeV}$. Vrai.` : `Le noyau ne libère pas son énergie de liaison en se dissociant : il faut la lui fournir. Faux.` },
          { t: `On compare $E_\\ell / A$ : ${$k(plusStable)} a ${frTex(ELA(plusStable), 2)} MeV/nucléon, ${$k(moins)} a ${frTex(ELA(moins), 2)}. L’affirmation est ${bVrai ? "vraie" : "fausse"}.` },
          { t: cVrai ? "Dans une fission, la masse des produits est inférieure à celle des réactifs : la masse manquante devient de l’énergie. Vrai." : "La masse d’un noyau est inférieure à la somme des masses de ses nucléons : $\\Delta m > 0$. Faux." },
        ],
      };
    },
  },
];
