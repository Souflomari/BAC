// @ts-nocheck
/**
 * Les exercices de la leçon « Le dipôle RC » (V3). Format : voir modele.js.
 * Chaque réponse est calculée ici, à partir des fonctions de dipole-rc-outils.js ; le vérificateur
 * (scripts/pilotes-exercices.mjs) rejoue des centaines de tirages. Un leurre calculé qui retombe sur la
 * bonne réponse (à deux tolérances près) est retiré du tirage (`pieges`) ; et les tirages où deux
 * grandeurs de natures différentes ont le même chiffre (E = 12 V et τ = 12 ms ; pente = 1, où I₀ × pente
 * = I₀ / pente ; R = 1 000 Ω quand E et i₀ ont le même chiffre ; τ = 1 s, où τ = 1/τ) sont REJETÉS
 * (`tire`) : la règle B3, « un leurre mène toujours à un résultat faux ».
 *
 * Capacités : pc-pc / pc-sm 1.3.1.x, et pc-svt, dont la numérotation est décalée à partir du 15ᵉ tiret
 * (1.3.1.15 de PC et SM = 1.3.1.16 de SVT ; 1.3.1.16 = 1.3.1.17 ; 1.3.1.17, l'établissement de l'énergie,
 * n'existe pas en SVT : le gabarit qui le travaille porte `filieres: ["PC", "SM"]`). `pc-svt 1.3.1.15`
 * (l'intérêt d'un montage RC) n'a pas de gabarit : la réponse attendue n'est pas établie sur un sujet.
 * Les valeurs de composants sont tirées dans les séries usuelles (E12) ; les sujets 2018, 2021, 2022 et
 * 2025 sont rejoués avec leurs valeurs imprimées dans la leçon, pas ici.
 */
import { frTex, sciTex, sig } from "./nombre.js";
import { uC, uR, iC, uDech, chargePart, dechPart, energie, P63, P37 } from "../dipole-rc-outils.js";

const MAP_SVT = { "1.3.1.15": "1.3.1.16", "1.3.1.16": "1.3.1.17", "1.3.1.18": "1.3.1.18" };
/** les capacités d'un gabarit dans les trois cadres (PC et SM : mêmes identifiants ; SVT : décalés) */
const CAPR = (...ids) => ids.flatMap((id) => [`pc-pc ${id}`, `pc-sm ${id}`, ...(id === "1.3.1.17" ? [] : [`pc-svt ${MAP_SVT[id] || id}`])]);
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
/** un tirage accepté : on retire jusqu'à 60 fois ; `ok` rejette les coïncidences de chiffres */
function tire(f, ok) {
  let t = f();
  for (let i = 0; i < 60 && !ok(t); i++) t = f();
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
/** une valeur lisible : la mantisse et son préfixe */
const pref = (x, liste) => { for (const [m, nom] of liste) if (Math.abs(x) >= m * 0.9999) return [x / m, nom]; const l = liste[liste.length - 1]; return [x / l[0], l[1]]; };
const tSI = (t) => pref(t, [[1, "s"], [1e-3, "ms"], [1e-6, "\\mu\\text{s}"]]);
const uTex = (u) => (u === "µs" ? "\\mu\\text{s}" : `\\text{${u}}`);
const MU = { "s": 1, "ms": 1e-3, "\\mu\\text{s}": 1e-6 };
const tTex = (t) => { const [v, u] = tSI(t); return `${num(v, 3)}\\ ${u.startsWith("\\") ? u : `\\text{${u}}`}`; };
/** la graine d'un chiffre significatif : 4,7 × 10^k */
const E12D = (h, dec0, dec1) => h.pick(E12) * 10 ** h.int(dec0, dec1);

/* ---------- les figures, en SVG (des jetons de couleur seulement) ---------- */
const f1 = (v) => v.toFixed(1);
/** u_C, du_C/dt : l'indice est un tspan abaissé */
const et = (t) => String(t).replace(/_([A-Za-z]+)/g, '<tspan dy="4" font-size="10">$1</tspan><tspan dy="-4">\u200b</tspan>');
const encre = "var(--color-text-primary)", gris = "var(--color-text-secondary)", accent = "var(--color-signal)";
/** des graduations « rondes » : un pas parmi 1, 2, 5 × 10^k qui donne entre 4 et 8 divisions */
function pas(max) {
  const e = Math.floor(Math.log10(max / 5));
  for (const m of [1, 2, 5, 10]) if (max / (m * 10 ** e) <= 8) return m * 10 ** e;
  return 10 ** (e + 1);
}
const lbl = (x) => { const s = String(Number(x.toPrecision(6))); return s.replace(".", ","); };
/** une courbe en fonction du temps : axes gradués, tracé, tangente à l'origine éventuelle */
function figureCourbe({ E, tau, mode, tangente, uT, uY, tmax }) {
  const L = 76, R = 600, T = 26, B = 270, X = (t) => L + ((R - L) * t) / tmax, Y = (v) => B - ((B - T) * v) / (E * 1.08);
  const fn = mode === "monte" ? (t) => E * (1 - Math.exp(-t / tau)) : (t) => E * Math.exp(-t / tau);
  let g = `<line x1="${L}" x2="${R + 8}" y1="${B}" y2="${B}" stroke="${encre}" stroke-width="1.5"/><line x1="${L}" x2="${L}" y1="${T - 8}" y2="${B}" stroke="${encre}" stroke-width="1.5"/>`;
  const ps = pas(tmax);
  for (let t = 0; t <= tmax * 1.0001; t += ps) g += `<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${B}" y2="${B + 5}" stroke="${encre}"/><text x="${f1(X(t))}" y="${B + 22}" text-anchor="middle" font-size="14" fill="${gris}">${lbl(t)}</text>`;
  const py = pas(E);
  for (let v = 0; v <= E * 1.0001; v += py) g += `<line x1="${L - 5}" x2="${L}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" stroke="${encre}"/><text x="${L - 9}" y="${f1(Y(v) + 5)}" text-anchor="end" font-size="14" fill="${gris}">${lbl(v)}</text>`;
  let d = "";
  for (let i = 0; i <= 120; i++) { const t = (tmax * i) / 120; d += `${i ? "L" : "M"}${f1(X(t))} ${f1(Y(fn(t)))}`; }
  g += `<path d="${d}" fill="none" stroke="${encre}" stroke-width="2.5"/>`;
  if (tangente) g += mode === "monte"
    ? `<line x1="${f1(X(0))}" y1="${f1(Y(0))}" x2="${f1(X(tau))}" y2="${f1(Y(E))}" stroke="${accent}" stroke-width="2" stroke-dasharray="6 5"/>`
    : `<line x1="${f1(X(0))}" y1="${f1(Y(E))}" x2="${f1(X(tau))}" y2="${f1(Y(0))}" stroke="${accent}" stroke-width="2" stroke-dasharray="6 5"/>`;
  g += `<text x="${R + 8}" y="${B + 46}" text-anchor="end" font-size="14" fill="${encre}">t (${uT})</text><text x="${L + 8}" y="${T - 10}" font-size="14" fill="${encre}">${et(uY)}</text>`;
  return `<svg viewBox="0 0 640 ${B + 56}" role="img" aria-label="Courbe d’une tension ou d’une intensité en fonction du temps">${g}</svg>`;
}
/** deux flèches (i et u_C) sur un condensateur vertical : A en haut, B en bas ; `entreA` : i entre par A */
function figureCond({ entreA }) {
  const cx = 150, yA = 110, yB = 140;
  let g = `<line x1="${cx}" x2="${cx}" y1="20" y2="${yA}" stroke="${encre}" stroke-width="2.5"/><line x1="${cx}" x2="${cx}" y1="${yB}" y2="230" stroke="${encre}" stroke-width="2.5"/>`;
  g += `<line x1="${cx - 50}" x2="${cx + 50}" y1="${yA}" y2="${yA}" stroke="${encre}" stroke-width="5"/><line x1="${cx - 50}" x2="${cx + 50}" y1="${yB}" y2="${yB}" stroke="${encre}" stroke-width="5"/>`;
  g += `<text x="${cx - 66}" y="${yA + 5}" text-anchor="end" font-size="16" fill="${encre}">A</text><text x="${cx - 66}" y="${yB + 5}" text-anchor="end" font-size="16" fill="${encre}">B</text>`;
  // i : vers le bas, vers A (entre par A) ; ou vers le haut, vers B (entre par B)
  g += entreA
    ? `<line x1="${cx + 22}" y1="36" x2="${cx + 22}" y2="${yA - 14}" stroke="${accent}" stroke-width="3"/><path d="M${cx + 22} ${yA - 4}l-7 -14h14z" fill="${accent}"/><text x="${cx + 36}" y="70" font-size="16" fill="${accent}">i</text>`
    : `<line x1="${cx + 22}" y1="214" x2="${cx + 22}" y2="${yB + 14}" stroke="${accent}" stroke-width="3"/><path d="M${cx + 22} ${yB + 4}l-7 14h14z" fill="${accent}"/><text x="${cx + 36}" y="190" font-size="16" fill="${accent}">i</text>`;
  g += `<text x="${cx + 80}" y="${(yA + yB) / 2 + 5}" font-size="16" fill="${encre}">condensateur</text>`;
  return `<svg viewBox="0 0 320 250" role="img" aria-label="Un condensateur : armatures A en haut et B en bas, et le courant i qui entre par l’une d’elles">${g}</svg>`;
}
/** un écran d'oscilloscope : 10 divisions de large, 8 de haut ; la montée de u_C et sa tangente à l'origine */
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
  return `<svg viewBox="0 0 ${L + W + 20} ${T + H + 20}" role="img" aria-label="Écran d’un oscilloscope : la montée de la tension aux bornes du condensateur et sa tangente à l’origine">${g}</svg>`;
}
/** la droite q = f(u), u_C(t) à courant constant, ou du/dt = f(u) : une droite par deux points, axes gradués */
function figureDroite({ x1, y1, x2, y2, xn, yn, xs, ys }) {
  const L = 80, R = 590, T = 26, B = 262, X = (v) => L + ((R - L) * v) / x1, Y = (v) => B - ((B - T) * v) / y1;
  let g = `<line x1="${L}" x2="${R + 8}" y1="${B}" y2="${B}" stroke="${encre}" stroke-width="1.5"/><line x1="${L}" x2="${L}" y1="${T - 8}" y2="${B}" stroke="${encre}" stroke-width="1.5"/>`;
  for (const v of xs) g += `<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${B}" y2="${B + 5}" stroke="${encre}"/><text x="${f1(X(v))}" y="${B + 22}" text-anchor="middle" font-size="14" fill="${gris}">${lbl(v)}</text>`;
  for (const v of ys) g += `<line x1="${L - 5}" x2="${L}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" stroke="${encre}"/><text x="${L - 9}" y="${f1(Y(v) + 5)}" text-anchor="end" font-size="14" fill="${gris}">${lbl(v)}</text>`;
  g += `<line x1="${f1(X(0))}" y1="${f1(Y(0))}" x2="${f1(X(x1))}" y2="${f1(Y(y2))}" stroke="${encre}" stroke-width="2.5"/>`;
  g += `<text x="${R + 8}" y="${B + 46}" text-anchor="end" font-size="14" fill="${encre}">${et(xn)}</text><text x="${L + 8}" y="${T - 10}" font-size="14" fill="${encre}">${et(yn)}</text>`;
  return `<svg viewBox="0 0 640 ${B + 56}" role="img" aria-label="Une droite en fonction d’une grandeur, avec ses graduations">${g}</svg>`;
}

export const EXERCICES = [
  /* 1 : les unités : farads et sous-multiples, τ = RC */
  {
    id: "rc-unites",
    titre: "Les unités : F, µF, nF, pF et τ = RC",
    niveau: 1,
    capacites: CAPR("1.3.1.4", "1.3.1.11"),
    erreurs: ["préfixe non converti", "µ, n et p confondus", "τ = R/C"],
    gen(h) {
      const T = tire(() => {
        const [cu, cm, cn] = h.pick([["\\text{pF}", 1e-12, "pF"], ["\\text{nF}", 1e-9, "nF"], ["\\mu\\text{F}", 1e-6, "µF"]]);
        const cv = h.pick([1.0, 2.2, 3.3, 4.7, 6.8, 10, 22, 47, 100, 220, 470]);
        const [rv, rm, rn] = h.pick([[100, 1, "\\Omega"], [470, 1, "\\Omega"], [2.2, 1e3, "\\text{k}\\Omega"], [4.7, 1e3, "\\text{k}\\Omega"], [10, 1e3, "\\text{k}\\Omega"], [47, 1e3, "\\text{k}\\Omega"], [100, 1e3, "\\text{k}\\Omega"]]);
        return { cu, cm, cv, cn, rv, rm, rn };
      }, (t) => { const tau = t.rv * t.rm * t.cv * t.cm; return tau >= 1e-5 && tau <= 90; });
      const C = T.cv * T.cm, R = T.rv * T.rm, tau = R * C, [tv, tu] = tSI(tau), tolC = { rel: 0.02 }, tolT = { rel: 0.02 };
      const unite = tu.startsWith("\\") ? "µs" : tu;
      const wrongMu = T.cm === 1e-6 ? 1e-9 : T.cm === 1e-9 ? 1e-6 : 1e-9;   // µ lu comme n, n comme µ, p comme n
      return {
        enonce: `<p>Un conducteur ohmique de résistance $R = ${num(T.rv, 3)}\\ ${T.rn}$ est associé à un condensateur de capacité $C = ${num(T.cv, 3)}\\ ${T.cu}$.</p>`,
        questions: [
          { type: "nombre", q: "Exprime $C$ en farads.", reponse: C, tol: tolC, unite: "F", indice: "Un préfixe est une puissance de dix : µ vaut $10^{-6}$, n vaut $10^{-9}$, p vaut $10^{-12}$.",
            pieges: pieges(C, tolC, [{ v: T.cv, fb: "Tu as laissé la valeur du préfixe : il reste à multiplier par la puissance de dix du préfixe.", erreur: "préfixe non converti" }, { v: T.cv * wrongMu, fb: "Tu as confondu deux préfixes. µ vaut $10^{-6}$, n vaut $10^{-9}$, p vaut $10^{-12}$.", erreur: "µ, n et p confondus" }]) },
          { type: "nombre", q: `Calcule la constante de temps $\\tau = RC$, en ${unite}.`, reponse: tv, tol: tolT, unite, indice: "Convertis $R$ en ohms et $C$ en farads avant de multiplier.",
            pieges: pieges(tv, tolT, [{ v: tSI(R / C)[0] * (tSI(R / C)[1] === tu ? 1 : MU[tSI(R / C)[1]] / MU[tu]), fb: "Tu as divisé $R$ par $C$. La constante de temps est le produit $RC$.", erreur: "τ = R/C" }, { v: (T.rv * T.cv * T.rm) / MU[tu], fb: "Tu as laissé $C$ sans son préfixe. Convertis $C$ en farads avant de multiplier.", erreur: "préfixe non converti" }]) },
        ],
        correction: [
          { tex: `C = ${num(T.cv, 3)}\\ ${T.cu} = ${num(C, 3)}\\ \\text{F}`, r: "On remplace le préfixe par sa puissance de dix." },
          { tex: `\\tau = RC = ${num(R, 3)} \\times ${num(C, 3)} \\approx ${num(tv, 3)}\\ ${uTex(unite)}`, r: "$R$ en ohms, $C$ en farads : $\\tau$ sort en secondes (ici converties)." },
        ],
      };
    },
  },

  /* 2 : les signes : convention récepteur, q = q_A, i = dq/dt */
  {
    id: "rc-signes",
    titre: "Les signes : armatures, flèches et i = dq/dt",
    niveau: 1,
    capacites: CAPR("1.3.1.1", "1.3.1.2"),
    erreurs: ["i = −dq/dt (autre armature)", "u_C fléchée comme i", "Δt/Δq", "i positif à la décharge"],
    gen(h) {
      const entreA = h.int(0, 1) === 1, charge = h.int(0, 1) === 1, X = entreA ? "A" : "B", Y = entreA ? "B" : "A";
      const q1 = h.pick([2, 4, 5, 8, 10]), dq = h.pick([2, 3, 4, 6]), dt = h.pick([0.5, 1, 2, 4]), q2 = charge ? q1 + dq : q1 - dq < 0 ? q1 + dq : q1 - dq;
      const va = (q2 - q1) / dt, ch = q2 > q1, tol = { rel: 0.02 };
      return {
        enonce: `<p>Le courant $i$ circule dans un circuit RC, et la figure montre par quelle armature il entre dans le condensateur. On pose ${"$q$"} égale à la charge de l’armature par laquelle entre $i$, et on écrit $i = +\\dfrac{\\mathrm{d}q}{\\mathrm{d}t}$.</p>`,
        figure: figureCond({ entreA }),
        questions: [
          { type: "qcm", q: "En convention récepteur, la flèche de la tension $u_C$ aux bornes du condensateur pointe…", options: h.melange([
            { t: `vers l’armature ${X}, à l’opposé du courant`, ok: true },
            { t: `vers l’armature ${Y}, dans le sens du courant`, fb: "Tu as pris la convention générateur. Pour un récepteur, la flèche de tension s’oppose au courant : elle pointe vers l’armature par laquelle $i$ entre.", erreur: "u_C fléchée comme i" },
            { t: `vers l’armature ${X}, comme le courant`, fb: "La flèche du courant et celle de la tension ne vont pas dans le même sens en convention récepteur : elles s’opposent.", erreur: "u_C fléchée comme i" }]) },
          { type: "qcm", q: `La charge $q$ de l’énoncé est celle de l’armature…`, options: h.melange([
            { t: X, ok: true },
            { t: Y, fb: `Tu as pris l’autre armature : $q$ est la charge de l’armature par laquelle entre $i$, ici ${X}. La charge de l’autre est $-q$.`, erreur: "i = −dq/dt (autre armature)" }]) },
          { type: "nombre", q: `Pendant $${num(dt, 2)}\\ \\text{s}$, la charge $q$ passe régulièrement de $${num(q1, 2)}\\ \\mu\\text{C}$ à $${num(q2, 2)}\\ \\mu\\text{C}$. Donne $i$, avec son signe, en µA.`, reponse: va, tol, unite: "µA", indice: "$i = \\Delta q / \\Delta t$, avec $\\Delta q = q_{\\text{fin}} - q_{\\text{début}}$ : une charge par seconde.",
            pieges: pieges(va, tol, [{ v: -va, fb: ch ? "Tu as perdu le signe : $q$ augmente, donc $\\mathrm{d}q/\\mathrm{d}t$ est positif." : "Tu as perdu le signe : $q$ diminue, donc $\\mathrm{d}q/\\mathrm{d}t$ est négatif, et $i$ circule à l’inverse de sa flèche (à la décharge, $i < 0$).", erreur: ch ? "i = −dq/dt (autre armature)" : "i positif à la décharge" }, { v: dt / (q2 - q1), fb: "Tu as divisé la durée par la charge. Un débit est une charge par seconde : $\\Delta q / \\Delta t$.", erreur: "Δt/Δq" }]) },
        ],
        correction: [
          { t: `$i$ entre par l’armature ${X} : $q = q_${X}$ et la flèche de $u_C$ pointe vers ${X}.` },
          { tex: `i = \\dfrac{\\Delta q}{\\Delta t} = \\dfrac{${num(q2, 2)} - ${num(q1, 2)}}{${num(dt, 2)}} = ${num(va, 3)}\\ \\mu\\text{A}`, r: ch ? "La charge augmente : $i > 0$." : "La charge diminue : $i < 0$, à l’inverse de la flèche." },
        ],
      };
    },
  },

  /* 3 : la capacité, lue sur une droite (sujets 2018 et 2025) */
  {
    id: "rc-capacite-graphe",
    titre: "La capacité, lue sur une droite",
    niveau: 2,
    capacites: CAPR("1.3.1.3", "1.3.1.5"),
    erreurs: ["rapport inversé", "préfixe non converti", "débit constant (u_C linéaire)", "produit au lieu du rapport"],
    gen(h) {
      const forme = h.int(0, 1) === 0;
      if (forme) {
        // forme 2018 : q = f(u) est une droite par l'origine
        const umax = h.pick([4, 5, 6, 8, 10]), Cm = h.pick([2.2, 4.7, 10, 22, 47, 100]) , qmax = Cm * umax, tol = { rel: 0.02 };
        return {
          enonce: `<p>On charge un condensateur avec un générateur de courant et on mesure la charge $q$ de l’armature en fonction de la tension $u_{AB}$ (figure). La droite passe par l’origine et par le point $(${num(umax, 2)}\\ \\text{V}\\ ;\\ ${num(qmax, 3)}\\ \\mu\\text{C})$.</p>`,
          figure: figureDroite({ x1: umax, y1: qmax, y2: qmax, xn: "u_AB (V)", yn: "q (µC)", xs: [0, umax / 2, umax], ys: [0, qmax / 2, qmax] }),
          questions: [
            { type: "nombre", q: "Détermine la capacité $C$ du condensateur, en µF.", reponse: Cm, tol, unite: "µF", indice: "$q = C\\,u$ : $C$ est la pente de la droite, une charge divisée par une tension.",
              pieges: pieges(Cm, tol, [{ v: umax / qmax, fb: "Tu as divisé la tension par la charge. $C$ est la pente de $q = f(u)$ : la charge divisée par la tension.", erreur: "rapport inversé" }, { v: qmax * umax, fb: "Tu as multiplié $q$ par $u$. $q = C\\,u$ donne $C = q/u$.", erreur: "produit au lieu du rapport" }, { v: Cm * 1e-6, fb: "Cette valeur est en farads : l’énoncé demande des µF.", erreur: "préfixe non converti" }]) },
          ],
          correction: [{ tex: `C = \\dfrac{q}{u} = \\dfrac{${num(qmax, 3)}\\ \\mu\\text{C}}{${num(umax, 2)}\\ \\text{V}} = ${num(Cm, 3)}\\ \\mu\\text{F}`, r: "La pente de la droite : la charge sur la tension (1 µC/V = 1 µF)." }],
        };
      }
      // forme 2025 : charge à courant constant, u_C(t) = I₀ t / C ; la pente vaut 1 est rejetée (I₀ × pente = I₀ / pente)
      const T = tire(() => ({ I0: h.pick([0.5, 1, 2, 5]), Cm: h.pick([0.5, 1, 2, 5, 10]), tm: h.pick([5, 10, 20]) }), (t) => !prox(t.I0, t.Cm, 0.001));
      const pente = T.I0 / T.Cm, umax = pente * T.tm, tol = { rel: 0.02 };
      return {
        enonce: `<p>Un générateur de courant débite $I_0 = ${num(T.I0, 2)}\\ \\mu\\text{A}$ dans un condensateur initialement déchargé. La tension $u_C(t)$ est une droite passant par l’origine et par le point $(${num(T.tm, 2)}\\ \\text{s}\\ ;\\ ${num(umax, 3)}\\ \\text{V})$.</p>`,
        figure: figureDroite({ x1: T.tm, y1: umax, y2: umax, xn: "t (s)", yn: "u_C (V)", xs: [0, T.tm / 2, T.tm], ys: [0, umax / 2, umax] }),
        questions: [
          { type: "nombre", q: "Détermine la capacité $C$ du condensateur, en µF.", reponse: T.Cm, tol, unite: "µF", indice: "$u_C = \\dfrac{I_0}{C}\\,t$ : la pente de la droite vaut $I_0 / C$.",
            pieges: pieges(T.Cm, tol, [{ v: pente / T.I0, fb: "Tu as inversé le rapport. L’unité tranche : A/(V·s⁻¹) = F, donc $C = I_0$ / pente.", erreur: "rapport inversé" }, { v: pente * T.I0, fb: "Tu as multiplié $I_0$ par la pente. $C = I_0$ / pente : un courant divisé par une pente.", erreur: "produit au lieu du rapport" }]) },
          { type: "qcm", q: "La tension $u_C(t)$ est ici une droite. C’est parce que…", options: h.melange([
            { t: "le courant est imposé constant par le générateur", ok: true },
            { t: "la charge d’un condensateur est toujours linéaire", fb: "Avec un générateur de tension et une résistance, $u_C$ monte vite puis ralentit : ce n’est pas une droite. Ici, c’est le courant qui est imposé.", erreur: "débit constant (u_C linéaire)" },
            { t: "la tension aux bornes d’un condensateur ne varie pas", fb: "La tension varie : elle croît ici linéairement, parce que $q = I_0 t$ et $u_C = q/C$.", erreur: "débit constant (u_C linéaire)" }]) },
        ],
        correction: [
          { tex: `\\text{pente} = \\dfrac{${num(umax, 3)}}{${num(T.tm, 2)}} = ${num(pente, 3)}\\ \\text{V·s}^{-1}`, r: "La pente de la droite." },
          { tex: `C = \\dfrac{I_0}{\\text{pente}} = \\dfrac{${num(T.I0, 2)}\\ \\mu\\text{A}}{${num(pente, 3)}\\ \\text{V·s}^{-1}} = ${num(T.Cm, 3)}\\ \\mu\\text{F}`, r: "$q = I_0 t$ et $u_C = q/C$." },
        ],
      };
    },
  },

  /* 4 : les associations de condensateurs */
  {
    id: "rc-associations",
    titre: "Condensateurs en série et en parallèle",
    niveau: 2,
    capacites: CAPR("1.3.1.6"),
    erreurs: ["formules échangées", "moyenne des capacités", "addition au lieu de soustraction"],
    gen(h) {
      const serie = h.int(0, 1) === 1, n = h.int(2, 3), Cs = Array.from({ length: n }, () => h.pick([1, 2.2, 4.7, 10, 22, 47]));
      const par = Cs.reduce((a, c) => a + c, 0), ser = 1 / Cs.reduce((a, c) => a + 1 / c, 0), ceq = serie ? ser : par, tol = { rel: 0.02 };
      const liste = Cs.map((c, i) => `$C_${i + 1} = ${num(c, 3)}\\ \\mu\\text{F}$`).join(", ");
      // la capacité inconnue : on donne C_éq et n − 1 capacités
      const k = n - 1, connus = Cs.slice(0, k), x = Cs[k];
      const rest = serie ? 1 / ceq - connus.reduce((a, c) => a + 1 / c, 0) : ceq - connus.reduce((a, c) => a + c, 0);
      const x2 = serie ? 1 / rest : rest;
      return {
        enonce: `<p>On associe ${n} condensateurs, ${serie ? "en série" : "en parallèle"} : ${liste}.</p>`,
        questions: [
          { type: "nombre", q: "Calcule la capacité équivalente $C_{\\text{éq}}$, en µF.", reponse: ceq, tol, unite: "µF", indice: serie ? "En série, ce sont les inverses des capacités qui s’ajoutent." : "En parallèle, les capacités s’ajoutent.",
            pieges: pieges(ceq, tol, [{ v: serie ? par : ser, fb: serie ? "Tu as additionné les capacités : c’est la formule du montage en parallèle. En série, $1/C_{\\text{éq}} = \\sum 1/C_i$." : "Tu as appliqué la formule du montage en série. En parallèle, les capacités s’ajoutent.", erreur: "formules échangées" }, { v: par / n, fb: "Tu as fait la moyenne des capacités. Les capacités ne se moyennent pas : elles s’ajoutent (parallèle) ou leurs inverses s’ajoutent (série).", erreur: "moyenne des capacités" }]) },
          { type: "nombre", q: `On connaît $C_{\\text{éq}} = ${num(ceq, 3)}\\ \\mu\\text{F}$ et ${connus.map((c, i) => `$C_${i + 1} = ${num(c, 3)}\\ \\mu\\text{F}$`).join(", ")}. Calcule $C_${n}$, en µF.`, reponse: x2, tol, unite: "µF", indice: serie ? "$1/C_n = 1/C_{\\text{éq}} - \\sum 1/C_i$ pour les autres." : "$C_n = C_{\\text{éq}} - \\sum C_i$ pour les autres.",
            pieges: pieges(x2, tol, [{ v: serie ? ceq - connus.reduce((a, c) => a + c, 0) : 1 / (1 / ceq - connus.reduce((a, c) => a + 1 / c, 0)), fb: "Tu as mélangé les deux formules : en parallèle, on soustrait les capacités ; en série, on soustrait les inverses.", erreur: "formules échangées" }, { v: ceq + connus.reduce((a, c) => a + c, 0), fb: "Tu as ajouté au lieu de retrancher : $C_n = C_{\\text{éq}} - \\sum C_i$ en parallèle.", erreur: "addition au lieu de soustraction" }]) },
          { type: "qcm", q: serie ? "L’intérêt d’un montage en série est d’obtenir…" : "L’intérêt d’un montage en parallèle est d’obtenir…", options: h.melange([
            { t: serie ? "une capacité plus petite que chacune" : "une capacité plus grande que chacune", ok: true },
            { t: serie ? "une capacité plus grande que chacune" : "une capacité plus petite que chacune", fb: serie ? "Tu as pris le montage en parallèle. En série, $1/C_{\\text{éq}}$ est plus grand que chaque $1/C_i$ : la capacité est plus petite." : "Tu as pris le montage en série. En parallèle, $C_{\\text{éq}} = \\sum C_i$ est plus grande que chaque capacité.", erreur: "formules échangées" },
            { t: "une capacité égale à la moyenne", fb: "La capacité équivalente n’est jamais la moyenne : elle se calcule par la somme (parallèle) ou la somme des inverses (série).", erreur: "moyenne des capacités" }]) },
        ],
        correction: [
          { tex: serie ? `\\dfrac{1}{C_{\\text{éq}}} = ${Cs.map((c) => `\\dfrac{1}{${num(c, 3)}}`).join(" + ")} \\Rightarrow C_{\\text{éq}} \\approx ${num(ser, 3)}\\ \\mu\\text{F}` : `C_{\\text{éq}} = ${Cs.map((c) => num(c, 3)).join(" + ")} = ${num(par, 3)}\\ \\mu\\text{F}`, r: serie ? "En série, les inverses s’ajoutent." : "En parallèle, les capacités s’ajoutent." },
          { t: `On retrouve $C_${n} = ${num(x, 3)}\\ \\mu\\text{F}$ en isolant l’inconnue.` },
        ],
      };
    },
  },

  /* 5 : l'équation différentielle (u_C, q, u_R) à la charge et à la décharge */
  {
    id: "rc-equation",
    titre: "L’équation différentielle de la charge et de la décharge",
    niveau: 2,
    capacites: CAPR("1.3.1.7", "1.3.1.2", "1.3.1.3"),
    erreurs: ["signe perdu", "RC multiplié au lieu de divisé", "E gardé à la décharge", "i = C·u_C"],
    gen(h) {
      const charge = h.int(0, 1) === 1, qui = h.pick(["u_C", "q", "u_R"]);
      const R = h.pick([470, 1000, 2200, 4700, 10000, 22000]), C = h.pick([1, 2.2, 4.7, 10, 22, 47, 100]), RC = R * C * 1e-6, alpha = 1 / RC, tol = { rel: 0.02 };
      const rhs = charge ? "E" : "0", rhsN = charge ? "\\dfrac{E}{RC}" : "0", E_ = charge ? "E" : "0";
      const bonne = { u_C: `RC\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} + u_C = ${E_}`, q: `R\\,\\dfrac{\\mathrm{d}q}{\\mathrm{d}t} + \\dfrac{q}{C} = ${E_}`, u_R: `RC\\,\\dfrac{\\mathrm{d}u_R}{\\mathrm{d}t} + u_R = 0` }[qui];
      const nom = { u_C: "la tension $u_C$", q: "la charge $q$ de l’armature A", u_R: "la tension $u_R$" }[qui];
      const faux = { u_C: [`RC\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} - u_C = ${E_}`, charge ? `RC\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} + u_C = 0` : `RC\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} + u_C = E`, `\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} + RC\\,u_C = ${E_}`],
        q: [`R\\,\\dfrac{\\mathrm{d}q}{\\mathrm{d}t} + C\\,q = ${E_}`, `R\\,q + \\dfrac{1}{C}\\,\\dfrac{\\mathrm{d}q}{\\mathrm{d}t} = ${E_}`, charge ? `R\\,\\dfrac{\\mathrm{d}q}{\\mathrm{d}t} + \\dfrac{q}{C} = 0` : `R\\,\\dfrac{\\mathrm{d}q}{\\mathrm{d}t} + \\dfrac{q}{C} = E`],
        u_R: [`RC\\,\\dfrac{\\mathrm{d}u_R}{\\mathrm{d}t} - u_R = 0`, `RC\\,\\dfrac{\\mathrm{d}u_R}{\\mathrm{d}t} + u_R = E`, `\\dfrac{\\mathrm{d}u_R}{\\mathrm{d}t} + RC\\,u_R = 0`] }[qui];
      const fbs = { u_C: ["Tu as écrit $u_R = u_C$ ou perdu un signe : avec ce signe, la solution grandirait sans fin.", charge ? "Tu as retiré $E$ pendant la charge : le générateur est dans la maille, le second membre vaut $E$." : "Tu as gardé $E$ à la décharge : le générateur a quitté la maille, le second membre est nul.", "Tu as multiplié par $RC$ au lieu de diviser. L’homogénéité tranche : $RC\\,u_C$ n’est pas en V·s⁻¹."],
        q: ["Tu as écrit $u_C = C\\,q$. $q = C\\,u_C$ donne $u_C = q/C$.", "Tu as échangé les rôles : $u_R = R\\,i = R\\,\\mathrm{d}q/\\mathrm{d}t$ et $u_C = q/C$.", charge ? "Tu as retiré $E$ pendant la charge : le générateur est dans la maille." : "Tu as gardé $E$ à la décharge : le générateur a quitté la maille."],
        u_R: ["Tu as perdu un signe : avec ce signe, $u_R$ grandirait sans fin.", "Tu as gardé $E$ : $u_R = E - u_C$ donne un second membre nul pour $u_R$.", "Tu as multiplié par $RC$ au lieu de diviser. L’homogénéité tranche."] }[qui];
      const opts = h.melange([{ t: `$${bonne}$`, ok: true }, ...faux.map((f, i) => ({ t: `$${f}$`, fb: fbs[i], erreur: ["signe perdu", charge ? "E gardé à la décharge" : "E gardé à la décharge", "RC multiplié au lieu de divisé"][i] }))]);
      return {
        enonce: `<p>Un condensateur ${charge ? "initialement déchargé" : "chargé sous la tension $E$"} est ${charge ? "branché" : "relié, à $t = 0$,"} ${charge ? "à un générateur idéal de tension $E$ par l’intermédiaire d’un conducteur ohmique $R$" : "à un conducteur ohmique $R$ seul, le générateur ayant quitté la maille"}. Les flèches sont en convention récepteur et $i = \\dfrac{\\mathrm{d}q}{\\mathrm{d}t}$ avec $q = C\\,u_C$.</p><p>$R = ${num(R, 3)}\\ \\Omega$ et $C = ${num(C, 3)}\\ \\mu\\text{F}$.</p>`,
        questions: [
          { type: "qcm", q: `Quelle est l’équation différentielle vérifiée par ${nom} ${charge ? "pendant la charge" : "pendant la décharge"} ?`, options: opts },
          { type: "nombre", q: `Sous la forme normalisée, le coefficient de $u_C$ dans $\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} + \\alpha\\,u_C = ${rhsN}$ est $\\alpha = \\dfrac{1}{RC}$. Calcule $\\alpha$, en s⁻¹.`, reponse: alpha, tol, unite: "s⁻¹", indice: "$RC$ est une durée : $R$ en ohms, $C$ en farads. $\\alpha$ est son inverse.",
            pieges: pieges(alpha, tol, [{ v: RC, fb: "Tu as donné $RC$ au lieu de $1/(RC)$ : $\\alpha$ est l’inverse de la constante de temps.", erreur: "RC multiplié au lieu de divisé" }, { v: 1 / (R * C), fb: "Tu as laissé $C$ en µF. Convertis : $C$ en farads, puis $\\alpha = 1/(RC)$.", erreur: "préfixe non converti" }]) },
        ],
        correction: [
          { tex: `u_R + u_C = ${charge ? "E" : "0"} \\quad ; \\quad u_R = R\\,i = RC\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}`, r: charge ? "La maille avec le générateur, puis la loi d’Ohm et $i = C\\,\\mathrm{d}u_C/\\mathrm{d}t$." : "La maille sans le générateur, puis la loi d’Ohm et $i = C\\,\\mathrm{d}u_C/\\mathrm{d}t$." },
          { tex: bonne, r: `L’équation pour ${nom}.` },
          { tex: `\\alpha = \\dfrac{1}{RC} = \\dfrac{1}{${num(R, 3)} \\times ${num(C * 1e-6, 3)}} \\approx ${num(alpha, 3)}\\ \\text{s}^{-1}`, r: "L’inverse de la constante de temps." },
        ],
      };
    },
  },

  /* 6 : la solution : A, α, τ (sujet 2019 pour q) */
  {
    id: "rc-solution",
    titre: "La solution : identifier A, α et τ",
    niveau: 2,
    capacites: CAPR("1.3.1.7", "1.3.1.8", "1.3.1.11"),
    erreurs: ["α = RC", "A = E pour la charge q", "τ = R/C", "τ quelconque"],
    gen(h) {
      // τ = RC ne doit pas valoir 1 s : τ et 1/τ auraient le même chiffre
      const T = tire(() => ({ R: h.pick([470, 1000, 2200, 4700, 10000, 22000, 47000]), C: h.pick([2.2, 4.7, 10, 22, 47, 100, 220]), E: h.pick([5, 6, 9, 12]), forme: h.int(0, 2) }), (t) => { const tau = t.R * t.C * 1e-6; return !prox(tau, 1 / tau, 0.2) && tau >= 5e-3 && tau <= 30; });
      const tau = T.R * T.C * 1e-6, alpha = 1 / tau, tol = { rel: 0.02 }, Q = T.C * T.E;     // Q en µC
      const [enonceForme, qA, uniteA, A] = T.forme === 0
        ? [`$q(t) = A\\left(1 - e^{-\\alpha t}\\right)$ pour la charge de l’armature A`, "Calcule $A$, en µC.", "µC", Q]
        : T.forme === 1 ? [`$u_C(t) = A\\left(1 - e^{-t/\\tau}\\right)$ pendant la charge`, "Calcule $A$, en V.", "V", T.E]
        : [`$u_C(t) = U_0\\,e^{-t/\\tau}$ pendant la décharge (condensateur chargé sous $E$)`, "Calcule $U_0$, en V.", "V", T.E];
      const tolA = { rel: 0.02 };
      const qs = [{ type: "nombre", q: qA, reponse: A, tol: tolA, unite: uniteA, indice: T.forme === 0 ? "$q = C\\,u_C$ : à la fin de la charge, $u_C = E$." : T.forme === 1 ? "À la fin de la charge, $u_C$ vaut la tension du générateur." : "À $t = 0$, la tension aux bornes du condensateur chargé vaut $E$.",
        pieges: pieges(A, tolA, T.forme === 0 ? [{ v: T.E, fb: "Tu as pris $A = E$ pour la charge $q$. $A$ est une charge : $A = C\\,E$.", erreur: "A = E pour la charge q" }, { v: T.E / T.C, fb: "Tu as divisé $E$ par $C$. La charge finale est $C\\,E$.", erreur: "A = E pour la charge q" }] : [{ v: T.E / (T.R), fb: "Tu as divisé $E$ par $R$ : c’est une intensité. L’amplitude de $u_C$ est $E$.", erreur: "τ quelconque" }]) }];
      if (T.forme === 0) qs.push({ type: "nombre", q: "Calcule $\\alpha$, en s⁻¹.", reponse: alpha, tol, unite: "s⁻¹", indice: "$\\alpha$ est l’inverse de la constante de temps $\\tau = RC$.",
        pieges: pieges(alpha, tol, [{ v: tau, fb: "Tu as donné $RC$ pour $\\alpha$. $\\alpha = 1/(RC)$, l’inverse de la constante de temps.", erreur: "α = RC" }, { v: T.C * 1e-6 / T.R, fb: "Tu as divisé $C$ par $R$. $\\alpha = 1/(RC)$.", erreur: "τ = R/C" }]) });
      else qs.push({ type: "nombre", q: "Calcule la constante de temps $\\tau$, en s.", reponse: tau, tol, unite: "s", indice: "La substitution dans l’équation donne $\\tau = RC$.",
        pieges: pieges(tau, tol, [{ v: T.R / (T.C * 1e-6), fb: "Tu as divisé $R$ par $C$. $\\tau = RC$ : le produit.", erreur: "τ = R/C" }, { v: T.R * T.C, fb: "Tu as laissé $C$ en µF. Convertis $C$ en farads : $\\tau = RC$ sort en secondes.", erreur: "préfixe non converti" }, { v: 1 / tau, fb: "Tu as donné $1/\\tau$. La constante de temps est $\\tau = RC$ elle-même.", erreur: "α = RC" }]) });
      return {
        enonce: `<p>On étudie ${enonceForme}. $E = ${num(T.E, 2)}\\ \\text{V}$, $R = ${num(T.R, 3)}\\ \\Omega$ et $C = ${num(T.C, 3)}\\ \\mu\\text{F}$.</p>`,
        questions: qs,
        correction: [
          { t: T.forme === 0 ? "L’équation $R\\,\\dfrac{\\mathrm{d}q}{\\mathrm{d}t} + \\dfrac{q}{C} = E$ donne $A = C\\,E$ et $\\alpha = \\dfrac{1}{RC}$." : "La substitution dans l’équation impose $\\tau = RC$ ; la condition initiale impose l’amplitude." },
          { tex: T.forme === 0 ? `A = C\\,E = ${num(T.C, 3)} \\times ${num(T.E, 2)} = ${num(Q, 3)}\\ \\mu\\text{C}` : `${T.forme === 1 ? "A" : "U_0"} = E = ${num(T.E, 2)}\\ \\text{V}`, r: "L’amplitude." },
          { tex: T.forme === 0 ? `\\alpha = \\dfrac{1}{RC} \\approx ${num(alpha, 3)}\\ \\text{s}^{-1}` : `\\tau = RC \\approx ${num(tau, 3)}\\ \\text{s}`, r: "La constante de temps, ou son inverse." },
        ],
      };
    },
  },

  /* 7 : les expressions : i(t), q(t), u_R(t) et leurs valeurs */
  {
    id: "rc-expressions",
    titre: "L’intensité, la charge et la tension de R : expressions et valeurs",
    niveau: 2,
    capacites: CAPR("1.3.1.8", "1.3.1.10"),
    erreurs: ["i part de zéro", "C oublié", "u_C(0) = E", "signe de i à la décharge"],
    gen(h) {
      const charge = h.int(0, 1) === 1, E = h.pick([5, 6, 9, 12]), R = h.pick([1000, 2200, 4700, 10000]), C = h.pick([10, 22, 47, 100, 220]);
      const tau = R * C * 1e-6, k = h.pick([0, 1, 2]), t = k * tau, k2 = h.pick([1, 2, 3]), t2 = k2 * tau;
      const iv = (charge ? 1 : -1) * (E / R) * Math.exp(-t / tau) * 1e3, tolI = { rel: 0.02, };
      const uRv = (charge ? 1 : -1) * E * Math.exp(-t2 / tau), tolU = { rel: 0.02 };
      const qv = charge ? C * E * (1 - Math.exp(-t2 / tau)) : C * E * Math.exp(-t2 / tau), tolQ = { rel: 0.02 };
      const forme = charge ? `u_C(t) = E\\left(1 - e^{-t/RC}\\right)` : `u_C(t) = E\\,e^{-t/RC}`;
      const ti = k === 0 ? "t = 0" : `t = ${k}\\tau`;
      const dudt = (charge ? 1 : -1) * (E / tau) * Math.exp(-t / tau);                      // du_C/dt, en V/s : C oublié
      const iFauxMonte = charge ? (E / R) * (1 - Math.exp(-t / tau)) * 1e3 : null;           // i comme u_C (B-2)
      return {
        enonce: `<p>Un condensateur ${charge ? "initialement déchargé est chargé" : "chargé sous la tension $E$ est déchargé"} à travers un conducteur ohmique. ${charge ? "La solution est" : "La solution est"} $${forme}$, avec $E = ${num(E, 2)}\\ \\text{V}$, $R = ${num(R, 3)}\\ \\Omega$ et $C = ${num(C, 3)}\\ \\mu\\text{F}$, donc $\\tau = RC = ${num(tau * 1e3, 3)}\\ \\text{ms}$. Les flèches sont en convention récepteur.</p>`,
        questions: [
          { type: "nombre", q: `Calcule l’intensité $i$ à $${ti}$, en mA (avec son signe).`, reponse: iv, tol: tolI, unite: "mA", indice: "$i = C\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}$ : on dérive $u_C$, puis on multiplie par $C$.",
            pieges: pieges(iv, tolI, [{ v: dudt, fb: "Tu as oublié $C$ : la dérivée de $u_C$ est en V·s⁻¹. Multiplie par $C$ pour obtenir $i = C\\,\\mathrm{d}u_C/\\mathrm{d}t$.", erreur: "C oublié" }, ...(iFauxMonte !== null ? [{ v: iFauxMonte, fb: "Tu as fait monter le courant comme $u_C$. $i$ part de $E/R$ à $t = 0$ et décroît.", erreur: "i part de zéro" }] : [{ v: Math.abs(iv), fb: "Tu as perdu le signe. À la décharge, $u_C$ décroît : $i = C\\,\\mathrm{d}u_C/\\mathrm{d}t$ est négatif.", erreur: "signe de i à la décharge" }])]) },
          { type: "nombre", q: `Calcule la tension $u_R$ à $t = ${k2}\\tau$, en V.`, reponse: uRv, tol: tolU, unite: "V", indice: charge ? "$u_R = E - u_C$ : ce qui reste à charger." : "$u_R = R\\,i$, et $u_R + u_C = 0$ : $u_R$ est l’opposée de $u_C$ à la décharge.",
            pieges: pieges(uRv, tolU, [{ v: charge ? E * (1 - Math.exp(-t2 / tau)) : E * Math.exp(-t2 / tau), fb: charge ? "Tu as donné $u_C$ au lieu de $u_R = E - u_C$." : "Tu as donné $u_C$ ; à la décharge, $u_R = -u_C$ est négative.", erreur: charge ? "u_C(0) = E" : "signe de i à la décharge" }]) },
          { type: "nombre", q: `Calcule la charge $q$ de l’armature A à $t = ${k2}\\tau$, en µC.`, reponse: qv, tol: tolQ, unite: "µC", indice: "$q = C\\,u_C$, avec $C$ en farads : en µF et en V, $q$ sort en µC.",
            pieges: pieges(qv, tolQ, [{ v: C * E * (charge ? Math.exp(-t2 / tau) : (1 - Math.exp(-t2 / tau))), fb: charge ? "Tu as pris la décroissance pour la charge. $q = C\\,u_C$ monte pendant la charge." : "Tu as pris la montée pour la décharge. $q = C\\,u_C$ décroît pendant la décharge.", erreur: "u_C(0) = E" }, { v: E * (charge ? 1 - Math.exp(-t2 / tau) : Math.exp(-t2 / tau)), fb: "Tu as donné $u_C$ : $q = C\\,u_C$, il reste à multiplier par $C$.", erreur: "C oublié" }]) },
        ],
        correction: [
          { tex: `i(t) = C\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} = ${charge ? "" : "-"}\\dfrac{E}{R}\\,e^{-t/RC}`, r: charge ? "Le courant part de $E/R$ et décroît." : "Le courant est négatif : il circule à l’inverse de sa flèche." },
          { tex: `i(${ti}) = ${num(iv, 3)}\\ \\text{mA}`, r: "Valeur numérique, avec le signe." },
          { tex: `u_R(t) = ${charge ? "" : "-"}E\\,e^{-t/RC} \\;\\Rightarrow\\; u_R(${k2}\\tau) = ${num(uRv, 3)}\\ \\text{V}`, r: charge ? "Ce qui reste à charger." : "L’opposée de $u_C$ : $u_R = R\\,i$ est négative." },
          { tex: `q(t) = C\\,u_C(t) \\;\\Rightarrow\\; q(${k2}\\tau) = ${num(qv, 3)}\\ \\mu\\text{C}`, r: "$q = C\\,u_C$." },
        ],
      };
    },
  },

  /* 8 : lire τ sur une courbe */
  {
    id: "rc-lecture-tau",
    titre: "Lire la constante de temps sur une courbe",
    niveau: 3,
    capacites: CAPR("1.3.1.9", "1.3.1.11", "1.3.1.13"),
    erreurs: ["63 % lu sur une descente", "37 % lu sur une montée", "lecture à la moitié", "préfixe ms"],
    gen(h) {
      const mode = h.pick(["monte", "descend"]), grandeur = mode === "monte" ? "uC" : h.pick(["uC", "uR", "i"]);
      const nom = mode === "monte" ? "$u_C$ pendant la charge" : { uC: "$u_C$ pendant la décharge", uR: "$u_R$ pendant la charge", i: "l’intensité $i$ pendant la charge" }[grandeur];
      const T = tire(() => ({ E: h.pick([5, 6, 9, 12]), R: h.pick([1000, 2200, 4700, 10000]), C: h.pick([10, 22, 47, 100, 220]), tang: h.int(0, 1) === 1 }), (t) => { const tau = t.R * t.C * 1e-6; return tau >= 0.02 && tau <= 3; });
      const tau = T.R * T.C * 1e-6, [uu, un] = tau >= 1 ? [1, "s"] : [1e-3, "ms"], tauU = tau / uu, ps = pas(5 * tauU), tmaxU = ps * Math.ceil((5 * tauU) / ps), tolT = { rel: 0.07 };
      const lu37 = -Math.log(1 - P37) * tauU, moitie = Math.LN2 * tauU;
      const lecture63 = mode === "monte" ? "là où $u_C$ atteint 63 % de $E$" : "là où il reste 37 % de la valeur de départ";
      const Cm = T.C, tolC = { rel: 0.07 };
      const amp = grandeur === "i" ? (T.E / T.R) * 1e3 : T.E, yl = { uC: "u_C (V)", uR: "u_R (V)", i: "i (mA)" }[grandeur];
      const figure = figureCourbe({ E: amp, tau: tauU, mode, tangente: T.tang, uT: un, uY: yl, tmax: tmaxU });
      return {
        enonce: `<p>La figure donne ${nom} pour un circuit RC où $E = ${num(T.E, 2)}\\ \\text{V}$${T.tang ? " ; la tangente à l’origine est tracée en pointillés" : ""}. On donne $R = ${num(T.R, 3)}\\ \\Omega$.</p>`,
        figure,
        questions: [
          { type: "nombre", q: `Détermine graphiquement la constante de temps $\\tau$, en ${un}.`, reponse: tauU, tol: tolT, unite: un, indice: mode === "monte" ? `Lis ${lecture63}${T.tang ? ", ou l’abscisse où la tangente coupe la droite $u = E$" : ""}.` : `Lis ${lecture63}${T.tang ? ", ou l’abscisse où la tangente coupe l’axe des temps" : ""}.`,
            pieges: pieges(tauU, tolT, [{ v: lu37, fb: mode === "monte" ? "Tu as lu à 37 % de $E$ sur une courbe qui monte. 37 % est le repère d’une courbe qui descend : sur une montée, on lit 63 %." : "Tu as lu à 63 % de la valeur de départ sur une courbe qui descend. Sur une descente, on lit où il reste 37 %.", erreur: mode === "monte" ? "37 % lu sur une montée" : "63 % lu sur une descente" }, { v: moitie, fb: "Tu as lu à la moitié de la valeur finale ou de départ. C’est $\\tau \\ln 2$, pas $\\tau$.", erreur: "lecture à la moitié" }]) },
          { type: "nombre", q: `Déduis la capacité $C$ du condensateur, en µF.`, reponse: Cm, tol: tolC, unite: "µF", indice: "$\\tau = RC$ : convertis $\\tau$ en secondes avant de diviser par $R$.",
            pieges: pieges(Cm, tolC, [{ v: (lu37 * uu) / T.R * 1e6, fb: "Tu es parti d’une lecture à 37 % sur une montée (ou 63 % sur une descente) : $\\tau$ est faux, donc $C$ aussi.", erreur: mode === "monte" ? "37 % lu sur une montée" : "63 % lu sur une descente" }, { v: tauU / T.R * 1e6, fb: `Tu as laissé $\\tau$ en ${un}. Convertis en secondes avant de calculer $C = \\tau / R$.`, erreur: "préfixe ms" }]) },
        ],
        correction: [
          { t: `Sur une courbe ${mode === "monte" ? "qui monte" : "qui descend"}, on lit $\\tau$ ${lecture63}.` },
          { tex: `\\tau \\approx ${num(tauU, 3)}\\ \\text{${un}}`, r: "La lecture." },
          { tex: `C = \\dfrac{\\tau}{R} = \\dfrac{${num(tau, 3)}}{${num(T.R, 3)}} = ${num(Cm, 3)}\\ \\mu\\text{F}`, r: "$\\tau = RC$, avec $\\tau$ en secondes." },
        ],
      };
    },
  },

  /* 9 : la droite du/dt = f(u_C) (sujet 2021) */
  {
    id: "rc-droite-dudt",
    titre: "La droite de la dérivée de la tension (sujet 2021)",
    niveau: 3,
    capacites: CAPR("1.3.1.7", "1.3.1.9", "1.3.1.5"),
    erreurs: ["ordonnée prise pour 1/(RC)", "pente prise pour RC", "E oublié"],
    gen(h) {
      // E (en V) ne doit pas avoir le même chiffre que τ (en ms ou en s) : le chiffre lu en abscisse ne doit pas donner la bonne capacité par hasard.
      // On tire d'abord l'ordonnée à l'origine (ronde) : la capacité s'en déduit, avec deux chiffres significatifs au plus.
      const T = tire(() => { const E = h.pick([5, 6, 9, 12, 15]), a0 = h.pick([250, 500, 1000, 2000]), R = h.pick([500, 1000, 2000, 5000]); return { E, a0, R, C: (E / (a0 * R)) * 1e6 }; }, (t) => { const tau = t.E / t.a0; return !prox(t.E, tau * 1e3, 0.05) && !prox(t.E, tau, 0.05) && !prox(t.E, tau * 1e6, 0.05); });
      const tau = T.R * T.C * 1e-6, a = T.a0, tol = { rel: 0.03 };
      const ymax = a;
      const fig = ((e, y) => { const L = 80, R = 590, T0 = 26, B = 262; const X = (v) => L + ((R - L) * v) / e, Y = (v) => B - ((B - T0) * v) / y; let g = `<line x1="${L}" x2="${R + 8}" y1="${B}" y2="${B}" stroke="${encre}" stroke-width="1.5"/><line x1="${L}" x2="${L}" y1="${T0 - 8}" y2="${B}" stroke="${encre}" stroke-width="1.5"/>`; [0, e / 2, e].forEach((v) => { g += `<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${B}" y2="${B + 5}" stroke="${encre}"/><text x="${f1(X(v))}" y="${B + 22}" text-anchor="middle" font-size="14" fill="${gris}">${lbl(v)}</text>`; }); [0, y / 2, y].forEach((v) => { g += `<line x1="${L - 5}" x2="${L}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" stroke="${encre}"/><text x="${L - 9}" y="${f1(Y(v) + 5)}" text-anchor="end" font-size="14" fill="${gris}">${lbl(v)}</text>`; }); g += `<line x1="${f1(X(0))}" y1="${f1(Y(y))}" x2="${f1(X(e))}" y2="${f1(Y(0))}" stroke="${encre}" stroke-width="2.5"/><text x="${R + 8}" y="${B + 46}" text-anchor="end" font-size="14" fill="${encre}">${et("u_C (V)")}</text><text x="${L + 8}" y="${T0 - 10}" font-size="14" fill="${encre}">${et("du_C/dt (V/s)")}</text>`; return `<svg viewBox="0 0 640 ${B + 56}" role="img" aria-label="Une droite décroissante : du_C/dt en fonction de u_C">${g}</svg>`; })(T.E, ymax);
      const pente = a / T.E;                                  // 1/(RC)
      const C_ = T.C, CfauxOrd = 1 / (a * T.R) * 1e6, CfauxPente = (pente / T.R) * 1e6;
      return {
        enonce: `<p>On charge un condensateur, initialement déchargé, avec un générateur idéal de tension $E$ à travers un conducteur ohmique de résistance $R = ${num(T.R, 3)}\\ \\Omega$. L’équation est $\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} = -\\dfrac{1}{RC}\\,u_C + \\dfrac{E}{RC}$. On trace $\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}$ en fonction de $u_C$ : c’est la droite de la figure.</p>`,
        figure: fig,
        questions: [
          { type: "nombre", q: "Lis la valeur de $E$ sur la figure, en V.", reponse: T.E, tol: { rel: 0.02 }, unite: "V", indice: "$\\mathrm{d}u_C/\\mathrm{d}t$ s’annule quand $u_C = E$ : la droite coupe l’axe des abscisses en $E$.", pieges: [] },
          { type: "nombre", q: "Montre puis calcule la capacité $C$, en µF.", reponse: C_, tol, unite: "µF", indice: "L’ordonnée à l’origine vaut $E/(RC)$ : $RC = E$ divisé par cette ordonnée.",
            pieges: pieges(C_, tol, [{ v: CfauxOrd, fb: "Tu as pris l’ordonnée à l’origine pour $1/(RC)$ : c’est $E/(RC)$. Il faut aussi $E$, lue où la droite coupe l’axe.", erreur: "ordonnée prise pour 1/(RC)" }, { v: CfauxPente, fb: "Tu as pris la pente pour $RC$ : elle vaut $-1/(RC)$. Ici $RC = 1/|\\text{pente}|$.", erreur: "pente prise pour RC" }]) },
        ],
        correction: [
          { tex: `u_C = 0 : \\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} = \\dfrac{E}{RC} = ${num(a, 4)}\\ \\text{V·s}^{-1}`, r: "L’ordonnée à l’origine." },
          { tex: `RC = \\dfrac{E}{${num(a, 4)}} = ${num(tau, 3)}\\ \\text{s} \\;\\Rightarrow\\; C = \\dfrac{RC}{R} = ${num(C_, 3)}\\ \\mu\\text{F}`, r: "$E$ est lue à l’intersection avec l’axe des abscisses." },
        ],
      };
    },
  },

  /* 10 : les régimes et les pourcentages */
  {
    id: "rc-regimes",
    titre: "Régime transitoire, régime permanent, 63 % et 37 %",
    niveau: 1,
    capacites: CAPR("1.3.1.13"),
    erreurs: ["τ = fin de la charge", "63 % et 37 % échangés", "régime permanent avec i ≠ 0"],
    gen(h) {
      const T = tire(() => ({ R: h.pick([1000, 2200, 4700, 10000]), C: h.pick([10, 22, 47, 100, 220]), n: h.pick([1, 2, 3, 5]), charge: h.int(0, 1) === 1 }), (t) => true);
      const tau = T.R * T.C * 1e-6, [tv, tu] = tSI(tau), part = (T.charge ? chargePart(T.n) : dechPart(T.n)) * 100, tolP = { rel: 0.02 };
      const tU = tu.startsWith("\\") ? "µs" : tu;
      const dur = 5 * tv, tolD = { rel: 0.02 };
      const autre = (T.charge ? dechPart(T.n) : chargePart(T.n)) * 100;
      return {
        enonce: `<p>Un condensateur est ${T.charge ? "chargé, depuis l’état déchargé" : "déchargé, depuis l’état chargé sous $E$"}, à travers un conducteur ohmique. La constante de temps vaut $\\tau = ${num(tv, 3)}\\ ${uTex(tU)}$.</p>`,
        questions: [
          { type: "nombre", q: `À $t = ${T.n === 1 ? "" : T.n}\\tau$, quelle part de $E$ la tension $u_C$ ${T.charge ? "a-t-elle atteinte" : "a-t-elle conservée"} ? Donne un pourcentage.`, reponse: part, tol: tolP, unite: "%", indice: T.charge ? "$u_C = E\\left(1 - e^{-t/\\tau}\\right)$ : calcule $1 - e^{-n}$." : "$u_C = E\\,e^{-t/\\tau}$ : calcule $e^{-n}$.",
            pieges: pieges(part, tolP, [{ v: autre, fb: T.charge ? "Tu as pris la part qui reste (la décroissance). À la charge, $u_C = E(1 - e^{-t/\\tau})$ monte vers $E$." : "Tu as pris la part atteinte (la montée). À la décharge, $u_C = E\\,e^{-t/\\tau}$ : il reste $e^{-n}$.", erreur: "63 % et 37 % échangés" }, { v: 100, fb: "Tu as cru que la charge est finie à $\\tau$ : à $n\\tau$, la part n’est pas 100 %.", erreur: "τ = fin de la charge" }]) },
          { type: "nombre", q: `Quelle est la durée du régime transitoire (environ $5\\tau$), en ${tU} ?`, reponse: dur, tol: tolD, unite: tU, indice: "Au bout de $5\\tau$, la charge est faite à plus de 99 %.",
            pieges: pieges(dur, tolD, [{ v: tv, fb: "Tu as pris $\\tau$ pour la durée du régime transitoire. À $\\tau$, 63 % seulement sont atteints : il faut environ $5\\tau$.", erreur: "τ = fin de la charge" }, { v: 2 * tv, fb: "À $2\\tau$, 86 % seulement sont atteints : il faut environ $5\\tau$.", erreur: "τ = fin de la charge" }]) },
          { type: "qcm", q: "Longtemps après la fermeture, en régime permanent, l’intensité du courant…", options: h.melange([
            { t: "est nulle, et $u_C = E$ à la charge", ok: true },
            { t: "vaut $E/R$ : le condensateur chargé laisse passer le courant", fb: "Tu as cru qu’un condensateur chargé conduit. En régime permanent, $u_R = 0$, donc $i = 0$.", erreur: "régime permanent avec i ≠ 0" },
            { t: "est négative : $u_C$ dépasse $E$", fb: "La courbe approche $E$ sans le dépasser : $u_R$ reste positive, puis tend vers 0.", erreur: "régime permanent avec i ≠ 0" }]) },
        ],
        correction: [
          { tex: `${T.charge ? "\\dfrac{u_C}{E} = 1 - e^{-" + T.n + "}" : "\\dfrac{u_C}{E} = e^{-" + T.n + "}"} \\approx ${num(part / 100, 3)}`, r: T.charge ? "La part atteinte à la charge." : "La part qui reste à la décharge." },
          { tex: `5\\tau = 5 \\times ${num(tv, 3)} = ${num(dur, 3)}\\ ${uTex(tU)}`, r: "La durée du régime transitoire." },
        ],
      };
    },
  },

  /* 11 : l'influence de R, C et E */
  {
    id: "rc-influence",
    titre: "L’influence de R, de C et de E sur la charge",
    niveau: 2,
    capacites: CAPR("1.3.1.16", "1.3.1.13"),
    erreurs: ["R seul règle la vitesse", "E change τ", "un R plus grand charge plus vite"],
    gen(h) {
      const modeE = h.int(0, 2) === 0;     // une fois sur trois : l'amplitude E varie, τ ne change pas
      const paire = h.int(0, 2) === 0;      // une fois sur trois : une paire de même produit RC
      const T = tire(() => {
        if (modeE) return { mode: "E", Es: h.melange([5, 9, 12]), R: 2200, C: 47 };
        const R = h.pick([1000, 2200, 4700, 10000]), C = h.pick([10, 22, 47, 100]);
        const a = [R, C];
        const b = paire ? [R * 2, C / 2] : [h.pick([1000, 2200, 4700, 10000]), h.pick([10, 22, 47, 100])];
        const c = [h.pick([1000, 2200, 4700, 10000]), h.pick([10, 22, 47, 100])];
        return { mode: "RC", cs: h.melange([a, b, c]), paire };
      }, (t) => {
        if (t.mode === "E") return true;
        const p = t.cs.map(([r, c]) => r * c);
        const dist = (x, y) => Math.abs(x - y) / Math.max(x, y) > 0.2;
        const memes = [0, 1, 2].flatMap((i) => [0, 1, 2].filter((j) => j > i && !dist(p[i], p[j])).map((j) => [i, j]));
        return t.paire ? memes.length === 1 : memes.length === 0;
      });
      if (T.mode === "E") {
        const Es = T.Es, k = h.int(0, 2), tau = T.R * T.C * 1e-6;
        return {
          enonce: `<p>On charge trois fois le même condensateur de capacité $C = ${num(T.C, 3)}\\ \\mu\\text{F}$ à travers le même conducteur ohmique $R = ${num(T.R, 3)}\\ \\Omega$, sous trois tensions $E$ différentes : ${Es.map((E, j) => `courbe ${j + 1} : $E_${j + 1} = ${E}\\ \\text{V}$`).join(" ; ")}.</p>`,
          questions: [
            { type: "qcm", q: "Les trois courbes $u_C(t)$ ont-elles la même constante de temps $\\tau$ ?", options: h.melange([
              { t: `oui : $\\tau = RC = ${num(tau * 1e3, 3)}\\ \\text{ms}$ ne dépend pas de $E$`, ok: true },
              { t: "non : plus $E$ est grand, plus $\\tau$ est grand", fb: "Tu as cru que $E$ change $\\tau$. $\\tau = RC$ ne contient pas $E$ : seule la hauteur de l’asymptote change.", erreur: "E change τ" },
              { t: "non : plus $E$ est grand, plus la charge va vite", fb: "Tu as cru qu’une tension plus grande charge plus vite. La courbe monte plus haut dans le même temps : $\\tau$ ne change pas.", erreur: "E change τ" }]) },
            { type: "nombre", q: `Quelle est la valeur de $u_C$ à $t = \\tau$ pour la courbe ${k + 1}, en V ?`, reponse: Es[k] * P63, tol: { rel: 0.02 }, unite: "V", indice: "À $t = \\tau$, la tension a atteint 63 % de sa valeur finale $E$.",
              pieges: pieges(Es[k] * P63, { rel: 0.02 }, [{ v: Es[k], fb: "Tu as pris $\\tau$ pour la fin de la charge. À $t = \\tau$, 63 % seulement sont atteints.", erreur: "E change τ" }, { v: Es[k] * P37, fb: "Tu as pris 37 % : c’est le repère d’une courbe qui descend. À la charge, on lit 63 %.", erreur: "E change τ" }]) },
          ],
          correction: [{ t: `$\\tau = RC = ${num(tau * 1e3, 3)}\\ \\text{ms}$ est le même pour les trois courbes : $E$ ne change que la hauteur de l’asymptote.` }, { tex: `u_C(\\tau) = 0{,}63\\,E_${k + 1} = ${num(Es[k] * P63, 3)}\\ \\text{V}`, r: "63 % de la valeur finale." }],
        };
      }
      const taus = T.cs.map(([r, c]) => r * c * 1e-6), noms = ["1", "2", "3"];
      const lent = taus.indexOf(Math.max(...taus)), vite = taus.indexOf(Math.min(...taus));
      const desc = T.cs.map(([r, c], j) => `couple ${j + 1} : $R = ${num(r, 3)}\\ \\Omega$, $C = ${num(c, 3)}\\ \\mu\\text{F}$`).join(" ; ");
      const qs = [];
      if (T.paire) {
        const pair = [0, 1, 2].flatMap((i) => [0, 1, 2].filter((j) => j > i && !(Math.abs(taus[i] - taus[j]) / Math.max(taus[i], taus[j]) > 0.2)).map((j) => [i + 1, j + 1]))[0];
        qs.push({ type: "qcm", q: `Les couples ${pair[0]} et ${pair[1]} donnent-ils la même courbe $u_C(t)$ ?`, options: h.melange([
          { t: "oui : le produit $RC$ est le même", ok: true },
          { t: "non : $R$ n’est pas le même, donc la vitesse change", fb: "Tu as retenu $R$ seul. Un $R$ plus grand freine, mais un $C$ plus petit se remplit plus vite : seul le produit $RC$ compte.", erreur: "R seul règle la vitesse" },
          { t: "non : $C$ n’est pas le même, donc la vitesse change", fb: "Tu as retenu $C$ seul. Un $C$ plus grand se remplit plus lentement, mais un $R$ plus petit accélère : seul le produit $RC$ compte.", erreur: "R seul règle la vitesse" }]) });
      } else {
        qs.push({ type: "qcm", q: "Quelle est la courbe la plus lente à atteindre $E$ ?", options: [0, 1, 2].map((j) => j === lent ? { t: `celle du couple ${j + 1} : $RC$ le plus grand`, ok: true } : { t: `celle du couple ${j + 1}`, fb: `Le couple ${j + 1} a $\\tau = ${num(taus[j] * 1e3, 3)}\\ \\text{ms}$, plus petit que celui du couple ${lent + 1} ($${num(taus[lent] * 1e3, 3)}\\ \\text{ms}$). Un $R$ ou un $C$ plus grand ne suffit pas : on compare le produit $RC$.`, erreur: "un R plus grand charge plus vite" }) });
      }
      qs.push({ type: "nombre", q: `Quelle est la constante de temps du couple ${vite + 1}, en ms ?`, reponse: taus[vite] * 1e3, tol: { rel: 0.02 }, unite: "ms", indice: "$\\tau = RC$, avec $R$ en ohms et $C$ en farads.",
        pieges: pieges(taus[vite] * 1e3, { rel: 0.02 }, [{ v: (T.cs[vite][0] / (T.cs[vite][1] * 1e-6)) * 1e3, fb: "Tu as divisé $R$ par $C$ : $\\tau = RC$.", erreur: "R seul règle la vitesse" }, { v: T.cs[vite][0] * T.cs[vite][1] * 1e3, fb: "Tu as laissé $C$ en µF. Convertis en farads avant de multiplier.", erreur: "R seul règle la vitesse" }]) });
      return {
        enonce: `<p>On charge un condensateur sous la même tension $E$ pour trois couples $(R, C)$ : ${desc}.</p>`,
        questions: qs,
        correction: [{ tex: taus.map((t, j) => `\\tau_${j + 1} = ${num(t * 1e3, 3)}\\ \\text{ms}`).join(" \\quad ; \\quad "), r: "$\\tau = RC$ pour chaque couple : seul le produit compte." }],
      };
    },
  },

  /* 12 : l'énergie emmagasinée */
  {
    id: "rc-energie",
    titre: "L’énergie emmagasinée dans un condensateur",
    niveau: 2,
    capacites: CAPR("1.3.1.18"),
    erreurs: ["½ C u (carré oublié)", "C u² (½ oublié)", "préfixe non converti", "× 2 quand u double"],
    gen(h) {
      const [cu, cm, cn] = h.pick([["\\mu\\text{F}", 1e-6, "µF"], ["\\text{nF}", 1e-9, "nF"], ["\\text{mF}", 1e-3, "mF"]]);
      const cv = h.pick([10, 22, 47, 100, 220, 470, 1000]), u = h.pick([5, 6, 9, 12, 15, 24]), C = cv * cm, tol = { rel: 0.02 };
      const Ee = energie(C, u), [ev, eu] = pref(Ee, [[1, "J"], [1e-3, "mJ"], [1e-6, "µJ"]]);
      const euTex = eu === "µJ" ? "\\mu\\text{J}" : `\\text{${eu}}`, f = (E) => E / (eu === "J" ? 1 : eu === "mJ" ? 1e-3 : 1e-6);
      return {
        enonce: `<p>Un condensateur de capacité $C = ${num(cv, 3)}\\ ${cu}$ est chargé sous la tension $u_C = ${num(u, 2)}\\ \\text{V}$.</p>`,
        questions: [
          { type: "nombre", q: `Calcule l’énergie $E_e$ emmagasinée, en ${eu}.`, reponse: ev, tol, unite: eu, indice: "$E_e = \\dfrac{1}{2}\\,C\\,u_C^{2}$, avec $C$ en farads.",
            pieges: pieges(ev, tol, [{ v: f(0.5 * C * u), fb: "Tu n’as pas élevé la tension au carré : $E_e = \\tfrac{1}{2} C u_C^{2}$, pas $\\tfrac{1}{2} C u_C$.", erreur: "½ C u (carré oublié)" }, { v: f(C * u * u), fb: "Tu as oublié le ½ : $E_e = \\tfrac{1}{2} C u_C^{2}$.", erreur: "C u² (½ oublié)" }, { v: f(0.5 * cv * u * u), fb: "Tu as laissé $C$ sans son préfixe : convertis $C$ en farads avant de calculer.", erreur: "préfixe non converti" }]) },
          { type: "nombre", q: "On double la tension : $u_C' = 2u_C$. Par quel facteur l’énergie est-elle multipliée ?", reponse: 4, tol: { rel: 0.02 }, unite: "", indice: "$E_e$ est proportionnelle à $u_C^{2}$.",
            pieges: [{ v: 2, fb: "Tu as cru l’énergie proportionnelle à la tension. $E_e \\propto u_C^{2}$ : doubler $u_C$ la multiplie par 4.", erreur: "× 2 quand u double" }] },
          { type: "nombre", q: `Le condensateur se décharge dans un conducteur ohmique. Quelle énergie est dissipée par effet Joule, en ${eu} ?`, reponse: ev, tol, unite: eu, indice: "Toute l’énergie emmagasinée est dissipée dans le conducteur ohmique, à la décharge complète.",
            pieges: pieges(ev, tol, [{ v: ev / 2, fb: "Tu as retranché la moitié. À la décharge complète, toute l’énergie emmagasinée est dissipée dans $R$.", erreur: "C u² (½ oublié)" }]) },
        ],
        correction: [
          { tex: `E_e = \\dfrac{1}{2}\\,C\\,u_C^{2} = \\dfrac{1}{2} \\times ${num(C, 3)} \\times ${num(u, 2)}^{2} \\approx ${num(ev, 3)}\\ ${euTex}`, r: "Avec $C$ en farads : l’énergie sort en joules." },
          { t: "Doubler $u_C$ multiplie $E_e$ par 4 ; à la décharge complète, toute cette énergie est dissipée dans $R$." },
        ],
      };
    },
  },

  /* 13 : mesurer à l'oscilloscope */
  {
    id: "rc-mesure",
    titre: "Mesurer à l’oscilloscope",
    niveau: 1,
    capacites: CAPR("1.3.1.14", "1.3.1.15"),
    erreurs: ["divisions lues comme des unités", "division par la sensibilité", "i visualisé par u_C"],
    gen(h) {
      const sv = h.pick([0.5, 1, 2]), shU = h.pick([["ms", 1e-3], ["s", 1]]), sh = shU[0] === "ms" ? h.pick([0.5, 1, 2, 5, 10, 20]) : h.pick([0.1, 0.2, 0.5, 1]), hNe = h.pick([4, 5, 6]);
      const divTau = h.pick([1.6, 2, 2.4, 3.2, 4]), E = hNe * sv, tau = divTau * sh * shU[1], tolT = { rel: 0.05 };
      const tauU = divTau * sh, unite = shU[0];
      return {
        enonce: `<p>On charge un condensateur à travers un conducteur ohmique ; la voie $Y_1$ d’un oscilloscope est branchée sur l’armature A du condensateur et la masse sur l’armature B. La sensibilité verticale est de $${num(sv, 2)}\\ \\text{V/div}$ et la sensibilité horizontale de $${num(sh, 2)}\\ \\text{${unite}/div}$. La tangente à l’origine est tracée en pointillés.</p>`,
        figure: figureOscillo({ hNe, divTau }),
        questions: [
          { type: "qcm", q: "Quelle tension l’oscilloscope montre-t-il avec ce branchement ?", options: h.melange([
            { t: "la tension $u_C$ aux bornes du condensateur", ok: true },
            { t: "la tension $u_R$ aux bornes du conducteur ohmique", fb: "Tu as pris $u_R$. Entre A et B, c’est le condensateur : la voie $Y_1$ sur A et la masse sur B montrent $u_C$.", erreur: "i visualisé par u_C" },
            { t: "l’intensité $i$ du courant", fb: "Un oscilloscope ne montre que des tensions. Pour voir l’allure de $i$, il faut visualiser $u_R = R\\,i$.", erreur: "i visualisé par u_C" }]) },
          { type: "nombre", q: `Lis le nombre de divisions $N$ entre l’origine et l’abscisse où la tangente coupe l’asymptote : calcule $\\tau$, en ${unite}.`, reponse: tauU, tol: tolT, unite, indice: `$\\tau$ = divisions × ${unite} par division.`,
            pieges: pieges(tauU, tolT, [{ v: divTau, fb: "Tu as lu des divisions comme des " + unite + ". Multiplie par la sensibilité horizontale.", erreur: "divisions lues comme des unités" }, { v: divTau / sh, fb: "Tu as divisé par la sensibilité. $\\tau$ = nombre de divisions × " + unite + " par division.", erreur: "division par la sensibilité" }]) },
          { type: "nombre", q: "Quelle est la valeur de $E$, lue sur l’asymptote, en V ?", reponse: E, tol: { rel: 0.03 }, unite: "V", indice: "Hauteur de l’asymptote en divisions, fois la sensibilité verticale.",
            pieges: pieges(E, { rel: 0.03 }, [{ v: hNe, fb: "Tu as lu des divisions comme des volts. Multiplie par la sensibilité verticale.", erreur: "divisions lues comme des unités" }, { v: hNe / sv, fb: "Tu as divisé par la sensibilité verticale : $E$ = divisions × V par division.", erreur: "division par la sensibilité" }]) },
        ],
        correction: [
          { t: "Avec la voie sur A et la masse sur B, l’oscilloscope montre $u_C$ ; pour $i$, on visualise $u_R$." },
          { tex: `\\tau = ${num(divTau, 3)}\\ \\text{div} \\times ${num(sh, 2)}\\ \\text{${unite}/div} = ${num(tauU, 3)}\\ \\text{${unite}}`, r: "Divisions × sensibilité horizontale." },
          { tex: `E = ${hNe}\\ \\text{div} \\times ${num(sv, 2)}\\ \\text{V/div} = ${num(E, 3)}\\ \\text{V}`, r: "Divisions × sensibilité verticale." },
        ],
      };
    },
  },

  /* 14 : au bac : la forme du sujet 2022 */
  {
    id: "rc-bac",
    titre: "Au bac : l’équation, i(t), R et C",
    niveau: 3,
    capacites: CAPR("1.3.1.7", "1.3.1.8", "1.3.1.9", "1.3.1.11"),
    erreurs: ["mA non converti", "i₀/E au lieu de E/i₀", "τ lu à 37 % ou à la moitié", "E oublié", "C oublié"],
    gen(h) {
      // E (en V) et i₀ (en mA) ne doivent pas avoir le même chiffre (R = 1 000 Ω) : « mA non converti » donnerait R/1000 par hasard
      const T = tire(() => ({ E: h.pick([6, 9, 12]), R: h.pick([470, 1000, 2200, 4700, 10000]), C: h.pick([10, 22, 47, 100, 220, 470]) }), (t) => !prox(t.E, (t.E / t.R) * 1e3, 0.02));
      const i0 = T.E / T.R * 1e3, tau = T.R * T.C * 1e-6, tauMs = tau * 1e3, tol = { rel: 0.03 };
      const lu37 = -Math.log(1 - P37) * tauMs, moitie = Math.LN2 * tauMs;
      return {
        enonce: `<p>À $t = 0$, on place l’interrupteur sur la position (1) d’un montage où un générateur idéal de tension $E$, un conducteur ohmique $R$ et un condensateur initialement déchargé sont en série. On lit sur les courbes de la figure 2 : $u_C$ tend vers $E = ${num(T.E, 2)}\\ \\text{V}$ ; $i(0) = ${num(i0, 3)}\\ \\text{mA}$ ; la tangente à l’origine de $u_C(t)$ coupe le palier à $t = ${num(tauMs, 3)}\\ \\text{ms}$.</p>`,
        questions: [
          { type: "qcm", q: "Quelle est l’équation différentielle vérifiée par $u_C(t)$ ?", options: h.melange([
            { t: "$\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} + \\dfrac{1}{RC}\\,u_C = \\dfrac{E}{RC}$", ok: true },
            { t: "$\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} + RC\\,u_C = RC\\,E$", fb: "Tu as multiplié par $RC$ au lieu de diviser. L’homogénéité tranche : $RC\\,u_C$ n’est pas en V·s⁻¹.", erreur: "E oublié" },
            { t: "$\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} - \\dfrac{1}{RC}\\,u_C = \\dfrac{E}{RC}$", fb: "Tu as perdu un signe : avec ce signe, la solution grandirait sans limite.", erreur: "E oublié" }]) },
          { type: "qcm", q: "Quelle est l’expression de $i(t)$ ?", options: h.melange([
            { t: "$i = \\dfrac{E}{R}\\,e^{-t/RC}$", ok: true },
            { t: "$i = \\dfrac{E}{RC}\\,e^{-t/RC}$", fb: "Tu as oublié $C$ : c’est $\\mathrm{d}u_C/\\mathrm{d}t$, en V·s⁻¹. Multiplie par $C$.", erreur: "C oublié" },
            { t: "$i = \\dfrac{E}{R}\\left(1 - e^{-t/RC}\\right)$", fb: "Tu as fait monter le courant comme $u_C$. $i$ part de $E/R$ à $t = 0$ : il décroît.", erreur: "C oublié" }]) },
          { type: "nombre", q: "Détermine la résistance $R$, en Ω.", reponse: T.R, tol, unite: "Ω", indice: "À $t = 0$, $u_C = 0$ : $i(0) = E/R$.",
            pieges: pieges(T.R, tol, [{ v: T.E / (i0), fb: "Tu as laissé $i_0$ en mA. Convertis : $i_0$ en ampères, puis $R = E/i_0$.", erreur: "mA non converti" }, { v: i0 * 1e-3 / T.E, fb: "Tu as divisé $i_0$ par $E$. $R = E/i_0$ : la tension sur le courant.", erreur: "i₀/E au lieu de E/i₀" }]) },
          { type: "nombre", q: "Déduis la capacité $C$ du condensateur, en µF.", reponse: T.C, tol, unite: "µF", indice: "$\\tau = RC$, lu là où la tangente à l’origine coupe le palier.",
            pieges: pieges(T.C, tol, [{ v: (lu37 * 1e-3 / T.R) * 1e6, fb: "Tu as lu $\\tau$ à 37 % de $E$ sur une courbe qui monte : ce n’est pas $\\tau$. Lis-le où la tangente coupe le palier.", erreur: "τ lu à 37 % ou à la moitié" }, { v: (moitie * 1e-3 / T.R) * 1e6, fb: "Tu as lu $\\tau$ à la moitié de $E$ : c’est $\\tau \\ln 2$, pas $\\tau$.", erreur: "τ lu à 37 % ou à la moitié" }, { v: T.C * 1e3, fb: "Tu as laissé $\\tau$ en ms : convertis en secondes avant de diviser par $R$.", erreur: "τ lu à 37 % ou à la moitié" }]) },
        ],
        correction: [
          { tex: `u_R + u_C = E \\;;\\; u_R = R\\,i \\;;\\; i = C\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} \\;\\Rightarrow\\; \\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} + \\dfrac{1}{RC}\\,u_C = \\dfrac{E}{RC}`, r: "La maille, la loi d’Ohm et $i = C\\,\\mathrm{d}u_C/\\mathrm{d}t$, puis on divise par $RC$." },
          { tex: `i(t) = C\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} = \\dfrac{E}{R}\\,e^{-t/RC}`, r: "On dérive $u_C = E(1 - e^{-t/RC})$, puis on multiplie par $C$." },
          { tex: `R = \\dfrac{E}{i_0} = \\dfrac{${num(T.E, 2)}}{${num(i0 * 1e-3, 3)}} = ${num(T.R, 3)}\\ \\Omega`, r: "Littéral, puis numérique." },
          { tex: `C = \\dfrac{\\tau}{R} = \\dfrac{${num(tauMs * 1e-3, 3)}}{${num(T.R, 3)}} = ${num(T.C, 3)}\\ \\mu\\text{F}`, r: "$\\tau$ est lue là où la tangente coupe le palier." },
        ],
      };
    },
  },

  /* 15 : établir l'énergie (PC, SM seulement : 1.3.1.17) */
  {
    id: "rc-energie-etablir",
    titre: "Établir l’énergie emmagasinée (PC, SM)",
    niveau: 2,
    filieres: ["PC", "SM"],
    capacites: CAPR_PCSM("1.3.1.17"),
    erreurs: ["½ oublié (dérivée de u²)", "C u_C pris pour une énergie", "puissance et énergie confondues"],
    gen(h) {
      return {
        enonce: `<p>Un condensateur de capacité $C$ reçoit, en convention récepteur, la puissance $p = u_C\\,i$ avec $i = C\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}$. On cherche l’énergie $E_e$ emmagasinée, telle que $p = \\dfrac{\\mathrm{d}E_e}{\\mathrm{d}t}$, sachant que le condensateur est vide à $t = 0$.</p>`,
        questions: [
          { type: "qcm", q: "Quelle est l’expression de $p$ en fonction de $u_C$ et de sa dérivée ?", options: h.melange([
            { t: "$p = C\\,u_C\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}$", ok: true },
            { t: "$p = C\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}$", fb: "Tu as oublié de multiplier par $u_C$ : $p = u_C\\,i$ avec $i = C\\,\\mathrm{d}u_C/\\mathrm{d}t$.", erreur: "puissance et énergie confondues" },
            { t: "$p = C\\,u_C^{2}$", fb: "Tu as confondu puissance et énergie : $p$ contient la dérivée de $u_C$, pas $u_C^{2}$.", erreur: "puissance et énergie confondues" }]) },
          { type: "qcm", q: "$p$ est la dérivée par rapport au temps de…", options: h.melange([
            { t: "$\\dfrac{1}{2}\\,C\\,u_C^{2}$", ok: true },
            { t: "$C\\,u_C^{2}$", fb: "Tu as oublié le ½ : la dérivée de $u_C^{2}$ est $2u_C\\,\\mathrm{d}u_C/\\mathrm{d}t$, d’où le $\\tfrac{1}{2}$.", erreur: "½ oublié (dérivée de u²)" },
            { t: "$C\\,u_C$", fb: "$C\\,u_C$ est la charge $q$, pas une énergie. Dérive $u_C^{2}$ : on obtient $2u_C\\,\\mathrm{d}u_C/\\mathrm{d}t$.", erreur: "C u_C pris pour une énergie" }]) },
        ],
        correction: [
          { tex: `p = u_C\\,i = C\\,u_C\\,\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t} = \\dfrac{\\mathrm{d}}{\\mathrm{d}t}\\left(\\dfrac{1}{2}\\,C\\,u_C^{2}\\right)`, r: "La dérivée de $u_C^{2}$ est $2u_C\\,\\mathrm{d}u_C/\\mathrm{d}t$." },
          { tex: `E_e = \\dfrac{1}{2}\\,C\\,u_C^{2}`, r: "Le condensateur est vide à $t = 0$ : la constante est nulle." },
        ],
      };
    },
  },
];
