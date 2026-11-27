"use client";

import { calculerJauge, clamp, creerRepere, frNum, lerp, SVG_FS, ty, useLectureAnimee } from "./outils";
import { fG, R_COURSE, ratio } from "../exponentielle-outils";

/**
 * Maquette 5 — Exponentielle : la croissance comparée eˣ / x par dézoom continu.
 * La fenêtre [0 ; xMax] s'élargit sans coupure pendant que y = eˣ écrase y = x
 * et que la jauge du quotient eˣ / x s'envole.
 * Valeurs calculées par `ratio` et `fG` de `exponentielle-outils.js`.
 * Étape cible : `course` (beat 9) dans `exponentielle-moteur.js`.
 */

const PRESETS = R_COURSE.slice(0, 4); // [1, 2, 5, 10] issus de exponentielle-outils.js

export function MaquetteExponentielle() {
  const {
    valeur: xCourant,
    playing,
    reduced: reducedMotion,
    togglePlay,
    lancerVers,
    fixer,
  } = useLectureAnimee({
    initial: 1,
    min: 1,
    max: 10,
    vitesse: 1.35,
    palierSuivant: (prev) => PRESETS.find((v) => v > prev + 0.15) ?? PRESETS[0],
  });

  const rejouer = () => {
    if (reducedMotion) fixer(1);
    else lancerVers(10, 1);
  };

  // Fenêtre qui dézoome continûment sans coupe : xMax suit xCourant de 3 à 10,5 ; yMax suit e^(xCourant) × 1,18
  const xMax = Math.max(3, xCourant * 1.08);
  const yExp = Math.exp(xCourant);
  const yMax = Math.max(12, yExp * 1.18);
  const quot = ratio(xCourant);

  const rep = creerRepere({
    x0: 88,
    y0: 422,
    w: 390,
    h: 332,
    xMin: 0,
    xMax,
    yMin: 0,
    yMax,
  });

  const pathExp = rep.tracerCourbe((x) => Math.exp(x), 0, xCourant, 72);
  const pathLin = rep.tracerCourbe((x) => x, 0, xCourant, 32);

  // Jauge logarithmique visuelle du rapport e^x / x (pour rester lisible de 2,72 à 2 203)
  const jaugeRatio = calculerJauge(Math.log10(Math.max(1, quot)), Math.log10(ratio(10)), 210);

  return (
    <article className="mq-card" aria-labelledby="mq-exp-titre">
      <div className="border-b border-subtle px-4 py-3 bp-medium:px-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="mq-exp-titre" className="font-display text-body-lg font-semibold text-primary">
          {ty("Exponentielle : dézoom continu pendant que eˣ écrase x")}
        </h2>
        <span className="font-mono text-caption text-secondary">{ty("Maths · croissance comparée")}</span>
      </div>

      <div className="grid grid-cols-1 bp-large:grid-cols-12">
        <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-4 bp-large:col-span-7 bp-large:border-b-0 bp-large:border-r bp-large:border-subtle">
          <svg
            viewBox="0 0 760 500"
            className="mq-svg"
            role="img"
            aria-label={ty(
              "Fenêtre graphique qui dézoome en continu pour montrer la croissance comparée de e puissance x face à x"
            )}
          >
            {/* En-tête */}
            <text x={20} y={36} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink mq-mono">
              {`x = ${frNum(xCourant, 1)}`}
            </text>
            <text x={740} y={36} textAnchor="end" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig mq-mono">
              {`eˣ / x = ${fG(quot)}`}
            </text>

            {/* Axes */}
            <line x1={rep.x0} y1={rep.y0} x2={rep.x0 + rep.w} y2={rep.y0} className="mq-s-line" strokeWidth={2} />
            <line x1={rep.x0} y1={rep.y0 - rep.h} x2={rep.x0} y2={rep.y0} className="mq-s-line" strokeWidth={2} />

            {/* Graduations adaptatives propres (0, milieu, xMax / yMax) */}
            <text x={rep.x0} y={rep.y0 + 30} textAnchor="middle" fontSize={SVG_FS} className="mq-f-dim mq-mono">
              0
            </text>
            <text x={rep.X(xCourant)} y={rep.y0 + 30} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink mq-mono">
              {frNum(xCourant, 1)}
            </text>
            <text x={rep.x0 - 10} y={rep.y0 - rep.h + 10} textAnchor="end" fontSize={SVG_FS} className="mq-f-dim mq-mono">
              {fG(yMax)}
            </text>

            {/* Courbe y = x et courbe y = eˣ */}
            <path d={pathLin} className="mq-nofill mq-s-ink" strokeWidth={3.5} />
            <path d={pathExp} className="mq-nofill mq-s-sig" strokeWidth={4.2} />

            {/* Segment vertical d'écart à l'abscisse xCourant */}
            <line
              x1={rep.X(xCourant)}
              y1={rep.Y(xCourant)}
              x2={rep.X(xCourant)}
              y2={rep.Y(yExp)}
              className="mq-s-dim"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <circle cx={rep.X(xCourant)} cy={rep.Y(yExp)} r={7} className="mq-f-sig" />
            <circle cx={rep.X(xCourant)} cy={rep.Y(xCourant)} r={6} className="mq-f-ink" />

            {/* Légendes des deux courbes */}
            <text x={rep.x0 + 18} y={120} fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
              y = eˣ
            </text>
            <text x={rep.x0 + 18} y={154} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              y = x
            </text>

            {/* Panneau droit : valeurs en direct + rapport */}
            <text x={516} y={118} fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
              {`eˣ = ${fG(yExp)}`}
            </text>
            <text x={516} y={156} fontSize={SVG_FS} className="mq-f-ink">
              {`x = ${frNum(xCourant, 1)}`}
            </text>

            <line x1={516} y1={182} x2={740} y2={182} className="mq-s-subtle" strokeWidth={1.5} />

            <text x={516} y={220} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {ty("Quotient eˣ / x")}
            </text>
            <rect x={516} y={238} width={210} height={22} className="mq-f-panel mq-s-line" strokeWidth={1.5} />
            <rect x={516} y={238} width={jaugeRatio.largeur} height={22} className="mq-f-sig" />

            {/* Repères R_COURSE de la leçon */}
            {PRESETS.map((vx, i) => {
              const actif = xCourant >= vx - 0.05;
              const yRow = 310 + i * 36;
              return (
                <text
                  key={vx}
                  x={516}
                  y={yRow}
                  fontSize={SVG_FS}
                  className={actif ? "mq-f-ink mq-mono" : "mq-f-dim mq-mono"}
                >
                  {`x=${vx} : ${fG(ratio(vx))}`}
                </text>
              );
            })}

            {/* Barre de note de bas de scène sur l'écrasement */}
            <text x={20} y={482} fontSize={SVG_FS} className="mq-f-sec">
              {xCourant < 3.5
                ? ty("Au départ, x reste visible sous eˣ.")
                : ty(`À x = ${frNum(xCourant, 1)}, y = x est écrasée sur l’axe.`)}
            </text>
          </svg>
        </div>

        <div className="space-y-3.5 px-4 py-4 bp-medium:px-5 bp-large:col-span-5 flex flex-col justify-between">
          <div>
            <p className="font-mono text-caption text-signal">
              {ty(`Course eˣ / x · fenêtre [0 ; ${frNum(xMax, 1)}]`)}
            </p>
            <h3 className="mt-1 font-display text-body-md font-semibold text-primary">
              {ty("Pourquoi la forme indéterminée ∞ / ∞ bascule vers +∞")}
            </h3>
            <p className="mt-1 text-body-sm text-secondary">
              {ty(
                "En élargissant continûment la fenêtre sans couper, on voit la droite y = x s’aplatir contre l’axe horizontal tandis que le quotient eˣ / x franchit 2 200 dès x = 10."
              )}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={togglePlay} className="mq-btn mq-btn-primary">
                {playing ? ty("⏸ Pause") : ty(xCourant >= 9.95 ? "▶ Rejouer" : "▶ Élargir")}
              </button>
              <button type="button" onClick={rejouer} className="mq-btn">
                {ty("↺ Rejouer")}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {PRESETS.map((vx) => (
                <button
                  key={vx}
                  type="button"
                  aria-pressed={Math.abs(xCourant - vx) < 0.25}
                  onClick={() => fixer(vx)}
                  className="mq-seg"
                >
                  {`x = ${vx}`}
                </button>
              ))}
            </div>

            <div className="grid gap-1">
              <div className="flex items-center justify-between text-caption text-secondary">
                <label htmlFor="mq-exp-slider">{ty("Curseur x")}</label>
                <output htmlFor="mq-exp-slider" className="font-mono">
                  {`x = ${frNum(xCourant, 1)} · eˣ/x = ${fG(quot)}`}
                </output>
              </div>
              <input
                id="mq-exp-slider"
                type="range"
                min={1}
                max={10}
                step={0.1}
                value={xCourant}
                onChange={(e) => fixer(Number(e.target.value))}
                className="mq-slider"
              />
            </div>

            <p className="border-l-2 border-subtle pl-3 text-caption text-secondary">
              {ty(
                "Les valeurs de eˣ / x sont calculées par ratio() et fG() de exponentielle-outils.js (repères x = 1, 2, 5, 10)."
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
