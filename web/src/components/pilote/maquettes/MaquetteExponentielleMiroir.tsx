"use client";

import { useState } from "react";
import { clamp, creerRepere, frNum, SVG_FS, ty, useLectureAnimee } from "./outils";
import { B_TAN, H_PH, LN2, LNB, X_PH } from "../exponentielle-outils";

/**
 * Maquette 12 — Exponentielle : la courbe et son miroir (ln et exp symétriques par y = x),
 * un point et son reflet qui bougent ensemble, et la tangente dont la pente égale la hauteur.
 *
 * Valeurs clés issues de `exponentielle-outils.js` : LN2, LNB (ln 4), X_PH (ln 6), B_TAN (4), H_PH (6).
 * Étapes cibles : `pliage`, `reflet-pente`, `pente-hauteur`, `derivee` (beats 3 et 6) dans `exponentielle-moteur.js`.
 */

const PRESETS = [
  { a: 0, label: "x = 0 (h = 1)" },
  { a: LN2, label: "x = ln 2 (h = 2)" },
  { a: LNB, label: `x = ln ${B_TAN} (h = ${B_TAN})` },
  { a: X_PH, label: `x = ln ${H_PH} (h = ${H_PH})` },
];

export function MaquetteExponentielleMiroir() {
  const [montrerTangenteLn, setMontrerTangenteLn] = useState(true);

  // Paramètre piloté : abscisse a ∈ [-1.2, 1.85] du point M(a ; e^a) sur exp
  const {
    valeur: a,
    playing,
    reduced: reducedMotion,
    togglePlay,
    lancerVers,
    fixer,
  } = useLectureAnimee({
    initial: LNB,
    min: -1.2,
    max: 1.85,
    vitesse: 0.55,
    palierSuivant: (prev) => {
      const next = PRESETS.find((p) => p.a > prev + 0.08);
      return next ? next.a : PRESETS[0].a;
    },
  });

  const rejouer = () => {
    if (reducedMotion) fixer(0);
    else lancerVers(X_PH, -0.8);
  };

  // Repère orthonormé carré pour que la symétrie par y = x soit exactement perpendiculaire !
  const rep = creerRepere({
    x0: 156,
    y0: 446,
    w: 448,
    h: 416,
    xMin: -1.8,
    xMax: 6.8,
    yMin: -1.8,
    yMax: 6.8,
  });

  const ea = Math.exp(a); // hauteur = pente de exp en a
  const penteLn = 1 / ea; // pente de ln au point reflet (e^a ; a)

  const pathExp = rep.tracerCourbe((x) => Math.exp(x), -1.8, Math.log(6.8), 80);
  const pathLn = rep.tracerCourbe((x) => Math.log(x), 0.16, 6.8, 80);

  // Tangente à exp au point M(a, ea) : y = ea + ea * (x - a)
  const dxTan = 0.85;
  const xT1 = clamp(a - dxTan, -1.8, 6.8);
  const xT2 = clamp(a + dxTan, -1.8, 6.8);
  const yT1 = clamp(ea + ea * (xT1 - a), -1.8, 6.8);
  const yT2 = clamp(ea + ea * (xT2 - a), -1.8, 6.8);

  // Tangente miroir à ln au point M'(ea, a) : y = a + (1/ea) * (x - ea)
  const dxLn = 1.6;
  const xL1 = clamp(ea - dxLn, 0.1, 6.8);
  const xL2 = clamp(ea + dxLn, 0.1, 6.8);
  const yL1 = clamp(a + penteLn * (xL1 - ea), -1.8, 6.8);
  const yL2 = clamp(a + penteLn * (xL2 - ea), -1.8, 6.8);

  // Coordonnées SVG des points M(a, ea) et M'(ea, a)
  const mx = rep.X(a);
  const my = rep.Y(ea);
  const mpx = rep.X(ea);
  const mpy = rep.Y(a);

  // Triangle de pente unitaire réduit (Δx = 0,5 -> Δy = 0,5 * ea) pour rester dans le cadre
  const stepX = ea > 4.2 ? 0.35 : 0.6;
  const triX1 = rep.X(a);
  const triY1 = rep.Y(ea);
  const triX2 = rep.X(a + stepX);
  const triY2 = rep.Y(clamp(ea + ea * stepX, -1.8, 6.8));

  return (
    <section className="mq-card" aria-label={ty("Maquette animée : miroir ln et exp et tangente")}>
      {/* Bandeau de lectures chiffrées hors SVG */}
      <div className="border-b border-subtle bg-surface-container-low px-4 py-2.5 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-caption bp-medium:text-body-sm">
        <span className="text-signal font-semibold">
          {ty(`M (${frNum(a, 2)} ; ${frNum(ea, 2)}) sur exp`)}
        </span>
        <span className="text-primary">
          {ty(`M′ (${frNum(ea, 2)} ; ${frNum(a, 2)}) sur ln`)}
        </span>
        <span className="text-signal font-semibold">
          {ty(`pente = hauteur = ${frNum(ea, 2)}`)}
        </span>
        <span className="text-secondary">
          {ty(`ln′(${frNum(ea, 2)}) = ${frNum(penteLn, 2)}`)}
        </span>
      </div>

      <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-3">
        <svg
          viewBox="0 0 760 500"
          className="mq-svg"
          role="img"
          aria-label={ty("Symétrie entre les courbes de ln et exp par rapport à la droite y = x, avec la tangente dont la pente égale la hauteur")}
        >
          {/* Axes du repère orthonormé */}
          <line x1={rep.x0} y1={rep.Y(0)} x2={rep.x0 + rep.w} y2={rep.Y(0)} className="mq-s-dim" strokeWidth={2} />
          <line x1={rep.X(0)} y1={rep.y0} x2={rep.X(0)} y2={rep.y0 - rep.h} className="mq-s-dim" strokeWidth={2} />

          {/* Graduations clés */}
          {[2, 4, 6].map((v) => (
            <g key={v}>
              <line x1={rep.X(v)} y1={rep.Y(0) - 5} x2={rep.X(v)} y2={rep.Y(0) + 5} className="mq-s-dim" strokeWidth={2} />
              <text x={rep.X(v)} y={rep.Y(0) + 28} textAnchor="middle" fontSize={SVG_FS} className="mq-f-sec">
                {v}
              </text>
              <line x1={rep.X(0) - 5} y1={rep.Y(v)} x2={rep.X(0) + 5} y2={rep.Y(v)} className="mq-s-dim" strokeWidth={2} />
              <text x={rep.X(0) - 12} y={rep.Y(v) + 8} textAnchor="end" fontSize={SVG_FS} className="mq-f-sec">
                {v}
              </text>
            </g>
          ))}

          {/* Miroir y = x */}
          <line
            x1={rep.X(-1.6)}
            y1={rep.Y(-1.6)}
            x2={rep.X(6.5)}
            y2={rep.Y(6.5)}
            className="mq-s-dim"
            strokeWidth={2.5}
            strokeDasharray="9 7"
          />
          <text x={rep.X(5.85)} y={rep.Y(6.25)} textAnchor="start" fontSize={SVG_FS} fontWeight={700} className="mq-f-sec">
            y = x
          </text>

          {/* Courbe y = ln(x) (encre) */}
          <path d={pathLn} className="mq-s-ink mq-nofill" strokeWidth={3.8} strokeLinecap="round" />
          <text x={rep.X(5.8)} y={rep.Y(Math.log(5.8)) + 34} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            ln x
          </text>

          {/* Courbe y = e^x (rouge signal) */}
          <path d={pathExp} className="mq-s-sig mq-nofill" strokeWidth={4} strokeLinecap="round" />
          <text x={rep.X(1.3)} y={rep.Y(6.15)} textAnchor="end" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
            exp x
          </text>

          {/* Segment de réflexion perpendiculaire reliant M et M' */}
          <line
            x1={mx}
            y1={my}
            x2={mpx}
            y2={mpy}
            className="mq-s-sec"
            strokeWidth={2.2}
            strokeDasharray="5 5"
          />

          {/* Barre verticale de hauteur e^a sous M */}
          <line
            x1={mx}
            y1={rep.Y(0)}
            x2={mx}
            y2={my}
            className="mq-s-sig"
            strokeWidth={3.5}
            strokeOpacity={0.45}
          />

          {/* Tangente à exp en M(a, e^a) */}
          <line
            x1={rep.X(xT1)}
            y1={rep.Y(yT1)}
            x2={rep.X(xT2)}
            y2={rep.Y(yT2)}
            className="mq-s-sig"
            strokeWidth={3}
          />
          {/* Triangle de pente sur exp */}
          <path
            d={`M ${triX1} ${triY1} L ${triX2} ${triY1} L ${triX2} ${triY2}`}
            className="mq-s-sig mq-nofill"
            strokeWidth={2.2}
            strokeDasharray="4 4"
          />

          {/* Tangente miroir à ln en M'(e^a, a) */}
          {montrerTangenteLn && (
            <line
              x1={rep.X(xL1)}
              y1={rep.Y(yL1)}
              x2={rep.X(xL2)}
              y2={rep.Y(yL2)}
              className="mq-s-ink"
              strokeWidth={2.8}
              strokeDasharray="6 4"
            />
          )}

          {/* Point M sur exp et son reflet M' sur ln */}
          <circle cx={mx} cy={my} r={8} className="mq-f-sig" />
          <text x={mx - 14} y={my - 12} textAnchor="end" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
            M
          </text>

          <circle cx={mpx} cy={mpy} r={8} className="mq-f-ink" />
          <text x={mpx + 14} y={mpy + 28} textAnchor="start" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            M′
          </text>

          {/* Encadré résumé de la pente = hauteur */}
          <g>
            <rect x={20} y={40} width={174} height={92} rx={8} className="mq-f-panel mq-s-line" strokeWidth={1.8} />
            <text x={32} y={76} textAnchor="start" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
              {ty(`h = ${frNum(ea, 2)}`)}
            </text>
            <text x={32} y={114} textAnchor="start" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {ty(`pente = ${frNum(ea, 2)}`)}
            </text>
          </g>
        </svg>
      </div>

      <div className="p-4 bp-medium:p-6 space-y-4">
        <div className="space-y-1">
          <p className="font-mono text-caption text-secondary">
            {ty("Miroir y = x · symétrie entre ln et exp")}
          </p>
          <h3 className="font-display text-h4 font-bold text-primary">
            {ty("Le reflet échange abscisse et ordonnée, et inverse la pente")}
          </h3>
          <p className="text-body-sm text-secondary max-w-reading">
            {ty(
              `Au point M′(${frNum(ea, 2)} ; ${frNum(a, 2)}) de ln, la tangente a pour pente 1/${frNum(ea, 2)} ≈ ${frNum(penteLn, 2)}. Reflétée dans y = x, elle devient la tangente à exp en M(${frNum(a, 2)} ; ${frNum(ea, 2)}), de pente ${frNum(ea, 2)} : exactement la hauteur du point.`
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={togglePlay} className="mq-btn mq-btn-primary">
            {playing ? "Pause" : a >= 1.8 ? "Rejouer" : "Faire glisser M"}
          </button>
          <button type="button" onClick={rejouer} className="mq-btn">
            {ty("Depuis le début")}
          </button>
          <button
            type="button"
            aria-pressed={montrerTangenteLn}
            onClick={() => setMontrerTangenteLn((v) => !v)}
            className="mq-seg"
          >
            {ty(montrerTangenteLn ? "Tangente à ln : visible" : "Tangente à ln : masquée")}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label={ty("Points remarquables de exp")}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              aria-pressed={Math.abs(a - p.a) < 0.08}
              onClick={() => (reducedMotion ? fixer(p.a) : lancerVers(p.a))}
              className="mq-seg text-caption"
            >
              {ty(p.label)}
            </button>
          ))}
        </div>

        <label className="block space-y-1">
          <span className="text-caption font-medium text-secondary">
            {ty("Abscisse x du point M(x ; eˣ) sur la courbe")}
          </span>
          <input
            type="range"
            min={-1.2}
            max={1.85}
            step={0.02}
            value={a}
            onChange={(e) => fixer(Number(e.target.value))}
            className="mq-slider"
            aria-label={ty("Abscisse x sur exp")}
          />
        </label>
      </div>
    </section>
  );
}
