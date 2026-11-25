"use client";

import { useState } from "react";
import { calculerJauge, clamp, easeCalm, frNum, lerp, SVG_FS, ty, useLectureAnimee } from "./outils";
import { EX_D, EX_N, EX_TC, SV22_D, SV22_PAR, SV22_REC, SV24R, SV24R_PAR, SV24R_REC } from "../transmission-outils";

/**
 * Maquette 13 — Transmission : deux gènes liés (linkage relatif), crossing-over
 * produisant des gamètes recombinés et lien direct avec les proportions du test-cross.
 *
 * Données issues directement de `transmission-outils.js` :
 *   - SVT 2024 R (souris, d = 3 cM) : 48,29 % [G, L], 48,71 % [g, ℓ], 1,29 % [G, ℓ], 1,71 % [g, L]
 *   - SVT 2022 N (drosophile, d = 19 cM) : 40,5 % / 40,5 % parentaux, 9,5 % / 9,5 % recombinés
 *   - Exemple du cours (d = 20 cM) : 410, 390, 105, 95 sur 1 000
 *
 * Étapes cibles : `vrai-tc`, `quatre-classes`, `crossing-over`, `pourcentage` (beat 6) dans `transmission-moteur.js`.
 */

interface CasLie {
  id: string;
  label: string;
  dCM: number;
  alleles: [string, string, string, string]; // [A1, B1, A2, B2]
  parts: [number, number, number, number]; // [par1, par2, rec1, rec2] en %
  noms: [string, string, string, string];
  note: string;
}

const CAS_LIES: CasLie[] = [
  {
    id: "svt24r",
    label: `SVT 2024 R (${frNum(SV24R_REC, 0)} cM)`,
    dCM: SV24R_REC,
    alleles: ["G", "L", "g", "ℓ"],
    parts: [SV24R.GL, SV24R.gl, SV24R.Gl, SV24R.gL],
    noms: ["[G, L]", "[g, ℓ]", "[G, ℓ]", "[g, L]"],
    note: `Test-cross F1 × g ℓ // g ℓ : ${frNum(SV24R_PAR, 0)} % de parentaux et ${frNum(SV24R_REC, 0)} % de recombinés (distance = ${frNum(SV24R_REC, 0)} cM).`,
  },
  {
    id: "svt22n",
    label: `SVT 2022 N (${frNum(SV22_D, 0)} cM)`,
    dCM: SV22_D,
    alleles: ["vg⁺", "b⁺", "vg", "b"],
    parts: [SV22_PAR, SV22_PAR, SV22_REC, SV22_REC],
    noms: ["[vg⁺, b⁺]", "[vg, b]", "[vg⁺, b]", "[vg, b⁺]"],
    note: `Loci séparés de ${frNum(SV22_D, 0)} cM : deux classes parentales à ${frNum(SV22_PAR, 1)} % et deux classes recombinées à ${frNum(SV22_REC, 1)} %.`,
  },
  {
    id: "ex20",
    label: `Test-cross (${frNum(EX_D, 0)} cM)`,
    dCM: EX_D,
    alleles: ["A", "B", "a", "b"],
    parts: [
      (EX_TC.AB / EX_N) * 100,
      (EX_TC.ab / EX_N) * 100,
      (EX_TC.Ab / EX_N) * 100,
      (EX_TC.aB / EX_N) * 100,
    ],
    noms: ["[A, B]", "[a, b]", "[A, b]", "[a, B]"],
    note: `Sur ${EX_N} descendants : ${EX_TC.AB} + ${EX_TC.ab} parentaux et ${EX_TC.Ab} + ${EX_TC.aB} recombinés → ${frNum(EX_D, 0)} % = ${frNum(EX_D, 0)} cM.`,
  },
];

export function MaquetteTransmissionLies() {
  const [casIdx, setCasIdx] = useState(0);
  const cas = CAS_LIES[casIdx];

  // u ∈ [0, 2] : 0 = chromosomes F1 sans échange ; 1 = crossing-over ; 2 = proportions du test-cross
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
    max: 2,
    vitesse: 0.65,
    palierSuivant: (prev) => (prev < 0.85 ? 1 : prev < 1.85 ? 2 : 0),
  });

  const rejouer = () => {
    if (reducedMotion) fixer(0);
    else lancerVers(2, 0);
  };

  const coPhase = easeCalm(clamp(u, 0, 1));
  const tcPhase = easeCalm(clamp(u - 1, 0, 1));
  const crossAmp = u <= 0.5 ? easeCalm(u * 2) : u <= 1.2 ? 1 - easeCalm(clamp((u - 0.5) / 0.7, 0, 1)) : 0;
  const swapped = u >= 0.65;

  const [A1, B1, A2, B2] = cas.alleles;
  const cx1 = 104;
  const cx2 = 140;
  const cx3 = 204;
  const cx4 = 240;
  const cy = 228;
  const arm = 76;
  const midY = cy + 20;
  const shift = 52 * crossAmp;

  // Largeurs des 4 barres du test-cross (à droite, x = 408..680)
  const barMaxW = 240;
  const barres = cas.parts.map((pct, i) => {
    const isRec = i >= 2;
    const j = calculerJauge(pct, 55, barMaxW);
    return {
      nom: cas.noms[i],
      pct,
      isRec,
      w: lerp(isRec ? 0 : j.largeur * 0.6, j.largeur, tcPhase),
    };
  });

  return (
    <section className="mq-card" aria-label={ty("Maquette animée : deux gènes liés et test-cross")}>
      <div className="border-b border-subtle bg-surface-container-low px-4 py-2.5 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-caption bp-medium:text-body-sm">
        <span className="text-primary font-semibold">
          {ty(`Parentaux : ${frNum(cas.parts[0] + cas.parts[1], 1)} %`)}
        </span>
        <span className="text-signal font-semibold">
          {ty(`Recombinés : ${frNum(cas.parts[2] + cas.parts[3], 1)} %`)}
        </span>
        <span className="text-secondary">
          {ty(`Distance : ${frNum(cas.dCM, 0)} cM`)}
        </span>
      </div>

      <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-3">
        <svg
          viewBox="0 0 760 500"
          className="mq-svg"
          role="img"
          aria-label={ty("Deux gènes liés sur une paire de chromosomes homologues, crossing-over et proportions des quatre classes du test-cross")}
        >
          {/* ===== GAUCHE : CHROMOSOMES PORTANT LES 2 GÈNES LIÉS ===== */}
          <text x={172} y={40} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            {ty("Chromosomes de F1")}
          </text>
          <text x={172} y={72} textAnchor="middle" fontSize={SVG_FS} className="mq-f-sec">
            {ty(u < 0.5 ? "Gènes liés (tétrade)" : u < 1.2 ? "Crossing-over" : "4 gamètes produits")}
          </text>

          {/* c1 : externe parentale 1 (A1 B1) */}
          <path d={`M ${cx1} ${cy - arm} Q ${cx1 + 5} ${cy} ${cx1} ${cy + arm}`} className="mq-s-ink mq-nofill" strokeWidth={7} strokeLinecap="round" />
          {/* c2 : interne 1 (A1 B1 -> A1 B2) */}
          <path d={`M ${cx2} ${cy - arm} Q ${cx2 - 5} ${cy} ${cx2 + shift * 0.25} ${midY}`} className="mq-s-ink mq-nofill" strokeWidth={7} strokeLinecap="round" />
          <path
            d={`M ${cx2 + shift * 0.25} ${midY} Q ${cx2 + shift * 0.7} ${cy + 50} ${cx2 + shift} ${cy + arm}`}
            className={`${swapped ? "mq-s-sig" : "mq-s-ink"} mq-nofill`}
            strokeWidth={7}
            strokeLinecap="round"
          />
          {/* c3 : interne 2 (A2 B2 -> A2 B1) */}
          <path d={`M ${cx3} ${cy - arm} Q ${cx3 + 5} ${cy} ${cx3 - shift * 0.25} ${midY}`} className="mq-s-sig mq-nofill" strokeWidth={7} strokeLinecap="round" />
          <path
            d={`M ${cx3 - shift * 0.25} ${midY} Q ${cx3 - shift * 0.7} ${cy + 50} ${cx3 - shift} ${cy + arm}`}
            className={`${swapped ? "mq-s-ink" : "mq-s-sig"} mq-nofill`}
            strokeWidth={7}
            strokeLinecap="round"
          />
          {/* c4 : externe parentale 2 (A2 B2) */}
          <path d={`M ${cx4} ${cy - arm} Q ${cx4 - 5} ${cy} ${cx4} ${cy + arm}`} className="mq-s-sig mq-nofill" strokeWidth={7} strokeLinecap="round" />

          {/* Deux centromères */}
          <circle cx={(cx1 + cx2) / 2} cy={cy} r={8} className="mq-f-stage mq-s-ink" strokeWidth={3} />
          <circle cx={(cx3 + cx4) / 2} cy={cy} r={8} className="mq-f-stage mq-s-sig" strokeWidth={3} />

          {/* Allèles en haut et en bas */}
          <text x={cx1} y={cy - arm - 14} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">{A1}</text>
          <text x={cx2} y={cy - arm - 14} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">{A1}</text>
          <text x={cx3} y={cy - arm - 14} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">{A2}</text>
          <text x={cx4} y={cy - arm - 14} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">{A2}</text>

          <text x={cx1} y={cy + arm + 30} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">{B1}</text>
          <text x={cx2 + shift} y={cy + arm + 30} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className={swapped ? "mq-f-sig" : "mq-f-ink"}>
            {swapped ? B2 : B1}
          </text>
          <text x={cx3 - shift} y={cy + arm + 30} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className={swapped ? "mq-f-ink" : "mq-f-sig"}>
            {swapped ? B1 : B2}
          </text>
          <text x={cx4} y={cy + arm + 30} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">{B2}</text>

          {/* Résumé des gamètes sous les chromosomes */}
          <g opacity={0.35 + 0.65 * coPhase}>
            <text x={172} y={392} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {ty(`Parentaux : ${A1} ${B1}, ${A2} ${B2}`)}
            </text>
            <text x={172} y={428} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
              {ty(swapped ? `Recomb. : ${A1} ${B2}, ${A2} ${B1}` : "Recomb. : aucun")}
            </text>
          </g>

          {/* Flèche de lien vers le test-cross */}
          <line x1={290} y1={228} x2={342} y2={228} className="mq-s-dim" strokeWidth={2.5} />
          <polygon points="350,228 336,221 336,235" className="mq-f-dim" />

          {/* ===== DROITE : PROPORTIONS DU TEST-CROSS ===== */}
          <text x={552} y={40} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            {ty("Test-cross (F1 × récessif)")}
          </text>
          <text x={552} y={72} textAnchor="middle" fontSize={SVG_FS} className="mq-f-sec">
            {ty("2 grandes + 2 petites classes")}
          </text>

          {barres.map((b, i) => {
            const y = 122 + i * 76;
            const visibleOp = b.isRec ? tcPhase : 0.4 + 0.6 * tcPhase;
            return (
              <g key={b.nom} opacity={visibleOp}>
                <text x={370} y={y + 22} textAnchor="start" fontSize={SVG_FS} fontWeight={700} className={b.isRec ? "mq-f-sig" : "mq-f-ink"}>
                  {b.nom}
                </text>
                <rect x={486} y={y} width={barMaxW} height={28} rx={4} className="mq-f-panel mq-s-line" strokeWidth={1.5} />
                {b.w > 1 && (
                  <rect
                    x={486}
                    y={y}
                    width={b.w}
                    height={28}
                    rx={4}
                    className={b.isRec ? "mq-f-sig" : "mq-f-ink"}
                  />
                )}
                <text
                  x={486}
                  y={y + 56}
                  textAnchor="start"
                  fontSize={SVG_FS}
                  fontWeight={700}
                  className={b.isRec ? "mq-f-sig" : "mq-f-sec"}
                >
                  {ty(`${frNum(b.pct, cas.id === "svt24r" ? 2 : 1)} %`)}
                </text>
              </g>
            );
          })}

          {/* Formule finale d cM = % recombinés */}
          <g opacity={tcPhase}>
            <rect x={370} y={432} width={362} height={46} rx={6} className="mq-f-panel mq-s-sig" strokeWidth={2} />
            <text x={551} y={463} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
              {ty(`% recomb. = ${frNum(cas.dCM, 0)} % → d = ${frNum(cas.dCM, 0)} cM`)}
            </text>
          </g>
        </svg>
      </div>

      <div className="p-4 bp-medium:p-6 space-y-4">
        <div className="space-y-1">
          <p className="font-mono text-caption text-secondary">
            {ty(`Gènes liés (linkage relatif) · ${cas.label}`)}
          </p>
          <h3 className="font-display text-h4 font-bold text-primary">
            {ty("Plus les gènes sont éloignés, plus le crossing-over produit de recombinés")}
          </h3>
          <p className="text-body-sm text-secondary max-w-reading">{ty(cas.note)}</p>
        </div>

        {/* Choix du sujet / distance */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={ty("Exemples de test-cross à gènes liés")}>
          {CAS_LIES.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={casIdx === idx}
              onClick={() => setCasIdx(idx)}
              className="mq-seg text-caption"
            >
              {ty(c.label)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={togglePlay} className="mq-btn mq-btn-primary">
            {playing ? "Pause" : u >= 1.95 ? "Rejouer" : "Lancer"}
          </button>
          <button type="button" onClick={rejouer} className="mq-btn">
            {ty("Depuis le début")}
          </button>
          <button
            type="button"
            aria-pressed={u < 0.35}
            onClick={() => (reducedMotion ? fixer(0) : lancerVers(0))}
            className="mq-seg text-caption"
          >
            {ty("1. Tétrade")}
          </button>
          <button
            type="button"
            aria-pressed={u >= 0.35 && u < 1.35}
            onClick={() => (reducedMotion ? fixer(1) : lancerVers(1))}
            className="mq-seg text-caption"
          >
            {ty("2. Crossing-over")}
          </button>
          <button
            type="button"
            aria-pressed={u >= 1.35}
            onClick={() => (reducedMotion ? fixer(2) : lancerVers(2))}
            className="mq-seg text-caption"
          >
            {ty("3. Test-cross")}
          </button>
        </div>

        <label className="block space-y-1">
          <span className="text-caption font-medium text-secondary">
            {ty("Enchaînement : tétrade → crossing-over → proportions du test-cross")}
          </span>
          <input
            type="range"
            min={0}
            max={2}
            step={0.01}
            value={u}
            onChange={(e) => fixer(Number(e.target.value))}
            className="mq-slider"
            aria-label={ty("Avancement du crossing-over vers le test-cross")}
          />
        </label>
      </div>
    </section>
  );
}
