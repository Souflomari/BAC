// @ts-nocheck
/**
 * Hasard reproductible pour les exercices des pilotes : une graine donne
 * toujours le même tirage (mulberry32). Le vérificateur rejoue des centaines
 * de graines ; l'élève voit le numéro de son tirage.
 */
export function hasard(graine) {
  let a = graine >>> 0 || 1;
  const r = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    r,
    /** entier de a à b inclus */
    int: (a0, b0) => a0 + Math.floor(r() * (b0 - a0 + 1)),
    /** un élément au hasard */
    pick: (arr) => arr[Math.floor(r() * arr.length)],
    /** une copie mélangée */
    melange: (arr) => {
      const c = [...arr];
      for (let i = c.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [c[i], c[j]] = [c[j], c[i]];
      }
      return c;
    },
    /** décimal de a à b, d chiffres après la virgule */
    dec: (a0, b0, d) => Number((a0 + r() * (b0 - a0)).toFixed(d)),
  };
}

/** Une nouvelle graine (affichable : 4 chiffres). */
export const nouvelleGraine = () => 1000 + Math.floor(Math.random() * 9000);
