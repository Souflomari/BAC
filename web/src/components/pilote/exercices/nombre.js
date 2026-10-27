// @ts-nocheck
/**
 * Les nombres des exercices : lire ce que l'élève tape (à la française) et
 * écrire les nombres comme au bac.
 */

/**
 * Lit « 0,69 », « -1,5 », « 3/4 », « 8,0 × 10^6 », « 8e6 », « 8.10^-3 ».
 * Rend NaN si ce n'est pas un nombre.
 */
export function lireNombre(s) {
  if (s == null) return NaN;
  const t = String(s)
    .trim()
    .replace(/[\s  ]/g, "")
    .replace(/[−–]/g, "-")
    .replace(/,/g, ".");
  if (!t) return NaN;
  const p = t.match(/^([+-]?\d*\.?\d+)(?:[x×*·.]10\^?\(?([+-]?\d+)\)?)$/i);
  if (p) return parseFloat(p[1]) * 10 ** parseInt(p[2], 10);
  if (/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(t)) return parseFloat(t);
  const f = t.match(/^([+-]?\d+)\/([+-]?\d+)$/);
  if (f && Number(f[2]) !== 0) return Number(f[1]) / Number(f[2]);
  return NaN;
}

/** v est-il assez proche de ref ? tol = { abs } ou { rel } (rel : 0,01 = 1 %). */
export function proche(v, ref, tol = { rel: 0.01 }) {
  if (!Number.isFinite(v) || !Number.isFinite(ref)) return false;
  if (tol.abs != null) return Math.abs(v - ref) <= tol.abs + 1e-12;
  return Math.abs(v - ref) <= Math.abs(ref) * tol.rel + 1e-12;
}

/** 0,69 — virgule, signe moins typographique. */
export function fr(x, d = 2) {
  const s = Math.abs(x).toFixed(d);
  return (x < 0 && Number(s) !== 0 ? "−" : "") + s.replace(".", ",");
}

/** La même chose pour KaTeX : 0{,}69 */
export function frTex(x, d = 2) {
  const s = Math.abs(x).toFixed(d).replace(".", "{,}");
  return (x < 0 && Number(Math.abs(x).toFixed(d)) !== 0 ? "-" : "") + s;
}

/** Écriture scientifique pour KaTeX : 8{,}0 \times 10^{6} (c chiffres significatifs). */
export function sciTex(x, c = 2) {
  if (x === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(x)));
  let m = x / 10 ** e;
  let ee = e;
  if (Math.abs(Number(m.toFixed(c - 1))) >= 10) {
    m /= 10;
    ee += 1;
  }
  const ms = m.toFixed(c - 1).replace(".", "{,}");
  return ee === 0 ? ms : `${ms} \\times 10^{${ee}}`;
}

/** Arrondi à c chiffres significatifs (nombre). */
export const sig = (x, c = 3) => (x === 0 ? 0 : Number(x.toPrecision(c)));
