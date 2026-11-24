"use client";

import { useState } from "react";
import { clamp, easeCalm, lerp, SVG_FS, ty, useLectureAnimee } from "./outils";
import { CAS } from "../transmission-outils";

/**
 * Maquette 9 — Transmission des caractères héréditaires : l'échiquier animé F1 × F1.
 * L'élève choisit une case (ou déroule les 4) : le gamète de la ligne et le gamète
 * de la colonne glissent ensemble depuis les bords vers la case pour former le génotype,
 * son phénotype et sa probabilité (½ × ½ = ¼).
 * Données et génotypes/phénotypes calculés directement par `CAS.f2` de `transmission-outils.js`.
 * Étapes cibles : `echiquier` et `derniere-case` (beat 2) dans `transmission-moteur.js`.
 */

const GRILLE = CAS.f2; // 2×2 Mendel : L//ℓ × L//ℓ

interface CaseInfo {
  idx: number;
  r: number;
  c: number;
  geno: string;
  phe: string;
  pLab: string;
  rowGam: string;
  colGam: string;
}

const CASES: CaseInfo[] = GRILLE.cells.map(
  (cell: { ri: number; ci: number; geno: string; phe: string; wlab: string }, idx: number) => ({
    idx,
    r: cell.ri,
    c: cell.ci,
    geno: cell.geno,
    phe: cell.phe,
    pLab: cell.wlab,
    rowGam: `${GRILLE.rows[cell.ri].pl} ${GRILLE.rows[cell.ri].h[0]}/`,
    colGam: `${GRILLE.cols[cell.ci].pl} ${GRILLE.cols[cell.ci].h[0]}/`,
  })
);

export function MaquetteTransmission() {
  const [cibleIdx, setCibleIdx] = useState<number>(0);

  // u ∈ [0, 4] : chaque unité [i, i+1] fait glisser les gamètes dans la case i (ou mode case choisie)
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
    max: 4,
    vitesse: 0.9,
    palierSuivant: (prev) => Math.min(4, Math.floor(prev) + 1),
  });

  const rejouer = () => {
    if (reducedMotion) fixer(0);
    else lancerVers(4, 0);
  };

  const remplirCase = (idx: number) => {
    setCibleIdx(idx);
    if (reducedMotion) {
      fixer(idx + 1);
    } else {
      lancerVers(idx + 1, idx);
    }
  };

  // Géométrie de la grille 2×2 à gauche
  const GX0 = 152;
  const GY0 = 150;
  const CW = 166;
  const CH = 122;

  const activeIdx = Math.min(3, Math.floor(clamp(u, 0, 3.999)));
  const activeCase = CASES[activeIdx];
  const fracInCell = clamp(u - activeIdx, 0, 1);
  const pGlide = easeCalm(clamp(fracInCell / 0.72, 0, 1));
  const nbRemplies = Math.floor(u + 0.05);

  const lisses = CASES.slice(0, nbRemplies).filter((c) => c.phe === "[L]").length;
  const ridees = CASES.slice(0, nbRemplies).filter((c) => c.phe === "[ℓ]").length;

  return (
    <article className="mq-card" aria-labelledby="mq-tr-titre">
      <div className="border-b border-subtle px-4 py-3 bp-medium:px-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="mq-tr-titre" className="font-display text-body-lg font-semibold text-primary">
          {ty("Transmission : les gamètes glissent depuis les bords vers chaque case")}
        </h2>
        <span className="font-mono text-caption text-secondary">{ty("SVT · échiquier F1 × F1")}</span>
      </div>

      <div className="grid grid-cols-1 bp-large:grid-cols-12">
        <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-4 bp-large:col-span-7 bp-large:border-b-0 bp-large:border-r bp-large:border-subtle">
          <svg
            viewBox="0 0 760 500"
            className="mq-svg"
            role="img"
            aria-label={ty(
              "Échiquier de croisement F1 par F1 où les gamètes des bords glissent ensemble dans la case choisie"
            )}
          >
            {/* En-tête */}
            <text x={20} y={36} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {ty("F1 × F1 : L//ℓ × L//ℓ")}
            </text>
            <text x={740} y={36} textAnchor="end" fontSize={SVG_FS} className="mq-f-sig mq-mono">
              {`${nbRemplies} / 4 cases`}
            </text>

            {/* En-têtes de colonnes (Pollen) */}
            {GRILLE.cols.map((col: { h: string[]; pl: string }, c: number) => (
              <g key={c}>
                <rect x={GX0 + c * CW} y={84} width={CW} height={54} className="mq-f-panel mq-s-line" strokeWidth={1.8} />
                <text
                  x={GX0 + c * CW + CW / 2}
                  y={120}
                  textAnchor="middle"
                  fontSize={SVG_FS}
                  fontWeight={700}
                  className={c === activeCase.c && u > 0.02 ? "mq-f-sig mq-mono" : "mq-f-ink mq-mono"}
                >
                  {`${col.pl} ${col.h[0]}/`}
                </text>
              </g>
            ))}

            {/* En-têtes de lignes (Ovules) */}
            {GRILLE.rows.map((row: { h: string[]; pl: string }, r: number) => (
              <g key={r}>
                <rect x={28} y={GY0 + r * CH} width={114} height={CH} className="mq-f-panel mq-s-line" strokeWidth={1.8} />
                <text
                  x={85}
                  y={GY0 + r * CH + CH / 2 + 8}
                  textAnchor="middle"
                  fontSize={SVG_FS}
                  fontWeight={700}
                  className={r === activeCase.r && u > 0.02 ? "mq-f-sig mq-mono" : "mq-f-ink mq-mono"}
                >
                  {`${row.pl} ${row.h[0]}/`}
                </text>
              </g>
            ))}

            {/* Les 4 cases de l'échiquier */}
            {CASES.map((cell) => {
              const x = GX0 + cell.c * CW;
              const y = GY0 + cell.r * CH;
              const remplie = u >= cell.idx + 0.72;
              const enCours = u > cell.idx + 0.02 && u < cell.idx + 0.99;
              const estRidee = cell.phe === "[ℓ]";
              return (
                <g key={cell.idx}>
                  <rect
                    x={x}
                    y={y}
                    width={CW}
                    height={CH}
                    className={
                      remplie && estRidee
                        ? "mq-f-sig-soft mq-s-sig"
                        : enCours
                          ? "mq-f-ink-soft mq-s-sig"
                          : "mq-f-stage mq-s-line"
                    }
                    strokeWidth={enCours || (remplie && estRidee) ? 2.8 : 1.8}
                  />
                  {remplie && (
                    <g>
                      <text
                        x={x + CW / 2}
                        y={y + 48}
                        textAnchor="middle"
                        fontSize={SVG_FS}
                        fontWeight={700}
                        className={estRidee ? "mq-f-sig mq-mono" : "mq-f-ink mq-mono"}
                      >
                        {cell.geno}
                      </text>
                      <text
                        x={x + CW / 2}
                        y={y + 88}
                        textAnchor="middle"
                        fontSize={SVG_FS}
                        className="mq-f-sec mq-mono"
                      >
                        {`${cell.pLab} ${cell.phe}`}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Gamètes en vol glissant depuis l'en-tête de colonne et de ligne vers la case active */}
            {u > 0.02 && fracInCell > 0.02 && fracInCell < 0.78 && (
              <g>
                {/* Depuis la colonne (haut -> centre de la case) */}
                <text
                  x={GX0 + activeCase.c * CW + CW / 2}
                  y={lerp(120, GY0 + activeCase.r * CH + 48, pGlide)}
                  textAnchor="middle"
                  fontSize={SVG_FS}
                  fontWeight={700}
                  className="mq-f-sig mq-mono"
                >
                  {GRILLE.cols[activeCase.c].h[0] + "/"}
                </text>
                {/* Depuis la ligne (gauche -> centre de la case) */}
                <text
                  x={lerp(85, GX0 + activeCase.c * CW + CW / 2, pGlide)}
                  y={GY0 + activeCase.r * CH + CH / 2 + 8}
                  textAnchor="middle"
                  fontSize={SVG_FS}
                  fontWeight={700}
                  className="mq-f-sig mq-mono"
                >
                  {GRILLE.rows[activeCase.r].h[0] + "/"}
                </text>
              </g>
            )}

            {/* ==================== DROITE : BILAN PHÉNOTYPIQUE EN DIRECT ==================== */}
            <text x={516} y={136} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {ty("Bilan F2")}
            </text>
            <line x1={516} y1={154} x2={740} y2={154} className="mq-s-subtle" strokeWidth={1.5} />

            <text x={516} y={204} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink mq-mono">
              {`[L] lisse : ${lisses}/4`}
            </text>
            <rect x={516} y={218} width={216} height={20} className="mq-f-panel mq-s-line" strokeWidth={1.5} />
            <rect x={516} y={218} width={(lisses / 4) * 216} height={20} className="mq-f-ink" />

            <text x={516} y={300} fontSize={SVG_FS} fontWeight={700} className="mq-f-sig mq-mono">
              {`[ℓ] ridée : ${ridees}/4`}
            </text>
            <rect x={516} y={314} width={216} height={20} className="mq-f-panel mq-s-line" strokeWidth={1.5} />
            <rect x={516} y={314} width={(ridees / 4) * 216} height={20} className="mq-f-sig" />

            <text x={380} y={468} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {nbRemplies === 4
                ? ty("Résultat F2 : ¾ [L] et ¼ [ℓ] (produit ½ × ½ = ¼ par case)")
                : ty("Choisis une case : les deux gamètes se réunissent au centre")}
            </text>
          </svg>
        </div>

        <div className="space-y-3.5 px-4 py-4 bp-medium:px-5 bp-large:col-span-5 flex flex-col justify-between">
          <div>
            <p className="font-mono text-caption text-signal">
              {ty(nbRemplies === 0 ? "Échiquier vide" : `Case ${activeIdx + 1} / 4 · ${activeCase.rowGam} + ${activeCase.colGam}`)}
            </p>
            <h3 className="mt-1 font-display text-body-md font-semibold text-primary">
              {ty("Un génotype naît de la rencontre d’un gamète de ligne et d’un gamète de colonne")}
            </h3>
            <p className="mt-1 text-body-sm text-secondary">
              {ty(
                "Au lieu d’afficher un tableau déjà rempli, le glissement simultané des deux bords montre pourquoi la proportion de chaque case vaut le produit ½ × ½ = ¼."
              )}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={togglePlay} className="mq-btn mq-btn-primary">
                {playing ? ty("⏸ Pause") : ty(u >= 3.98 ? "▶ Rejouer" : "▶ Remplir")}
              </button>
              <button type="button" onClick={rejouer} className="mq-btn">
                {ty("↺ Vider")}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {CASES.map((c) => (
                <button
                  key={c.idx}
                  type="button"
                  aria-pressed={cibleIdx === c.idx && u >= c.idx + 0.7}
                  onClick={() => remplirCase(c.idx)}
                  className="mq-seg"
                >
                  {ty(`Case ${c.idx + 1} : ${c.geno}`)}
                </button>
              ))}
            </div>

            <div className="grid gap-1">
              <div className="flex items-center justify-between text-caption text-secondary">
                <label htmlFor="mq-tr-slider">{ty("Curseur élève")}</label>
                <output htmlFor="mq-tr-slider" className="font-mono">
                  {`${nbRemplies} / 4 cases`}
                </output>
              </div>
              <input
                id="mq-tr-slider"
                type="range"
                min={0}
                max={4}
                step={0.02}
                value={u}
                onChange={(e) => fixer(Number(e.target.value))}
                className="mq-slider"
              />
            </div>

            <p className="border-l-2 border-subtle pl-3 text-caption text-secondary">
              {ty(
                "Génotypes, phénotypes et fractions issus directement de CAS.f2 dans transmission-outils.js."
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
