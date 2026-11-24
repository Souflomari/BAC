"use client";

import { useMemo, useState } from "react";
import { calculerJauge, clamp, creerRepere, frNum, lerp, SVG_FS, ty, useLectureAnimee } from "./outils";

/**
 * Maquette 3 — L'escalier d'une suite récurrente u_{n+1} = f(u_n) :
 *   1. Suite convergente : f(x) = 0,5 x + 1,5, point fixe ℓ = 3, pente f'(3) = 0,5 < 1.
 *      À chaque marche, l'écart |u_{n+1} − ℓ| = 0,5 · |u_n − ℓ| est divisé par 2 : les marches se resserrent vers ℓ.
 *   2. Suite divergente : g(x) = 1,75 x − 2,25, même point fixe ℓ = 3, pente g'(3) = 1,75 > 1.
 *      À chaque marche, l'écart |u_{n+1} − ℓ| = 1,75 · |u_n − ℓ| s'amplifie : l'escalier s'éloigne de ℓ.
 *
 * Repère strictement orthonormé sur [0 ; 6,2] × [0 ; 6,2] pour que le rabattement sur y = x soit géométriquement exact.
 * Paramètre continu k ∈ [0, K_MAX] :
 *   - chaque unité entière correspond à 1 itération complète u_n -> u_{n+1} ;
 *   - la première moitié [n, n + 0,5] trace la verticale vers la courbe y = f(x) (calcul de l'image f(u_n)) ;
 *   - la seconde moitié [n + 0,5, n + 1] rabat horizontalement vers la droite y = x (report en abscisse u_{n+1}).
 */

type ModeId = "converge" | "diverge";

interface ModeConfig {
  id: ModeId;
  titre: string;
  formule: string;
  pente: string;
  fn: (x: number) => number;
  u0Gauche: number;
  u0Droite: number;
  maxMarches: number;
  explication: string;
}

const MODES: Record<ModeId, ModeConfig> = {
  converge: {
    id: "converge",
    titre: "1. Marches qui se resserrent (convergente)",
    formule: "f(x) = 0,5 x + 1,5 · point fixe ℓ = 3",
    pente: "f’(3) = 0,5 < 1",
    fn: (x) => 0.5 * x + 1.5,
    u0Gauche: 0.4,
    u0Droite: 5.6,
    maxMarches: 6,
    explication:
      "La courbe y = f(x) est moins pentue que la droite y = x autour de ℓ = 3 : chaque rabattement sur y = x divise par 2 la distance au point fixe. Les marches s’écrasent sur (3 ; 3).",
  },
  diverge: {
    id: "diverge",
    titre: "2. Marches qui s’éloignent (divergente)",
    formule: "g(x) = 1,75 x − 2,25 · même point fixe ℓ = 3",
    pente: "g’(3) = 1,75 > 1",
    fn: (x) => 1.75 * x - 2.25,
    u0Gauche: 2.65,
    u0Droite: 3.35,
    maxMarches: 4,
    explication:
      "La courbe y = g(x) coupe toujours y = x en ℓ = 3, mais avec une pente supérieure à 1 : dès que u0 s’écarte un peu de 3, chaque marche multiplie l’écart par 1,75 et repousse la suite loin de ℓ.",
  },
};

const FIXE = 3.0;

export function MaquetteSuites() {
  const [modeId, setModeId] = useState<ModeId>("converge");
  const [cote, setCote] = useState<"gauche" | "droite">("gauche");

  const cfg = MODES[modeId];
  const u0 = cote === "gauche" ? cfg.u0Gauche : cfg.u0Droite;
  const maxK = cfg.maxMarches;

  const {
    valeur: k,
    playing,
    reduced: reducedMotion,
    togglePlay,
    lancerVers,
    fixer,
  } = useLectureAnimee({
    initial: 0,
    min: 0,
    max: maxK,
    vitesse: 0.95,
    palierSuivant: (prev) => Math.min(maxK, Math.floor(prev) + 1),
  });

  const termes = useMemo(() => {
    const arr = [u0];
    for (let i = 0; i < maxK + 1; i++) {
      arr.push(cfg.fn(arr[arr.length - 1]));
    }
    return arr;
  }, [cfg, u0, maxK]);

  const changerMode = (nextMode: ModeId, nextCote?: "gauche" | "droite") => {
    setModeId(nextMode);
    if (nextCote) setCote(nextCote);
    else if (nextMode === "diverge" && cote === "gauche") setCote("droite");
    fixer(0);
  };

  const avancerPas = (delta: number) => {
    const dest = clamp(Math.round((k + delta) * 2) / 2, 0, maxK);
    if (reducedMotion || dest <= k) {
      fixer(dest);
      return;
    }
    lancerVers(dest);
  };

  const rejouer = () => {
    if (reducedMotion) fixer(0);
    else lancerVers(maxK, 0);
  };

  // Repère CARRÉ strictement orthonormé dans le SVG 760 × 500 : carré 358 × 358 px pour [0 ; 6,2]²
  const X0 = 54;
  const Y0 = 434;
  const SIZE = 358;
  const MAX_VAL = 6.2;
  const rep = creerRepere({ x0: X0, y0: Y0, w: SIZE, h: SIZE, xMin: 0, xMax: MAX_VAL, yMin: 0, yMax: MAX_VAL });
  const X = rep.X;
  const Y = rep.Y;

  // Sommets de l'escalier : V[0] = (u0, 0), V[1] = (u0, u1), V[2] = (u1, u1), V[3] = (u1, u2), ...
  const sommets: [number, number][] = [[termes[0], 0]];
  for (let i = 0; i < maxK; i++) {
    sommets.push([termes[i], termes[i + 1]]);
    sommets.push([termes[i + 1], termes[i + 1]]);
  }

  const segTotal = clamp(2 * k, 0, 2 * maxK);
  const fullSegs = Math.floor(segTotal);
  const rem = segTotal - fullSegs;

  let stairPath = "";
  let headPt: [number, number] = sommets[0];
  if (segTotal > 0) {
    stairPath = `M ${X(sommets[0][0]).toFixed(1)} ${Y(sommets[0][1]).toFixed(1)}`;
    for (let s = 1; s <= fullSegs && s < sommets.length; s++) {
      stairPath += ` L ${X(sommets[s][0]).toFixed(1)} ${Y(sommets[s][1]).toFixed(1)}`;
      headPt = sommets[s];
    }
    if (rem > 0 && fullSegs < sommets.length - 1) {
      const a = sommets[fullSegs];
      const b = sommets[fullSegs + 1];
      const hx = lerp(a[0], b[0], rem);
      const hy = lerp(a[1], b[1], rem);
      stairPath += ` L ${X(hx).toFixed(1)} ${Y(hy).toFixed(1)}`;
      headPt = [hx, hy];
    }
  }

  const curvePath = rep.tracerCourbe(cfg.fn, 0, MAX_VAL, 80);

  const indiceActuel = Math.min(maxK, Math.floor(k + 0.001));
  const uCourant = termes[indiceActuel];
  const enVerticale = segTotal > 0 && fullSegs % 2 === 0 && rem > 0;
  const enHorizontale = segTotal > 0 && fullSegs % 2 === 1;

  return (
    <article className="mq-card" aria-labelledby="mq-suites-titre">
      <div className="border-b border-subtle px-4 py-3 bp-medium:px-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="mq-suites-titre" className="font-display text-body-lg font-semibold text-primary">
          {ty("Suites récurrentes : escalier qui se resserre vers ℓ, puis qui s’en éloigne")}
        </h2>
        <span className="font-mono text-caption text-secondary">
          {ty("Maths · 30 min")}
        </span>
      </div>

      <div className="grid grid-cols-1 bp-large:grid-cols-12">
        <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-4 bp-large:col-span-7 bp-large:border-b-0 bp-large:border-r bp-large:border-subtle">
          <svg
            viewBox="0 0 760 500"
            className="mq-svg"
            role="img"
            aria-label={ty(
              "Construction en escalier d’une suite récurrente u(n+1) = f(u(n)) entre la courbe et la droite y = x, en régime convergent puis divergent"
            )}
          >
            <defs>
              <clipPath id="mq-suites-clip">
                <rect x={X0} y={Y(MAX_VAL)} width={SIZE} height={SIZE} />
              </clipPath>
            </defs>

            {/* En-tête */}
            <text x={20} y={34} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {ty(cfg.formule)}
            </text>
            <text x={740} y={34} textAnchor="end" fontSize={SVG_FS} className="mq-f-sig mq-mono">
              {ty(cfg.pente)}
            </text>

            {/* ==================== GAUCHE : REPÈRE ORTHONORMÉ CARRÉ ==================== */}
            <line x1={X0} y1={Y0} x2={X0 + SIZE} y2={Y0} className="mq-s-line" strokeWidth={2} />
            <line x1={X0} y1={Y(MAX_VAL)} x2={X0} y2={Y0} className="mq-s-line" strokeWidth={2} />

            {/* Graduations entières 1..6 */}
            {[1, 2, 3, 4, 5, 6].map((v) => (
              <g key={v}>
                <line x1={X(v)} y1={Y0} x2={X(v)} y2={Y0 + 6} className="mq-s-dim" strokeWidth={1.6} />
                <text
                  x={X(v)}
                  y={Y0 + 28}
                  textAnchor="middle"
                  fontSize={SVG_FS}
                  fontWeight={v === 3 ? 700 : 400}
                  className={v === 3 ? "mq-f-ink mq-mono" : "mq-f-dim mq-mono"}
                >
                  {v === 3 ? "ℓ=3" : String(v)}
                </text>
                <line x1={X0 - 6} y1={Y(v)} x2={X0} y2={Y(v)} className="mq-s-dim" strokeWidth={1.6} />
                <text x={X0 - 10} y={Y(v) + 8} textAnchor="end" fontSize={SVG_FS} className="mq-f-dim mq-mono">
                  {String(v)}
                </text>
              </g>
            ))}

            {/* Bissectrice y = x et courbe y = f(x) */}
            <g clipPath="url(#mq-suites-clip)">
              <line
                x1={X(0)}
                y1={Y(0)}
                x2={X(MAX_VAL)}
                y2={Y(MAX_VAL)}
                className="mq-s-dim"
                strokeWidth={2.2}
                strokeDasharray="8 6"
              />
              <path d={curvePath} className="mq-nofill mq-s-ink" strokeWidth={3.5} />
              {stairPath && (
                <path
                  d={stairPath}
                  className="mq-nofill mq-s-sig"
                  strokeWidth={4.2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}
            </g>

            {/* Étiquettes de la droite y = x et de la courbe */}
            <text
              x={modeId === "converge" ? X(5.45) : X(6.05)}
              y={modeId === "converge" ? Y(5.68) : Y(5.45)}
              textAnchor="end"
              fontSize={SVG_FS}
              className="mq-f-sec"
            >
              y = x
            </text>
            <text
              x={modeId === "converge" ? X(5.9) : X(4.35)}
              y={modeId === "converge" ? Y(cfg.fn(5.9)) - 12 : Y(5.85)}
              textAnchor="end"
              fontSize={SVG_FS}
              fontWeight={700}
              className="mq-f-ink"
            >
              {modeId === "converge" ? "y = f(x)" : "y = g(x)"}
            </text>

            {/* Point fixe (ℓ ; ℓ) */}
            <circle cx={X(FIXE)} cy={Y(FIXE)} r={7} className="mq-f-stage mq-s-ink" strokeWidth={3} />

            {/* Projections verticales des termes déjà construits sur l'axe des abscisses */}
            {termes.slice(0, indiceActuel + 1).map((val, idx) => {
              if (val < 0 || val > MAX_VAL) return null;
              return (
                <g key={idx}>
                  {idx > 0 && (
                    <line
                      x1={X(val)}
                      y1={Y(val)}
                      x2={X(val)}
                      y2={Y0}
                      className="mq-s-subtle"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                    />
                  )}
                  <circle
                    cx={X(val)}
                    cy={Y0}
                    r={idx === indiceActuel ? 6.5 : 4.5}
                    className={idx === indiceActuel ? "mq-f-sig" : "mq-f-ink"}
                  />
                </g>
              );
            })}

            {/* Tête active de l'escalier */}
            {headPt[0] >= 0 && headPt[0] <= MAX_VAL && headPt[1] >= 0 && headPt[1] <= MAX_VAL && (
              <circle cx={X(headPt[0])} cy={Y(headPt[1])} r={7} className="mq-f-sig" />
            )}

            {/* ==================== DROITE : LECTURE DES TERMES & ÉCART |u_n − ℓ| ==================== */}
            <text x={436} y={88} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {ty("Geste en cours")}
            </text>
            <text x={436} y={118} fontSize={SVG_FS} className="mq-f-sig">
              {ty(
                segTotal === 0
                  ? `Départ : u0 = ${frNum(u0, 2)}`
                  : enVerticale
                    ? "1. Verticale → courbe"
                    : enHorizontale
                      ? "2. Horizontale → y = x"
                      : `u${indiceActuel} = ${frNum(uCourant, 2)} posé`
              )}
            </text>

            <line x1={436} y1={136} x2={740} y2={136} className="mq-s-subtle" strokeWidth={1.5} />

            <text x={436} y={168} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {ty("Écart |un − 3|")}
            </text>

            {/* Barres comparatives d'écart pour n = 0 .. maxK */}
            {termes.slice(0, maxK + 1).map((val, idx) => {
              const dist = Math.abs(val - FIXE);
              const bar = calculerJauge(dist, 2.8, 165);
              const yRow = 198 + idx * 35;
              const actif = idx <= indiceActuel;
              return (
                <g key={idx} opacity={actif ? 1 : 0.28}>
                  <text x={436} y={yRow + 18} fontSize={SVG_FS} className="mq-f-ink mq-mono">
                    {`u${idx}`}
                  </text>
                  <rect
                    x={478}
                    y={yRow + 2}
                    width={bar.largeur}
                    height={18}
                    className={idx === indiceActuel ? "mq-f-sig" : "mq-f-ink"}
                  />
                  <text x={740} y={yRow + 18} textAnchor="end" fontSize={SVG_FS} className="mq-f-sec mq-mono">
                    {frNum(dist, 2)}
                  </text>
                </g>
              );
            })}

            <text x={436} y={468} fontSize={SVG_FS} className="mq-f-sec">
              {ty(modeId === "converge" ? "Écart ÷ 2 par marche" : "Écart × 1,75 par marche")}
            </text>
          </svg>
        </div>

        <div className="space-y-3.5 px-4 py-4 bp-medium:px-5 bp-large:col-span-5 flex flex-col justify-between">
          <p className="text-body-sm text-secondary">{ty(cfg.explication)}</p>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={togglePlay} className="mq-btn mq-btn-primary">
                {playing ? ty("⏸ Pause") : ty(k >= maxK - 0.02 ? "▶ Rejouer" : "▶ Dérouler")}
              </button>
              <button
                type="button"
                onClick={() => avancerPas(0.5)}
                disabled={k >= maxK - 0.01}
                className="mq-btn"
              >
                {ty("+ ½ marche")}
              </button>
              <button
                type="button"
                onClick={() => avancerPas(1)}
                disabled={k >= maxK - 0.01}
                className="mq-btn"
              >
                {ty("+ 1 marche")}
              </button>
              <button type="button" onClick={rejouer} className="mq-btn">
                {ty("↺ Rejouer")}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                aria-pressed={modeId === "converge"}
                onClick={() => changerMode("converge")}
                className="mq-seg"
              >
                {ty("1. Convergente")}
              </button>
              <button
                type="button"
                aria-pressed={modeId === "diverge"}
                onClick={() => changerMode("diverge")}
                className="mq-seg"
              >
                {ty("2. Divergente")}
              </button>
              <button
                type="button"
                aria-pressed={cote === "gauche"}
                onClick={() => {
                  setCote("gauche");
                  fixer(0);
                }}
                className="mq-seg"
              >
                {ty(`u0 = ${frNum(cfg.u0Gauche, 2)}`)}
              </button>
              <button
                type="button"
                aria-pressed={cote === "droite"}
                onClick={() => {
                  setCote("droite");
                  fixer(0);
                }}
                className="mq-seg"
              >
                {ty(`u0 = ${frNum(cfg.u0Droite, 2)}`)}
              </button>
            </div>

            <div className="grid gap-1">
              <div className="flex items-center justify-between text-caption text-secondary">
                <label htmlFor="mq-suites-slider">{ty("Curseur élève")}</label>
                <output htmlFor="mq-suites-slider" className="font-mono">
                  {`${frNum(k, 1)} / ${maxK} marches`}
                </output>
              </div>
              <input
                id="mq-suites-slider"
                type="range"
                min={0}
                max={maxK}
                step={0.05}
                value={k}
                onChange={(e) => {
                  fixer(Number(e.target.value));
                }}
                className="mq-slider"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
