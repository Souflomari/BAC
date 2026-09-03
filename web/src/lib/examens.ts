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
  /**
   * Somme des `duration_min` des entrées.
   *
   * ⚠️ CE N'EST PAS LA DURÉE DE L'ÉPREUVE, et il ne faut jamais l'afficher
   * comme telle. `duration_min` est une estimation d'ENTRAÎNEMENT, calibrée à
   * ≈ 6 min par point de barème (BANK-SPEC §2) ; une épreuve complète y somme
   * donc ~120 min quand le vrai papier dure 180 min (SPC, SExp) ou 240 min
   * (SM). La durée réelle est `dureeOfficielleMin`, et c'est elle que les
   * pages et le chrono emploient.
   *
   * Champ actuellement écrit et lu par personne. Conservé parce qu'une vue
   * « combien de temps pour travailler cette épreuve tranquillement » aurait
   * exactement besoin de cette somme-là — mais alors sous son vrai nom.
   */
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

/**
 * Le numéro d'exercice lu sur l'IDENTIFIANT, quand le libellé n'en porte pas.
 *
 * POURQUOI, et ce que ça a coûté de ne pas l'avoir. `numeroExercice` ne sait
 * lire que « Exercice N » — c'est la forme des libellés de la plupart des
 * sujets. Mais certains sujets ne numérotent PAS leurs exercices : ils les
 * nomment par discipline. SPC 2011 normale imprime « Chimie », « Physique
 * nucléaire », « Électricité », « Mécanique », et ses libellés ont été
 * transcrits fidèlement, sans numéro. Les six morceaux retombaient donc tous
 * sur 99, le tri s'effondrait sur le `localeCompare` final, et l'épreuve
 * sortait DANS LE DÉSORDRE : l'électricité en tête, la chimie en dernier, et
 * la situation 3 de mécanique AVANT les situations 1 et 2 — qu'elle suppose
 * pourtant connues. Constaté au rendu le 2026-09-03, sur une épreuve
 * complète et servie.
 *
 * L'information manquante existait ailleurs, et de façon garantie : la
 * convention K-7 bis (`docs/grounding/known-issues.md`) veut que l'identifiant
 * d'une entrée dise sa POSITION SUR LA COPIE — `-x<N>` pour le numéro
 * d'exercice, une lettre pour chaque morceau d'un exercice découpé. On la lit
 * donc ici plutôt que d'exiger des libellés qu'ils inventent un numéro que le
 * sujet n'imprime pas.
 *
 * Le libellé garde la priorité : quand il dit « Exercice 3 », c'est lui qui
 * fait foi. L'identifiant ne parle que dans son silence.
 */
function numeroDepuisId(id?: string): number {
  const m = id?.match(/-x(\d+)/i);
  return m ? parseInt(m[1], 10) : 99;
}

/** Le rang du morceau (a=0, b=1, c=2…) lu sur le suffixe de l'identifiant. */
function rangDepuisId(id?: string): number {
  const m = id?.match(/-x\d+([a-z])/i);
  return m ? m[1].toLowerCase().charCodeAt(0) - 96 : 0;
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
  } else if ((m = q.match(/(\d+)\s*(?:ers?|[èeé]res?|re|ᵉ|[èe]mes?|e)?\s*(?:partie|situation|phase)/i))) {
    // CINQUIÈME CONVENTION : l'ordinal écrit en CHIFFRE avant le mot —
    // « 1ère partie », « 2ᵉ partie », « 3ᵉ partie », « 2ème situation ».
    // Ajoutée le 2026-09-03, après un désordre constaté au rendu.
    //
    // Elle manquait, et son absence était pire qu'une simple lacune : la
    // liste ORDINAUX ci-dessous reconnaît « 1ère » (son motif accepte la
    // forme chiffrée pour le PREMIER rang seulement), mais rien ne
    // reconnaissait « 2ᵉ » ni « 3ᵉ ». La première partie recevait donc le
    // rang 1 quand les suivantes restaient à 0 — et le tri ascendant les
    // faisait passer AVANT elle. Sur SPC 2010 normale, l'élève lisait la
    // mécanique dans l'ordre 2ᵉ, 3ᵉ, 1ère : la partie qui pose le problème
    // arrivait en dernier.
    //
    // Le superscript « ᵉ » (U+1D49) est explicitement prévu : c'est la
    // forme qu'emploient les libellés du corpus, et un « e » ordinaire ne
    // l'attrape pas.
    a = parseInt(m[1], 10);
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
      // LE REPLI SUR L'IDENTIFIANT NE VAUT QUE POUR UNE ÉPREUVE ENTIÈREMENT
      // MUETTE — restriction ajoutée le 2026-09-03, après une régression que
      // le repli avait lui-même causée.
      //
      // Le repli sert les sujets qui ne numérotent PAS leurs exercices (SPC
      // 2010 N, 2011 N, 2011 R, 2012 N : « Chimie », « Électricité »…). Mais
      // appliqué entrée par entrée, il abîme les épreuves MIXTES. Les sujets
      // de maths SExp numérotent « Exercice 1..4 » puis referment sur un
      // « Problème » — sans numéro, et volontairement : le problème est la
      // dernière partie de l'épreuve. Le repli lui prêtait le numéro de
      // l'identifiant qu'il partage avec un exercice voisin (K-7 : un
      // exercice découpé garde son id dans chaque notion), et SExp 2022
      // affichait le Problème AVANT l'exercice 4. Sans le repli, un libellé
      // muet tombe à 99, c'est-à-dire en dernier — ce qui est exactement
      // juste pour un « Problème ».
      //
      // La restriction est donc : on ne lit les identifiants QUE si aucun
      // libellé de l'épreuve ne porte de numéro. Dans ce cas seul, 99 pour
      // tout le monde ne départage plus rien, et l'identifiant est la seule
      // information de position disponible.
      const aucunLibelleNumerote = ep.exercices.every(
        (x) => numeroExercice(x.exerciseLabel) === 99
      );
      ep.exercices.sort((a, b) => {
        const na = numeroExercice(a.exerciseLabel);
        const nb = numeroExercice(b.exerciseLabel);
        let d = aucunLibelleNumerote
          ? numeroDepuisId(a.entry.id) - numeroDepuisId(b.entry.id)
          : na - nb;
        if (d !== 0) return d;
        const sa = sousOrdre(a.exerciseLabel);
        const sb = sousOrdre(b.exerciseLabel);
        d = sa[0] - sb[0] || sa[1] - sb[1];
        if (d !== 0) return d;
        // Même repli, sous la même restriction, pour départager les morceaux :
        // la lettre de l'identifiant dit leur ordre sur la copie.
        if (aucunLibelleNumerote) {
          d = rangDepuisId(a.entry.id) - rangDepuisId(b.entry.id);
          if (d !== 0) return d;
        }
        return (a.exerciseLabel ?? "").localeCompare(b.exerciseLabel ?? "", "fr");
      });
      ep.pts = Math.round(ep.pts * 100) / 100;
      // Les morceaux d'un même exercice partagent son numéro sur la copie.
      // Quand le libellé n'en porte pas, on lit celui de l'identifiant (même
      // repli que le tri) : sans cela, SPC 2011 normale — dont le sujet nomme
      // ses exercices « Chimie », « Physique nucléaire », « Électricité »,
      // « Mécanique » — annonçait « 1 exercice » pour une épreuve qui en
      // compte QUATRE, ses six morceaux retombant tous sur le même 99.
      // Même restriction que le tri : seule une épreuve dont AUCUN libellé
      // n'est numéroté se compte sur les identifiants.
      ep.nbExercices = new Set(
        ep.exercices.map((x) => {
          const n = aucunLibelleNumerote ? 99 : numeroExercice(x.exerciseLabel);
          return n === 99 ? numeroDepuisId(x.entry.id) : n;
        })
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
