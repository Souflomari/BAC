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

/** Numéro d'exercice depuis le label du sujet réel (arabe ou romain). */
function numeroExercice(label?: string): number {
  if (!label) return 99;
  const m = label.match(/Exercice\s+([IVX]+|\d+)/i);
  if (!m) return 99;
  const brut = m[1].toUpperCase();
  return ROMAINS[brut] ?? parseInt(brut, 10) ?? 99;
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
      // L'ordre du sujet réel : par numéro d'exercice, puis par titre pour
      // les sous-parties d'un même exercice (§1 avant §2 par tri lexical).
      ep.exercices.sort((a, b) => {
        const d = numeroExercice(a.exerciseLabel) - numeroExercice(b.exerciseLabel);
        return d !== 0 ? d : (a.exerciseLabel ?? "").localeCompare(b.exerciseLabel ?? "", "fr");
      });
      ep.pts = Math.round(ep.pts * 100) / 100;
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
