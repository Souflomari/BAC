// @ts-nocheck
/**
 * Les exercices de la leçon « Le dipôle RL » (V3). Format : voir modele.js.
 * Chaque réponse est calculée ici, à partir des fonctions de dipole-rl-outils.js ; le vérificateur
 * (scripts/pilotes-exercices.mjs) rejoue des centaines de tirages. Un leurre calculé qui retombe sur la
 * bonne réponse (à deux tolérances près) est retiré du tirage (`pieges`) ; et les tirages où deux
 * grandeurs de natures différentes ont le même chiffre (E = 12 V et I₀ = 12 mA ; une résistance totale
 * de 1 000 Ω, où E/(R + r) en mA vaut E ; r trop petite devant R + r) sont REJETÉS (`tire`) : la
 * règle B3, « un leurre mène toujours à un résultat faux ».
 *
 * Capacités : pc-pc / pc-sm 1.3.2.x, et pc-svt, dont la numérotation est décalée à partir du 13ᵉ tiret
 * (1.3.2.13 de PC et SM = 1.3.2.14 de SVT ; 1.3.2.14 = 1.3.2.15 ; 1.3.2.15, l'établissement de l'énergie,
 * n'existe pas en SVT : le gabarit qui le travaille porte `filieres: ["PC", "SM"]`). `pc-svt 1.3.2.13`
 * (l'intérêt d'un montage RL) n'a pas de gabarit : la réponse attendue n'est pas établie sur un sujet.
 * Les valeurs de composants sont tirées dans les séries usuelles (E12) ; les sujets 2023 et 2024 sont
 * rejoués avec leurs valeurs imprimées dans la leçon, pas ici. Aucun gabarit ne teste la diode de roue
 * libre, la linéarisation ou le temps de seuil (hors programme).
 */
import { frTex, sciTex } from "./nombre.js";
import { P63, P37, energie } from "../dipole-rl-outils.js";

const MAP_SVT = { "1.3.2.13": "1.3.2.14", "1.3.2.14": "1.3.2.15" };
/** les capacités d'un gabarit dans les trois cadres (PC et SM : mêmes identifiants ; SVT : décalés) */
const CAPR = (...ids) => ids.flatMap((id) => [`pc-pc ${id}`, `pc-sm ${id}`, ...(id === "1.3.2.15" ? [] : [`pc-svt ${MAP_SVT[id] || id}`])]);
const CAPR_PCSM = (...ids) => ids.flatMap((id) => [`pc-pc ${id}`, `pc-sm ${id}`]);

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
/** un tirage accepté : on retire jusqu'à 80 fois ; `ok` rejette les coïncidences de chiffres */
function tire(f, ok) {
  let t = f();
  for (let i = 0; i < 80 && !ok(t); i++) t = f();
  return t;
}
const sci = (x, c = 2) => sciTex(x, c);
/** un nombre à n chiffres significatifs, pour KaTeX */
const num = (x, n = 3) => {
  const a = Math.abs(x);
  if (a !== 0 && (a >= 1e5 || a < 1e-3)) return sci(x, n);
  const e = Math.floor(Math.log10(a || 1));
  return frTex(x, Math.max(0, n - 1 - e));
};
const prox = (a, b, rel = 0.02) => Math.abs(a - b) <= rel * Math.max(Math.abs(a), Math.abs(b));
const E12 = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
const pref = (x, liste) => { for (const [m, nom] of liste) if (Math.abs(x) >= m * 0.9999) return [x / m, nom]; const l = liste[liste.length - 1]; return [x / l[0], l[1]]; };
const tSI = (t) => pref(t, [[1, "s"], [1e-3, "ms"], [1e-6, "µs"]]);
const UT = { s: 1, ms: 1e-3, "µs": 1e-6 };
const uTex = (u) => (u === "µs" ? "\\mu\\text{s}" : `\\text{${u}}`);
/** une durée pour KaTeX : la mantisse et son unité */
const tTex = (t) => { const [v, u] = tSI(t); return `${num(v, 3)}\\ ${uTex(u)}`; };
/** un tirage rejeté s'il rend une valeur de tension et une valeur de courant (en mA) égales */
const memeChiffre = (a, b) => prox(a, b, 0.03);

/* ---------- les figures, en SVG (des jetons de couleur seulement) ---------- */
const f1 = (v) => v.toFixed(1);
const et = (t) => String(t).replace(/_([A-Za-z]+)/g, '<tspan dy="4" font-size="10">$1</tspan><tspan dy="-4">\u200b</tspan>');
const encre = "var(--color-text-primary)", gris = "var(--color-text-secondary)", accent = "var(--color-signal)";
const lbl = (x) => { const s = String(Number(x.toPrecision(6))); return s.replace(".", ","); };
/** des graduations « rondes » : un pas parmi 1, 2, 5 × 10^k qui donne entre 4 et 8 divisions */
function pas(max) {
  const e = Math.floor(Math.log10(max / 5));
  for (const m of [1, 2, 5, 10]) if (max / (m * 10 ** e) <= 8) return m * 10 ** e;
  return 10 ** (e + 1);
}
/** un repère : axes gradués (l'axe horizontal passe par y = 0), des courbes (listes de points) et des points */
function figure({ x1, y0 = 0, y1, xs, ys, xn, yn, courbes, droites = [], points = [], aria }) {
  const L = 84, R = 600, T = 26, B = 262, X = (x) => L + ((R - L) * x) / x1, Y = (y) => B - ((B - T) * (y - y0)) / (y1 - y0), Z = Y(0);
  let g = `<line x1="${L}" x2="${R + 8}" y1="${f1(Z)}" y2="${f1(Z)}" stroke="${encre}" stroke-width="1.5"/><line x1="${L}" x2="${L}" y1="${T - 8}" y2="${B}" stroke="${encre}" stroke-width="1.5"/>`;
  for (const v of xs) g += `<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(Z)}" y2="${f1(Z + 5)}" stroke="${encre}"/><text x="${f1(X(v))}" y="${f1(Math.max(Z, B) + 22)}" text-anchor="middle" font-size="14" fill="${gris}">${lbl(v)}</text>`;
  for (const v of ys) g += `<line x1="${L - 5}" x2="${L}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" stroke="${encre}"/><text x="${L - 9}" y="${f1(Y(v) + 5)}" text-anchor="end" font-size="14" fill="${gris}">${lbl(v)}</text>`;
  for (const c of courbes) g += `<path d="${c.map(([x, y], i) => `${i ? "L" : "M"}${f1(X(x))} ${f1(Y(y))}`).join("")}" fill="none" stroke="${encre}" stroke-width="2.5"/>`;
  for (const [xa, ya, xb, yb] of droites) g += `<line x1="${f1(X(xa))}" y1="${f1(Y(ya))}" x2="${f1(X(xb))}" y2="${f1(Y(yb))}" stroke="${accent}" stroke-width="2" stroke-dasharray="6 5"/>`;
  for (const [x, y] of points) g += `<circle cx="${f1(X(x))}" cy="${f1(Y(y))}" r="4" fill="${accent}"/>`;
  g += `<text x="${R + 8}" y="${B + 46}" text-anchor="end" font-size="14" fill="${encre}">${et(xn)}</text><text x="${L + 8}" y="${T - 10}" font-size="14" fill="${encre}">${et(yn)}</text>`;
  return `<svg viewBox="0 0 640 ${B + 56}" role="img" aria-label="${aria}">${g}</svg>`;
}
const echant = (f, a, b, n = 120) => Array.from({ length: n + 1 }, (_, k) => { const x = a + ((b - a) * k) / n; return [x, f(x)]; });
/** un écran d'oscilloscope : 10 divisions de large, 8 de haut ; la montée de u_R et sa tangente à l'origine */
function figureOscillo({ hNe, divTau }) {
  const L = 30, T = 14, W = 560, H = 224, dx = W / 10, dy = H / 8;
  let g = "";
  for (let i = 0; i <= 10; i++) g += `<line x1="${f1(L + i * dx)}" x2="${f1(L + i * dx)}" y1="${T}" y2="${T + H}" stroke="${gris}" stroke-width="${i % 5 ? 0.6 : 1.2}"/>`;
  for (let j = 0; j <= 8; j++) g += `<line x1="${L}" x2="${L + W}" y1="${f1(T + j * dy)}" y2="${f1(T + j * dy)}" stroke="${gris}" stroke-width="${j % 4 ? 0.6 : 1.2}"/>`;
  const X = (d) => L + d * dx, Y = (v) => T + H - v * dy;
  let d = "";
  for (let i = 0; i <= 100; i++) { const x = (10 * i) / 100; d += `${i ? "L" : "M"}${f1(X(x))} ${f1(Y(hNe * (1 - Math.exp(-x / divTau))))}`; }
  g += `<path d="${d}" fill="none" stroke="${encre}" stroke-width="2.5"/>`;
  g += `<line x1="${f1(X(0))}" y1="${f1(Y(0))}" x2="${f1(X(divTau))}" y2="${f1(Y(hNe))}" stroke="${accent}" stroke-width="2" stroke-dasharray="6 5"/>`;
  g += `<line x1="${f1(X(0))}" x2="${f1(X(10))}" y1="${f1(Y(hNe))}" y2="${f1(Y(hNe))}" stroke="${encre}" stroke-width="1.2" stroke-dasharray="3 5"/>`;
  return `<svg viewBox="0 0 ${L + W + 20} ${T + H + 20}" role="img" aria-label="Écran d’un oscilloscope : la montée de la tension aux bornes du conducteur ohmique et sa tangente à l’origine">${g}</svg>`;
}

const Lsmall = [10, 15, 22, 33, 47, 68, 100, 150, 220, 330, 470, 680];   // mH
const Rserie = (h) => h.pick(E12) * h.pick([10, 100]);

export const EXERCICES = [
  /* 1 : les unités : henrys, ohms, τ = L/(R + r) et I₀ */
  {
    id: "rl-unites",
    titre: "Les unités : mH, ohms, τ = L/(R + r) et I₀",
    niveau: 1,
    capacites: CAPR("1.3.2.3", "1.3.2.9", "1.3.2.10"),
    erreurs: ["r oubliée dans τ", "R/L : τ inversé", "préfixe non converti", "µ et m confondus"],
    gen(h) {
      const T = tire(() => ({ Lm: h.pick(Lsmall), R: Rserie(h), r: h.pick([2, 5, 10, 15, 20, 30]), E: h.pick([3, 6, 9, 12, 24]) }), (t) => {
        const Rt = t.R + t.r, tau = (t.Lm * 1e-3) / Rt;
        return t.r / Rt >= 0.05 && tau >= 2e-5 && tau <= 0.5 && !memeChiffre(t.E, (t.E / Rt) * 1e3);
      });
      const Rt = T.R + T.r, L = T.Lm * 1e-3, tau = L / Rt, [tv, tu] = tSI(tau), I0 = (T.E / Rt) * 1e3, tol = { rel: 0.02 };
      return {
        enonce: `<p>Une bobine d’inductance $L = ${num(T.Lm, 3)}\\ \\text{mH}$ et de résistance $r = ${num(T.r, 3)}\\ \\Omega$ est montée en série avec un conducteur ohmique de résistance $R = ${num(T.R, 3)}\\ \\Omega$ et un générateur de tension $E = ${num(T.E, 3)}\\ \\text{V}$.</p>`,
        questions: [
          { type: "nombre", q: "Exprime $L$ en henrys.", reponse: L, tol, unite: "H", indice: "Un préfixe est une puissance de dix : m vaut $10^{-3}$, µ vaut $10^{-6}$.",
            pieges: pieges(L, tol, [{ v: T.Lm, fb: "Tu as laissé la valeur du préfixe : il reste à multiplier par $10^{-3}$.", erreur: "préfixe non converti" }, { v: T.Lm * 1e-6, fb: "Tu as lu mH comme µH. m vaut $10^{-3}$, µ vaut $10^{-6}$.", erreur: "µ et m confondus" }]) },
          { type: "nombre", q: `Calcule la constante de temps $\\tau$ du circuit, en ${tu}.`, reponse: tv, tol, unite: tu, indice: "$\\tau = \\dfrac{L}{R + r}$ : convertis $L$ en henrys avant de diviser, et n’oublie pas $r$.",
            pieges: pieges(tv, tol, [{ v: L / T.R / UT[tu], fb: "Tu as oublié $r$. La résistance totale du circuit est $R + r$ : $\\tau = L/(R + r)$.", erreur: "r oubliée dans τ" }, { v: Rt / L, fb: "Tu as calculé $(R + r)/L$, qui est en s⁻¹. La constante de temps est l’inverse : $L/(R + r)$, en secondes.", erreur: "R/L : τ inversé" }, { v: T.Lm / Rt / UT[tu], fb: "Tu as laissé $L$ en mH. Convertis $L$ en henrys avant de diviser.", erreur: "préfixe non converti" }]) },
          { type: "nombre", q: "Calcule l’intensité $I_0$ en régime permanent, en mA.", reponse: I0, tol, unite: "mA", indice: "En courant constant, la bobine se comporte comme un conducteur ohmique de résistance $r$ : $I_0 = E/(R + r)$.",
            pieges: pieges(I0, tol, [{ v: (T.E / T.R) * 1e3, fb: "Tu as oublié $r$. En régime permanent, la bobine n’est plus que sa résistance $r$, en série avec $R$.", erreur: "r oubliée dans τ" }, { v: T.E / Rt, fb: "Cette valeur est en ampères : l’énoncé demande des mA.", erreur: "préfixe non converti" }]) },
        ],
        correction: [
          { tex: `L = ${num(T.Lm, 3)}\\ \\text{mH} = ${num(L, 3)}\\ \\text{H}`, r: "On remplace le préfixe par sa puissance de dix." },
          { tex: `\\tau = \\dfrac{L}{R + r} = \\dfrac{${num(L, 3)}}{${num(Rt, 3)}} \\approx ${tTex(tau)}`, r: "$L$ en henrys, $R + r$ en ohms : $\\tau$ sort en secondes (ici converties)." },
          { tex: `I_0 = \\dfrac{E}{R + r} = \\dfrac{${num(T.E, 3)}}{${num(Rt, 3)}} \\approx ${num(I0, 3)}\\ \\text{mA}`, r: "Le régime permanent : $\\text{d}i/\\text{d}t = 0$." },
        ],
      };
    },
  },

  /* 2 : la tension aux bornes d'une bobine : u = r·i + L·di/dt, par morceaux */
  {
    id: "rl-tension-bobine",
    titre: "La tension d’une bobine : u = r i + L di/dt",
    niveau: 1,
    capacites: CAPR("1.3.2.2", "1.3.2.3"),
    erreurs: ["L·i au lieu de L·di/dt", "r·i oublié", "signe de di/dt", "u continue"],
    gen(h) {
      const T = tire(() => ({ L: h.pick([0.05, 0.1, 0.2, 0.5, 1]), r: h.pick([5, 10, 20, 30]), i1: h.pick([0.05, 0.1, 0.15, 0.2]), di: h.pick([0.1, 0.2, 0.3]), dt: h.pick([2, 4, 5, 10, 20]), monte: h.int(0, 1) === 1 }), (t) => {
        const p = t.di / (t.dt * 1e-3), lp = t.L * p;
        return (t.monte || t.i1 > t.di + 0.04) && t.r * t.i1 >= 0.08 * lp && t.r * t.i1 <= 0.8 * lp && !prox(t.L * t.i1, lp, 0.05);
      });
      const sg = T.monte ? 1 : -1, ia = T.i1, ib = T.i1 + sg * T.di, p = (sg * T.di) / (T.dt * 1e-3), tol = { rel: 0.02 };
      const iDebut = ia, uRamp = T.r * iDebut + T.L * p, uPal = T.r * ib, saut = T.L * Math.abs(p);
      const pts = [[0, ia], [T.dt, ib], [2 * T.dt, ib]];
      const figure_ = figure({ x1: 2 * T.dt, y0: 0, y1: Math.max(ia, ib) * 1.15, xs: [0, T.dt, 2 * T.dt], ys: [0, ia, ib].filter((v, k, a) => a.indexOf(v) === k), xn: "t (ms)", yn: "i (A)", courbes: [pts], aria: "Le courant i en fonction du temps : une rampe, puis un palier" });
      return {
        enonce: `<p>Une bobine d’inductance $L = ${num(T.L, 3)}\\ \\text{H}$ et de résistance $r = ${num(T.r, 3)}\\ \\Omega$ est parcourue par un courant $i(t)$ : il ${T.monte ? "croît" : "décroît"} régulièrement de $${num(ia, 3)}\\ \\text{A}$ à $${num(ib, 3)}\\ \\text{A}$ en $${num(T.dt, 3)}\\ \\text{ms}$, puis reste constant. On travaille en convention récepteur : $u = r\\,i + L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t}$.</p>`,
        figure: figure_,
        questions: [
          { type: "nombre", q: `Calcule la tension $u$ à l’instant où $i = ${num(ia, 3)}\\ \\text{A}$, pendant la rampe, en V.`, reponse: uRamp, tol, unite: "V", indice: `Sur la rampe, $\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} = \\dfrac{\\Delta i}{\\Delta t} = ${num(p, 3)}\\ \\text{A·s}^{-1}$, avec $\\Delta t$ en secondes.`,
            pieges: pieges(uRamp, tol, [{ v: T.L * ia + T.r * ia, fb: "Tu as multiplié $L$ par $i$. La bobine répond à la variation de $i$ : c’est $L\\,\\mathrm{d}i/\\mathrm{d}t$, pas $L\\,i$.", erreur: "L·i au lieu de L·di/dt" }, { v: T.L * p, fb: "Tu as oublié $r\\,i$. La bobine réelle a une résistance : $u = r\\,i + L\\,\\mathrm{d}i/\\mathrm{d}t$.", erreur: "r·i oublié" }, { v: T.r * ia - T.L * p, fb: "Tu as perdu le signe de $\\mathrm{d}i/\\mathrm{d}t$ : ici $i$ " + (T.monte ? "croît, donc la pente est positive." : "décroît, donc la pente est négative."), erreur: "signe de di/dt" }]) },
          { type: "nombre", q: `Calcule la tension $u$ une fois le courant constant, $i = ${num(ib, 3)}\\ \\text{A}$, en V.`, reponse: uPal, tol, unite: "V", indice: "Quand $i$ est constant, $\\mathrm{d}i/\\mathrm{d}t = 0$ : que reste-t-il dans $u = r\\,i + L\\,\\mathrm{d}i/\\mathrm{d}t$ ?",
            pieges: pieges(uPal, tol, [{ v: 0, fb: "Tu as oublié $r\\,i$. En courant constant, il reste $u = r\\,i$ : la bobine se comporte comme un conducteur ohmique de résistance $r$.", erreur: "r·i oublié" }, { v: T.L * ib, fb: "Tu as multiplié $L$ par $i$. $L$ multiplie $\\mathrm{d}i/\\mathrm{d}t$, qui est nul ici.", erreur: "L·i au lieu de L·di/dt" }]) },
          { type: "qcm", q: "À la fin de la rampe, quand $i$ devient constant, la tension $u$…", options: h.melange([
            { t: `saute de $${num(saut, 3)}\\ \\text{V}$ : $i$ est continu, $u$ ne l’est pas`, ok: true },
            { t: "est continue, comme $i$", fb: "Tu as fait de $u$ une grandeur continue. C’est $i$ qui l’est : $u$ peut sauter, car $L\\,\\mathrm{d}i/\\mathrm{d}t$ passe d’une valeur non nulle à 0.", erreur: "u continue" },
            { t: "ne change pas, la bobine garde sa tension", fb: "Tu as supposé que $u$ ne dépend pas de la pente. Le terme $L\\,\\mathrm{d}i/\\mathrm{d}t$ disparaît quand $i$ devient constant : $u$ saute.", erreur: "L·i au lieu de L·di/dt" }]) },
        ],
        correction: [
          { tex: `\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} = \\dfrac{${num(ib - ia, 3)}}{${num(T.dt * 1e-3, 3)}} = ${num(p, 3)}\\ \\text{A·s}^{-1}`, r: "La pente de $i$ sur la rampe, avec la durée en secondes." },
          { tex: `u = r\\,i + L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} = ${num(T.r, 3)} \\times ${num(ia, 3)} + ${num(T.L, 3)} \\times ${num(p, 3)} = ${num(uRamp, 3)}\\ \\text{V}`, r: "Sur la rampe, les deux termes comptent." },
          { tex: `u = r\\,i = ${num(T.r, 3)} \\times ${num(ib, 3)} = ${num(uPal, 3)}\\ \\text{V}`, r: "Sur le palier, il ne reste que $r\\,i$." },
        ],
      };
    },
  },

  /* 3 : un courant triangulaire : des créneaux, et L */
  {
    id: "rl-triangle",
    titre: "Un courant triangulaire : la tension en créneaux et L",
    niveau: 2,
    capacites: CAPR("1.3.2.4", "1.3.2.2"),
    erreurs: ["Δt oublié", "rapport inversé", "u lue en bout de rampe", "u triangle comme i"],
    gen(h) {
      const T = tire(() => ({ L: h.pick([0.1, 0.2, 0.3, 0.5, 1]), r: h.pick([5, 10, 20]), im: h.pick([10, 20, 30, 40]), dm: h.pick([2, 4, 5, 10]) }), (t) => {
        const pente = (2 * t.im * 1e-3) / (t.dm * 1e-3), u = t.L * pente, ur = t.r * t.im * 1e-3;
        return ur / u >= 0.05 && ur / u <= 0.3 && !prox(t.L, 1 / pente, 0.1) && !memeChiffre(u, t.im);
      });
      const di = 2 * T.im * 1e-3, pente = di / (T.dm * 1e-3), u0 = T.L * pente, ur = T.r * T.im * 1e-3, ubout = u0 + ur, tol = { rel: 0.03 };
      const uF = (t) => { const p = ((t % (2 * T.dm)) + 2 * T.dm) % (2 * T.dm), mont = p < T.dm, i = (mont ? -T.im + (2 * T.im * p) / T.dm : T.im - (2 * T.im * (p - T.dm)) / T.dm) * 1e-3; return T.r * i + T.L * (mont ? pente : -pente); };
      const umax = Math.ceil((ubout * 1.15) / pas(ubout)) * pas(ubout);
      const fig = figure({ x1: 4 * T.dm, y0: -umax, y1: umax, xs: [0, T.dm, 2 * T.dm, 3 * T.dm, 4 * T.dm], ys: [-u0, 0, u0].map((v) => Number(v.toPrecision(3))), xn: "t (ms)", yn: "u (V)", courbes: [echant(uF, 0, 4 * T.dm, 200)], points: [[T.dm / 2, uF(T.dm / 2)]], aria: "La tension aux bornes de la bobine : des créneaux" });
      return {
        enonce: `<p>Un générateur impose à une bobine de résistance $r = ${num(T.r, 3)}\\ \\Omega$ un courant triangulaire, qui varie de $-${num(T.im, 3)}\\ \\text{mA}$ à $+${num(T.im, 3)}\\ \\text{mA}$ en $${num(T.dm, 3)}\\ \\text{ms}$, puis revient. La figure montre la tension $u$ à ses bornes. Là où $i = 0$ (point repéré sur la figure), $r\\,i$ est nul et on lit $u = ${num(u0, 3)}\\ \\text{V}$.</p>`,
        figure: fig,
        questions: [
          { type: "nombre", q: "Calcule la pente $\\mathrm{d}i/\\mathrm{d}t$ de $i$ sur une rampe montante, en A·s⁻¹.", reponse: pente, tol, unite: "A·s⁻¹", indice: "La variation de $i$ est de $-I_m$ à $+I_m$ ; la durée de la rampe est donnée en ms.",
            pieges: pieges(pente, tol, [{ v: di / T.dm, fb: "Tu as laissé la durée en ms. Pour une pente en A·s⁻¹, il faut des secondes.", erreur: "Δt oublié" }, { v: T.im * 1e-3 / (T.dm * 1e-3), fb: "Tu as pris $I_m$ au lieu de la variation $2I_m$ : sur la rampe, $i$ passe de $-I_m$ à $+I_m$.", erreur: "Δt oublié" }]) },
          { type: "nombre", q: "Détermine l’inductance $L$ de la bobine, en H.", reponse: T.L, tol, unite: "H", indice: "Là où $i = 0$ : $u = L\\,\\mathrm{d}i/\\mathrm{d}t$, donc $L$ est $u$ divisée par la pente.",
            pieges: pieges(T.L, tol, [{ v: u0 / di, fb: "Tu as divisé $u$ par la variation $\\Delta i$ sans la durée. $L$ est $u$ divisée par la pente $\\Delta i/\\Delta t$, en A·s⁻¹.", erreur: "Δt oublié" }, { v: pente / u0, fb: "Tu as inversé le rapport. L’unité tranche : V divisé par A·s⁻¹ donne des henrys.", erreur: "rapport inversé" }, { v: ubout / pente, fb: "Tu as lu $u$ en bout de rampe, où $r\\,i$ s’ajoute. Lis $u$ là où $i = 0$.", erreur: "u lue en bout de rampe" }]) },
          { type: "qcm", q: "La tension $u$ aux bornes de la bobine est…", options: h.melange([
            { t: "faite de créneaux : elle change de signe quand la pente de $i$ change", ok: true },
            { t: "un triangle aussi, comme $i$", fb: "Tu as supposé que $u$ suit $i$. $u = r\\,i + L\\,\\mathrm{d}i/\\mathrm{d}t$ dépend surtout de la pente de $i$, pas de sa valeur.", erreur: "u triangle comme i" },
            { t: "presque nulle, car $i$ revient à zéro", fb: "Tu as lu la valeur moyenne de $i$. La pente de $i$ est constante sur chaque rampe : $L\\,\\mathrm{d}i/\\mathrm{d}t$ ne s’annule pas.", erreur: "u triangle comme i" }]) },
        ],
        correction: [
          { tex: `\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} = \\dfrac{${num(di, 3)}}{${num(T.dm * 1e-3, 3)}} = ${num(pente, 3)}\\ \\text{A·s}^{-1}`, r: "La pente d’une rampe, avec la durée en secondes." },
          { tex: `L = \\dfrac{u}{\\mathrm{d}i/\\mathrm{d}t} = \\dfrac{${num(u0, 3)}}{${num(pente, 3)}} = ${num(T.L, 3)}\\ \\text{H}`, r: "Là où $i = 0$, $u = L\\,\\mathrm{d}i/\\mathrm{d}t$." },
        ],
      };
    },
  },

  /* 4 : la résistance r, lue en régime permanent (forme du sujet 2020) */
  {
    id: "rl-r-palier",
    titre: "La résistance r de la bobine, en régime permanent",
    niveau: 2,
    capacites: CAPR("1.3.2.4", "1.3.2.7"),
    erreurs: ["r = E/I₀", "r = 0 en régime permanent", "I₀/u au lieu de u/I₀", "R oubliée"],
    gen(h) {
      const formeA = h.int(0, 1) === 0;
      const T = tire(() => ({ R: Rserie(h), r: h.pick([4, 5, 8, 10, 12, 15, 20, 30]), E: h.pick([3, 6, 9, 12, 24]) }), (t) => { const Rt = t.R + t.r; return t.r / Rt >= 0.06 && !memeChiffre(t.E, (t.E / Rt) * 1e3) && (t.E / Rt) * 1e3 >= 5; });
      const Rt = T.R + T.r, I0 = T.E / Rt, ul = T.r * I0, tol = { rel: 0.03 };
      const qs = [];
      if (formeA) {
        qs.push({ type: "nombre", q: "Détermine la résistance $r$ de la bobine, en Ω.", reponse: T.r, tol, unite: "Ω", indice: "En régime permanent, $\\mathrm{d}i/\\mathrm{d}t = 0$ : $u_L = r\\,I_0$.",
          pieges: pieges(T.r, tol, [{ v: T.E / I0, fb: "Tu as divisé $E$ par $I_0$ : cela donne $R + r$. Pour $r$ seule, divise $u_L$ par $I_0$.", erreur: "r = E/I₀" }, { v: 0, fb: "Tu as cru qu’une bobine en courant constant n’a pas de tension. $u_L = r\\,I_0$ ne s’annule pas.", erreur: "r = 0 en régime permanent" }, { v: I0 / ul, fb: "Tu as divisé $I_0$ par $u_L$. Une résistance est une tension divisée par un courant : $r = u_L/I_0$.", erreur: "I₀/u au lieu de u/I₀" }]) });
      } else {
        qs.push({ type: "nombre", q: "Détermine la résistance $r$ de la bobine, en Ω.", reponse: T.r, tol, unite: "Ω", indice: "En régime permanent, $E = (R + r)\\,I_0$ : $r = E/I_0 - R$.",
          pieges: pieges(T.r, tol, [{ v: T.E / I0, fb: "Tu as divisé $E$ par $I_0$ : cela donne $R + r$. Il reste à retrancher $R$.", erreur: "r = E/I₀" }, { v: 0, fb: "Tu as pris la bobine pour un fil sans résistance. $E/I_0$ vaut $R + r$ : il reste $r$ après avoir retranché $R$.", erreur: "r = 0 en régime permanent" }, { v: T.E / I0 + T.R, fb: "Tu as ajouté $R$ au lieu de la retrancher : $E/I_0 = R + r$, donc $r = E/I_0 - R$.", erreur: "R oubliée" }]) });
      }
      qs.push({ type: "qcm", q: "En régime permanent, la tension $u_L$ aux bornes de la bobine vaut…", options: h.melange([
        { t: "$r\\,I_0$ : la bobine n’est plus que sa résistance", ok: true },
        { t: "0 : la bobine est un fil", fb: "Tu as oublié $r$. En courant constant, $u_L = r\\,I_0$ : elle ne s’annule que si $r$ est négligeable.", erreur: "r = 0 en régime permanent" },
        { t: "$E$ : toute la tension est sur la bobine", fb: "C’est ce qui se passe à $t = 0^+$, quand $i = 0$. En régime permanent, $R\\,I_0$ de la tension est sur le conducteur ohmique.", erreur: "r = E/I₀" }]) });
      return {
        enonce: formeA
          ? `<p>Le montage comporte un générateur $E = ${num(T.E, 3)}\\ \\text{V}$, un conducteur ohmique $R = ${num(T.R, 3)}\\ \\Omega$ et une bobine $(L, r)$. En régime permanent, on lit $I_0 = ${num(I0 * 1e3, 3)}\\ \\text{mA}$ et $u_L = ${num(ul, 3)}\\ \\text{V}$ aux bornes de la bobine.</p>`
          : `<p>Le montage comporte un générateur $E = ${num(T.E, 3)}\\ \\text{V}$, un conducteur ohmique $R = ${num(T.R, 3)}\\ \\Omega$ et une bobine $(L, r)$. En régime permanent, l’intensité vaut $I_0 = ${num(I0 * 1e3, 3)}\\ \\text{mA}$.</p>`,
        questions: qs,
        correction: formeA
          ? [{ tex: `r = \\dfrac{u_L}{I_0} = \\dfrac{${num(ul, 3)}}{${num(I0, 3)}} = ${num(T.r, 3)}\\ \\Omega`, r: "En courant constant, $u_L = r\\,I_0$ (avec $I_0$ en ampères)." }]
          : [{ tex: `r = \\dfrac{E}{I_0} - R = \\dfrac{${num(T.E, 3)}}{${num(I0, 3)}} - ${num(T.R, 3)} = ${num(T.r, 3)}\\ \\Omega`, r: "En régime permanent, la résistance totale est $R + r = E/I_0$." }],
      };
    },
  },

  /* 5 : l'équation différentielle, à l'établissement et à la rupture */
  {
    id: "rl-equation",
    titre: "L’équation différentielle de l’établissement et de la rupture",
    niveau: 2,
    capacites: CAPR("1.3.2.5", "1.3.2.2"),
    erreurs: ["r oubliée dans l’équation", "signe perdu", "E gardé à la rupture", "multiplié par L au lieu de divisé"],
    gen(h) {
      const etab = h.int(0, 1) === 0;
      const T = tire(() => ({ L: h.pick([0.05, 0.1, 0.2, 0.5, 1]), R: Rserie(h), r: h.pick([5, 10, 20, 30]), E: h.pick([3, 6, 9, 12, 24]) }), (t) => t.r / (t.R + t.r) >= 0.06 && t.R + t.r >= 40);
      const Rt = T.R + T.r, a = Rt / T.L, b = T.E / T.L, tol = { rel: 0.02 };
      const second = etab ? "E" : "0";
      const q1 = { type: "qcm", q: etab ? "K est en position 1 : quelle équation vérifie $i$ ?" : "K vient d’être basculé en position 2, le générateur est hors de la maille : quelle équation vérifie $i$ ?", options: h.melange([
        { t: `$L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + (R + r)\\,i = ${second}$`, ok: true },
        { t: etab ? "$L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + R\\,i = E$" : "$L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + R\\,i = 0$", fb: "Tu as oublié $r$, qui est dans $u_L = r\\,i + L\\,\\mathrm{d}i/\\mathrm{d}t$. Le terme en $i$ vaut $(R + r)\\,i$.", erreur: "r oubliée dans l’équation" },
        etab ? { t: "$L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} - (R + r)\\,i = E$", fb: "Tu as perdu un signe. Les tensions $u_R$ et $u_L$ s’ajoutent : $u_R + u_L = E$, donc $+(R + r)\\,i$.", erreur: "signe perdu" }
             : { t: "$L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + (R + r)\\,i = E$", fb: "Tu as gardé $E$. Le générateur a quitté la maille : le second membre est nul.", erreur: "E gardé à la rupture" }]) };
      const q2 = { type: "nombre", q: `On écrit l’équation sous la forme $\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + a\\,i = ${etab ? "b" : "0"}$. Calcule $a$, en s⁻¹.`, reponse: a, tol, unite: "s⁻¹", indice: "On divise les deux membres par $L$ : le coefficient de $i$ devient $(R + r)/L$.",
        pieges: pieges(a, tol, [{ v: T.R / T.L, fb: "Tu as oublié $r$. Le coefficient de $i$ est $(R + r)/L$.", erreur: "r oubliée dans l’équation" }, { v: Rt * T.L, fb: "Tu as multiplié par $L$ au lieu de diviser. L’unité tranche : $(R + r)/L$ est en s⁻¹.", erreur: "multiplié par L au lieu de divisé" }, { v: T.L / Rt, fb: "Tu as calculé $L/(R + r)$, qui est une durée (la constante de temps). Le coefficient $a$ est son inverse.", erreur: "multiplié par L au lieu de divisé" }]) };
      const qs = [q1, q2];
      if (etab) qs.push({ type: "nombre", q: "Calcule le second membre $b$, en A·s⁻¹.", reponse: b, tol, unite: "A·s⁻¹", indice: "Après division par $L$, le second membre est $E/L$.",
        pieges: pieges(b, tol, [{ v: T.E / Rt, fb: "Tu as divisé $E$ par $R + r$ : cela donne $I_0$, en ampères. Le second membre de cette forme est $E/L$.", erreur: "multiplié par L au lieu de divisé" }, { v: T.E * T.L, fb: "Tu as multiplié par $L$ au lieu de diviser.", erreur: "multiplié par L au lieu de divisé" }]) });
      return {
        enonce: `<p>Une bobine d’inductance $L = ${num(T.L, 3)}\\ \\text{H}$ et de résistance $r = ${num(T.r, 3)}\\ \\Omega$ est en série avec un conducteur ohmique $R = ${num(T.R, 3)}\\ \\Omega$ et un générateur $E = ${num(T.E, 3)}\\ \\text{V}$, par un interrupteur à deux positions. ${etab ? "À $t = 0$, on place K en position 1 : le générateur est dans la maille." : "Le régime permanent est atteint ; à $t = 0$, on place K en position 2."} Les flèches de $u_R$ et de $u_L$ sont à l’opposé de $i$.</p>`,
        questions: qs,
        correction: [
          { tex: `u_R + u_L = ${second}\\ ;\\quad u_R = R\\,i\\ ;\\quad u_L = r\\,i + L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t}`, r: etab ? "L’additivité des tensions, la loi d’Ohm, la bobine." : "Sans générateur, la somme des tensions est nulle." },
          { tex: `L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + (R + r)\\,i = ${second}\\ \\Rightarrow\\ \\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + ${num(a, 3)}\\,i = ${etab ? num(b, 3) : "0"}`, r: "On divise par $L$ : $a = (R + r)/L$, en s⁻¹." },
        ],
      };
    },
  },

  /* 6 : la solution i = A + B e^(−t/τ) (forme du sujet 2023) */
  {
    id: "rl-solution",
    titre: "La solution i = A + B e^(−t/τ) : A, B et τ",
    niveau: 2,
    capacites: CAPR("1.3.2.5", "1.3.2.6", "1.3.2.9"),
    erreurs: ["B = +A (i ne part pas de 0)", "A = 0 : le courant de RC", "r oubliée", "τ = (R + r)/L"],
    gen(h) {
      const T = tire(() => ({ E: h.pick([6, 12, 24]), R: Rserie(h), r: h.pick([5, 10, 20, 30]), L: h.pick([0.05, 0.1, 0.2, 0.5, 1]) }), (t) => { const Rt = t.R + t.r; return t.r / Rt >= 0.06 && !memeChiffre(t.E, (t.E / Rt) * 1e3) && (t.E / Rt) * 1e3 >= 5 && t.L / Rt >= 2e-5; });
      const Rt = T.R + T.r, A = (T.E / Rt) * 1e3, B = -A, tau = T.L / Rt, [tv, tu] = tSI(tau), tol = { rel: 0.02 };
      return {
        enonce: `<p>Une bobine $(L, r)$ avec $L = ${num(T.L, 3)}\\ \\text{H}$ et $r = ${num(T.r, 3)}\\ \\Omega$, un conducteur ohmique $R = ${num(T.R, 3)}\\ \\Omega$ et un générateur $E = ${num(T.E, 3)}\\ \\text{V}$ sont en série. On ferme l’interrupteur à $t = 0$ ; l’énoncé donne $i(t) = A + B\\,e^{-t/\\tau}$.</p>`,
        questions: [
          { type: "nombre", q: "Détermine $A$, en mA (la valeur vers laquelle tend $i$ en régime permanent).", reponse: A, tol, unite: "mA", indice: "Quand $t$ est très grand, $e^{-t/\\tau}$ tend vers 0 : $i$ tend vers $A = E/(R + r)$.",
            pieges: pieges(A, tol, [{ v: (T.E / T.R) * 1e3, fb: "Tu as oublié $r$. En régime permanent, la résistance totale est $R + r$.", erreur: "r oubliée" }, { v: 0, fb: "Tu as pris le courant de RC, qui décroît vers 0. Ici $i$ monte vers $E/(R + r)$ : $A$ n’est pas nul.", erreur: "A = 0 : le courant de RC" }]) },
          { type: "nombre", q: "Détermine $B$, en mA, avec son signe.", reponse: B, tol, unite: "mA", indice: "La bobine rend $i$ continu : $i(0) = A + B = 0$.",
            pieges: pieges(B, tol, [{ v: A, fb: "Tu as oublié que $i(0) = 0$. $i(0) = A + B$ doit être nul : $B = -A$.", erreur: "B = +A (i ne part pas de 0)" }, { v: 0, fb: "Tu as pris $B$ nul : $i$ resterait égal à $A$ dès $t = 0$, ce que la bobine interdit. $i(0) = 0$ donne $B = -A$.", erreur: "B = +A (i ne part pas de 0)" }]) },
          { type: "nombre", q: `Détermine la constante de temps $\\tau$, en ${tu}.`, reponse: tv, tol, unite: tu, indice: "$\\tau = L/(R + r)$, avec $L$ en henrys.",
            pieges: pieges(tv, tol, [{ v: Rt / T.L, fb: "Tu as calculé $(R + r)/L$, qui est en s⁻¹. $\\tau$ est son inverse, une durée.", erreur: "τ = (R + r)/L" }, { v: T.L / T.R / UT[tu], fb: "Tu as oublié $r$ : $\\tau = L/(R + r)$.", erreur: "r oubliée" }]) },
        ],
        correction: [
          { tex: `A = \\dfrac{E}{R + r} = \\dfrac{${num(T.E, 3)}}{${num(Rt, 3)}} = ${num(A, 3)}\\ \\text{mA}`, r: "Le régime permanent." },
          { tex: `i(0) = A + B = 0\\ \\Rightarrow\\ B = -A = ${num(B, 3)}\\ \\text{mA}`, r: "La continuité de $i$." },
          { tex: `\\tau = \\dfrac{L}{R + r} = \\dfrac{${num(T.L, 3)}}{${num(Rt, 3)}} \\approx ${tTex(tau)}`, r: "La constante de temps." },
        ],
      };
    },
  },

  /* 7 : les expressions de u_L(t) : valeurs à 0, τ et ∞ */
  {
    id: "rl-expressions",
    titre: "Les expressions de u_L(t) : à 0⁺, à τ et en régime permanent",
    niveau: 2,
    capacites: CAPR("1.3.2.6", "1.3.2.8"),
    erreurs: ["u_L(0) = 0 comme i", "u_L(∞) = 0 (r oubliée)", "u_L(0) = r·I₀", "u_L monte comme i"],
    gen(h) {
      const T = tire(() => ({ E: h.pick([3, 6, 9, 12, 24]), R: Rserie(h), r: h.pick([5, 10, 20, 30]) }), (t) => { const Rt = t.R + t.r, I0 = t.E / Rt; return t.r / Rt >= 0.06 && t.r / Rt <= 0.5 && !memeChiffre(t.E, I0 * 1e3); });
      const Rt = T.R + T.r, I0 = T.E / Rt, uInf = T.r * I0, uTau = uInf + T.R * I0 * Math.exp(-1), tol = { rel: 0.02 };
      return {
        enonce: `<p>On ferme à $t = 0$ l’interrupteur d’un circuit en série : générateur $E = ${num(T.E, 3)}\\ \\text{V}$, conducteur ohmique $R = ${num(T.R, 3)}\\ \\Omega$, bobine $(L, r)$ avec $r = ${num(T.r, 3)}\\ \\Omega$. L’intensité est $i(t) = I_0\\left(1 - e^{-t/\\tau}\\right)$, avec $I_0 = E/(R + r)$.</p>`,
        questions: [
          { type: "nombre", q: "Que vaut la tension $u_L$ aux bornes de la bobine à $t = 0^+$, en V ?", reponse: T.E, tol, unite: "V", indice: "À $t = 0^+$, $i = 0$, donc $u_R = R\\,i = 0$ : que reste-t-il dans $u_R + u_L = E$ ?",
            pieges: pieges(T.E, tol, [{ v: 0, fb: "Tu as copié $i$. $u_L = E - u_R$, et $u_R = R\\,i = 0$ : toute la tension $E$ est sur la bobine.", erreur: "u_L(0) = 0 comme i" }, { v: uInf, fb: "Tu as pris la valeur de fin, $r\\,I_0$. $r\\,i$ est nul tant que $i = 0$ : c’est $L\\,\\mathrm{d}i/\\mathrm{d}t$ qui vaut $E$.", erreur: "u_L(0) = r·I₀" }]) },
          { type: "nombre", q: "Que vaut $u_L$ en régime permanent, en V ?", reponse: uInf, tol, unite: "V", indice: "En courant constant, $\\mathrm{d}i/\\mathrm{d}t = 0$ : $u_L = r\\,I_0$.",
            pieges: pieges(uInf, tol, [{ v: 0, fb: "Tu as oublié $r$. Une bobine réelle garde $u_L = r\\,I_0$ en courant constant.", erreur: "u_L(∞) = 0 (r oubliée)" }, { v: T.E, fb: "Tu as pris la valeur de départ. En régime permanent, $R\\,I_0$ de la tension est sur le conducteur ohmique.", erreur: "u_L monte comme i" }]) },
          { type: "nombre", q: "Que vaut $u_L$ à $t = \\tau$, en V ?", reponse: uTau, tol, unite: "V", indice: "$u_L = E - R\\,i$, avec $i(\\tau) = 0{,}63\\,I_0$ ; ou $u_L = r\\,I_0 + R\\,I_0\\,e^{-1}$.",
            pieges: pieges(uTau, tol, [{ v: T.E * Math.exp(-1), fb: "Tu as supposé $r$ nulle : $E\\,e^{-t/\\tau}$ est la tension d’une bobine idéale. Avec $r$, $u_L$ finit à $r\\,I_0$.", erreur: "u_L(∞) = 0 (r oubliée)" }, { v: uInf + T.R * I0 * (1 - Math.exp(-1)), fb: "Tu as fait monter $u_L$ comme $i$. $u_L$ part de $E$ et descend : le terme en exponentielle est $R\\,I_0\\,e^{-t/\\tau}$.", erreur: "u_L monte comme i" }]) },
        ],
        correction: [
          { tex: `u_L(0^+) = E - R\\,i(0) = ${num(T.E, 3)}\\ \\text{V}`, r: "$i$ est continu : $i(0) = 0$." },
          { tex: `u_L(\\infty) = r\\,I_0 = ${num(T.r, 3)} \\times ${num(I0, 3)} = ${num(uInf, 3)}\\ \\text{V}`, r: "En régime permanent, $\\mathrm{d}i/\\mathrm{d}t = 0$." },
          { tex: `u_L(\\tau) = r\\,I_0 + R\\,I_0\\,e^{-1} = ${num(uInf, 3)} + ${num(T.R * I0, 3)} \\times 0{,}368 \\approx ${num(uTau, 3)}\\ \\text{V}`, r: "$u_L(t) = r\\,I_0 + R\\,I_0\\,e^{-t/\\tau}$." },
        ],
      };
    },
  },

  /* 8 : lire τ sur une courbe i(t), puis déduire L */
  {
    id: "rl-lecture-tau",
    titre: "Lire τ sur la courbe de i(t), puis déduire L",
    niveau: 3,
    capacites: CAPR("1.3.2.7", "1.3.2.9", "1.3.2.11"),
    erreurs: ["lecture à la moitié", "63 % lu sur une descente", "37 % lu sur une montée", "τ = fin de la rupture ou de l’établissement"],
    gen(h) {
      const monte = h.int(0, 1) === 0, tang = h.int(0, 1) === 0;
      const T = tire(() => ({ I0: h.pick([40, 50, 60, 80, 100, 120, 150, 200]), tau: h.pick([0.5, 1, 2, 4, 5, 8, 10, 20]), Rt: h.pick([20, 30, 50, 60, 100, 150, 200, 500]) }), (t) => !memeChiffre(t.I0, t.tau) && !memeChiffre(t.I0, t.Rt));
      const tmax = 6 * T.tau, fn = monte ? (t) => T.I0 * (1 - Math.exp(-t / T.tau)) : (t) => T.I0 * Math.exp(-t / T.tau);
      const tauU = T.tau, tol = { rel: 0.05 }, L = T.tau * T.Rt;                       // L en mH : ms × Ω
      const lu37 = monte ? -T.tau * Math.log(1 - P37) : T.tau, luFauxPct = monte ? -T.tau * Math.log(1 - P37) : -T.tau * Math.log(P63);
      const moitie = T.tau * Math.LN2;
      const fig = figure({ x1: tmax, y1: T.I0 * 1.1, xs: Array.from({ length: 7 }, (_, k) => Number((k * T.tau).toPrecision(4))), ys: [0, T.I0 / 2, T.I0].map((v) => Number(v.toPrecision(4))), xn: "t (ms)", yn: "i (mA)", courbes: [echant(fn, 0, tmax)], droites: tang ? [monte ? [0, 0, T.tau, T.I0] : [0, T.I0, T.tau, 0]] : [], aria: "L’intensité du courant en fonction du temps" });
      const lecture = monte ? "où $i$ atteint 63 % de $I_0$" : "où il reste 37 % de la valeur de départ";
      return {
        enonce: `<p>On visualise l’intensité $i(t)$ dans un circuit RL, ${monte ? "à la fermeture de K" : "à la rupture, K étant basculé en position 2"}${tang ? " ; la tangente à l’origine est tracée en pointillés" : ""}. La résistance totale vaut $R + r = ${num(T.Rt, 3)}\\ \\Omega$.</p>`,
        figure: fig,
        questions: [
          { type: "nombre", q: "Détermine graphiquement la constante de temps $\\tau$, en ms.", reponse: tauU, tol, unite: "ms", indice: `Lis ${lecture}${tang ? monte ? ", ou l’abscisse où la tangente coupe le palier" : ", ou l’abscisse où la tangente coupe l’axe des temps" : ""}.`,
            pieges: pieges(tauU, tol, [{ v: luFauxPct, fb: monte ? "Tu as lu à 37 % de $I_0$ sur une courbe qui monte. 37 % est le repère d’une courbe qui descend : sur une montée, on lit 63 %." : "Tu as lu à 63 % de la valeur de départ sur une courbe qui descend. Sur une descente, on lit où il reste 37 %.", erreur: monte ? "37 % lu sur une montée" : "63 % lu sur une descente" }, { v: moitie, fb: "Tu as lu à la moitié de la valeur finale ou de départ. C’est $\\tau \\ln 2$, pas $\\tau$.", erreur: "lecture à la moitié" }, { v: 5 * T.tau, fb: "Tu as pris la fin du régime transitoire, environ $5\\tau$. $\\tau$ se lit là où la courbe a fait 63 % (montée) ou perdu 63 % (descente).", erreur: "τ = fin de la rupture ou de l’établissement" }]) },
          { type: "nombre", q: "Déduis l’inductance $L$ du circuit, en mH.", reponse: L, tol: { rel: 0.05 }, unite: "mH", indice: "$\\tau = L/(R + r)$ : $L = \\tau\\,(R + r)$, avec $\\tau$ en secondes ; le résultat en henrys, puis en mH.",
            pieges: pieges(L, { rel: 0.05 }, [{ v: luFauxPct * T.Rt, fb: "Tu es parti d’une lecture à 37 % sur une montée (ou 63 % sur une descente) : $\\tau$ est faux, donc $L$ aussi.", erreur: monte ? "37 % lu sur une montée" : "63 % lu sur une descente" }, { v: moitie * T.Rt, fb: "Tu es parti de la moitié : $\\tau$ est faux, donc $L$ aussi.", erreur: "lecture à la moitié" }, { v: T.tau / T.Rt, fb: "Tu as divisé au lieu de multiplier. $\\tau = L/(R + r)$ donne $L = \\tau\\,(R + r)$.", erreur: "τ = fin de la rupture ou de l’établissement" }]) },
        ],
        correction: [
          { t: `Sur une courbe ${monte ? "qui monte" : "qui descend"}, on lit $\\tau$ ${lecture}.` },
          { tex: `\\tau \\approx ${num(tauU, 3)}\\ \\text{ms}`, r: "La lecture." },
          { tex: `L = \\tau\\,(R + r) = ${num(tauU * 1e-3, 3)} \\times ${num(T.Rt, 3)} = ${num(L * 1e-3, 3)}\\ \\text{H} = ${num(L, 3)}\\ \\text{mH}`, r: "$\\tau = L/(R + r)$, avec $\\tau$ en secondes." },
        ],
      };
    },
  },

  /* 9 : la droite di/dt = f(i) (forme du sujet 2024) */
  {
    id: "rl-droite-didt",
    titre: "La droite de la dérivée du courant (sujet 2024)",
    niveau: 3,
    capacites: CAPR("1.3.2.5", "1.3.2.7", "1.3.2.4"),
    erreurs: ["ordonnée inversée (a₀/E)", "E oublié", "pente prise pour τ", "abscisse lue à mi-course"],
    gen(h) {
      const T = tire(() => ({ E: h.pick([3, 6, 9, 12]), a0: h.pick([500, 1000, 2000, 3000, 5000]), I0: h.pick([2, 4, 6, 8, 10, 12]) }), (t) => !memeChiffre(t.E, t.I0) && !memeChiffre(t.E, t.I0 / 2));
      const L = T.E / T.a0, tau = (T.I0 * 1e-3) / T.a0, Lm = L * 1e3, [tv, tu] = tSI(tau), tol = { rel: 0.03 };
      const fig = figure({ x1: T.I0, y1: T.a0, xs: [0, T.I0 / 2, T.I0], ys: [0, T.a0 / 2, T.a0], xn: "i (mA)", yn: "di/dt (A/s)", courbes: [[[0, T.a0], [T.I0, 0]]], aria: "Une droite décroissante : di/dt en fonction de i" });
      return {
        enonce: `<p>On ferme un interrupteur dans un circuit comprenant un générateur $E = ${num(T.E, 3)}\\ \\text{V}$, un conducteur ohmique et une bobine $(L, r)$. L’équation est $\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} = -\\dfrac{R + r}{L}\\,i + \\dfrac{E}{L}$. On trace $\\dfrac{\\mathrm{d}i}{\\mathrm{d}t}$ en fonction de $i$ : c’est la droite de la figure.</p>`,
        figure: fig,
        questions: [
          { type: "nombre", q: "Vérifie puis calcule l’inductance $L$ de la bobine, en mH.", reponse: Lm, tol, unite: "mH", indice: "À $i = 0$, $\\mathrm{d}i/\\mathrm{d}t = E/L$ : l’ordonnée à l’origine de la droite.",
            pieges: pieges(Lm, tol, [{ v: (T.a0 / T.E) * 1e3, fb: "Tu as inversé le rapport. L’unité tranche : V divisé par A·s⁻¹ donne des henrys.", erreur: "ordonnée inversée (a₀/E)" }, { v: (1 / T.a0) * 1e3, fb: "Tu as oublié $E$. À $i = 0$, $\\mathrm{d}i/\\mathrm{d}t = E/L$ : $L = E$ divisée par l’ordonnée.", erreur: "E oublié" }]) },
          { type: "nombre", q: `Détermine la constante de temps $\\tau$, en ${tu}.`, reponse: tv, tol, unite: tu, indice: "La pente de la droite vaut $-1/\\tau$ ; elle coupe l’axe des abscisses en $I_0$, avec $\\tau = I_0/(\\mathrm{d}i/\\mathrm{d}t)_0$.",
            pieges: pieges(tv, tol, [{ v: T.a0 / (T.I0 * 1e-3), fb: "Tu as pris la pente pour $\\tau$. Elle vaut $-1/\\tau$, en s⁻¹ : $\\tau$ est son inverse.", erreur: "pente prise pour τ" }, { v: tv / 2, fb: "Tu as lu l’intersection avec l’axe des abscisses à mi-course. La droite coupe l’axe en $I_0$ tout entier.", erreur: "abscisse lue à mi-course" }]) },
        ],
        correction: [
          { tex: `i = 0\\ :\\ \\dfrac{\\mathrm{d}i}{\\mathrm{d}t} = \\dfrac{E}{L} = ${num(T.a0, 3)}\\ \\text{A·s}^{-1}\\ \\Rightarrow\\ L = \\dfrac{${num(T.E, 3)}}{${num(T.a0, 3)}} = ${num(Lm, 3)}\\ \\text{mH}`, r: "L’ordonnée à l’origine." },
          { tex: `\\tau = \\dfrac{I_0}{(\\mathrm{d}i/\\mathrm{d}t)_0} = \\dfrac{${num(T.I0 * 1e-3, 3)}}{${num(T.a0, 3)}} \\approx ${tTex(tau)}`, r: "$I_0$ est l’abscisse où $\\mathrm{d}i/\\mathrm{d}t$ s’annule." },
        ],
      };
    },
  },

  /* 10 : l'influence de R, de L et de E sur la réponse */
  {
    id: "rl-influence",
    titre: "L’influence de R, de L et de E sur la réponse",
    niveau: 2,
    capacites: CAPR("1.3.2.14", "1.3.2.11"),
    erreurs: ["L change le palier", "R ne change que τ (comme en RC)", "E change τ"],
    gen(h) {
      const mode = h.pick(["E", "L", "R"]);
      const base = { E: 6, R: 50, r: 10, L: 0.3 };
      const Tx = tire(() => {
        if (mode === "E") return { v: h.melange([3, 6, 12]) };
        if (mode === "L") return { v: h.melange([0.1, 0.3, 1]) };
        return { v: h.melange([20, 50, 150]) };
      }, () => true);
      const v = Tx.v, k = h.int(0, 2);
      const etat = (x) => ({ ...base, [mode]: x });
      const pal = (s) => (s.E / (s.R + s.r)) * 1e3, tau = (s) => (s.L / (s.R + s.r)) * 1e3;
      const desc = v.map((x, j) => `courbe ${j + 1} : $${mode} = ${num(x, 3)}\\ ${mode === "E" ? "\\text{V}" : mode === "L" ? "\\text{H}" : "\\Omega"}$`).join(" ; ");
      const fixe = { E: "$R = 50\\ \\Omega$, $r = 10\\ \\Omega$ et $L = 0{,}30\\ \\text{H}$", L: "$E = 6\\ \\text{V}$, $R = 50\\ \\Omega$ et $r = 10\\ \\Omega$", R: "$E = 6\\ \\text{V}$, $r = 10\\ \\Omega$ et $L = 0{,}30\\ \\text{H}$" }[mode];
      const tol = { rel: 0.02 };
      const S = etat(v[k]);
      const qs = [];
      if (mode === "E") {
        qs.push({ type: "qcm", q: "Les trois courbes $i(t)$ ont-elles le même palier et la même constante de temps ?", options: h.melange([
          { t: "même $\\tau$, paliers différents : $E$ règle la hauteur", ok: true },
          { t: "$E$ change $\\tau$ : plus de tension, montée plus rapide", fb: "Tu as cru que $E$ change $\\tau$. $\\tau = L/(R + r)$ ne contient pas $E$ : la courbe monte plus haut dans le même temps.", erreur: "E change τ" },
          { t: "même palier, $\\tau$ différents", fb: "Le palier $E/(R + r)$ contient $E$ : il change avec $E$. $\\tau$, lui, ne change pas.", erreur: "E change τ" }]) });
        qs.push({ type: "nombre", q: `Quel est le palier de la courbe ${k + 1}, en mA ?`, reponse: pal(S), tol, unite: "mA", indice: "Le palier est $I_0 = E/(R + r)$.",
          pieges: pieges(pal(S), tol, [{ v: (S.E / S.R) * 1e3, fb: "Tu as oublié $r$ : le palier est $E/(R + r)$.", erreur: "E change τ" }]) });
      } else if (mode === "L") {
        qs.push({ type: "qcm", q: "Les trois courbes $i(t)$ ont-elles le même palier ?", options: h.melange([
          { t: "oui : le palier $E/(R + r)$ ne contient pas $L$, seule la durée change", ok: true },
          { t: "non : plus $L$ est grand, plus le palier est haut", fb: "Tu as cru que $L$ change le palier. En courant constant, $\\mathrm{d}i/\\mathrm{d}t = 0$ : $L$ disparaît.", erreur: "L change le palier" },
          { t: "non : plus $L$ est grand, plus le palier est bas", fb: "Tu as cru qu’une bobine plus grande limite le courant final. Elle ne fait que freiner la montée : le palier ne dépend pas de $L$.", erreur: "L change le palier" }]) });
        qs.push({ type: "nombre", q: `Quelle est la constante de temps de la courbe ${k + 1}, en ms ?`, reponse: tau(S), tol, unite: "ms", indice: "$\\tau = L/(R + r)$, avec $L$ en henrys.",
          pieges: pieges(tau(S), tol, [{ v: (S.L / S.R) * 1e3, fb: "Tu as oublié $r$ : $\\tau = L/(R + r)$.", erreur: "L change le palier" }]) });
      } else {
        qs.push({ type: "qcm", q: "Quand $R$ change, que changent les courbes $i(t)$ ?", options: h.melange([
          { t: "le palier et $\\tau$ : $R + r$ figure dans les deux", ok: true },
          { t: "seulement $\\tau$, comme pour un dipôle RC", fb: "Tu as transféré RC. Ici, $R$ figure aussi dans le palier $E/(R + r)$ : il change avec $\\tau$.", erreur: "R ne change que τ (comme en RC)" },
          { t: "seulement le palier", fb: "Tu as pensé que $R$ ne règle que la hauteur. $R$ figure aussi dans $\\tau = L/(R + r)$.", erreur: "R ne change que τ (comme en RC)" }]) });
        qs.push({ type: "nombre", q: `Quelle est la constante de temps de la courbe ${k + 1}, en ms ?`, reponse: tau(S), tol, unite: "ms", indice: "$\\tau = L/(R + r)$, avec $L$ en henrys.",
          pieges: pieges(tau(S), tol, [{ v: (S.L / S.R) * 1e3, fb: "Tu as oublié $r$ : $\\tau = L/(R + r)$.", erreur: "R ne change que τ (comme en RC)" }, { v: (base.L / (base.R + base.r)) * 1e3, fb: "Tu as gardé la valeur de $\\tau$ pour $R = 50\\ \\Omega$. $R$ change la résistance totale, donc $\\tau$.", erreur: "R ne change que τ (comme en RC)" }]) });
      }
      return {
        enonce: `<p>On étudie l’établissement du courant dans un dipôle RL, trois fois, en ne changeant que ${mode === "E" ? "la tension $E$" : mode === "L" ? "l’inductance $L$" : "la résistance $R$"} : ${desc}. Les autres grandeurs : ${fixe}.</p>`,
        questions: qs,
        correction: [{ t: `Palier : $I_0 = E/(R + r)$ ; constante de temps : $\\tau = L/(R + r)$. $E$ ne change que le palier, $L$ ne change que $\\tau$, $R$ change les deux.` }, { tex: `\\text{courbe } ${k + 1}\\ :\\ I_0 = ${num(pal(S), 3)}\\ \\text{mA}\\ ,\\ \\tau = ${num(tau(S), 3)}\\ \\text{ms}`, r: "Les valeurs de la courbe interrogée." }],
      };
    },
  },

  /* 11 : la rupture et la surtension */
  {
    id: "rl-rupture",
    titre: "La rupture du courant : i, u_L et la surtension",
    niveau: 2,
    capacites: CAPR("1.3.2.8", "1.3.2.2", "1.3.2.5"),
    erreurs: ["i tombe à 0 aussitôt", "u_L continue", "|u_L| ≤ E", "τ inchangé quand la maille change"],
    gen(h) {
      const T = tire(() => ({ E: h.pick([6, 12, 24]), R: h.pick([22, 47, 100]), r: h.pick([5, 10, 20]), L: h.pick([0.1, 0.2, 0.5, 1]), R2: h.pick([0, 470, 1000, 4700]) }), (t) => !memeChiffre(t.E, (t.E / (t.R + t.r)) * 1e3) && t.R + t.r >= 40);
      const Rt = T.R + T.r, I0 = T.E / Rt, Rp = T.R + T.R2, ul0 = -Rp * I0, uav = T.r * I0, tau1 = T.L / (Rp + T.r), tau0 = T.L / Rt, [tv, tu] = tSI(tau1), tol = { rel: 0.02 };
      const montage = T.R2 ? `la maille de rupture contient $R$ et un conducteur ohmique supplémentaire $R_2 = ${num(T.R2, 3)}\\ \\Omega$` : "la maille de rupture contient $R$ et la bobine";
      return {
        enonce: `<p>Un dipôle RL ($E = ${num(T.E, 3)}\\ \\text{V}$, $R = ${num(T.R, 3)}\\ \\Omega$, bobine $L = ${num(T.L, 3)}\\ \\text{H}$ et $r = ${num(T.r, 3)}\\ \\Omega$) est en régime permanent. À $t = 0$, on bascule K en position 2 : le générateur est hors de la maille, et ${montage}.</p>`,
        questions: [
          { type: "nombre", q: "Que vaut l’intensité $i(0^+)$ juste après la bascule, en mA ?", reponse: I0 * 1e3, tol, unite: "mA", indice: "$i$ est continu dans une bobine : $i(0^+) = i(0^-)$, le courant du régime permanent.",
            pieges: pieges(I0 * 1e3, tol, [{ v: 0, fb: "Tu as pensé que sans générateur, il n’y a plus de courant. Le courant de la bobine ne peut pas sauter : $i(0^+) = I_0$.", erreur: "i tombe à 0 aussitôt" }]) },
          { type: "nombre", q: "Que vaut la tension $u_L(0^+)$ juste après la bascule, avec son signe, en V ?", reponse: ul0, tol, unite: "V", indice: `Sans générateur, $u_L = -(\\text{la tension des conducteurs ohmiques de la maille})$ : ici $-${T.R2 ? "(R + R_2)" : "R"}\\,i$.`,
            pieges: pieges(ul0, tol, [{ v: uav, fb: "Tu as fait de $u_L$ une grandeur continue. C’est $i$ qui l’est : $u_L$ saute, et change de signe.", erreur: "u_L continue" }, { v: T.E, fb: T.R2 ? "Tu as supposé que la bobine ne peut pas donner plus de tension que le générateur. La maille résiste : $|u_L| = (R + R_2)\\,i$ dépasse $E$." : "Tu as repris $E$. Le générateur est hors de la maille : $u_L = -R\\,i$.", erreur: "|u_L| ≤ E" }, { v: 0, fb: "Tu as cru que $u_L$ s’annule avec le générateur. $i$ vaut encore $I_0$ : $u_L = -R\\,I_0$ ne s’annule pas.", erreur: "i tombe à 0 aussitôt" }]) },
          { type: "nombre", q: `Quelle est la constante de temps $\\tau'$ de la décroissance, en ${tu} ?`, reponse: tv, tol, unite: tu, indice: "L’équation est $L\\,\\mathrm{d}i/\\mathrm{d}t + (R_{\\text{maille}} + r)\\,i = 0$ : $\\tau' = L/(R_{\\text{maille}} + r)$.",
            pieges: pieges(tv, tol, [{ v: tau0 / UT[tu], fb: "Tu as gardé la constante de temps de l’établissement. La résistance de la maille de rupture a changé : $\\tau' = L/(R + R_2 + r)$.", erreur: "τ inchangé quand la maille change" }, { v: T.L / Rp / UT[tu], fb: "Tu as oublié $r$ : la résistance totale de la maille inclut la bobine.", erreur: "τ inchangé quand la maille change" }]) },
        ],
        correction: [
          { tex: `i(0^+) = i(0^-) = \\dfrac{E}{R + r} = ${num(I0 * 1e3, 3)}\\ \\text{mA}`, r: "$i$ est continu." },
          { tex: `u_L(0^+) = -${T.R2 ? "(R + R_2)" : "R"}\\,i(0^+) = -${num(Rp, 3)} \\times ${num(I0, 3)} = ${num(ul0, 3)}\\ \\text{V}`, r: "$u_R + u_L = 0$ : $u_L$ saute, de $" + num(uav, 3) + "\\ \\text{V}$ à cette valeur." },
          { tex: `\\tau' = \\dfrac{L}{${T.R2 ? "R + R_2 + r" : "R + r"}} = \\dfrac{${num(T.L, 3)}}{${num(Rp + T.r, 3)}} \\approx ${tTex(tau1)}`, r: "La maille de rupture fixe $\\tau'$." },
        ],
      };
    },
  },

  /* 12 : l'énergie magnétique */
  {
    id: "rl-energie",
    titre: "L’énergie emmagasinée dans une bobine",
    niveau: 2,
    capacites: CAPR("1.3.2.16"),
    erreurs: ["½ L i (carré oublié)", "L i² (½ oublié)", "préfixe non converti", "× 2 quand i double", "r i² compté"],
    gen(h) {
      const [lu, lm, ln] = h.pick([["\\text{mH}", 1e-3, "mH"], ["\\text{H}", 1, "H"]]);
      const lv = ln === "mH" ? h.pick([10, 22, 47, 100, 220, 470]) : h.pick([0.1, 0.2, 0.5, 1, 2]);
      const iv = h.pick([20, 50, 100, 150, 200, 500]), L = lv * lm, i = iv * 1e-3, tol = { rel: 0.02 };
      const Em = energie(L, i), [ev, eu] = pref(Em, [[1, "J"], [1e-3, "mJ"], [1e-6, "µJ"]]);
      const euTex = eu === "µJ" ? "\\mu\\text{J}" : `\\text{${eu}}`, f = (E) => E / (eu === "J" ? 1 : eu === "mJ" ? 1e-3 : 1e-6);
      const r = h.pick([5, 10, 20]);
      return {
        enonce: `<p>Une bobine d’inductance $L = ${num(lv, 3)}\\ ${lu}$ et de résistance $r = ${num(r, 3)}\\ \\Omega$ est traversée par un courant constant $i = ${num(iv, 3)}\\ \\text{mA}$.</p>`,
        questions: [
          { type: "nombre", q: `Calcule l’énergie $E_m$ emmagasinée dans la bobine, en ${eu}.`, reponse: ev, tol, unite: eu, indice: "$E_m = \\dfrac{1}{2}\\,L\\,i^{2}$, avec $L$ en henrys et $i$ en ampères.",
            pieges: pieges(ev, tol, [{ v: f(0.5 * L * i), fb: "Tu n’as pas élevé le courant au carré : $E_m = \\tfrac{1}{2} L i^{2}$, pas $\\tfrac{1}{2} L i$.", erreur: "½ L i (carré oublié)" }, { v: f(L * i * i), fb: "Tu as oublié le ½ : la dérivée de $i^{2}$ est $2i\\,\\mathrm{d}i/\\mathrm{d}t$, d’où $E_m = \\tfrac{1}{2} L i^{2}$.", erreur: "L i² (½ oublié)" }, { v: f(0.5 * lv * iv * iv), fb: "Tu as laissé $L$ et $i$ dans leurs préfixes. Convertis $L$ en henrys et $i$ en ampères.", erreur: "préfixe non converti" }, { v: f(Em + r * i * i), fb: "Tu as ajouté $r\\,i^{2}$. Cette puissance chauffe le fil : elle n’est pas emmagasinée.", erreur: "r i² compté" }]) },
          { type: "nombre", q: "Le courant double. Par quel facteur l’énergie emmagasinée est-elle multipliée ?", reponse: 4, tol: { rel: 0.02 }, unite: "", indice: "$E_m$ est proportionnelle à $i^{2}$.",
            pieges: [{ v: 2, fb: "Tu as cru l’énergie proportionnelle au courant. $E_m \\propto i^{2}$ : doubler $i$ la multiplie par 4.", erreur: "× 2 quand i double" }] },
        ],
        correction: [
          { tex: `E_m = \\dfrac{1}{2}\\,L\\,i^{2} = \\dfrac{1}{2} \\times ${num(L, 3)} \\times ${num(i, 3)}^{2} \\approx ${num(ev, 3)}\\ ${euTex}`, r: "Avec $L$ en henrys et $i$ en ampères : l’énergie sort en joules." },
          { t: "Doubler $i$ multiplie $E_m$ par 4 ; à la rupture, cette énergie est dissipée par effet Joule dans la maille, ou dans l’étincelle." },
        ],
      };
    },
  },

  /* 13 : mesurer à l'oscilloscope */
  {
    id: "rl-mesure",
    titre: "Mesurer à l’oscilloscope : u_R, u_L et τ",
    niveau: 1,
    capacites: CAPR("1.3.2.13", "1.3.2.11"),
    erreurs: ["u_L prise pour l’image de i", "divisions lues comme des unités", "division par la sensibilité", "deux voies confondues"],
    gen(h) {
      const sv = h.pick([0.5, 2, 5]), shU = h.pick([["ms", 1e-3], ["µs", 1e-6]]), sh = h.pick([0.5, 2, 5, 10, 20]), hNe = h.pick([4, 5, 6]);
      const divTau = h.pick([1.6, 2, 2.4, 3.2, 4]), tauU = divTau * sh, unite = shU[0], uniteTex = uTex(unite), tolT = { rel: 0.05 };
      const Rv = h.pick([22, 47, 100, 220]), E = hNe * sv;
      return {
        enonce: `<p>Un dipôle RL est soumis à un échelon de tension. La voie $Y_1$ d’un oscilloscope est branchée de l’autre côté du conducteur ohmique de résistance $R = ${num(Rv, 3)}\\ \\Omega$, et la masse entre ce conducteur et la bobine. La sensibilité verticale est de $${num(sv, 2)}\\ \\text{V}$ par division, la base de temps de $${num(sh, 3)}\\ ${uniteTex}$ par division. La figure montre la voie $Y_1$ et sa tangente à l’origine.</p>`,
        figure: figureOscillo({ hNe, divTau }),
        questions: [
          { type: "qcm", q: "Que montre l’oscilloscope avec ce branchement, et que peut-on en déduire ?", options: h.melange([
            { t: "la tension $u_R = R\\,i$ : l’allure de $i$, à $R$ près", ok: true },
            { t: "la tension $u_L$ : l’allure de $i$", fb: "Tu as pris $u_L$ pour l’image de $i$. $u_L = r\\,i + L\\,\\mathrm{d}i/\\mathrm{d}t$ n’est pas proportionnelle à $i$ : c’est $u_R$ qui l’est.", erreur: "u_L prise pour l’image de i" },
            { t: "directement l’intensité $i$ en ampères", fb: "Un oscilloscope ne montre que des tensions. Pour voir l’allure de $i$, il faut visualiser $u_R = R\\,i$.", erreur: "u_L prise pour l’image de i" }]) },
          { type: "nombre", q: `Lis le nombre de divisions entre l’origine et l’abscisse où la tangente coupe l’asymptote : calcule $\\tau$, en ${unite}.`, reponse: tauU, tol: tolT, unite, indice: `$\\tau$ = divisions × base de temps (${num(sh, 3)} ${unite} par division). Ici, la tangente coupe l’asymptote à ${num(divTau, 2)} divisions.`,
            pieges: pieges(tauU, tolT, [{ v: divTau, fb: `Tu as lu des divisions comme des ${unite}. Multiplie par la base de temps.`, erreur: "divisions lues comme des unités" }, { v: divTau / sh, fb: "Tu as divisé par la base de temps. $\\tau$ = divisions × base de temps.", erreur: "division par la sensibilité" }]) },
          { type: "nombre", q: "Quelle est la valeur de $u_R$ en régime permanent, lue sur l’asymptote, en V ?", reponse: E, tol: { rel: 0.03 }, unite: "V", indice: "Hauteur de l’asymptote en divisions, fois la sensibilité verticale.",
            pieges: pieges(E, { rel: 0.03 }, [{ v: hNe, fb: "Tu as lu des divisions comme des volts. Multiplie par la sensibilité verticale.", erreur: "divisions lues comme des unités" }, { v: hNe / sv, fb: "Tu as divisé par la sensibilité verticale. $u_R$ = divisions × sensibilité.", erreur: "division par la sensibilité" }]) },
        ],
        correction: [
          { tex: `\\tau = N \\times \\text{base de temps} = ${num(divTau, 2)} \\times ${num(sh, 3)} = ${num(tauU, 3)}\\ ${uniteTex}`, r: "Les divisions, converties avec la base de temps." },
          { tex: `u_R(\\infty) = ${num(hNe, 2)} \\times ${num(sv, 2)} = ${num(E, 3)}\\ \\text{V}`, r: "Les divisions verticales, converties avec la sensibilité." },
        ],
      };
    },
  },

  /* 14 : au bac, forme du sujet 2023 */
  {
    id: "rl-bac",
    titre: "Au bac : la réponse d’un dipôle RL (forme du sujet 2023)",
    niveau: 3,
    capacites: CAPR("1.3.2.5", "1.3.2.6", "1.3.2.7", "1.3.2.8", "1.3.2.9"),
    erreurs: ["τ/R au lieu de Rτ", "τ lu à 37 %", "τ laissé en ms", "u_L monte comme i", "B = +A"],
    gen(h) {
      const T = tire(() => ({ E: h.pick([6, 12, 24]), I0: h.pick([20, 30, 40, 48, 60, 80]), tau: h.pick([1, 2, 4, 5]) }), (t) => !memeChiffre(t.E, t.I0) && !memeChiffre(t.E, t.tau) && !memeChiffre(t.I0, t.tau));
      const R = T.E / (T.I0 * 1e-3), L = R * T.tau * 1e-3, t37 = -T.tau * Math.log(1 - P37), tol = { rel: 0.03 }, k = 1e3 / T.tau;
      const fig = figure({ x1: 6 * T.tau, y1: T.I0 * 1.15, xs: Array.from({ length: 7 }, (_, j) => Number((j * T.tau).toPrecision(4))), ys: [0, T.I0 / 2, T.I0].map((v) => Number(v.toPrecision(4))), xn: "t (ms)", yn: "i (mA)", courbes: [echant((t) => T.I0 * (1 - Math.exp(-t / T.tau)), 0, 6 * T.tau)], droites: [[0, 0, T.tau, T.I0]], aria: "L’intensité du courant en fonction du temps, avec sa tangente à l’origine" });
      return {
        enonce: `<p>On ferme à $t = 0$ l’interrupteur d’un circuit en série : générateur $E = ${num(T.E, 3)}\\ \\text{V}$, conducteur ohmique $R$ et bobine $(b)$ de résistance négligeable. La courbe donne $i(t)$ (en pointillés, la tangente à l’origine). On donne $i(t) = A + B\\,e^{-t/\\tau}$.</p>`,
        figure: fig,
        questions: [
          { type: "qcm", q: "Quelle est l’expression de $B$ en fonction de $E$ et $R$ ?", options: h.melange([
            { t: "$B = -\\dfrac{E}{R}$, car $i(0) = A + B = 0$", ok: true },
            { t: "$B = +\\dfrac{E}{R}$", fb: "Tu as oublié que $i(0) = 0$. $i(0) = A + B$ doit être nul : $B = -A$.", erreur: "B = +A" },
            { t: "$B = 0$ : $i$ est constant", fb: "Tu as pris $i$ constant. $i$ part de 0 : $B = -A \\ne 0$.", erreur: "B = +A" }]) },
          { type: "nombre", q: "Détermine la résistance $R$ du conducteur ohmique, en Ω.", reponse: R, tol, unite: "Ω", indice: "En régime permanent, $I_0 = E/R$, avec $I_0$ en ampères.",
            pieges: pieges(R, tol, [{ v: T.E / T.I0, fb: "Tu as laissé $I_0$ en mA. Convertis en ampères : $R = E/I_0$.", erreur: "τ laissé en ms" }, { v: T.I0 * 1e-3 / T.E, fb: "Tu as divisé $I_0$ par $E$. Une résistance est une tension divisée par un courant.", erreur: "τ/R au lieu de Rτ" }]) },
          { type: "nombre", q: "Montre puis calcule l’inductance $L$ de la bobine, en H.", reponse: L, tol, unite: "H", indice: "$\\tau = L/R$ : $L = R\\,\\tau$, avec $\\tau$ lu où la tangente coupe le palier, en secondes.",
            pieges: pieges(L, tol, [{ v: (T.tau * 1e-3) / R, fb: "Tu as inversé le rapport. $\\tau = L/R$ donne $L = R\\,\\tau$.", erreur: "τ/R au lieu de Rτ" }, { v: R * t37 * 1e-3, fb: "Tu as lu $\\tau$ là où $i = 37\\ \\%$ de $I_0$. Sur une montée, $\\tau$ se lit à 63 %, ou là où la tangente coupe le palier.", erreur: "τ lu à 37 %" }, { v: R * T.tau, fb: "Tu as laissé $\\tau$ en ms. Convertis en secondes avant de multiplier.", erreur: "τ laissé en ms" }]) },
          { type: "qcm", q: "Quelle est l’expression numérique de $u_L(t)$, en unités SI ?", options: h.melange([
            { t: `$u_L = ${num(T.E, 3)}\\,e^{-${num(k, 3)}\\,t}$`, ok: true },
            { t: `$u_L = ${num(T.E, 3)}\\,e^{-${num(k * 1e-3, 3)}\\,t}$`, fb: "Tu as laissé $\\tau$ en ms. En unités SI, $1/\\tau$ s’exprime en s⁻¹.", erreur: "τ laissé en ms" },
            { t: `$u_L = ${num(T.E, 3)}\\left(1 - e^{-${num(k, 3)}\\,t}\\right)$`, fb: "Tu as fait monter $u_L$ comme $i$. $u_L = L\\,\\mathrm{d}i/\\mathrm{d}t$ part de $E$ à $t = 0$ et décroît.", erreur: "u_L monte comme i" }]) },
        ],
        correction: [
          { tex: `R = \\dfrac{E}{I_0} = \\dfrac{${num(T.E, 3)}}{${num(T.I0 * 1e-3, 3)}} = ${num(R, 3)}\\ \\Omega`, r: "En régime permanent, $i = E/R$." },
          { tex: `L = R\\,\\tau = ${num(R, 3)} \\times ${num(T.tau * 1e-3, 3)} = ${num(L, 3)}\\ \\text{H}`, r: "$\\tau$ se lit où la tangente coupe le palier : l’expression littérale avant le nombre." },
          { tex: `u_L(t) = L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} = E\\,e^{-t/\\tau} = ${num(T.E, 3)}\\,e^{-${num(k, 3)}\\,t}`, r: "En SI, $1/\\tau$ est en s⁻¹." },
        ],
      };
    },
  },

  /* 15 : établir l'expression de l'énergie magnétique (PC et SM seulement) */
  {
    id: "rl-energie-etablir",
    titre: "Établir l’énergie emmagasinée dans une bobine",
    niveau: 2,
    filieres: ["PC", "SM"],
    capacites: CAPR_PCSM("1.3.2.15"),
    erreurs: ["½ oublié dans la dérivée", "r i² compté", "puissance prise pour l’énergie"],
    gen(h) {
      const r = h.pick([5, 10, 20]);
      return {
        enonce: `<p>Une bobine d’inductance $L$ et de résistance $r = ${num(r, 3)}\\ \\Omega$ reçoit, en convention récepteur, la puissance $p = u_L\\,i$ avec $u_L = r\\,i + L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t}$. On veut l’énergie emmagasinée dans le champ.</p>`,
        questions: [
          { type: "qcm", q: "Quelle est l’expression de $p$ ?", options: h.melange([
            { t: "$p = r\\,i^{2} + L\\,i\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t}$", ok: true },
            { t: "$p = L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t}$", fb: "Tu as oublié de multiplier par $i$. La puissance est $p = u_L\\,i$.", erreur: "puissance prise pour l’énergie" },
            { t: "$p = r\\,i + L\\,i\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t}$", fb: "Tu as oublié de multiplier $r\\,i$ par $i$ : $p = (r\\,i + L\\,\\mathrm{d}i/\\mathrm{d}t)\\,i$.", erreur: "puissance prise pour l’énergie" }]) },
          { type: "qcm", q: "La part de la puissance qui est emmagasinée est la dérivée de…", options: h.melange([
            { t: "$\\dfrac{1}{2}\\,L\\,i^{2}$ : $r\\,i^{2}$ est perdue par effet Joule", ok: true },
            { t: "$L\\,i^{2}$", fb: "Tu as oublié le ½ : la dérivée de $i^{2}$ est $2i\\,\\mathrm{d}i/\\mathrm{d}t$.", erreur: "½ oublié dans la dérivée" },
            { t: "$\\dfrac{1}{2}\\,L\\,i^{2} + r\\,i^{2}$", fb: "Tu as compté toute la puissance reçue. $r\\,i^{2}$ chauffe le fil : ce n’est pas une dérivée, donc pas emmagasiné.", erreur: "r i² compté" }]) },
        ],
        correction: [
          { tex: `p = u_L\\,i = r\\,i^{2} + L\\,i\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t}`, r: "La puissance reçue, en convention récepteur." },
          { tex: `L\\,i\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} = \\dfrac{\\mathrm{d}}{\\mathrm{d}t}\\left(\\dfrac{1}{2}\\,L\\,i^{2}\\right)\\ \\Rightarrow\\ E_m = \\dfrac{1}{2}\\,L\\,i^{2}`, r: "$r\\,i^{2}$ est dissipée dans le fil ; le reste est emmagasiné." },
        ],
      };
    },
  },
];
