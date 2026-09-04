/**
 * La zone « à retenir » — construction de son contenu, côté serveur.
 *
 * LESSON-EXPERIENCE-SPEC §3.2. Une carte par CHAPITRE, calculée au build :
 * le composant client (`RetenirZone`) ne fait que choisir l'index courant.
 * Rien n'est calculé dans le navigateur, rien n'est deviné.
 *
 * DEUX SOURCES, dans cet ordre :
 *
 *   1. le sidecar `content/<matière>/<slug>/retenir.json` — une entrée par
 *      barreau, `{ rung, formula, note }`. C'est la source AUTHORÉE, et elle
 *      gagne toujours.
 *   2. à défaut, le premier bloc `$$…$$` du chapitre, étiqueté par le titre
 *      court du chapitre. C'est un REPLI, pas une invention : la formule
 *      affichée est déjà dans la leçon, mot pour mot.
 *
 * ET SI AUCUNE DES DEUX ? La carte est absente, la zone reste vide et
 * silencieuse. C'est la règle d'état honnête : on ne fabrique pas un « à
 * retenir » pour meubler une colonne. Une leçon sans formule encadrée n'a
 * rien à mettre là, et le dire par le vide est plus juste que de remplir.
 *
 * PIÈGE À NE PAS REFAIRE : le repli ne doit PAS attraper une formule EN
 * LIGNE (`$…$`). Elles sont partout dans la prose et n'ont rien d'un
 * résultat à retenir ; seul le display math `$$…$$`, que l'auteur a choisi
 * de détacher, porte ce statut.
 */

import { extractChapterHeadings, splitChapterBodies, sansLatex } from "@/lib/chapters";

/** Une entrée du sidecar `retenir.json`. */
export interface RetenirEntry {
  /** Barreau visé, tel qu'authoré dans le titre (« R3 »). */
  rung: string;
  /** Source KaTeX de la formule. */
  formula: string;
  /** Note courte, facultative — une phrase, jamais un paragraphe. */
  note?: string;
}

/** Ce que la zone affiche pour un chapitre donné. */
export interface RetenirCarte {
  /** Libellé au-dessus de la formule — le titre court du chapitre. */
  titre: string;
  /** Source KaTeX. */
  formula: string;
  note?: string;
  /** D'où vient la carte — sert au harnais, jamais à l'élève. */
  source: "sidecar" | "repli";
}

/** Premier bloc `$$…$$` d'un texte de chapitre, source brute, ou null. */
function premiereFormuleDetachee(md: string): string | null {
  const m = md.match(/\$\$([\s\S]*?)\$\$/);
  if (!m) return null;
  const tex = m[1].trim();
  return tex.length > 0 ? tex : null;
}

/**
 * Une carte (ou rien) par chapitre, dans l'ordre des chapitres — le même
 * ordre et le même compte que `ChapterShell`, puisque les deux dérivent de
 * la même découpe `## ` (lib/chapters.ts).
 *
 * `total` permet d'aligner le tableau sur le nombre de chapitres RÉELLEMENT
 * paginés, qui peut dépasser celui de la leçon d'un cran quand la notion a
 * une banque (le chapitre synthétique « S'entraîner », BANK-SPEC §1). Ce
 * chapitre-là n'a pas d'« à retenir » : il reçoit `null`, et la zone se tait.
 */
export function cartesParChapitre(
  lessonMd: string | null,
  sidecar: RetenirEntry[] | null,
  total: number
): (RetenirCarte | null)[] {
  const cartes: (RetenirCarte | null)[] = new Array(Math.max(0, total)).fill(null);
  if (!lessonMd) return cartes;

  const entetes = extractChapterHeadings(lessonMd);
  const corps = splitChapterBodies(lessonMd);
  // Une leçon sans aucun `## ` rend un chapitre unique (règle partagée avec
  // realChapterCount) : le tableau des en-têtes est alors vide, et seul le
  // repli peut jouer.
  const nb = Math.max(1, entetes.length);

  for (let i = 0; i < nb && i < cartes.length; i++) {
    const entete = entetes[i];
    const texte = corps[i] ?? "";
    const titre = entete ? entete.shortTitle : "";

    const authoree =
      entete?.rung && sidecar
        ? sidecar.find((e) => e.rung === entete.rung) ?? null
        : null;
    if (authoree && authoree.formula.trim()) {
      cartes[i] = {
        titre,
        formula: authoree.formula.trim(),
        note: authoree.note?.trim() || undefined,
        source: "sidecar",
      };
      continue;
    }

    const repli = premiereFormuleDetachee(texte);
    if (repli) {
      cartes[i] = { titre, formula: repli, source: "repli" };
    }
  }
  return cartes;
}

/**
 * Valide et normalise le contenu brut d'un `retenir.json`. Un fichier
 * malformé est traité comme ABSENT — jamais une page qui casse (même
 * politique que tous les autres chargeurs de content.ts).
 */
export function parseRetenir(brut: unknown): RetenirEntry[] | null {
  if (!Array.isArray(brut)) return null;
  const out: RetenirEntry[] = [];
  for (const e of brut) {
    if (!e || typeof e !== "object") continue;
    const o = e as Record<string, unknown>;
    if (typeof o.rung !== "string" || typeof o.formula !== "string") continue;
    if (!o.rung.trim() || !o.formula.trim()) continue;
    out.push({
      rung: o.rung.trim(),
      formula: o.formula,
      note: typeof o.note === "string" && o.note.trim() ? o.note : undefined,
    });
  }
  return out.length ? out : null;
}

/** Réexport pratique — la zone n'a pas besoin d'importer chapters.ts. */
export { sansLatex };
