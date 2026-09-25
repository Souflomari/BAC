/**
 * figuresEnonce.ts — une ligne `[[figure:<slug>]]` seule, dans l'énoncé d'un
 * exercice : la même écriture que dans la leçon.
 *
 * Jusqu'au 2026-09-24, l'énoncé passait par `MdBlock` seul et un marqueur y
 * aurait été IMPRIMÉ tel quel — d'où la convention « figure transcrite EN
 * TEXTE dans l'intro », qui a fini par donner la réponse d'une question
 * « déterminer graphiquement » trois lignes au-dessus d'elle
 * (pc/decroissance-radioactive, r-variation). La figure est rendue par
 * `NotionBody`, qui a les SVG ; l'exercice ne fait que la placer.
 *
 * Module sans « use client » : `NotionBody` (serveur) et l'exercice (client)
 * le lisent tous les deux.
 */
//
// Les espaces AUTOUR du deux-points sont tolérés, et c'est exprès : le
// chargeur (`lib/content.ts`) passe l'énoncé par `frenchTypography`, qui pose
// une espace fine insécable devant « : ». Le marqueur écrit
// `[[figure:slug]]` ARRIVE ici sous la forme `[[figure :slug]]` — premier
// passage : aucune figure, et le marqueur imprimé tel quel (ADR 0039 : c'est le
// produit qui réécrit la chose avant de l'écrire).
export const MARQUEUR_FIGURE = /^\s*\[\[\s*figure\s*:\s*([a-zA-Z0-9_-]+)\s*\]\]\s*$/;

export function slugsFiguresEnonce(md: string | undefined): string[] {
  if (!md) return [];
  return md.split("\n").flatMap((l) => {
    const m = MARQUEUR_FIGURE.exec(l);
    return m ? [m[1]] : [];
  });
}

/** L'énoncé découpé : de la prose, et les figures à leur place. */
export function decouperEnonce(md: string): ({ md: string } | { slug: string })[] {
  const morceaux: ({ md: string } | { slug: string })[] = [];
  let courant: string[] = [];
  const vider = () => {
    if (courant.join("").trim()) morceaux.push({ md: courant.join("\n") });
    courant = [];
  };
  for (const ligne of md.split("\n")) {
    const m = MARQUEUR_FIGURE.exec(ligne);
    if (m) {
      vider();
      morceaux.push({ slug: m[1] });
    } else courant.push(ligne);
  }
  vider();
  return morceaux;
}
