/**
 * Un libellé officiel rendu lisible à l'affichage. Le référentiel (`docs/referentiel/`) recopie les
 * cadres mot pour mot, avec leurs majuscules sans accent, leurs graphies inégales et leurs listes à
 * astérisques : il ne change pas. Cette fonction corrige ce que l'élève lit, et rien d'autre.
 * Elle est idempotente (l'appliquer deux fois ne change rien de plus).
 */
const INDICES: Record<string, string> = { "0": "₀", "1": "₁", "2": "₂", n: "ₙ", "+": "₊", "-": "₋" };

export function lisible(s: string): string {
  return s
    // majuscules accentuées
    .replace(/\bE(?=tabli|cri|tud|valu|volu|chiqui|nonc|tat|nergi|quation|quilibr|lectr|tape|tre\b)/g, "É")
    // une seule graphie pour un même mot (le référentiel écrit tantôt l'une, tantôt l'autre)
    .replace(/\b([Cc]onna|[Rr]econna)itre\b/g, "$1ître")
    .replace(/\b([Cc]ha)ine(s?)\b/g, "$1îne$2")
    .replace(/\binferieure(s?)\b/g, "inférieure$1")
    // indices et exposants écrits comme tels
    .replace(/_\{?1\/2\}?/g, "₁/₂")
    .replace(/_\{([0-9n+-]+)\}/g, (_, x: string) => [...x].map((c) => INDICES[c] ?? c).join(""))
    .replace(/_([0-9n])(?![A-Za-z0-9])/g, (_, c: string) => INDICES[c] ?? c)
    .replace(/\^x\b/g, "ˣ")
    .replace(/\^n\b/g, "ⁿ")
    // listes à astérisques ou à puces : une phrase, des points-virgules
    .replace(/^[*○]\s+/, "")
    .replace(/\s*:\s*[*○]\s+/g, " : ")
    .replace(/\s*[.,;]?\s+[*○]\s+/g, " ; ")
    // espace avant un point ou une virgule, point-virgule final
    .replace(/\s+([.,])(?=\s|$)/g, "$1")
    .replace(/\s*;\s*$/, ".")
    .replace(/\s{2,}/g, " ");
}
