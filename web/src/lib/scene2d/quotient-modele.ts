/**
 * quotient-modele.ts — le modèle EXACT de « l'échelle des quotients » (PC ·
 * evolution-spontanee ; spec docs/pipeline/propositions/pc-evolution-spontanee-scene-quotient.md
 * §5).
 *
 * TROIS BAINS, CINQ CRANS, UN CRITÈRE. Chaque bain porte un couple du corpus et son
 * K du corpus (§5.1) ; chaque solution se règle sur la même liste de cinq crans (§5.2).
 * Q_r,i = c_produit / c_oxydant^n, où n est le coefficient de l'ion oxydant (2 pour
 * l'argent, 1 ailleurs). Le verdict compare Q_r,i à K.
 *
 * EXACT, JAMAIS FLOTTANT POUR LE VERDICT. L'état d'équilibre de S5 n'existe que parce
 * que 2,5×10⁻² / 1,0×10⁻² vaut 2,5 AU CARACTÈRE PRÈS (§5.2 point 2) : une comparaison
 * en flottants dirait « à 10⁻¹⁶ près » et mentirait à la première réécriture. Chaque
 * concentration est un décimal m × 10^e (m entier à deux chiffres), chaque quotient une
 * fraction d'entiers × 10^E, et la comparaison à K se fait en BigInt. Les flottants ne
 * servent qu'à dessiner (log10 pour placer une marque).
 *
 * K = 2,5 POUR LE BAIN B EST UNE DONNÉE DÉCLARÉE (§13.3, drapeau rouge au propriétaire) :
 * les tables donnent 2,2 à 2,45. La partition 9 / 1 / 15 du bain B n'existe qu'à 2,5
 * exactement ; la porte et le test la mesurent sur CETTE constante, de sorte qu'un
 * changement de valeur fasse rougir au lieu de laisser la scène mentir en silence.
 *
 * L'ATTEIGNABILITÉ, PAS LA PRÉSENCE (§5.6, §7.6 A). Un état est POSÉ par l'étape ; il est
 * ATTEIGNABLE seulement si un contrôle ouvert y mène. Le modèle écrit, étape par étape,
 * ce qui est ouvert pendant le pari et après la révélation, et l'ensemble des états
 * atteignables qui en découle — c'est ce que la porte relit contre le produit.
 */

export const BAINS = ["A", "B", "C"] as const;
export type Bain = (typeof BAINS)[number];
/** les cinq crans, en mol/L, dans l'ordre croissant (§5.2) — la même liste partout */
export const CRANS = ["1.0e-3", "1.0e-2", "2.5e-2", "1.0e-1", "5.0e-1"] as const;
export type Cran = (typeof CRANS)[number];

/** un décimal exact : m × 10^e, m entier (deux chiffres significatifs, écrits m = 10…99) */
export interface Dec {
  m: bigint;
  e: number;
}
const dec = (m: number, e: number): Dec => ({ m: BigInt(m), e });
export const VALEUR_CRAN: Record<Cran, Dec> = {
  "1.0e-3": dec(10, -4),
  "1.0e-2": dec(10, -3),
  "2.5e-2": dec(25, -3),
  "1.0e-1": dec(10, -2),
  "5.0e-1": dec(50, -2),
};

export interface Couple {
  /** l'équation, double flèche, et les repères (1)/(2) du sens (§9.11) */
  equationTex: string;
  /** l'ion PRODUIT (numérateur) et l'ion OXYDANT réactif (dénominateur) */
  produitTex: string;
  oxydantTex: string;
  /** le coefficient de l'ion oxydant : l'exposant du dénominateur de Q_r */
  n: 1 | 2;
  /** Q_r en littéral */
  expressionTex: string;
  /** K, DONNÉE du corpus (§5.1) */
  K: Dec;
  kTex: string;
  /** les deux métaux (le premier est oxydé en sens direct) */
  metalDirect: string;
  metalInverse: string;
}

export const COUPLES: Record<Bain, Couple> = {
  A: {
    equationTex: "Zn_{(s)} + Cu^{2+}_{(aq)} \\underset{(2)}{\\overset{(1)}{\\rightleftharpoons}} Zn^{2+}_{(aq)} + Cu_{(s)}",
    produitTex: "Zn^{2+}",
    oxydantTex: "Cu^{2+}",
    n: 1,
    expressionTex: "Q_r = \\dfrac{[Zn^{2+}]}{[Cu^{2+}]}",
    K: dec(18, 36),
    kTex: "K = 1{,}8\\times10^{37}",
    metalDirect: "Zn",
    metalInverse: "Cu",
  },
  B: {
    equationTex: "Sn_{(s)} + Pb^{2+}_{(aq)} \\underset{(2)}{\\overset{(1)}{\\rightleftharpoons}} Sn^{2+}_{(aq)} + Pb_{(s)}",
    produitTex: "Sn^{2+}",
    oxydantTex: "Pb^{2+}",
    n: 1,
    expressionTex: "Q_r = \\dfrac{[Sn^{2+}]}{[Pb^{2+}]}",
    K: dec(25, -1),
    kTex: "K = 2{,}5",
    metalDirect: "Sn",
    metalInverse: "Pb",
  },
  C: {
    equationTex: "Cu_{(s)} + 2\\,Ag^{+}_{(aq)} \\underset{(2)}{\\overset{(1)}{\\rightleftharpoons}} Cu^{2+}_{(aq)} + 2\\,Ag_{(s)}",
    produitTex: "Cu^{2+}",
    oxydantTex: "Ag^{+}",
    n: 2,
    expressionTex: "Q_r = \\dfrac{[Cu^{2+}]}{[Ag^{+}]^2}",
    K: dec(40, 14),
    kTex: "K = 4{,}0\\times10^{15}",
    metalDirect: "Cu",
    metalInverse: "Ag",
  },
};

export interface Etat {
  bain: Bain;
  produit: Cran;
  oxydant: Cran;
}

// ── Le quotient, exact : num/den × 10^E ─────────────────────────────────────
export interface Quotient {
  num: bigint;
  den: bigint;
  E: number;
}
// BigInt(…) plutôt que les littéraux « 0n » : la cible du projet est ES2017 (tsconfig), où tsc les refuse.
const N0 = BigInt(0), N1 = BigInt(1), N2 = BigInt(2), N10 = BigInt(10);
const gcd = (a: bigint, b: bigint): bigint => (b === N0 ? (a < N0 ? -a : a) : gcd(b, a % b));
function reduit(q: Quotient): Quotient {
  const g = gcd(q.num, q.den);
  return { num: q.num / g, den: q.den / g, E: q.E };
}
/** Q = a / b^n (a, b décimaux exacts) */
export function quotientDe(a: Dec, b: Dec, n: 1 | 2): Quotient {
  const den = n === 1 ? b.m : b.m * b.m;
  return reduit({ num: a.m, den, E: a.e - n * b.e });
}
export const qri = (s: Etat): Quotient => quotientDe(VALEUR_CRAN[s.produit], VALEUR_CRAN[s.oxydant], COUPLES[s.bain].n);

const p10 = (k: number) => N10 ** BigInt(k);
/** compare q à un décimal d : −1, 0, +1 — EXACT (BigInt) */
export function compare(q: Quotient, d: Dec): -1 | 0 | 1 {
  // q = num/den × 10^E ; d = m × 10^e  ⇒  compare num × 10^(E−e) à den × m
  const k = q.E - d.e;
  let gauche = q.num, droite = q.den * d.m;
  if (k >= 0) gauche *= p10(k);
  else droite *= p10(-k);
  return gauche < droite ? -1 : gauche > droite ? 1 : 0;
}

export type Sens = "direct" | "inverse" | "equilibre";
/** le critère : Q_r,i < K ⇒ sens direct (1) ; > K ⇒ inverse (2) ; = K ⇒ déjà à l'équilibre */
export function verdict(s: Etat): Sens {
  const c = compare(qri(s), COUPLES[s.bain].K);
  return c < 0 ? "direct" : c > 0 ? "inverse" : "equilibre";
}

// ── Les logarithmes : pour DESSINER seulement ─────────────────────────────
const log10Big = (b: bigint) => Math.log10(Number(b));
export const log10Q = (q: Quotient) => log10Big(q.num) - log10Big(q.den) + q.E;
export const log10Dec = (d: Dec) => log10Big(d.m) + d.e;
export const log10K = (b: Bain) => log10Dec(COUPLES[b].K);

/**
 * L'écart en ordres de grandeur POUR L'ÉTAT AFFICHÉ (§5.4, §5.7) : un ENTIER, par défaut
 * vers le bas, et un côté. `decades` garde la valeur réelle (la porte N13 recalcule tout
 * compte affirmé dans un texte à partir des deux valeurs qu'il compare).
 */
export function ecart(s: Etat): { decades: number; entier: number; cote: "sous" | "au-dessus" | "sur" } {
  const d = log10K(s.bain) - log10Q(qri(s));
  const v = verdict(s);
  return { decades: Math.abs(d), entier: v === "equilibre" ? 0 : Math.floor(Math.abs(d) + 1e-9), cote: v === "direct" ? "sous" : v === "inverse" ? "au-dessus" : "sur" };
}
/** le nombre de décades entre deux quotients, et son SENS sur l'axe (gauche = plus petit) */
export function decadesEntre(depuis: Quotient, vers: Quotient): { decades: number; sens: "gauche" | "droite" | "aucun" } {
  const d = log10Q(vers) - log10Q(depuis);
  return { decades: Math.abs(d), sens: Math.abs(d) < 1e-9 ? "aucun" : d < 0 ? "gauche" : "droite" };
}

// ── L'écriture : deux chiffres significatifs, EXACTS, ou rien (§5.4) ──────────
const MOINS = "-";
/**
 * Q_r,i à deux chiffres significatifs. Scientifique hors des exposants −1 à 2 (la forme des
 * énoncés : 1,0×10⁻², 0,10, 1,0, 10, 250, 1,0×10³). JETTE si le quotient ne s'écrit pas
 * exactement à deux chiffres : sur cette liste de crans, un arrondi serait un mensonge au
 * seuil (le seul rapport qui vaut 2,5 le vaut exactement).
 */
export function texDeuxChiffres(q: Quotient): string {
  // chercher k tel que q = M × 10^k avec M entier de 10 à 99
  const lg = Math.floor(log10Q(q) + 1e-9);
  const k = lg - 1;
  const t = k - q.E; // num / den / 10^t doit être un entier de 10 à 99
  let num = q.num, den = q.den;
  if (t >= 0) den *= p10(t);
  else num *= p10(-t);
  if (num % den !== N0) throw new Error(`quotient non exact à deux chiffres : ${q.num}/${q.den}×10^${q.E}`);
  const M = Number(num / den);
  if (M < 10 || M > 99) throw new Error(`mantisse hors de [10 ; 99] : ${M}`);
  const exposant = lg; // valeur = (M/10) × 10^lg
  const a = Math.floor(M / 10), b = M % 10;
  const mantisse = `${a}{,}${b}`;
  if (exposant >= -1 && exposant <= 2) {
    if (exposant === -1) return `0{,}${a}${b}`;
    if (exposant === 0) return mantisse;
    if (exposant === 1) return `${a}${b}`;
    return `${a}${b}0`;
  }
  return `${mantisse}\\times10^{${exposant < 0 ? MOINS : ""}${Math.abs(exposant)}}`;
}
export const texQri = (s: Etat) => texDeuxChiffres(qri(s));
/** une concentration de cran, avec la même règle, et son unité */
/**
 * Un cran s'écrit TOUJOURS en écriture scientifique, « 5,0×10⁻¹ mol/L » et non « 0,50 » (§5.2, §6.2 :
 * les libellés exacts) — ce sont des données d'énoncé, et les cinq doivent se lire d'un même œil.
 * Les QUOTIENTS, eux, suivent §5.4 (décimal de 10⁻¹ à 10², scientifique ailleurs).
 */
export const texCran = (c: Cran) => {
  const v = VALEUR_CRAN[c]; // m entier de 10 à 99, valeur = m × 10^e
  const exposant = v.e + 1;
  const m = Number(v.m);
  return `${Math.floor(m / 10)}{,}${m % 10}\\times10^{${exposant < 0 ? MOINS : ""}${Math.abs(exposant)}}`;
};
export const texCranUnite = (c: Cran) => `${texCran(c)}\\ \\text{mol/L}`;

export const TEX_SENS: Record<Sens, string> = {
  direct: "sens direct (1)",
  inverse: "sens inverse (2)",
  equilibre: "déjà à l’équilibre",
};
/** qui est oxydé, qui est réduit — ou « aucune » sur l'état d'équilibre (§5.7) */
export function especes(s: Etat): { oxyde: string; reduit: string } | null {
  const c = COUPLES[s.bain], v = verdict(s);
  if (v === "equilibre") return null;
  const oxMetal = v === "direct" ? c.metalDirect : c.metalInverse;
  // l'ion réduit est l'oxydant du sens choisi
  const ionReduit = v === "direct" ? c.oxydantTex : c.produitTex;
  return { oxyde: oxMetal, reduit: ionReduit };
}

// ── La bande de travail et l'axe (§5.5) ──────────────────────────────────────
/** l'axe d'ensemble, FIXE : 10^−4 à 10^42 (46 décades) */
export const AXE = { min: -4, max: 42 } as const;
/** la bande de travail du bain : [log K − 4 ; log K + 4] */
export const bande = (b: Bain) => ({ min: log10K(b) - 4, max: log10K(b) + 4 });
export const dansLaBande = (s: Etat) => {
  const l = log10Q(qri(s)), bd = bande(s.bain);
  return l >= bd.min && l <= bd.max;
};

// ── Les étapes : ce qui est posé, ouvert, atteignable (§7.6 A) ─────────────────
export type Controle = "oxydant" | "produit" | "bain";
export interface Ouverture {
  /** contrôles ouverts, et, pour `bain`, les crans offerts */
  oxydant: boolean;
  produit: boolean;
  bain: readonly Bain[] | null;
}
export interface PlanEtape {
  id: string;
  pose: Etat;
  pendant: Ouverture;
  apres: Ouverture;
  /** la bande de travail est-elle au DOM (§5.5 B : à partir de S3) */
  bande: boolean;
}
const FERME: Ouverture = { oxydant: false, produit: false, bain: null };
/**
 * Les cinq étapes. L'état POSÉ de S2 n'est écrit nulle part dans la spec (§7.2) : il reprend
 * celui de S1 (le même bécher, le même couple — la consigne dit « de ce même couple »).
 * Décision de construction, écrite.
 *
 * Et PENDANT le pari de S2, rien n'est ouvert — contre la table §7.6 A, qui y ouvrait `oxydant`.
 * La règle de la maison (ADR 0041 §6, `usePari` : « tant qu'il n'a pas parié, ni le temps ni le
 * contrôle de l'étape n'existent dans le DOM ») vaut à toutes les étapes, et la spec l'invoque
 * elle-même à S5 (F3). Le pari de S2 demande de PRÉDIRE un comptage, pas de le relever (F5) :
 * il n'a besoin d'aucun réglage. Plus strict que la table, jamais moins.
 */
export const PLAN: readonly PlanEtape[] = [
  { id: "de-quel-cote", pose: { bain: "A", produit: "1.0e-3", oxydant: "1.0e-1" }, pendant: FERME, apres: { oxydant: true, produit: false, bain: null }, bande: false },
  { id: "vingt-cinq-melanges", pose: { bain: "A", produit: "1.0e-3", oxydant: "1.0e-1" }, pendant: FERME, apres: { oxydant: true, produit: true, bain: null }, bande: false },
  { id: "un-autre-couple", pose: { bain: "B", produit: "1.0e-1", oxydant: "1.0e-2" }, pendant: FERME, apres: { oxydant: false, produit: false, bain: ["A", "B"] }, bande: true },
  { id: "l-exposant", pose: { bain: "C", produit: "1.0e-1", oxydant: "1.0e-2" }, pendant: FERME, apres: { oxydant: true, produit: false, bain: ["A", "B", "C"] }, bande: true },
  { id: "pile-sur-le-pivot", pose: { bain: "B", produit: "2.5e-2", oxydant: "1.0e-2" }, pendant: FERME, apres: { oxydant: true, produit: true, bain: ["A", "B", "C"] }, bande: true },
];
/** les états atteignables depuis l'état posé, avec les contrôles d'une ouverture */
export function atteignables(pose: Etat, o: Ouverture): Etat[] {
  const bains = o.bain ?? [pose.bain];
  const prods = o.produit ? CRANS : [pose.produit];
  const oxs = o.oxydant ? CRANS : [pose.oxydant];
  const out: Etat[] = [];
  for (const bain of bains) for (const produit of prods) for (const oxydant of oxs) out.push({ bain, produit, oxydant });
  return out;
}

// ── Les quatre valeurs du pari de S4, chacune depuis le modèle qui la nomme (§5.3 D) ──
export function pariS4(s: Etat): { juste: Quotient; omis: Quotient; facteur: Quotient; inverse: Quotient } {
  const a = VALEUR_CRAN[s.produit], b = VALEUR_CRAN[s.oxydant];
  return {
    juste: quotientDe(a, b, 2),
    omis: quotientDe(a, b, 1),
    // [Cu²⁺] / (2 [Ag⁺]) : le coefficient pris comme facteur
    facteur: reduit({ num: a.m, den: N2 * b.m, E: a.e - b.e }),
    // [Ag⁺]² / [Cu²⁺] : produits et réactifs inversés, exposant gardé
    inverse: reduit({ num: b.m * b.m, den: a.m, E: 2 * b.e - a.e }),
  };
}

/** le comptage du pari de S2 (bain A, 25 états), par modèle (§5.3 E) */
export function comptageS2(): { juste: number; critereInverse: number; seuilUn: number } {
  let juste = 0, seuilUn = 0;
  const tous = atteignables(PLAN[1].pose, PLAN[1].apres);
  for (const s of tous) {
    if (verdict(s) === "inverse") juste++;
    if (compare(qri(s), dec(10, -1)) > 0) seuilUn++;
  }
  return { juste, critereInverse: tous.length, seuilUn };
}

export const _interne = { dec, reduit, gcd };
