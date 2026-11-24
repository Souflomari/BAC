"use client";

import { clamp, easeCalm, lerp, SVG_FS, trouverPalier, ty, useLectureAnimee } from "./outils";
import { AA3, C6, CDS, toARN, traduire } from "../expression-genetique-code";

/**
 * Maquette 8 — Expression génétique : le décalage du cadre de lecture après une délétion.
 * Les nucléotides situés à droite de la base supprimée (position C6+1 du gène HBB)
 * glissent d'un cran vers la gauche tandis que les crochets de lecture par triplets restent fixes :
 * tous les codons en aval changent avant même la traduction.
 * Séquence et traduction calculées directement par `expression-genetique-code.js`.
 * Étape cible : `decalage` (beat 6) dans `expression-genetique-moteur.js`.
 */

// Fenêtre de 12 nucléotides centrée sur le triplet 6 (codons 5, 6, 7, 8 : positions 15..26 dans CDS)
const START_NT = C6 - 3; // 15 (triplet 5 : CCT -> CCU = Pro)
const DEL_LOCAL = 4; // index 4 dans la fenêtre = C6 + 1 (le 'A' du milieu de GAG)
const ARN_NORM: string = toARN(CDS.slice(START_NT, START_NT + 13)); // 13 bases (12 affichées + 13e qui entre au glissement)
const ARN_MUT: string = ARN_NORM.slice(0, DEL_LOCAL) + ARN_NORM.slice(DEL_LOCAL + 1); // 12 bases après délétion
const AA3_MAP: Record<string, string> = AA3;

// Traduction exacte par `traduire` (on préfixe AUG pour déclencher la lecture de `traduire`)
const aaOf = (codons12: string): string[] => {
  const res = traduire("AUG" + codons12);
  return [0, 1, 2, 3].map((i) => {
    const code = res.aa[i + 1] as string | undefined;
    return code ? AA3_MAP[code] ?? code : "STOP";
  });
};

const AA_NORM = aaOf(ARN_NORM.slice(0, 12));
const AA_MUT = aaOf(ARN_MUT.slice(0, 12));

const PALIERS = [
  {
    u: 0,
    court: "1. Cadre normal",
    titre: "Lecture par triplets fixes : Pro − Glu − Glu − Lys",
    texte:
      "Le ribosome lit l’ARNm trois bases par trois bases à partir du codon d’initiation. Ici apparaissent les codons 5 à 8 du gène HBB.",
  },
  {
    u: 1,
    court: "2. Délétion (−1 base)",
    titre: "Suppression du nucléotide A au milieu du codon 6 (GAG)",
    texte:
      "Une seule base disparaît sans être remplacée : un vide se crée au milieu du deuxième triplet affiché.",
  },
  {
    u: 2,
    court: "3. Glissement",
    titre: "Toutes les bases à droite glissent d’un cran dans les crochets fixes",
    texte:
      "Les crochets de trois bases ne bougent pas : chaque codon en aval recrute une base du triplet suivant.",
  },
  {
    u: 3,
    court: "4. Nouvelle chaîne",
    titre: `À partir du codon 6, toute la protéine bascule (${AA_MUT.slice(1).join(" − ")})`,
    texte:
      "Contrairement à une substitution qui ne touche qu’un codon, une délétion décale tout le cadre de lecture en aval.",
  },
] as const;

export function MaquetteExpressionGenetique() {
  const {
    valeur: u,
    playing,
    reduced: reducedMotion,
    togglePlay,
    lancerVers,
    fixer,
  } = useLectureAnimee({
    initial: 0,
    min: 0,
    max: 3,
    vitesse: 0.72,
    palierSuivant: (prev) => Math.min(3, Math.floor(prev) + 1),
  });

  const rejouer = () => {
    if (reducedMotion) fixer(0);
    else lancerVers(3, 0);
  };

  const { index: palierIdx, palier } = trouverPalier(PALIERS, u);

  const pDel = easeCalm(clamp(u, 0, 1)); // base 4 monte et s'efface
  const pSlide = easeCalm(clamp(u - 1, 0, 1)); // bases 5..12 glissent de 1 cran vers la gauche
  const pProt = easeCalm(clamp(u - 2, 0, 1)); // nouvelle séquence d'acides aminés

  // 12 cases horizontales : x0 = 44, pas = 56 px -> 44 + 12*56 = 716
  const X0 = 44;
  const STEP = 56;
  const Y_BASE = 216;
  const BOX_W = 48;
  const BOX_H = 54;

  const showMut = pProt > 0.45;
  const aaAff = showMut ? AA_MUT : AA_NORM;

  return (
    <article className="mq-card" aria-labelledby="mq-eg-titre">
      <div className="border-b border-subtle px-4 py-3 bp-medium:px-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="mq-eg-titre" className="font-display text-body-lg font-semibold text-primary">
          {ty("Expression génétique : décalage du cadre de lecture par délétion")}
        </h2>
        <span className="font-mono text-caption text-secondary">{ty("SVT · gène HBB (codons 5 à 8)")}</span>
      </div>

      <div className="grid grid-cols-1 bp-large:grid-cols-12">
        <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-4 bp-large:col-span-7 bp-large:border-b-0 bp-large:border-r bp-large:border-subtle">
          <svg
            viewBox="0 0 760 500"
            className="mq-svg"
            role="img"
            aria-label={ty(
              "Ruban d'ARNm montrant la suppression d'un nucléotide et le glissement vers la gauche de tous les nucléotides suivants dans les triplets fixes"
            )}
          >
            {/* En-tête */}
            <text x={20} y={36} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {ty("ARNm (5′ → 3′)")}
            </text>
            <text x={740} y={36} textAnchor="end" fontSize={SVG_FS} className="mq-f-sig mq-mono">
              {pSlide > 0.5 ? ty("Cadre décalé (−1 base)") : ty("Cadre normal")}
            </text>

            {/* Étiquette de la délétion au-dessus de la case 4 */}
            {pDel > 0.15 && (
              <text
                x={X0 + DEL_LOCAL * STEP + BOX_W / 2}
                y={104}
                textAnchor="middle"
                fontSize={SVG_FS}
                fontWeight={700}
                className="mq-f-sig"
                opacity={pDel}
              >
                {ty("base supprimée")}
              </text>
            )}

            {/* Les 13 nucléotides : 0..3 fixes, 4 s'élève et s'efface, 5..12 glissent de −STEP */}
            {Array.from(ARN_NORM).map((base, idx) => {
              const isDeleted = idx === DEL_LOCAL;
              const isShifted = idx > DEL_LOCAL;
              const x = isShifted ? X0 + (idx - pSlide) * STEP : X0 + idx * STEP;
              const y = isDeleted ? lerp(Y_BASE, Y_BASE - 76, pDel) : Y_BASE;
              const op = isDeleted
                ? clamp(1 - pDel * 0.85, 0.12, 1)
                : idx === 12
                  ? pSlide
                  : 1;
              if (x > 714 && idx === 12 && pSlide < 0.05) return null;
              return (
                <g key={idx} opacity={op}>
                  <rect
                    x={x}
                    y={y}
                    width={BOX_W}
                    height={BOX_H}
                    className={
                      isDeleted
                        ? "mq-f-sig-soft mq-s-sig"
                        : isShifted && pSlide > 0.15
                          ? "mq-f-ink-soft mq-s-ink"
                          : "mq-f-stage mq-s-line"
                    }
                    strokeWidth={isDeleted || (isShifted && pSlide > 0.15) ? 2.5 : 1.5}
                  />
                  <text
                    x={x + BOX_W / 2}
                    y={y + 36}
                    textAnchor="middle"
                    fontSize={SVG_FS}
                    fontWeight={700}
                    className={isDeleted ? "mq-f-sig mq-mono" : "mq-f-ink mq-mono"}
                  >
                    {base}
                  </text>
                </g>
              );
            })}

            {/* 4 crochets de lecture fixes (3 bases par codon) sous le ruban */}
            {[0, 1, 2, 3].map((tIdx) => {
              const bx0 = X0 + tIdx * 3 * STEP;
              const bx1 = bx0 + 2 * STEP + BOX_W;
              const mid = (bx0 + bx1) / 2;
              const change = showMut && tIdx >= 1;
              return (
                <g key={tIdx}>
                  <polyline
                    points={`${bx0},290 ${bx0},306 ${bx1},306 ${bx1},290`}
                    className={change ? "mq-nofill mq-s-sig" : "mq-nofill mq-s-ink"}
                    strokeWidth={3}
                  />
                  <text x={mid} y={340} textAnchor="middle" fontSize={SVG_FS} className="mq-f-dim mq-mono">
                    {`n°${tIdx + 5}`}
                  </text>
                  {/* Acide aminé traduit */}
                  <rect
                    x={mid - 46}
                    y={362}
                    width={92}
                    height={46}
                    className={change ? "mq-f-sig-soft mq-s-sig" : "mq-f-panel mq-s-line"}
                    strokeWidth={change ? 2.5 : 1.5}
                  />
                  <text
                    x={mid}
                    y={394}
                    textAnchor="middle"
                    fontSize={SVG_FS}
                    fontWeight={700}
                    className={change ? "mq-f-sig mq-mono" : "mq-f-ink mq-mono"}
                  >
                    {aaAff[tIdx]}
                  </text>
                </g>
              );
            })}

            {/* Résumé en bas */}
            <text x={380} y={474} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {showMut
                ? ty("Tous les codons à droite de la délétion sont modifiés")
                : ty("Les crochets de 3 bases restent fixes pendant le glissement")}
            </text>
          </svg>
        </div>

        <div className="space-y-3.5 px-4 py-4 bp-medium:px-5 bp-large:col-span-5 flex flex-col justify-between">
          <div>
            <p className="font-mono text-caption text-signal">
              {ty(`Palier ${palierIdx + 1} / ${PALIERS.length} · ${palier.court}`)}
            </p>
            <h3 className="mt-1 font-display text-body-md font-semibold text-primary">{ty(palier.titre)}</h3>
            <p className="mt-1 text-body-sm text-secondary">{ty(palier.texte)}</p>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={togglePlay} className="mq-btn mq-btn-primary">
                {playing ? ty("⏸ Pause") : ty(u >= 2.98 ? "▶ Rejouer" : "▶ Dérouler")}
              </button>
              <button
                type="button"
                onClick={() => lancerVers(Math.min(3, Math.floor(u + 0.05) + 1))}
                disabled={u >= 2.98}
                className="mq-btn"
              >
                {ty("Palier suiv. →")}
              </button>
              <button type="button" onClick={rejouer} className="mq-btn">
                {ty("↺ Rejouer")}
              </button>
            </div>

            <div className="grid gap-1">
              <div className="flex items-center justify-between text-caption text-secondary">
                <label htmlFor="mq-eg-slider">{ty("Curseur élève")}</label>
                <output htmlFor="mq-eg-slider" className="font-mono">
                  {`Palier ${palierIdx + 1} / ${PALIERS.length}`}
                </output>
              </div>
              <input
                id="mq-eg-slider"
                type="range"
                min={0}
                max={3}
                step={0.02}
                value={u}
                onChange={(e) => fixer(Number(e.target.value))}
                className="mq-slider"
              />
            </div>

            <p className="border-l-2 border-subtle pl-3 text-caption text-secondary">
              {ty(
                "Séquence réelle du gène HBB et traduction calculées directement par expression-genetique-code.js (CDS, toARN, traduire)."
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
