"use client";

import { calculerJauge, clamp, easeCalm, lerp, SVG_FS, trouverPalier, ty, useLectureAnimee } from "./outils";
import { DM_HE, EL_HE, F931, fg, M_SEP_HE } from "../noyaux-outils";

/**
 * Maquette 7 — Noyaux, masse et énergie : le défaut de masse Δm de l'hélium 4.
 * À gauche : les 4 nucléons (2 protons + 2 neutrons) séparés puis réunis en un noyau ⁴₂He.
 * À droite : la balance bascule dès l'assemblage pour révéler Δm = 0,030 37 u,
 * converti en énergie de liaison E_ℓ = Δm · c² = 28,3 MeV.
 * Toutes les valeurs viennent directement de `noyaux-outils.js`.
 * Étapes cibles : `dm-def` et `axe-energie` (beats 3–4) dans `noyaux-moteur.js`.
 */

const M_HE_NOYAU = Number((M_SEP_HE - DM_HE).toFixed(5));

const PALIERS = [
  {
    u: 0,
    court: "1. Nucléons séparés",
    titre: "2 protons + 2 neutrons isolés : masse totale = 4,031 88 u",
    texte:
      "Avant de former le noyau, les quatre nucléons sont pesés séparément : la balance est équilibrée sur la somme des masses individuelles.",
  },
  {
    u: 1,
    court: "2. Assemblage",
    titre: "Les 4 nucléons se lient en un noyau d’hélium 4 (⁴₂He)",
    texte:
      "L’interaction nucléaire forte rassemble les deux protons et les deux neutrons. Le noyau formé est plus léger que la somme de ses constituants.",
  },
  {
    u: 2,
    court: "3. Défaut Δm",
    titre: `La balance penche : Δm = ${fg(DM_HE, 5)} u manque à l’appel`,
    texte:
      "La masse du noyau (4,001 51 u) est inférieure à celle des nucléons séparés : cet écart positif est le défaut de masse Δm.",
  },
  {
    u: 3,
    court: "4. Énergie libérée",
    titre: `Relation d’Einstein : E_ℓ = Δm · c² ≈ ${fg(EL_HE, 1)} MeV`,
    texte: `Avec 1 u ↔ ${fg(F931, 1)} MeV/c², le défaut de masse correspond exactement à l’énergie libérée lors de la formation du noyau.`,
  },
] as const;

export function MaquetteNoyaux() {
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

  const pBind = easeCalm(clamp(u, 0, 1));
  const pTilt = easeCalm(clamp((u - 0.85) / 1.15, 0, 1));
  const pEnergy = easeCalm(clamp((u - 1.9) / 1.0, 0, 1));

  // 4 nucléons à gauche : séparés en carré large -> serrés en ⁴He autour de (188, 224)
  const CX = 188;
  const CY = 224;
  const nucs = [
    { x0: 108, y0: 146, x1: CX - 21, y1: CY - 18, proton: true, label: "p⁺" },
    { x0: 268, y0: 146, x1: CX + 21, y1: CY - 18, proton: false, label: "n" },
    { x0: 108, y0: 302, x1: CX - 21, y1: CY + 18, proton: false, label: "n" },
    { x0: 268, y0: 302, x1: CX + 21, y1: CY + 18, proton: true, label: "p⁺" },
  ];

  // Balance à droite : fléau centré en (566, 206), inclinant jusqu'à 13° (côté gauche « séparés » plus lourd -> descend)
  const BX = 566;
  const BY = 206;
  const angleDeg = -13 * pTilt; // négatif = plateau gauche (séparés) plus bas, plateau droit (noyau ⁴He) plus haut !
  const angleRad = (angleDeg * Math.PI) / 180;
  const arm = 120;
  const lx = BX - arm * Math.cos(angleRad);
  const ly = BY - arm * Math.sin(angleRad);
  const rx = BX + arm * Math.cos(angleRad);
  const ry = BY + arm * Math.sin(angleRad);

  const jaugeE = calculerJauge(pEnergy, 1, 292);

  return (
    <article className="mq-card" aria-labelledby="mq-noy-titre">
      <div className="border-b border-subtle px-4 py-3 bp-medium:px-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="mq-noy-titre" className="font-display text-body-lg font-semibold text-primary">
          {ty("Noyaux : nucléons séparés vs réunis, balance de Δm et énergie libérée")}
        </h2>
        <span className="font-mono text-caption text-secondary">{ty("PC · défaut de masse")}</span>
      </div>

      <div className="grid grid-cols-1 bp-large:grid-cols-12">
        <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-4 bp-large:col-span-7 bp-large:border-b-0 bp-large:border-r bp-large:border-subtle">
          <svg
            viewBox="0 0 760 500"
            className="mq-svg"
            role="img"
            aria-label={ty(
              "Assemblage de deux protons et deux neutrons en noyau d'hélium 4 couplé à une balance montrant le défaut de masse et l'énergie libérée"
            )}
          >
            {/* En-tête */}
            <text x={20} y={36} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {pBind > 0.7 ? ty("Noyau lié : ⁴₂He") : ty("4 nucléons séparés")}
            </text>
            <text x={740} y={36} textAnchor="end" fontSize={SVG_FS} className="mq-f-sig mq-mono">
              {pEnergy > 0.35
                ? `E = ${fg(EL_HE, 1)} MeV`
                : pTilt > 0.35
                  ? `Δm = ${fg(DM_HE, 5)} u`
                  : `m = ${fg(M_SEP_HE, 5)} u`}
            </text>

            {/* ==================== GAUCHE : 2 PROTONS + 2 NEUTRONS ==================== */}
            <circle
              cx={CX}
              cy={CY}
              r={lerp(132, 68, pBind)}
              className="mq-f-panel mq-s-line"
              strokeWidth={2}
              strokeDasharray="6 6"
            />
            {nucs.map((n, i) => {
              const nx = lerp(n.x0, n.x1, pBind);
              const ny = lerp(n.y0, n.y1, pBind);
              return (
                <g key={i}>
                  <circle
                    cx={nx}
                    cy={ny}
                    r={22}
                    className={n.proton ? "mq-f-sig mq-s-ink" : "mq-f-stage mq-s-ink"}
                    strokeWidth={2.5}
                  />
                  <text
                    x={nx}
                    y={ny + 8}
                    textAnchor="middle"
                    fontSize={SVG_FS}
                    fontWeight={700}
                    className={n.proton ? "mq-f-stage mq-mono" : "mq-f-ink mq-mono"}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}

            {/* Rayonnement d'énergie libérée au palier 4 */}
            {pEnergy > 0.05 && (
              <g opacity={pEnergy}>
                <line x1={CX + 76} y1={CY - 30} x2={CX + 132} y2={CY - 64} className="mq-s-sig" strokeWidth={3.5} />
                <text x={CX + 114} y={CY - 74} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
                  + E_ℓ
                </text>
              </g>
            )}

            <text x={CX} y={396} textAnchor="middle" fontSize={SVG_FS} className="mq-f-sec mq-mono">
              {pBind > 0.7 ? `${fg(M_HE_NOYAU, 5)} u` : `${fg(M_SEP_HE, 5)} u`}
            </text>

            {/* ==================== DROITE : BALANCE + JAUGE D'ÉNERGIE ==================== */}
            {/* Socle et pivot */}
            <polygon points={`${BX - 36},316 ${BX + 36},316 ${BX},206`} className="mq-f-panel mq-s-line" strokeWidth={2} />
            <line x1={lx} y1={ly} x2={rx} y2={ry} className="mq-s-ink" strokeWidth={4} strokeLinecap="round" />
            <circle cx={BX} cy={BY} r={7} className="mq-f-ink" />

            {/* Plateau gauche : 2p + 2n (plus lourd -> descend quand pTilt > 0) */}
            <line x1={lx} y1={ly} x2={lx} y2={ly + 42} className="mq-s-dim" strokeWidth={2} />
            <line x1={lx - 44} y1={ly + 42} x2={lx + 44} y2={ly + 42} className="mq-s-ink" strokeWidth={4} />
            <text x={lx} y={ly - 14} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              2p+2n
            </text>

            {/* Plateau droit : noyau ⁴He (plus léger -> monte) */}
            <line x1={rx} y1={ry} x2={rx} y2={ry + 42} className="mq-s-dim" strokeWidth={2} />
            <line x1={rx - 44} y1={ry + 42} x2={rx + 44} y2={ry + 42} className="mq-s-sig" strokeWidth={4} />
            <text x={rx} y={ry - 14} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
              ⁴He
            </text>

            {/* Jauge d'énergie libérée en bas à droite */}
            <text x={420} y={396} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {ty("Énergie libérée")}
            </text>
            <rect x={420} y={412} width={292} height={22} className="mq-f-panel mq-s-line" strokeWidth={1.5} />
            <rect x={420} y={412} width={pEnergy > 0.02 ? jaugeE.largeur : 0} height={22} className="mq-f-sig" />

            {/* Formule en bas */}
            <text x={380} y={482} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink mq-mono">
              {`Δm = ${fg(DM_HE, 5)} u → E_ℓ = ${fg(EL_HE, 1)} MeV`}
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
                <label htmlFor="mq-noy-slider">{ty("Curseur élève")}</label>
                <output htmlFor="mq-noy-slider" className="font-mono">
                  {`Palier ${palierIdx + 1} / ${PALIERS.length}`}
                </output>
              </div>
              <input
                id="mq-noy-slider"
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
                "Masses et énergies importées directement de noyaux-outils.js (M_SEP_HE, DM_HE, EL_HE, F931) : aucun nombre recalculé à part."
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
