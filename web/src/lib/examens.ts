/**
 * examens.ts — l'assemblage des épreuves réelles depuis les banques
 * (EXAM-MODE-SPEC §1, phase C5).
 *
 * PRINCIPE HONNÊTE : une épreuve n'existe ici que parce que ses exercices
 * existent dans les `bank.yaml` des notions — transcrits d'un scan officiel
 * et vérifiés. Le groupement se fait sur `source.{filiere, year, session}`
 * que chaque entrée porte déjà. Rien n'est fabriqué : ni exercice, ni
 * pourcentage, ni épreuve « type ».
 *
 * Seuils d'affichage (documentés au spec) :
 *   - pts ≥ 19,5  → épreuve « complète » (le barème national est /20) ;
 *   - pts ≥ 9,75  → « partielle », listée avec son honnête « X pts sur
 *     20 disponibles » (les moitiés SM — l'algèbre sans l'analyse — sont
 *     réellement utiles à réviser) ;
 *   - en dessous  → PAS listée : un « examen » d'un exercice n'en est pas
 *     un, le présenter serait du théâtre.
 *
 * SERVEUR uniquement (fs via loadNotion) — jamais importé par un composant
 * client ; les pages passent des props sérialisées.
 */

import { listNotions, loadNotion, type NotionBankEntry } from "./content";

export interface ExamExercice {
  subject: string;
  notionSlug: string;
  notionTitle: string;
  /** Position sur l'épreuve réelle (ex. « Exercice 3 — §1 »). */
  exerciseLabel?: string;
  entry: NotionBankEntry;
}

export interface Epreuve {
  /** ex. "spc-2023-normale" — le segment d'URL. */
  id: string;
  /** Le flux du sujet réel : "SPC" | "SM" | "SExp". */
  filiere: string;
  /** La matière du produit : "pc" | "maths". */
  matiere: string;
  year: number;
  session: string;
  /** Somme des barèmes transcrits (≤ 20). */
  pts: number;
  /**
   * Nombre d'exercices SUR LE SUJET RÉEL — pas le nombre d'entrées.
   *
   * Un exercice du bac se répartit souvent entre plusieurs notions (une
   * cross-list ne devient jamais une seconde entrée, mais un exercice
   * authentiquement mixte se DÉCOUPE, et chaque morceau vit dans la banque
   * de son domaine). `exercices.length` compte donc les morceaux. Mesuré au
   * 2026-08-27 : 14 des 23 épreuves affichées annonçaient un nombre faux —
   * SPC 2023 normale disait « 10 exercices » pour un sujet qui en a quatre.
   * Un élève qui jauge « est-ce que je peux faire ça ce soir » lisait une
   * copie deux fois plus grosse que la vraie.
   */
  nbExercices: number;
  /** Somme des durées honnêtes des entrées (minutes). */
  minutes: number;
  /** Durée officielle de l'épreuve au bac (minutes) : SM 240, sinon 180. */
  dureeOfficielleMin: number;
  complete: boolean;
  exercices: ExamExercice[];
}

const COMPLETE_MIN = 19.5;
const LISTEE_MIN = 9.75;

const ROMAINS: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6 };

/** Un jeton « I » / « IV » / « 3 » en nombre, ou null s'il n'en est pas un. */
function romainOuArabe(brut: string): number | null {
  const b = brut.toUpperCase();
  if (b in ROMAINS) return ROMAINS[b];
  const n = parseInt(b, 10);
  // `??` ne rattrape PAS NaN (il ne voit que null/undefined) : un romain
  // hors table — « VII » — repartait donc en NaN, et un comparateur qui
  // renvoie NaN est traité comme « égal », ce qui perdait AUSSI le départage.
  return Number.isNaN(n) ? null : n;
}

/** Numéro d'exercice depuis le label du sujet réel (arabe ou romain). */
function numeroExercice(label?: string): number {
  if (!label) return 99;
  const m = label.match(/Exercice\s+([IVX]+|\d+)/i);
  if (!m) return 99;
  return romainOuArabe(m[1]) ?? 99;
}

const ORDINAUX: ReadonlyArray<readonly [RegExp, number]> = [
  [/premi[eè]re?|1\s*[eè]?re/i, 1],
  [/deuxi[eè]me|seconde/i, 2],
  [/troisi[eè]me/i, 3],
  [/quatri[eè]me/i, 4],
];

/**
 * Rang de la SOUS-PARTIE dans son exercice, en deux niveaux — `[0, 0]` quand
 * l'exercice n'est pas découpé.
 *
 * POURQUOI. Un exercice du bac se découpe souvent entre plusieurs notions, et
 * chaque morceau garde le libellé imprimé sur la copie. Le tri ne regardait
 * que le numéro d'exercice, puis départageait les morceaux au `localeCompare`
 * — c'est-à-dire alphabétiquement. Or l'alphabet n'est pas l'ordre du sujet :
 * « Partie 2 » passait avant « Partie I » (le chiffre 2 précède la lettre I),
 * et « Deuxième partie » avant « Première partie ». Mesuré sur le corpus au
 * 2026-08-27, NEUF épreuves sortaient dans le désordre, dont huit affichées
 * à 20,00/20 — un élève lisait la partie 2 de la chimie avant la partie 1.
 *
 * Les quatre conventions du corpus, dans l'ordre où on les cherche : le
 * paragraphe « §N » ; le jeton de tête (« I- », « 2. », « II. ») ; « Partie N »
 * ou « Partie II » n'importe où ; enfin l'ordinal en toutes lettres accolé à
 * « partie » ou « situation ». Le second niveau porte « sous-partie N » et le
 * chiffre d'un « I-2 ». Un libellé qui ne relève d'aucune retombe à `[0, 0]`
 * et garde le départage alphabétique — inchangé pour lui.
 */
function sousOrdre(label?: string): [number, number] {
  if (!label) return [0, 0];
  const q = label.replace(/^.*?Exercice\s+(?:[IVX]+|\d+)?/i, "");
  let a = 0;
  let b = 0;
  let m: RegExpMatchArray | null;
  if ((m = q.match(/§\s*(\d+)/))) {
    a = parseInt(m[1], 10);
  } else if ((m = q.match(/^\s*[—–-]?\s*([IVX]+|\d+)\s*[.\-)]/i))) {
    a = romainOuArabe(m[1]) ?? 0;
    const sousJeton = q.match(/^\s*[—–-]?\s*[IVX]+\s*-\s*(\d+)/i);
    if (sousJeton) b = parseInt(sousJeton[1], 10);
  } else if ((m = q.match(/partie\s+([IVX]+|\d+)/i))) {
    a = romainOuArabe(m[1]) ?? 0;
  } else {
    for (const [re, v] of ORDINAUX) {
      if (re.test(q) && /partie|situation/i.test(q)) {
        a = v;
        break;
      }
    }
  }
  const sousPartie = q.match(/sous-partie\s+(\d+)/i);
  if (sousPartie) b = parseInt(sousPartie[1], 10);
  return [a, b];
}

function matierePour(filiere: string): string {
  return filiere === "SPC" ? "pc" : "maths";
}

/** Toutes les épreuves assemblables, complètes d'abord puis récentes d'abord. */
export function listEpreuves(): Epreuve[] {
  const groupes = new Map<string, Epreuve>();

  for (const meta of listNotions()) {
    const notion = loadNotion(meta.id);
    if (!notion?.bank) continue;
    for (const entry of notion.bank.entries) {
      const s = entry.source;
      if (!s?.filiere || !s.year || !s.session) continue;
      const id = `${s.filiere.toLowerCase()}-${s.year}-${s.session}`;
      let ep = groupes.get(id);
      if (!ep) {
        ep = {
          id,
          filiere: s.filiere,
          matiere: matierePour(s.filiere),
          year: s.year,
          session: s.session,
          pts: 0,
          nbExercices: 0,
          minutes: 0,
          dureeOfficielleMin: s.filiere === "SM" ? 240 : 180,
          complete: false,
          exercices: [],
        };
        groupes.set(id, ep);
      }
      ep.pts += entry.baremeTotal ?? 0;
      ep.minutes += entry.durationMin ?? 0;
      ep.exercices.push({
        subject: meta.subject,
        notionSlug: meta.slug,
        notionTitle: meta.title,
        exerciseLabel: s.exerciseLabel,
        entry,
      });
    }
  }

  const epreuves = [...groupes.values()]
    .map((ep) => {
      // L'ordre du sujet réel : numéro d'exercice, puis rang de la sous-partie
      // (§N, « Partie II », « Première partie »… — voir sousOrdre), et le
      // titre en dernier recours seulement.
      ep.exercices.sort((a, b) => {
        let d = numeroExercice(a.exerciseLabel) - numeroExercice(b.exerciseLabel);
        if (d !== 0) return d;
        const sa = sousOrdre(a.exerciseLabel);
        const sb = sousOrdre(b.exerciseLabel);
        d = sa[0] - sb[0] || sa[1] - sb[1];
        if (d !== 0) return d;
        return (a.exerciseLabel ?? "").localeCompare(b.exerciseLabel ?? "", "fr");
      });
      ep.pts = Math.round(ep.pts * 100) / 100;
      // Les morceaux d'un même exercice partagent son numéro sur la copie ;
      // les libellés sans numéro exploitable retombent tous sur 99 — ce qui
      // est correct pour les épreuves du corpus, où ils désignent les parties
      // d'un seul et même exercice non numéroté.
      ep.nbExercices = new Set(
        ep.exercices.map((x) => numeroExercice(x.exerciseLabel))
      ).size;
      ep.complete = ep.pts >= COMPLETE_MIN;
      return ep;
    })
    .filter((ep) => ep.pts >= LISTEE_MIN);

  epreuves.sort((a, b) => {
    if (a.complete !== b.complete) return a.complete ? -1 : 1;
    return b.year - a.year || a.filiere.localeCompare(b.filiere);
  });
  return epreuves;
}

export function getEpreuve(id: string): Epreuve | null {
  return listEpreuves().find((e) => e.id === id) ?? null;
}

/** Libellés humains. */
export function epreuveTitre(ep: Epreuve): string {
  const session = ep.session === "normale" ? "session normale" : "session de rattrapage";
  return `Examen national ${ep.year} — ${session}`;
}

export function filiereLabel(f: string): string {
  if (f === "SPC") return "Physique-Chimie · Sciences Physiques";
  if (f === "SM") return "Mathématiques · Sciences Maths";
  if (f === "SExp") return "Mathématiques · Sciences Expérimentales";
  return f;
}
