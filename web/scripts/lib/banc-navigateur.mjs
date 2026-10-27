/**
 * banc-navigateur — les arguments que toute porte de scène passe à Chromium.
 *
 * `--disable-lcd-text` : le texte HTML est lissé en GRIS, jamais en sous-pixel.
 *
 * POURQUOI (2026-10-21, refonte Grille). Les portes de scène classent les
 * pixels d'une capture par leur CHROMINANCE (« de l'accent », « teinté »). Le
 * lissage sous-pixel (LCD) borde chaque lettre de franges bleues et orangées ;
 * les bleues tombent à cos > 0,85 de l'accent sarcelle. Chromium ne choisit le
 * LCD que si la couche du texte est opaque et sans masque : tant que le plateau
 * des scènes avait des coins arrondis (`overflow-hidden` + rayon 16 px), son
 * masque forçait le lissage gris. Grille a passé les rayons à 0 ; la légende
 * « Cuve à ondes · ralenti ×5 » s'est mise à produire 176 pixels « d'accent »
 * avant le pari, et six portes ont rougi sur un produit qui n'affichait aucun
 * accent (cuve, manège, révolution, quotient, champ de pentes ; mesuré, pas
 * supposé : 0 pixel chromatique avant Grille, 688 après, 0 avec ce drapeau).
 *
 * Le lissage du texte est un choix du COMPOSITEUR, pas une propriété du
 * produit : l'écran de l'élève en décide (ClearType, macOS, Android…). Le banc
 * le fixe pour que la mesure ne dépende plus d'un rayon de coin. Ce n'est pas
 * un seuil anti-bruit : aucun pixel produit par le dessin n'est écarté.
 */
export const ARGS_BANC = ["--disable-lcd-text"];

/** Les arguments du banc, puis ceux de la porte (WebGL logiciel, WebGL coupé…). */
export const avecBanc = (args = []) => [...ARGS_BANC, ...(args ?? [])];
