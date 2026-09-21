/**
 * Le barème d'une question d'épreuve, lu dans son énoncé.
 *
 * UNE SEULE DÉFINITION, ET C'EST LE SUJET (§11.168, 2026-09-21). Cette
 * fonction vivait dans `EpreuveShell.tsx`. Une porte qui voudrait vérifier le
 * barème devrait alors la RECOPIER — et vérifierait sa propre copie, pas la
 * règle du produit. C'est le cas exact d'ADR 0033 : une porte verte qui répond
 * honnêtement à une autre question. Elle est donc ici, et la porte l'importe.
 *
 * ── LA SOMME, PAS LA PREMIÈRE ÉTIQUETTE ───────────────────────────────────
 * La version d'avant prenait la PREMIÈRE étiquette de l'énoncé
 * (`stem.match(…)`). Or un énoncé de bac groupe souvent plusieurs
 * sous-questions notées séparément :
 *
 *     Recopier le numéro de la question et répondre par vrai ou faux.
 *     **a)** (0,25 pt) L'onde sonore est une onde électromagnétique.
 *     **b)** (0,25 pt) L'onde sonore est une onde longitudinale.
 *     **c)** (0,25 pt) …    **d)** (0,25 pt) …
 *
 * La question vaut 1 point ; le produit en comptait 0,25. Mesuré en marquant
 * TOUTES les questions « juste » sur les 39 épreuves, puis en lisant la note
 * affichée : **2 épreuves sur 39 refusaient le 20/20 à une copie parfaite** —
 * `spc-2021-rattrapage` à 19,25 et `spc-2010-normale` à 19,75. Deux questions
 * dans tout le corpus portent plusieurs étiquettes, et ce sont exactement
 * celles-là. Avec la somme, les 39 épreuves ferment à 20,00.
 *
 * Le risque symétrique — une étiquette comptée deux fois parce qu'un énoncé
 * écrirait « (2 points) » en prose — n'est pas traité ici par un motif plus
 * malin : il est traité par la PORTE, qui exige que la somme des questions
 * d'un exercice fasse exactement son barème annoncé. Un motif trop gourmand
 * y devient rouge.
 */

/** « (0,25 pt) », « (2 pts) », « (1 point) » — toutes les occurrences. */
const ETIQUETTE = /\((\d+(?:[.,]\d+)?)\s*(?:pt|pts|point)/gi;

/**
 * Le barème d'une question : la SOMME des étiquettes transcrites dans son
 * énoncé, ou `null` s'il n'y en a aucune (l'appelant répartit alors le reste).
 */
export function ptsDepuisStem(stem: string): number | null {
  const trouvees = [...(stem || "").matchAll(ETIQUETTE)];
  if (trouvees.length === 0) return null;
  return trouvees.reduce((s, m) => s + parseFloat(m[1].replace(",", ".")), 0);
}

export default ptsDepuisStem;
