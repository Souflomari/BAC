// @ts-nocheck
/**
 * Les exercices de la leçon « Du gène à la protéine » (V3). Format : voir modele.js.
 * Capacités : svt-svt / svt-pc 2.1.8, 2.1.9, 2.2.1–2.2.4 (docs/referentiel/).
 *
 * Chaque séquence est tirée au hasard (graine reproductible) mais reste biologiquement cohérente :
 * des triplets d'ADN, leur brin complémentaire, leur ARNm, et des chaînes d'acides aminés
 * CALCULÉES avec le vrai tableau du code génétique (expression-genetique-code.js, NCBI table 1).
 * Les conventions sont celles des sujets : « nucléotide », « triplet », brins orientés 5′/3′,
 * triplets numérotés depuis le premier triplet montré, abréviations à trois lettres.
 */
import { CODE, AA3, CODONS, toARN, compl, groupe } from "../expression-genetique-code.js";

/* ---------- outils ---------- */
const CAP = (...ids) => ids.flatMap((id) => [`svt-svt ${id}`, `svt-pc ${id}`]);
const SENS = CODONS.filter((c) => CODE[c] !== "*"); // les 61 codons d'acides aminés (ARN)
const STOPS = CODONS.filter((c) => CODE[c] === "*");
const ADN = (s) => s.replace(/U/g, "T");
const aa = (c) => (CODE[c] === "*" ? "stop" : AA3[CODE[c]]);
const nom3 = (c) => AA3[CODE[c]];
/** Les acides aminés d'un ARN lu depuis l'indice i, triplet par triplet, jusqu'au premier codon stop (non compris). */
function lire(arn, i = 0, ignorerStop = false) {
  const out = [];
  for (let k = i; k + 3 <= arn.length; k += 3) {
    const c = arn.slice(k, k + 3);
    if (CODE[c] === "*") {
      if (ignorerStop) continue;
      return { aa: out, stop: true };
    }
    out.push(AA3[CODE[c]]);
  }
  return { aa: out, stop: false };
}
const ch = (l) => l.join(" – ");
const tir = (l) => l.join("-"); // l'écriture attendue dans un champ : Met-Val-Lys
/** Des triplets d'ADN tirés au hasard parmi les codons d'acides aminés (pas de codon stop). */
const triplets = (h, n, sauf = []) => Array.from({ length: n }, () => ADN(h.pick(SENS.filter((c) => !sauf.includes(c)))));
/** Un extrait du tableau du code, comme au bac : les codons utiles, rangés. */
function extrait(codons) {
  const u = [...new Set(codons.filter((c) => c && c.length === 3))].sort();
  return `<p><b>Extrait du tableau du code génétique</b> : ${u.map((c) => `${c} = ${aa(c)}`).join(" · ")}.</p>`;
}
const codonsDe = (arn, i = 0) => {
  const r = [];
  for (let k = i; k + 3 <= arn.length; k += 3) r.push(arn.slice(k, k + 3));
  return r;
};
/** Une réponse écrite sous la forme 5′-…-3′ : on accepte aussi les bases seules. */
const avec53 = (s) => [`5${s}3`];

export const EXERCICES = [
  /* 1 — brin non transcrit → ARNm */
  {
    id: "brin-non-transcrit",
    titre: "Du brin non transcrit à l’ARNm",
    niveau: 1,
    capacites: CAP("2.2.1"),
    erreurs: ["complémenter le brin non transcrit", "garder T dans l’ARNm"],
    gen(h) {
      let s;
      do s = triplets(h, h.int(3, 5)).join("");
      while (!s.includes("T"));
      const R = toARN(s);
      return {
        enonce: `<p>Voici un fragment du <b>brin non transcrit</b> d’un gène :</p><p>5′-${groupe(s)}-3′</p>`,
        questions: [
          {
            type: "texte",
            q: "Écris l’ARNm correspondant, de 5′ vers 3′.",
            reponse: R,
            variantes: avec53(R),
            aide: "les bases, de 5′ vers 3′",
            indice: "Le brin donné est le brin non transcrit : l’ARNm a ses bases, avec une seule différence.",
            pieges: [
              { v: toARN(compl(s)), fb: "Tu as pris le complémentaire du brin donné. Mais c’est le brin non transcrit : l’ARNm a ses bases, avec U à la place de T.", erreur: "complémenter le brin non transcrit" },
              { v: compl(s), fb: "Tu as complémenté le brin non transcrit, et gardé des T. L’ARNm a les bases du brin non transcrit, avec U à la place de T.", erreur: "complémenter le brin non transcrit" },
              { v: s, fb: "Les bonnes bases, mais avec des T : un ARN n’a jamais de T, il a U à la place.", erreur: "garder T dans l’ARNm" },
            ],
          },
        ],
        correction: [
          { t: "Le brin donné est le <b>brin non transcrit</b>. L’ARNm est complémentaire du brin transcrit, donc il a la même séquence que le brin non transcrit, avec U à la place de T." },
          { t: `Brin non transcrit : 5′-${groupe(s)}-3′` },
          { t: `ARNm : 5′-${groupe(R)}-3′`, r: "On recopie, en remplaçant chaque T par U." },
        ],
      };
    },
  },

  /* 2 — brin transcrit → ARNm */
  {
    id: "brin-transcrit",
    titre: "Du brin transcrit à l’ARNm",
    niveau: 1,
    capacites: CAP("2.2.1"),
    erreurs: ["recopier le brin transcrit en changeant T en U", "garder T dans l’ARNm"],
    gen(h) {
      let s;
      do s = triplets(h, h.int(3, 5)).join("");
      while (!s.includes("T"));
      const t = compl(s),
        R = toARN(s);
      return {
        enonce: `<p>Voici un fragment du <b>brin transcrit</b> d’un gène, écrit de 3′ vers 5′ :</p><p>3′-${groupe(t)}-5′</p>`,
        questions: [
          {
            type: "texte",
            q: "Écris l’ARNm, de 5′ vers 3′, base par base en face de ce brin.",
            reponse: R,
            variantes: avec53(R),
            aide: "les bases, de 5′ vers 3′",
            indice: "L’ARN polymérase lit le brin transcrit : en face de chaque base, elle place sa partenaire (U en face de A).",
            pieges: [
              { v: toARN(t), fb: "Tu as recopié le brin transcrit en changeant T en U. Mais l’ARNm est son complémentaire : en face de A, U ; en face de T, A ; G et C s’échangent.", erreur: "recopier le brin transcrit en changeant T en U" },
              { v: s, fb: "Le bon complémentaire, mais avec des T : dans l’ARNm, en face d’un A, on place un U.", erreur: "garder T dans l’ARNm" },
            ],
          },
        ],
        correction: [
          { t: "Le brin donné est le <b>brin transcrit</b> : l’ARNm est son complémentaire (A en face de T, U en face de A, C en face de G, G en face de C)." },
          { t: `Brin transcrit : 3′-${groupe(t)}-5′` },
          { t: `ARNm : 5′-${groupe(R)}-3′`, r: "Base par base, la partenaire ; U à la place de T." },
        ],
      };
    },
  },

  /* 3 — ce brin, je le complémente ou non ? */
  {
    id: "complementer-ou-non",
    titre: "Ce brin, je le complémente ou non ?",
    niveau: 1,
    capacites: CAP("2.2.1", "2.2.2"),
    erreurs: ["complémenter le brin non transcrit", "recopier le brin transcrit en changeant T en U", "transcrire un ARNm"],
    gen(h) {
      const s = triplets(h, 3).join("");
      const cas = h.pick([
        { dit: "le <b>brin transcrit</b> d’un gène", brin: `3′-${groupe(compl(s))}-5′`, geste: "comp" },
        { dit: "le <b>brin non transcrit</b> d’un gène", brin: `5′-${groupe(s)}-3′`, geste: "copie" },
        { dit: "le brin d’ADN <b>lu par l’ARN polymérase</b>", brin: `3′-${groupe(compl(s))}-5′`, geste: "comp" },
        { dit: "le brin d’ADN <b>complémentaire du brin transcrit</b>", brin: `5′-${groupe(s)}-3′`, geste: "copie" },
        { dit: "l’<b>ARNm</b> d’un gène", brin: `5′-${groupe(toARN(s))}-3′`, geste: "rien" },
      ]);
      const R = toARN(s),
        c1 = R.slice(0, 3);
      const fbs = {
        copie: { t: "Recopier, en remplaçant T par U", fb: "C’est le geste pour le brin non transcrit (ou un brin identique à lui).", erreur: "recopier le brin transcrit en changeant T en U" },
        comp: { t: "Prendre le complémentaire, avec U en face de A", fb: "C’est le geste pour le brin transcrit, celui que lit l’ARN polymérase.", erreur: "complémenter le brin non transcrit" },
        rien: { t: "Rien : découper directement en codons", fb: "C’est le geste quand on a déjà l’ARNm.", erreur: "transcrire un ARNm" },
      };
      const opts = h.melange(Object.entries(fbs).map(([k, o]) => (k === cas.geste ? { t: o.t, ok: true } : { t: o.t, fb: o.fb + " Relis ce que le document donne.", erreur: o.erreur })));
      const pieges = [];
      if (cas.geste === "copie") pieges.push({ v: toARN(compl(s)).slice(0, 3), fb: "Tu as complémenté un brin qui a déjà la séquence de l’ARNm.", erreur: "complémenter le brin non transcrit" });
      if (cas.geste === "comp") pieges.push({ v: toARN(compl(s)).slice(0, 3), fb: "Tu as recopié le brin transcrit. L’ARNm est son complémentaire.", erreur: "recopier le brin transcrit en changeant T en U" });
      if (cas.geste === "rien") pieges.push({ v: toARN(compl(s)).slice(0, 3), fb: "Le document donne déjà l’ARNm : il n’y a rien à complémenter.", erreur: "transcrire un ARNm" });
      if (c1.includes("U")) pieges.push({ v: ADN(c1), fb: "Les bonnes bases, mais un ARN n’a pas de T : U à la place.", erreur: "garder T dans l’ARNm" });
      return {
        enonce: `<p>Un document donne ${cas.dit} :</p><p>${cas.brin}</p>`,
        questions: [
          { type: "qcm", q: "Pour écrire l’ARNm, quel est ton geste ?", options: opts },
          { type: "texte", q: "Écris le premier codon de l’ARNm (côté 5′).", reponse: c1, aide: "trois bases", pieges: pieges.filter((p) => p.v !== c1) },
        ],
        correction: [
          { t: cas.geste === "rien" ? "Le document donne l’ARNm : on le découpe en codons, sans rien transformer." : cas.geste === "copie" ? "Ce brin a la séquence du brin non transcrit : l’ARNm a les mêmes bases, U à la place de T." : "Ce brin est le brin transcrit : l’ARNm est son complémentaire, U en face de A." },
          { t: `ARNm : 5′-${groupe(R)}-3′` },
          { t: `Premier codon : ${c1}`, r: "Les trois premières bases, côté 5′." },
        ],
      };
    },
  },

  /* 4 — l'ADN et l'ARNm (Partie I) */
  {
    id: "adn-arn",
    titre: "L’ADN et l’ARNm : ce qui change",
    niveau: 1,
    capacites: CAP("2.2.1"),
    erreurs: ["mettre T dans l’ARN", "ARNm à deux brins", "confondre ribose et désoxyribose", "confondre nucléotide et codon"],
    gen(h) {
      const vrais = [
        "L’ARNm contient du ribose ; l’ADN, du désoxyribose.",
        "L’ARNm est fait d’un seul brin.",
        "L’ARNm contient de l’uracile (U), pas de thymine (T).",
        "L’ARNm est fabriqué dans le noyau, puis traduit dans le cytoplasme.",
      ];
      const faux = [
        { t: "L’ARNm contient de la thymine (T).", fb: "Dans l’ARN, l’uracile (U) remplace la thymine (T).", erreur: "mettre T dans l’ARN" },
        { t: "L’ARNm est fait de deux brins, comme l’ADN.", fb: "L’ARNm n’a qu’un seul brin : c’est la copie d’un seul brin d’ADN.", erreur: "ARNm à deux brins" },
        { t: "L’ADN contient du ribose.", fb: "Le sucre de l’ADN est le désoxyribose ; le ribose est celui de l’ARN.", erreur: "confondre ribose et désoxyribose" },
        { t: "L’ADN sort du noyau pour être traduit.", fb: "L’ADN reste dans le noyau ; c’est l’ARNm qui sort et qui est traduit.", erreur: "l’ADN quitte le noyau" },
        { t: "L’ARNm est une chaîne d’acides aminés.", fb: "L’ARNm est une suite de nucléotides ; c’est la protéine qui est une chaîne d’acides aminés.", erreur: "confondre ARN et protéine" },
      ];
      const opts = h.melange([{ t: h.pick(vrais), ok: true }, ...h.melange(faux).slice(0, 2)]);
      const arn = h.pick([true, false]);
      const nuA = { t: "un phosphate, du ribose et une base (A, U, G ou C)", fb: "C’est un nucléotide d’ARN : ribose et uracile.", erreur: "confondre ribose et désoxyribose" };
      const nuD = { t: "un phosphate, du désoxyribose et une base (A, T, G ou C)", fb: "C’est un nucléotide d’ADN : désoxyribose et thymine.", erreur: "confondre ribose et désoxyribose" };
      const q2 = h.melange([
        arn ? { t: nuA.t, ok: true } : nuA,
        arn ? nuD : { t: nuD.t, ok: true },
        { t: "trois bases qui se suivent", fb: "Trois bases qui se suivent, c’est un triplet (un codon sur l’ARNm), pas un nucléotide.", erreur: "confondre nucléotide et codon" },
      ]);
      return {
        enonce: "<p>Au bac, la Partie I demande souvent de comparer l’ADN et l’ARNm.</p>",
        questions: [
          { type: "qcm", q: "Quelle phrase est exacte ?", options: opts },
          { type: "qcm", q: `Un nucléotide ${arn ? "d’ARNm" : "d’ADN"} est fait de…`, options: q2 },
        ],
        correction: [
          { t: "ADN : deux brins ; sucre : désoxyribose ; bases A, T, G, C ; reste dans le noyau." },
          { t: "ARNm : un seul brin ; sucre : ribose ; bases A, U, G, C ; fabriqué dans le noyau, traduit dans le cytoplasme." },
          { t: "Les deux sont des suites de nucléotides (un phosphate, un sucre, une base)." },
        ],
      };
    },
  },

  /* 5 — ARNm → chaîne d'acides aminés (codon d'initiation et codon stop internes) */
  {
    id: "arnm-chaine",
    titre: "De l’ARNm à la chaîne d’acides aminés",
    niveau: 2,
    capacites: CAP("2.2.2"),
    erreurs: ["lire avant le codon d’initiation", "lire après le codon stop", "oublier la méthionine", "compter le codon stop comme un acide aminé"],
    gen(h) {
      let arn, debut, n, rep, cadre0, apres;
      for (;;) {
        const lead = Array.from({ length: h.int(2, 4) }, () => h.pick(["A", "C", "G", "U"])).join("");
        n = h.int(3, 5);
        const corps = Array.from({ length: n }, () => h.pick(SENS.filter((c) => c !== "AUG"))).join("");
        const tail = Array.from({ length: h.int(1, 2) }, () => h.pick(SENS)).join("");
        arn = lead + "AUG" + corps + h.pick(STOPS) + tail;
        debut = lead.length;
        if (arn.indexOf("AUG") !== debut) continue;
        rep = lire(arn, debut).aa;
        cadre0 = lire(arn, 0).aa;
        apres = lire(arn, debut, true).aa;
        if (tir(cadre0) !== tir(rep) && cadre0.length >= 2 && tir(apres) !== tir(rep)) break;
      }
      const R = tir(rep);
      return {
        enonce: `<p>Voici un fragment d’ARNm, de 5′ vers 3′ :</p><p>5′-${arn}-3′</p>${extrait([...codonsDe(arn, debut), ...codonsDe(arn, 0), "AUG"])}`,
        questions: [
          {
            type: "texte",
            q: "Écris la chaîne d’acides aminés qu’il code (abréviations à trois lettres, séparées par des tirets).",
            reponse: R,
            aide: "par exemple Met-Ala-…",
            indice: "Cherche d’abord le codon d’initiation, puis découpe en codons à partir de lui, jusqu’au codon stop.",
            pieges: [
              { v: tir(cadre0), fb: "Tu as découpé depuis le premier nucléotide. La lecture commence au codon d’initiation AUG.", erreur: "lire avant le codon d’initiation" },
              { v: tir(apres), fb: "Tu as continué après le codon stop. La lecture s’arrête au premier codon stop rencontré.", erreur: "lire après le codon stop" },
              { v: tir(rep.slice(1)), fb: "Le codon d’initiation AUG est traduit lui aussi : la chaîne commence par Met.", erreur: "oublier la méthionine" },
              { v: R + "-Stop", fb: "Un codon stop ne désigne aucun acide aminé : on ne l’écrit pas dans la chaîne.", erreur: "compter le codon stop comme un acide aminé" },
            ],
          },
          {
            type: "nombre",
            q: "Combien d’acides aminés compte cette chaîne ?",
            reponse: rep.length,
            tol: { abs: 0.1 },
            pieges: [
              { v: rep.length + 1, fb: "Tu as compté le codon stop : il ne désigne aucun acide aminé.", erreur: "compter le codon stop comme un acide aminé" },
              { v: rep.length - 1, fb: "Le codon d’initiation compte : il apporte la méthionine.", erreur: "oublier la méthionine" },
            ],
          },
        ],
        correction: [
          { t: `On repère le codon d’initiation AUG (après ${debut} nucléotides), puis on découpe en codons à partir de lui.` },
          { t: `Codons : ${codonsDe(arn, debut).slice(0, rep.length + 1).join(" ")}`, r: "Le dernier est un codon stop : la lecture s’arrête là." },
          { t: `Chaîne : ${ch(rep)}, soit ${rep.length} acides aminés.`, r: "Chaque codon lu dans le tableau ; le codon stop n’en donne aucun." },
        ],
      };
    },
  },

  /* 6 — anticodon → codon → acide aminé */
  {
    id: "anticodon",
    titre: "De l’anticodon à l’acide aminé",
    niveau: 1,
    capacites: CAP("2.2.2", "2.2.3"),
    erreurs: ["lire l’anticodon dans le tableau", "lire le codon à l’envers", "écrire T dans l’ARN"],
    gen(h) {
      let c, ac, inv;
      for (;;) {
        c = h.pick(SENS);
        ac = c
          .split("")
          .map((b) => ({ A: "U", U: "A", G: "C", C: "G" })[b])
          .join("");
        inv = c.split("").reverse().join("");
        const a = CODE[c],
          b = CODE[ac],
          d = CODE[inv];
        if (b && b !== "*" && d && d !== "*" && new Set([a, b, d]).size === 3) break;
      }
      const opts = h.melange([
        { t: `${nom3(c)}`, ok: true },
        { t: `${nom3(ac)}`, fb: `${ac} est l’anticodon : lu dans le tableau, il donnerait ${nom3(ac)}. Le tableau se lit avec le codon de l’ARNm, ${c}.`, erreur: "lire l’anticodon dans le tableau" },
        { t: `${nom3(inv)}`, fb: `Tu as lu le codon à l’envers (${inv}). Écrit de 5′ vers 3′, le codon est ${c}.`, erreur: "lire le codon à l’envers" },
      ]);
      const pieges = [{ v: ac, fb: "C’est l’anticodon lui-même. Le codon de l’ARNm est son complémentaire.", erreur: "lire l’anticodon dans le tableau" }];
      if (c.includes("U")) pieges.push({ v: ADN(c), fb: "Les bonnes bases, mais le codon est sur l’ARNm : U, pas T.", erreur: "écrire T dans l’ARN" });
      if (inv !== c) pieges.push({ v: inv, fb: "Tu l’as écrit à l’envers : l’anticodon est écrit de 3′ vers 5′, le codon de 5′ vers 3′, base en face de base.", erreur: "lire le codon à l’envers" });
      return {
        enonce: `<p>Un ARN de transfert porte l’anticodon <b>3′-${ac}-5′</b>, écrit de 3′ vers 5′, base en face de base avec le codon.</p>${extrait([c, ac, inv])}`,
        questions: [
          { type: "texte", q: "Quel codon de l’ARNm (de 5′ vers 3′) lui fait face ?", reponse: c, aide: "trois bases", pieges },
          { type: "qcm", q: "Quel acide aminé cet ARNt apporte-t-il ?", options: opts },
        ],
        correction: [
          { t: `Anticodon : 3′-${ac}-5′` },
          { t: `Codon en face : 5′-${c}-3′`, r: "Base par base, la partenaire : A–U, G–C." },
          { t: `${c} = ${nom3(c)} : l’ARNt d’anticodon ${ac} apporte ${nom3(c)}.`, r: "Le tableau du code se lit avec le codon, jamais avec l’anticodon." },
        ],
      };
    },
  },

  /* 7 — les phases de la traduction, les sites P et A */
  {
    id: "phases-traduction",
    titre: "Les phases de la traduction",
    niveau: 1,
    capacites: CAP("2.2.3"),
    erreurs: ["confondre les phases de la traduction", "inverser les sites P et A", "le ribosome fabrique les acides aminés", "traduction dans le noyau"],
    gen(h) {
      const stop = h.pick(STOPS);
      const ev = h.pick([
        { t: "Le ribosome se fixe sur l’ARNm, au codon AUG, et l’ARNt de la méthionine s’y apparie.", p: "initiation" },
        { t: "Un ARNt arrive au site A ; une liaison peptidique relie son acide aminé à la chaîne.", p: "élongation" },
        { t: "Le ribosome avance d’un codon, et un nouvel ARNt arrive au site A.", p: "élongation" },
        { t: `Le codon ${stop} arrive au site A : aucun ARNt ne lui correspond.`, p: "terminaison" },
        { t: "La chaîne est libérée et le ribosome se détache de l’ARNm.", p: "terminaison" },
      ]);
      const ph = {
        initiation: "Elle commence au codon d’initiation, AUG, avec la méthionine.",
        élongation: "Elle allonge la chaîne, codon après codon (un ARNt au site A, une liaison peptidique, le ribosome avance).",
        terminaison: "Elle commence quand un codon stop arrive au site A.",
      };
      const art = { initiation: "L’initiation", élongation: "L’élongation", terminaison: "La terminaison" };
      const opts1 = h.melange([
        ...Object.keys(ph).map((k) => (k === ev.p ? { t: k, ok: true } : { t: k, fb: `${art[k]} : ${ph[k].charAt(0).toLowerCase()}${ph[k].slice(1)}`, erreur: "confondre les phases de la traduction" })),
        { t: "transcription", fb: "La transcription est la copie du gène en ARNm, dans le noyau. Ici, le ribosome traduit : c’est la traduction.", erreur: "confondre transcription et traduction" },
      ]);
      const site = h.pick([
        { q: "Où se trouve l’ARNt qui tient la chaîne en cours ?", ok: "Au site P" },
        { q: "Où arrive l’ARNt qui apporte l’acide aminé suivant ?", ok: "Au site A" },
      ]);
      const opts2 = h.melange(
        ["Au site P", "Au site A", "Dans le noyau"].map((t) =>
          t === site.ok
            ? { t, ok: true }
            : t === "Dans le noyau"
              ? { t, fb: "La traduction a lieu dans le cytoplasme, sur les ribosomes ; le noyau garde l’ADN.", erreur: "traduction dans le noyau" }
              : { t, fb: "Le site P tient l’ARNt qui porte la chaîne ; le site A reçoit l’ARNt qui arrive.", erreur: "inverser les sites P et A" },
        ),
      );
      const opts3 = h.melange([
        { t: "Ils sont libres dans le cytoplasme", ok: true },
        { t: "Le ribosome les fabrique", fb: "Le ribosome ne fabrique pas les acides aminés : il les relie par des liaisons peptidiques.", erreur: "le ribosome fabrique les acides aminés" },
        { t: "L’ARNm les contient", fb: "L’ARNm est une suite de nucléotides : il porte le message, pas les acides aminés.", erreur: "confondre ARN et protéine" },
      ]);
      return {
        enonce: `<p>Pendant la traduction : « ${ev.t} »</p>`,
        questions: [
          { type: "qcm", q: "À quelle phase cela se passe-t-il ?", options: opts1 },
          { type: "qcm", q: site.q, options: opts2 },
          { type: "qcm", q: "D’où viennent les acides aminés que le ribosome relie ?", options: opts3 },
        ],
        correction: [
          { t: "La traduction a lieu dans le cytoplasme, sur un ribosome, en trois phases." },
          { t: "<b>Initiation</b> : le ribosome se fixe au codon d’initiation AUG ; l’ARNt de la méthionine s’apparie, au site P." },
          { t: "<b>Élongation</b> : un ARNt arrive au site A ; une liaison peptidique relie son acide aminé à la chaîne ; le ribosome avance d’un codon." },
          { t: "<b>Terminaison</b> : un codon stop arrive au site A ; aucun ARNt ne lui correspond ; la chaîne est libérée." },
          { t: "Les acides aminés sont libres dans le cytoplasme ; le ribosome ne fait que les relier." },
        ],
      };
    },
  },

  /* 8 — le type d'une mutation et son effet */
  {
    id: "type-mutation",
    titre: "Le type d’une mutation et son effet",
    niveau: 2,
    capacites: CAP("2.1.9"),
    erreurs: ["toute mutation change la protéine", "confondre faux-sens et non-sens", "ne pas voir le décalage du cadre de lecture", "numéroter les nucléotides au lieu des triplets"],
    gen(h) {
      const genre = h.pick(["silencieuse", "faux-sens", "non-sens", "délétion", "insertion"]);
      let s, m, j, p;
      for (;;) {
        s = triplets(h, 5).join("");
        j = h.int(1, 3);
        p = h.int(0, 2);
        const k = 3 * j + p;
        if (genre === "délétion") m = s.slice(0, k) + s.slice(k + 1);
        else if (genre === "insertion") m = s.slice(0, k) + h.pick(["A", "T", "G", "C"]) + s.slice(k);
        else {
          const b = h.pick(["A", "T", "G", "C"].filter((x) => x !== s[k]));
          m = s.slice(0, k) + b + s.slice(k + 1);
          const cN = toARN(s.slice(3 * j, 3 * j + 3)),
            cM = toARN(m.slice(3 * j, 3 * j + 3));
          const g = CODE[cM] === "*" ? "non-sens" : CODE[cM] === CODE[cN] ? "silencieuse" : "faux-sens";
          if (g !== genre) continue;
        }
        if (genre === "délétion" || genre === "insertion") {
          const a = lire(toARN(s)).aa,
            b = lire(toARN(m)).aa;
          if (tir(a) === tir(b)) continue;
        }
        break;
      }
      const nN = lire(toARN(s)).aa,
        mM = lire(toARN(m));
      const libel = {
        silencieuse: "Substitution silencieuse : la protéine ne change pas",
        "faux-sens": "Substitution faux-sens : un acide aminé change",
        "non-sens": "Substitution non-sens : la chaîne est raccourcie",
        délétion: "Délétion : décalage du cadre de lecture",
        insertion: "Insertion : décalage du cadre de lecture",
      };
      const fbs = {
        silencieuse: "Compare les acides aminés : ici, ils ne sont pas tous identiques.",
        "faux-sens": "Le triplet muté ne désigne pas un autre acide aminé ici. Relis-le dans le tableau.",
        "non-sens": "Le triplet muté n’est pas un codon stop ici.",
        délétion: "Compte les nucléotides des deux allèles : un nucléotide a-t-il disparu ?",
        insertion: "Compte les nucléotides des deux allèles : un nucléotide a-t-il été ajouté ?",
      };
      const err = {
        silencieuse: "toute mutation change la protéine",
        "faux-sens": "confondre faux-sens et non-sens",
        "non-sens": "confondre faux-sens et non-sens",
        délétion: "ne pas voir le décalage du cadre de lecture",
        insertion: "ne pas voir le décalage du cadre de lecture",
      };
      const opts = h.melange(Object.keys(libel).map((k) => (k === genre ? { t: libel[k], ok: true } : { t: libel[k], fb: fbs[k], erreur: err[k] })));
      const codons = [...codonsDe(toARN(s)), ...codonsDe(toARN(m))];
      const decale = genre === "délétion" || genre === "insertion";
      return {
        enonce: `<p>Voici le même fragment du <b>brin non transcrit</b> chez deux allèles d’un gène (les triplets sont numérotés depuis le premier montré) :</p><p>allèle normal : 5′-${groupe(s)}-3′</p><p>allèle muté : 5′-${decale ? m : groupe(m)}-3′</p>${extrait(codons)}`,
        questions: [
          { type: "qcm", q: "Quel est le type de cette mutation, et son effet ?", options: opts },
          {
            type: "nombre",
            q: "Dans quel triplet se trouve la mutation (1 = premier triplet montré) ?",
            reponse: j + 1,
            tol: { abs: 0.1 },
            indice: "Compare les deux allèles nucléotide par nucléotide, puis regarde dans quel groupe de trois tombe la différence.",
            pieges: 3 * j + p + 1 !== j + 1 ? [{ v: 3 * j + p + 1, fb: "C’est le numéro du nucléotide. On demande le numéro du triplet : divise en groupes de trois.", erreur: "numéroter les nucléotides au lieu des triplets" }] : [],
          },
        ],
        correction: [
          { t: `ARNm normal : ${groupe(toARN(s))} → ${ch(nN)}` },
          { t: `ARNm muté : ${groupe(toARN(m))} → ${ch(mM.aa)}${mM.stop ? ", puis codon stop" : ""}`, r: decale ? "Un nucléotide en moins ou en plus : tout le découpage en codons se décale." : "Un seul nucléotide remplacé : un seul triplet change." },
          { t: `${libel[genre]}, au triplet ${j + 1}.` },
        ],
      };
    },
  },

  /* 9 — délétion ou insertion : la nouvelle chaîne, jusqu'au codon stop */
  {
    id: "decalage",
    titre: "Délétion ou insertion : la nouvelle chaîne",
    niveau: 2,
    capacites: CAP("2.1.9"),
    erreurs: ["ne décaler qu’un codon", "oublier le décalage du cadre de lecture", "lire après le codon stop"],
    gen(h) {
      let arn, mut, j, p, op, b, rM, rN, unSeul;
      for (;;) {
        const n = h.int(6, 8);
        arn = "AUG" + Array.from({ length: n }, () => h.pick(SENS)).join("") + h.pick(STOPS);
        if (lire(arn).aa.length !== n + 1) continue;
        j = h.int(2, 3);
        p = h.int(0, 2);
        const k = 3 * (j - 1) + p;
        op = h.pick(["délétion", "insertion"]);
        b = h.pick(["A", "U", "G", "C"]);
        mut = op === "délétion" ? arn.slice(0, k) + arn.slice(k + 1) : arn.slice(0, k) + b + arn.slice(k);
        const L = lire(mut);
        if (!L.stop || L.aa.length < j + 1) continue;
        rM = L.aa;
        rN = lire(arn).aa;
        const mc = mut.slice(3 * (j - 1), 3 * j);
        unSeul = [...rN.slice(0, j - 1), CODE[mc] && CODE[mc] !== "*" ? AA3[CODE[mc]] : "Stop", ...rN.slice(j)];
        if (tir(rM) !== tir(rN) && tir(rM) !== tir(unSeul)) break;
      }
      const k = 3 * (j - 1) + p,
        rang = ["1ᵉʳ", "2ᵉ", "3ᵉ"][p];
      const quoi = op === "délétion" ? `le ${rang} nucléotide du triplet ${j} (${arn[k]}) est supprimé` : `un ${b} est inséré avant le ${rang} nucléotide du triplet ${j}`;
      const pieges = [
        { v: tir(rN), fb: "C’est la chaîne de l’allèle normal. Avec un nucléotide en moins ou en plus, le découpage change.", erreur: "oublier le décalage du cadre de lecture" },
        { v: tir(unSeul), fb: "Tu n’as changé qu’un codon. Une délétion ou une insertion décale le découpage de TOUS les codons suivants.", erreur: "ne décaler qu’un codon" },
      ];
      const tout = lire(mut, 0, true).aa;
      if (tir(tout) !== tir(rM)) pieges.push({ v: tir(tout), fb: "Tu as continué après le codon stop : la traduction s’arrête au premier.", erreur: "lire après le codon stop" });
      return {
        enonce: `<p>Voici l’ARNm d’un allèle normal, de 5′ vers 3′ (les triplets sont numérotés depuis le premier) :</p><p>5′-${groupe(arn)}-3′</p><p>Chez un allèle muté, ${quoi}.</p>${extrait([...codonsDe(arn), ...codonsDe(mut)])}`,
        questions: [
          {
            type: "texte",
            q: "Écris la chaîne de l’allèle muté, jusqu’au codon stop (abréviations séparées par des tirets).",
            reponse: tir(rM),
            aide: "par exemple Met-…",
            indice: "Réécris l’ARNm muté en entier, puis redécoupe-le en codons à partir de AUG.",
            pieges: pieges.filter((x, i, a) => a.findIndex((y) => y.v === x.v) === i),
          },
          {
            type: "nombre",
            q: "Combien d’acides aminés compte la chaîne mutée ?",
            reponse: rM.length,
            tol: { abs: 0.1 },
            pieges: rN.length !== rM.length ? [{ v: rN.length, fb: "C’est la longueur de la chaîne normale.", erreur: "oublier le décalage du cadre de lecture" }] : [],
          },
        ],
        correction: [
          { t: `ARNm muté : ${groupe(mut)}`, r: "On redécoupe en codons depuis AUG : à partir de la mutation, tous les codons changent." },
          { t: `Chaîne normale : ${ch(rN)} (${rN.length} acides aminés)` },
          { t: `Chaîne mutée : ${ch(rM)}, puis un codon stop : ${rM.length} acides aminés.`, r: "Décalage du cadre de lecture : à partir du triplet muté, tous les codons sont découpés autrement." },
        ],
      };
    },
  },

  /* 10 — l'exercice complet, au format 2026 */
  {
    id: "bac-2026",
    titre: "Un exercice complet, au format 2026",
    niveau: 3,
    capacites: CAP("2.1.8", "2.1.9", "2.2.2"),
    erreurs: ["lire le mauvais brin", "lire après le codon stop", "confondre faux-sens et non-sens", "réciter le cours sans le document", "la mutation vient d’un besoin"],
    gen(h) {
      const genre = h.pick(["non-sens", "faux-sens"]);
      const brin = h.pick(["non transcrit", "transcrit"]);
      let s, m, j;
      for (;;) {
        s = triplets(h, h.int(5, 6)).join("");
        j = h.int(2, s.length / 3 - 1);
        const p = h.int(0, 2),
          k = 3 * (j - 1) + p,
          b = h.pick(["A", "T", "G", "C"].filter((x) => x !== s[k]));
        m = s.slice(0, k) + b + s.slice(k + 1);
        const cM = toARN(m.slice(3 * (j - 1), 3 * j)),
          cN = toARN(s.slice(3 * (j - 1), 3 * j));
        const g = CODE[cM] === "*" ? "non-sens" : CODE[cM] === CODE[cN] ? "silencieuse" : "faux-sens";
        if (g === genre) break;
      }
      const RN = toARN(s),
        RM = toARN(m),
        cN = lire(RN).aa,
        cM = lire(RM);
      const montre = (x) => (brin === "transcrit" ? `3′-${groupe(compl(x))}-5′` : `5′-${groupe(x)}-3′`);
      const ns = genre === "non-sens";
      const opt4 = h.melange([
        { t: `Substitution au triplet ${j} : ${ns ? "non-sens" : "faux-sens"}`, ok: true },
        { t: `Substitution au triplet ${j} : ${ns ? "faux-sens" : "non-sens"}`, fb: ns ? "Le triplet muté devient un codon stop : c’est une mutation non-sens." : "Le triplet muté désigne un autre acide aminé, pas un arrêt : c’est une mutation faux-sens.", erreur: "confondre faux-sens et non-sens" },
        { t: `Délétion au triplet ${j} : décalage`, fb: "Les deux allèles ont le même nombre de nucléotides : rien n’est supprimé, un nucléotide est remplacé.", erreur: "confondre substitution et délétion" },
        { t: `Substitution au triplet ${j + 1} : ${ns ? "non-sens" : "faux-sens"}`, fb: "Recompte les triplets depuis le premier montré.", erreur: "mal numéroter les triplets" },
      ]);
      const opt5 = h.melange([
        { t: ns ? "La protéine est raccourcie, donc non fonctionnelle : d’où la maladie" : "Un acide aminé change, la protéine est modifiée et ne fonctionne plus : d’où la maladie", ok: true },
        { t: "La mutation a changé le code génétique de la personne", fb: "Le code est universel : il ne change pas. C’est le message, l’allèle, qui a changé.", erreur: "confondre allèle et code" },
        { t: "La maladie a provoqué la mutation", fb: "C’est l’inverse : la mutation arrive par hasard, puis l’allèle muté donne une protéine anormale.", erreur: "la mutation vient d’un besoin" },
      ]);
      const pieges1 = brin === "transcrit"
        ? [{ v: toARN(compl(s)), fb: "Tu as recopié le brin transcrit en changeant T en U : l’ARNm est son complémentaire.", erreur: "lire le mauvais brin" }]
        : [{ v: toARN(compl(s)), fb: "Le document donne le brin non transcrit : l’ARNm a ses bases, U à la place de T, sans complémenter.", erreur: "lire le mauvais brin" }];
      const pieges3 = [];
      if (ns) {
        const tout = lire(RM, 0, true).aa;
        if (tir(tout) !== tir(cM.aa)) pieges3.push({ v: tir(tout), fb: "La traduction s’arrête au codon stop : ce qui suit n’est pas lu.", erreur: "lire après le codon stop" });
        pieges3.push({ v: tir(cM.aa) + "-Stop", fb: "Un codon stop ne désigne aucun acide aminé : on ne l’écrit pas dans la chaîne.", erreur: "compter le codon stop comme un acide aminé" });
      }
      if (tir(cN) !== tir(cM.aa)) pieges3.push({ v: tir(cN), fb: "C’est la chaîne de la personne saine. Écris celle de la personne malade.", erreur: "réciter le cours sans le document" });
      return {
        enonce: `<p>Une maladie héréditaire est due à une protéine P anormale. Le document donne un fragment du <b>brin ${brin}</b> du gène de P (les triplets sont numérotés depuis le premier montré) :</p><p>personne saine : ${montre(s)}</p><p>personne malade : ${montre(m)}</p>${extrait([...codonsDe(RN), ...codonsDe(RM)])}`,
        questions: [
          { type: "texte", q: "Écris l’ARNm de la personne saine, de 5′ vers 3′.", reponse: RN, variantes: avec53(RN), aide: "les bases, de 5′ vers 3′", pieges: pieges1 },
          { type: "texte", q: "Écris la chaîne d’acides aminés de la personne saine (abréviations, tirets).", reponse: tir(cN), aide: "par exemple Ala-Gly-…" },
          { type: "texte", q: "Écris la chaîne de la personne malade.", reponse: tir(cM.aa), aide: "jusqu’au codon stop s’il y en a un", pieges: pieges3.filter((x) => x.v !== tir(cM.aa)) },
          { type: "qcm", q: "Compare les deux séquences : quelle mutation, à quel triplet ?", options: opt4 },
          { type: "qcm", q: "Explique l’origine de la maladie.", options: opt5 },
        ],
        correction: [
          { t: `ARNm de la personne saine : 5′-${groupe(RN)}-3′ ; chaîne : ${ch(cN)}.`, r: brin === "transcrit" ? "ARNm complémentaire du brin transcrit, U en face de A. (0,5 pt)" : "Même séquence que le brin non transcrit, U à la place de T. (0,5 pt)" },
          { t: `ARNm de la personne malade : 5′-${groupe(RM)}-3′ ; chaîne : ${ch(cM.aa)}${cM.stop ? ", puis arrêt (codon stop)" : ""}.`, r: "(0,5 pt)" },
          { t: `Substitution d’un nucléotide au triplet ${j} : ${toARN(s.slice(3 * (j - 1), 3 * j))} devient ${toARN(m.slice(3 * (j - 1), 3 * j))}, ${ns ? "un codon stop : mutation non-sens" : `qui désigne ${nom3(toARN(m.slice(3 * (j - 1), 3 * j)))} au lieu de ${nom3(toARN(s.slice(3 * (j - 1), 3 * j)))} : mutation faux-sens`}.`, r: "(0,25 pt)" },
          { t: ns ? "La chaîne est raccourcie : la protéine P est incomplète, non fonctionnelle. Gène muté → protéine anormale → maladie." : "Un acide aminé change : la protéine P est modifiée, elle ne fonctionne plus normalement. Gène muté → protéine anormale → maladie.", r: "(0,25 pt) Barème indicatif, sur le modèle du sujet 2026 : 0,5 + 0,5 + 0,5." },
        ],
      };
    },
  },
];
