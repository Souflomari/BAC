// @ts-nocheck
/**
 * Le texte des exercices : du HTML simple où $…$ est une formule en ligne et
 * $$…$$ une formule détachée, rendues par KaTeX en chaîne (le même rendu côté
 * serveur, navigateur et vérificateur).
 */
import katex from "katex";

/** L'insécable fine du français devant ; : ? ! et dans les guillemets (hors formules). */
export const typo = (s) => String(s ?? "").replace(/[ \u00a0]([;:?!»])/g, "\u202f$1").replace(/«[ \u00a0]/g, "«\u202f");

export function rendre(s, strict = false) {
  return String(s ?? "")
    .split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g)
    .map((p) => {
      if (p.startsWith("$$") && p.length > 4)
        return katex.renderToString(p.slice(2, -2), { displayMode: true, throwOnError: strict });
      if (p.startsWith("$") && p.length > 2) return katex.renderToString(p.slice(1, -1), { throwOnError: strict });
      return typo(p);
    })
    .join("");
}

/** Une formule seule (ligne de correction). */
export const formule = (tex, strict = false) =>
  katex.renderToString(tex, { displayMode: true, throwOnError: strict });

/** Le texte brut d'un énoncé (formules comprises), pour comparer deux options. */
export const brut = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
