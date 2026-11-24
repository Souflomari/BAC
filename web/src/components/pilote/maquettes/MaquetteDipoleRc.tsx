"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clamp, frNum, ty, useReducedMotion } from "./outils";

/**
 * Maquette 2 — Le dipôle RC : la charge du condensateur (les trois ensemble).
 *
 * Valeurs physiques exactes : E = 6,0 V, R = 1,0 kΩ, C = 100 µF => τ = R·C = 0,10 s,
 * I0 = E / R = 6,0 mA, Qmax = C·E = 600 µC.
 *
 * Paramètre piloté θ = t / τ ∈ [-0.25, 5] :
 *   - θ < 0 : interrupteur K ouvert (état initial au repos : q = 0, i = 0, uC = 0) ;
 *   - θ ∈ [0, 5] : K fermé sur (1) ;
 *       uC(t) = E · (1 − e^{−θ})   monte vers E ;
 *       i(t)  = I0 · e^{−θ}        faiblit vers 0 ;
 *       qA(t) = +Qmax · (1 − e^{−θ}) et qB(t) = −Qmax · (1 − e^{−θ}) s'accumulent sur les armatures.
 *
 * Rigueur physique : aucun porteur ne traverse l'isolant (diélectrique) entre A et B ;
 * les porteurs circulent uniquement dans les conducteurs métalliques à une vitesse proportionnelle à i(t).
 */

const E_VOLT = 6.0;
const R_KOHM = 1.0; // kΩ
const C_UF = 100; // µF
const TAU_S = 0.1; // s
const I0_MA = E_VOLT / R_KOHM; // 6,0 mA
const QMAX_UC = C_UF * E_VOLT; // 600 µC

// Chemin filaire orienté dans le sens conventionnel de i (du pôle + du générateur vers l'armature A)
// et du pôle − vers l'armature B, SANS traverser le diélectrique (entre y=252 et y=288 à x=290).
const WIRE_TOP: [number, number][] = [
  [64, 240],
  [64, 108],
  [290, 108],
  [290, 250],
];
const WIRE_BOT: [number, number][] = [
  [290, 290],
  [290, 412],
  [64, 412],
  [64, 300],
];

function pointOnPolyline(pts: [number, number][], frac: number): [number, number] {
  let total = 0;
  const segs: number[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    segs.push(d);
    total += d;
  }
  let target = ((frac % 1) + 1) % 1 * total;
  for (let i = 0; i < segs.length; i++) {
    if (target <= segs[i] || i === segs.length - 1) {
      const r = segs[i] > 0 ? target / segs[i] : 0;
      return [
        pts[i][0] + (pts[i + 1][0] - pts[i][0]) * r,
        pts[i][1] + (pts[i + 1][1] - pts[i][1]) * r,
      ];
    }
    target -= segs[i];
  }
  return pts[0];
}

const INSTANTS = [
  { theta: -0.2, label: "t = 0⁻ (K ouvert)" },
  { theta: 0.04, label: "t = 0⁺ (appel i₀)" },
  { theta: 1.0, label: "t = τ (63 %)" },
  { theta: 3.0, label: "t = 3τ (95 %)" },
  { theta: 5.0, label: "t = 5τ (chargé)" },
];

export function MaquetteDipoleRc() {
  const reducedMotion = useReducedMotion();
  // Au repos : K ouvert (θ = -0.2), rien ne démarre seul
  const [theta, setTheta] = useState(-0.2);
  const [playing, setPlaying] = useState(false);
  // Phase intégrée ∫ i(t)/I0 dt = 1 − e^{−θ} pour déplacer les porteurs exactement à la vitesse i(t) !
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  const stopAnim = useCallback(() => {
    setPlaying(false);
    lastTsRef.current = null;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min(0.06, (ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;
      setTheta((prev) => {
        const next = prev < 0 ? prev + dt * 1.4 : prev + dt * 0.78;
        if (next >= 5) {
          setPlaying(false);
          lastTsRef.current = null;
          return 5;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const togglePlay = () => {
    if (playing) {
      stopAnim();
      return;
    }
    if (reducedMotion) {
      const nextPreset = INSTANTS.find((p) => p.theta > theta + 0.05) ?? INSTANTS[0];
      setTheta(nextPreset.theta);
      return;
    }
    if (theta >= 4.98) setTheta(-0.2);
    lastTsRef.current = null;
    setPlaying(true);
  };

  const rejouer = () => {
    stopAnim();
    setTheta(-0.2);
    if (!reducedMotion) {
      lastTsRef.current = null;
      setPlaying(true);
    }
  };

  const closed = theta >= 0;
  const th = clamp(theta, 0, 5);
  const expTerm = closed ? Math.exp(-th) : 0;
  const chargeFrac = closed ? 1 - expTerm : 0; // q / Qmax = uC / E
  const currentFrac = closed ? expTerm : 0; // i / I0 = uR / E
  const uC = E_VOLT * chargeFrac;
  const uR = E_VOLT * currentFrac;
  const iMa = I0_MA * currentFrac;
  const qUc = QMAX_UC * chargeFrac;

  // Déplacement cumulé des porteurs dans les fils : proportionnel à la charge intégrée ∫ i dt ∝ (1 − e^{−θ})
  // Si prefers-reduced-motion est actif, les porteurs restent fixes.
  const carrierShift = reducedMotion ? 0 : chargeFrac * 1.85;

  // Coordonnées des deux chronogrammes synchronisés à droite (x ∈ [430, 728])
  const GX0 = 442;
  const GX1 = 728;
  const GW = GX1 - GX0;
  const xOf = (tNorm: number) => GX0 + (clamp(tNorm, 0, 5) / 5) * GW;

  // Graphe haut : uC(t) ∈ [0, E], y ∈ [74, 214]
  const UY0 = 214;
  const UY1 = 80;
  const yOfU = (uVal: number) => UY0 - (uVal / E_VOLT) * (UY0 - UY1);

  // Graphe bas : i(t) ∈ [0, I0], y ∈ [294, 434]
  const IY0 = 434;
  const IY1 = 300;
  const yOfI = (iVal: number) => IY0 - (iVal / I0_MA) * (IY0 - IY1);

  // Construction des courbes déjà parcourues jusqu'à th
  let pathU = "";
  let pathI = "";
  let pathGhostU = "";
  let pathGhostI = "";
  const STEPS = 75;
  for (let k = 0; k <= STEPS; k++) {
    const tk = (5 * k) / STEPS;
    const xk = xOf(tk).toFixed(1);
    const uk = yOfU(E_VOLT * (1 - Math.exp(-tk))).toFixed(1);
    const ik = yOfI(I0_MA * Math.exp(-tk)).toFixed(1);
    pathGhostU += `${k === 0 ? "M" : "L"}${xk} ${uk}`;
    pathGhostI += `${k === 0 ? "M" : "L"}${xk} ${ik}`;
  }
  if (closed) {
    const nLive = Math.max(1, Math.ceil((th / 5) * STEPS));
    for (let k = 0; k <= nLive; k++) {
      const tk = Math.min(th, (5 * k) / STEPS);
      const xk = xOf(tk).toFixed(1);
      const uk = yOfU(E_VOLT * (1 - Math.exp(-tk))).toFixed(1);
      const ik = yOfI(I0_MA * Math.exp(-tk)).toFixed(1);
      pathU += `${k === 0 ? "M" : "L"}${xk} ${uk}`;
      pathI += `${k === 0 ? "M" : "L"}${xk} ${ik}`;
    }
  }

  // 6 emplacements de charges + sur A et − sur B
  const SLOTS = [-50, -30, -10, 10, 30, 50];

  return (
    <article className="mq-card" aria-labelledby="mq-rc-titre">
      <div className="border-b border-subtle px-4 py-3 bp-medium:px-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="mq-rc-titre" className="font-display text-body-lg font-semibold text-primary">
          {ty("Dipôle RC : charges sur les armatures, courant qui faiblit et tension qui monte")}
        </h2>
        <span className="font-mono text-caption text-secondary">
          {ty("PC · 40 min")}
        </span>
      </div>

      <div className="grid grid-cols-1 bp-large:grid-cols-12">
        <div className="mq-stage-box px-2 py-2 bp-medium:px-4 bp-medium:py-4 bp-large:col-span-7 bp-large:border-b-0 bp-large:border-r bp-large:border-subtle">
          <svg
            viewBox="0 0 760 510"
            className="mq-svg"
            role="img"
            aria-label={ty(
              "Animation couplée de la charge d’un condensateur montrant simultanément l’arrivée des charges sur les armatures, l’affaiblissement du courant i(t) et la montée de la tension uC(t)"
            )}
          >
            <defs>
              <marker id="mq-arw-sig" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L10 5 L0 10 z" className="mq-f-sig" />
              </marker>
              <marker id="mq-arw-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L10 5 L0 10 z" className="mq-f-ink" />
              </marker>
            </defs>

            {/* En-tête : valeurs numériques en direct */}
            <text x={20} y={34} fontSize={23} fontWeight={700} className="mq-f-ink mq-mono">
              {closed ? `t = ${frNum(th, 2)} τ (${frNum(th * TAU_S, 2)} s)` : ty("K ouvert (repos)")}
            </text>
            <text x={740} y={34} textAnchor="end" fontSize={23} className="mq-f-sec mq-mono">
              {`uC = ${frNum(uC, 2)} V · i = ${frNum(iMa, 2)} mA`}
            </text>

            {/* ==================== GAUCHE : CIRCUIT RC ==================== */}
            <polyline points="64,240 64,108 118,108" className="mq-nofill mq-s-ink" strokeWidth={3} />
            <polyline points="168,108 188,108" className="mq-nofill mq-s-ink" strokeWidth={3} />
            <polyline points="256,108 290,108 290,252" className="mq-nofill mq-s-ink" strokeWidth={3} />
            <polyline points="290,288 290,412 64,412 64,300" className="mq-nofill mq-s-ink" strokeWidth={3} />

            {/* Générateur idéal de tension E */}
            <circle cx={64} cy={270} r={30} className="mq-f-stage mq-s-ink" strokeWidth={3} />
            <line x1={30} y1={296} x2={30} y2={244} className="mq-s-ink" strokeWidth={2.5} markerEnd="url(#mq-arw-ink)" />
            <text x={14} y={278} fontSize={23} fontWeight={700} className="mq-f-ink">
              E
            </text>

            {/* Interrupteur K */}
            <circle cx={118} cy={108} r={4.5} className="mq-f-stage mq-s-ink" strokeWidth={2.5} />
            <circle cx={168} cy={108} r={4.5} className="mq-f-stage mq-s-ink" strokeWidth={2.5} />
            <line
              x1={118}
              y1={108}
              x2={closed ? 168 : 160}
              y2={closed ? 108 : 82}
              className="mq-s-sig"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <text x={143} y={74} textAnchor="middle" fontSize={23} fontWeight={700} className="mq-f-sig">
              K
            </text>

            {/* Conducteur ohmique R */}
            <rect x={188} y={92} width={68} height={32} className="mq-f-stage mq-s-ink" strokeWidth={3} />
            <text x={222} y={116} textAnchor="middle" fontSize={23} fontWeight={700} className="mq-f-ink">
              R
            </text>

            {/* Condensateur C : armatures A et B séparées par l'isolant */}
            <rect x={226} y={255} width={128} height={30} className="mq-f-ink-soft" />
            <line x1={226} y1={252} x2={354} y2={252} className="mq-s-ink" strokeWidth={5} />
            <line x1={226} y1={288} x2={354} y2={288} className="mq-s-ink" strokeWidth={5} />
            <text x={214} y={258} textAnchor="end" fontSize={23} fontWeight={700} className="mq-f-ink">
              A
            </text>
            <text x={214} y={296} textAnchor="end" fontSize={23} fontWeight={700} className="mq-f-ink">
              B
            </text>

            {/* Porteurs circulant UNIQUEMENT dans les fils métalliques (jamais dans l'isolant) */}
            {closed &&
              currentFrac > 0.015 &&
              [0, 0.25, 0.5, 0.75].map((offset, idx) => {
                const [tx, ty1] = pointOnPolyline(WIRE_TOP, offset + carrierShift);
                const [bx, by1] = pointOnPolyline(WIRE_BOT, offset + carrierShift);
                const op = clamp(0.25 + 0.75 * currentFrac, 0, 1);
                return (
                  <g key={idx} opacity={op}>
                    <circle cx={tx} cy={ty1} r={4.5} className="mq-f-sig" />
                    <circle cx={bx} cy={by1} r={4.5} className="mq-f-sig" />
                  </g>
                );
              })}

            {/* Charges +q sur A et −q sur B apparaissant progressivement */}
            {SLOTS.map((dx, j) => {
              const op = clamp(chargeFrac * SLOTS.length - j, 0, 1);
              return (
                <g key={dx} opacity={op}>
                  <text x={290 + dx} y={244} textAnchor="middle" fontSize={23} fontWeight={700} className="mq-f-sig mq-sans-halo">
                    +
                  </text>
                  <text x={290 + dx} y={311} textAnchor="middle" fontSize={23} fontWeight={700} className="mq-f-ink mq-sans-halo">
                    −
                  </text>
                </g>
              );
            })}

            {/* Flèche de courant i(t) qui s'affaiblit visiblement */}
            {closed && currentFrac > 0.02 && (
              <g opacity={clamp(0.22 + 0.78 * currentFrac, 0, 1)}>
                <line
                  x1={314}
                  y1={145}
                  x2={314}
                  y2={145 + 22 + 48 * currentFrac}
                  className="mq-s-sig"
                  strokeWidth={2 + 3.5 * currentFrac}
                  markerEnd="url(#mq-arw-sig)"
                />
                <text x={326} y={175} fontSize={23} fontWeight={700} className="mq-f-sig">
                  i(t)
                </text>
              </g>
            )}

            {/* Flèche de tension uC(t) qui grandit à droite du condensateur */}
            {closed && chargeFrac > 0.02 && (
              <g>
                <line
                  x1={372}
                  y1={304}
                  x2={372}
                  y2={304 - (20 + 54 * chargeFrac)}
                  className="mq-s-ink"
                  strokeWidth={3.5}
                  markerEnd="url(#mq-arw-ink)"
                />
                <text x={382} y={278} fontSize={23} fontWeight={700} className="mq-f-ink">
                  uC
                </text>
              </g>
            )}

            {/* Jauge de charge qA */}
            <text x={20} y={456} fontSize={23} className="mq-f-sec mq-mono">
              {`qA = +${Math.round(qUc)} µC (${Math.round(chargeFrac * 100)} %)`}
            </text>
            <rect x={20} y={468} width={360} height={16} className="mq-f-panel mq-s-line" strokeWidth={1.5} />
            <rect x={20} y={468} width={360 * chargeFrac} height={16} className="mq-f-sig" />

            {/* ==================== DROITE : DEUX CHRONOGRAMMES LIÉS ==================== */}
            <line x1={GX0} y1={UY0} x2={GX1} y2={UY0} className="mq-s-line" strokeWidth={1.8} />
            <line x1={GX0} y1={UY1 - 10} x2={GX0} y2={UY0} className="mq-s-line" strokeWidth={1.8} />
            <line x1={GX0} y1={UY1} x2={GX1} y2={UY1} className="mq-s-dim" strokeWidth={1.5} strokeDasharray="6 5" />
            <line x1={GX0} y1={UY0} x2={xOf(1)} y2={UY1} className="mq-s-subtle" strokeWidth={1.5} strokeDasharray="3 4" />
            <path d={pathGhostU} className="mq-nofill mq-s-subtle" strokeWidth={2} />
            {closed && <path d={pathU} className="mq-nofill mq-s-ink" strokeWidth={3.8} />}
            <text x={GX0 - 8} y={UY1 + 7} textAnchor="end" fontSize={23} className="mq-f-sec mq-mono">
              E
            </text>
            <text x={GX1} y={UY1 + 26} textAnchor="end" fontSize={23} fontWeight={700} className="mq-f-ink">
              {ty("uC(t) monte")}
            </text>

            <line x1={GX0} y1={IY0} x2={GX1} y2={IY0} className="mq-s-line" strokeWidth={1.8} />
            <line x1={GX0} y1={IY1 - 10} x2={GX0} y2={IY0} className="mq-s-line" strokeWidth={1.8} />
            <path d={pathGhostI} className="mq-nofill mq-s-subtle" strokeWidth={2} />
            {closed && <path d={pathI} className="mq-nofill mq-s-sig" strokeWidth={3.8} />}
            <text x={GX0 - 8} y={IY1 + 8} textAnchor="end" fontSize={23} className="mq-f-sig mq-mono">
              I0
            </text>
            <text x={GX1} y={IY1 + 28} textAnchor="end" fontSize={23} fontWeight={700} className="mq-f-sig">
              {ty("i(t) faiblit")}
            </text>

            <line x1={xOf(1)} y1={UY1} x2={xOf(1)} y2={IY0 + 6} className="mq-s-subtle" strokeWidth={1.4} strokeDasharray="4 4" />
            <text x={xOf(1)} y={IY0 + 28} textAnchor="middle" fontSize={23} className="mq-f-sec mq-mono">
              τ
            </text>
            <text x={GX1} y={IY0 + 28} textAnchor="end" fontSize={23} className="mq-f-sec mq-mono">
              5τ
            </text>

            {closed && (
              <g>
                <line
                  x1={xOf(th)}
                  y1={UY1 - 4}
                  x2={xOf(th)}
                  y2={IY0}
                  className="mq-s-dim"
                  strokeWidth={1.6}
                  strokeDasharray="3 3"
                />
                <circle cx={xOf(th)} cy={yOfU(uC)} r={6.5} className="mq-f-ink" />
                <circle cx={xOf(th)} cy={yOfI(iMa)} r={6.5} className="mq-f-sig" />
              </g>
            )}
          </svg>
        </div>

        <div className="space-y-3.5 px-4 py-4 bp-medium:px-5 bp-large:col-span-5 flex flex-col justify-between">
          <p className="text-body-sm text-secondary">
            {ty(
              !closed
                ? "Au repos, K est ouvert : les armatures A et B sont neutres (q = 0), uC = 0 et aucun courant ne circule. Ferme K pour voir les trois grandeurs évoluer ensemble."
                : th < 0.8
                  ? "À la fermeture de K, uC est presque nulle : toute la tension E s’applique à R, d’où l’appel de courant maximal i(0⁺) = E / R = 6,0 mA qui amène rapidement les premières charges."
                  : th < 4.2
                    ? "À mesure que +q et −q s’accumulent sur A et B, la tension uC = q / C s’oppose à E : la tension résiduelle uR = E − uC diminue, ce qui freine le courant i = uR / R."
                    : "Au-delà de 5τ, uC atteint quasiment E (99,3 %) : uR ≈ 0, le courant s’éteint et les charges restent piégées de part et d’autre de l’isolant."
            )}
          </p>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={togglePlay} className="mq-btn mq-btn-primary">
                {playing
                  ? ty("⏸ Pause")
                  : ty(!closed ? "▶ Fermer K et charger" : theta >= 4.98 ? "▶ Rejouer la charge" : "▶ Continuer")}
              </button>
              <button type="button" onClick={rejouer} className="mq-btn">
                {ty("↺ Rejouer")}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {INSTANTS.map((inst) => (
                <button
                  key={inst.label}
                  type="button"
                  aria-pressed={Math.abs(theta - inst.theta) < 0.12}
                  onClick={() => {
                    stopAnim();
                    setTheta(inst.theta);
                  }}
                  className="mq-seg px-2.5"
                >
                  {ty(inst.label)}
                </button>
              ))}
            </div>

            <div className="grid gap-1">
              <div className="flex items-center justify-between text-caption text-secondary">
                <label htmlFor="mq-rc-slider">{ty("Curseur t / τ")}</label>
                <output htmlFor="mq-rc-slider" className="font-mono">
                  {`uC + uR = ${frNum(uC, 1)} + ${frNum(uR, 1)} = ${frNum(uC + uR, 1)} V`}
                </output>
              </div>
              <input
                id="mq-rc-slider"
                type="range"
                min={-0.2}
                max={5}
                step={0.02}
                value={theta}
                onChange={(e) => {
                  stopAnim();
                  setTheta(Number(e.target.value));
                }}
                className="mq-slider"
              />
            </div>

            <p className="border-l-2 border-subtle pl-3 text-caption text-secondary">
              {ty(
                "Flèche rouge : sens conventionnel de i(t). Dans le métal, les électrons libres circulent en sens inverse et aucune charge ne traverse l’isolant."
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
