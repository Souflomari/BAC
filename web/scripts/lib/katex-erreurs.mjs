/**
 * katex-erreurs.mjs — les DEUX formes d'une formule KaTeX cassée, énumérées.
 *
 * ADR 0036 : une chose n'est prouvée ABSENTE que si l'on a énuméré ses FORMES.
 * KaTeX, avec `throwOnError: false` (le rendu du produit), casse de deux façons :
 *
 *   1. une ParseError (accolade non fermée, `\frac` sans argument…) →
 *      un `span.katex-error` qui porte la SOURCE en rouge ;
 *   2. une MACRO INCONNUE (« \OmegaM », « \arg » mal collé à une lettre) →
 *      AUCUNE erreur : KaTeX écrit le nom de la macro en rouge À L'INTÉRIEUR
 *      d'un `.katex` parfaitement normal (`style="color:#cc0000"` côté HTML,
 *      `mathcolor` côté MathML).
 *
 * Mesuré le 2026-09-27 : la campagne de sabotage du plan complexe a collé
 * « \Omega » à « M » dans une lecture de l'étape 5 ; l'élève aurait lu
 * « \OmegaM » en rouge — et la famille `katex`, qui ne comptait que
 * `.katex-error`, est restée VERTE. Quatre autres instruments du dépôt
 * (dom-truth, formules-rendues, hunt, trois-moteurs) comptaient de la même
 * façon. Les sources de CONTENU sont gardées en amont (validate-content et
 * formules-rendues rendent avec `throwOnError: true`, qui lève sur une macro
 * inconnue) ; ce qui ne l'était pas, c'est le TeX que le CODE construit à
 * l'exécution — les lectures des scènes.
 *
 * AUTONOME : passée telle quelle à `page.evaluate(erreursKatex)` ou à
 * `locator.evaluate(erreursKatex)` (elle reçoit alors l'élément) — aucune
 * référence à ce module depuis le navigateur.
 */
export function erreursKatex(racine) {
  const r = racine && racine.querySelectorAll ? racine : document;
  const out = [];
  for (const e of r.querySelectorAll(".katex-error"))
    out.push({ forme: "katex-error", texte: (e.textContent || "").replace(/\s+/g, " ").slice(0, 80), titre: (e.getAttribute("title") || "").slice(0, 120) });
  for (const k of r.querySelectorAll(".katex")) {
    if (k.closest(".katex-error")) continue;
    const rouge = k.querySelector('.katex-html [style*="cc0000"]');
    if (rouge) out.push({ forme: "macro-inconnue", texte: (rouge.textContent || "").replace(/\s+/g, " ").slice(0, 80), titre: "macro inconnue de KaTeX, écrite en rouge" });
  }
  return out;
}
