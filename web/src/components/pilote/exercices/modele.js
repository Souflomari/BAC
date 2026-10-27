// @ts-nocheck
/**
 * Le format d'un exercice de pilote (refonte 2026-10, V3).
 *
 * Un exercice est un GABARIT : une fonction qui reçoit un tirage au hasard
 * reproductible (`hasard(graine)`) et rend un énoncé chiffré, ses questions
 * et sa correction. La réponse est CALCULÉE par le code, jamais écrite à la
 * main : c'est le principe du vérificateur (RULES 15) appliqué dès le départ.
 *
 *   {
 *     id: 'ln-produit',                 // unique dans la notion
 *     titre: 'Le logarithme d’un produit',
 *     niveau: 1,                        // 1 application · 2 entraînement · 3 niveau bac
 *     seance: 1,                        // facultatif : la séance de la leçon qui l'enseigne (défaut 1)
 *     filieres: ['PC', 'SVT'],          // facultatif : seulement ces filières (défaut : toutes celles de la leçon)
 *     capacites: ['maths-sexp 1.2.15'], // identifiants du référentiel officiel (docs/referentiel/)
 *     erreurs: ['ln(ab) = ln a × ln b'],// les erreurs classiques que l'exercice attaque
 *     gen(h) {                          // h : hasard(graine) — int, pick, melange, dec, r
 *       return {
 *         enonce: 'HTML simple, $formule$ en ligne, $$formule$$ détachée',
 *         figure: '<svg …>',            // facultatif
 *         questions: [
 *           { type: 'qcm', q: '…', options: [{ t: '…', ok: true }, { t: '…', fb: '…', erreur: '…' }] },
 *           { type: 'nombre', q: '…', reponse: 0.693, tol: { abs: 0.005 }, unite: 's',
 *             indice: '…', pieges: [{ v: 0.48, fb: '…', erreur: '…' }] },
 *           { type: 'texte', q: '…', reponse: 'AUG GUG CAC', aide: 'les codons, séparés par des espaces',
 *             pieges: [{ v: 'TAC CAC GTG', fb: '…', erreur: '…' }] },
 *             // comparés sans espaces, tirets ni accents, en majuscules (normaliser)
 *         ],
 *         correction: [{ tex: '\\ln 6 = \\ln 2 + \\ln 3', r: 'la raison de la ligne' }, { t: 'une phrase' }],
 *       };
 *     },
 *   }
 *
 * Les options d'un QCM sont mélangées par le gabarit lui-même (h.melange),
 * pour qu'une graine donne toujours le même ordre.
 */

export const NIVEAUX = { 1: "Application", 2: "Entraînement", 3: "Niveau bac" };

/** Une réponse écrite, ramenée à ses lettres : « aug-GUG cac » → « AUGGUGCAC », « Met–Val » → « METVAL ». */
export function normaliser(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

/**
 * Les défauts d'un tirage, en clair (liste vide = tirage sain).
 * `capacitesConnues` : Set des identifiants du référentiel ; `rendre(s, strict)` : le rendu KaTeX strict.
 */
export function defautsTirage(ex, t, { capacitesConnues, rendre, formule }) {
  const d = [];
  const essai = (quoi, f) => {
    try {
      f();
    } catch (e) {
      d.push(`${quoi} : ${String(e.message || e).split("\n")[0]}`);
    }
  };
  if (!t || typeof t !== "object") return ["le gabarit ne rend rien"];
  if (!t.enonce) d.push("énoncé vide");
  essai("énoncé", () => rendre(t.enonce, true));
  if (!Array.isArray(t.questions) || !t.questions.length) d.push("aucune question");
  (t.questions || []).forEach((q, i) => {
    const n = `question ${i + 1}`;
    if (!q.q) d.push(`${n} : intitulé vide`);
    essai(`${n} (intitulé)`, () => rendre(q.q, true));
    if (q.indice) essai(`${n} (indice)`, () => rendre(q.indice, true));
    if (q.type === "qcm") {
      const o = q.options || [];
      if (o.length < 2) d.push(`${n} : moins de deux options`);
      const justes = o.filter((x) => x.ok).length;
      if (justes !== 1) d.push(`${n} : ${justes} bonne(s) réponse(s) au lieu d'une`);
      const textes = o.map((x) => String(x.t).replace(/\s+/g, " ").trim());
      if (new Set(textes).size !== textes.length) d.push(`${n} : deux options identiques (${textes.join(" | ")})`);
      o.forEach((x, j) => {
        essai(`${n} option ${j + 1}`, () => rendre(x.t, true));
        if (!x.ok && !x.fb) d.push(`${n} option ${j + 1} : mauvaise réponse sans explication`);
        if (x.fb) essai(`${n} option ${j + 1} (explication)`, () => rendre(x.fb, true));
      });
    } else if (q.type === "nombre") {
      if (!Number.isFinite(q.reponse)) d.push(`${n} : réponse non finie (${q.reponse})`);
      const tol = q.tol || {};
      if (!(tol.abs > 0) && !(tol.rel > 0)) d.push(`${n} : tolérance absente`);
      (q.pieges || []).forEach((p, j) => {
        if (!Number.isFinite(p.v)) d.push(`${n} piège ${j + 1} : valeur non finie`);
        const ecart = Math.abs(p.v - q.reponse);
        const seuil = tol.abs != null ? tol.abs : Math.abs(q.reponse) * tol.rel;
        if (ecart <= seuil) d.push(`${n} piège ${j + 1} : se confond avec la bonne réponse`);
        essai(`${n} piège ${j + 1}`, () => rendre(p.fb, true));
      });
    } else if (q.type === "texte") {
      const r = normaliser(q.reponse);
      if (!r) d.push(`${n} : réponse écrite vide`);
      (q.variantes || []).forEach((v, j) => {
        if (!normaliser(v)) d.push(`${n} variante ${j + 1} : vide`);
      });
      (q.pieges || []).forEach((p, j) => {
        const v = normaliser(p.v);
        if (!v) d.push(`${n} piège ${j + 1} : vide`);
        if (v === r || (q.variantes || []).some((x) => normaliser(x) === v)) d.push(`${n} piège ${j + 1} : se confond avec la bonne réponse`);
        essai(`${n} piège ${j + 1}`, () => rendre(p.fb, true));
      });
    } else d.push(`${n} : type inconnu (${q.type})`);
  });
  if (!Array.isArray(t.correction) || !t.correction.length) d.push("correction vide");
  (t.correction || []).forEach((l, i) => {
    if (l.tex) essai(`correction ligne ${i + 1}`, () => formule(l.tex, true));
    if (l.r) essai(`correction ligne ${i + 1} (raison)`, () => rendre(l.r, true));
    if (l.t) essai(`correction ligne ${i + 1} (texte)`, () => rendre(l.t, true));
    if (!l.tex && !l.t) d.push(`correction ligne ${i + 1} vide`);
  });
  return d;
}

/** Les défauts d'un gabarit lui-même (indépendants du tirage). */
export function defautsGabarit(ex, capacitesConnues) {
  const d = [];
  if (!ex.id) d.push("sans identifiant");
  if (!ex.titre) d.push("sans titre");
  if (![1, 2, 3].includes(ex.niveau)) d.push(`niveau invalide (${ex.niveau})`);
  if (ex.seance != null && ![1, 2].includes(ex.seance)) d.push(`séance invalide (${ex.seance})`);
  if (ex.filieres != null && (!Array.isArray(ex.filieres) || ex.filieres.some((f) => !["SM", "PC", "SVT"].includes(f))))
    d.push(`filières invalides (${ex.filieres})`);
  if (!Array.isArray(ex.capacites) || !ex.capacites.length) d.push("aucune capacité du référentiel");
  (ex.capacites || []).forEach((c) => {
    if (!capacitesConnues.has(c)) d.push(`capacité inconnue du référentiel : ${c}`);
  });
  if (!Array.isArray(ex.erreurs) || !ex.erreurs.length) d.push("aucune erreur classique visée");
  if (typeof ex.gen !== "function") d.push("pas de fonction gen");
  return d;
}
