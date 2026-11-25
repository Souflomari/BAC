"use client";

import { useState } from "react";
import { clamp, easeCalm, SVG_FS, trouverPalier, ty, useLectureAnimee } from "./outils";

/**
 * Maquette 4 — Logarithme : la table des puissances (Stifel / Napier).
 * L'arc « + » sur la ligne des exposants et l'arc « × » sur la ligne des puissances
 * se tracent ensemble pour montrer pourquoi multiplier en bas revient à additionner en haut.
 * Étapes cibles : `exemple` (4 × 8 = 32) et `pick` (16 × 32 = 512) dans logarithme-moteur.js.
 */

interface Paire {
  id: string;
  a: number; // exposant 1
  b: number; // exposant 2
  label: string;
}

const PAIRES: Paire[] = [
  { id: "4x8", a: 2, b: 3, label: "4 × 8 (exemple)" },
  { id: "16x32", a: 4, b: 5, label: "16 × 32 (défi)" },
  { id: "8x64", a: 3, b: 6, label: "8 × 64 (vérifie)" },
];

const PALIERS = [
  {
    u: 0,
    court: "1. Table au repos",
    titre: "Deux lignes qui avancent ensemble : +1 en haut, ×2 en bas",
    texte:
      "Chaque colonne associe un pas n (l’exposant) à sa puissance 2ⁿ. Choisis deux facteurs ou lance le geste.",
  },
  {
    u: 1,
    court: "2. Repérage",
    titre: "On lit l’exposant de chaque facteur dans la ligne du haut",
    texte:
      "Plutôt que de poser la multiplication, on remonte verticalement vers les deux pas correspondants.",
  },
  {
    u: 2,
    court: "3. Arcs « + » et « × »",
    titre: "Additionner les pas en haut équivaut à multiplier les puissances en bas",
    texte:
      "Les deux arcs avancent ensemble : le saut additif +b sur les exposants produit le même déplacement que le facteur ×2ᵇ en bas.",
  },
  {
    u: 3,
    court: "4. Lecture directe",
    titre: "On redescend sous la somme des pas pour lire le produit exact",
    texte:
      "C’est l’identité fondamentale des logarithmes : log₂(A × B) = log₂(A) + log₂(B).",
  },
] as const;

export function MaquetteLogarithme() {
  const [paire, setPaire] = useState<Paire>(PAIRES[0]);

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

  // Table de 0 à 10 : on affiche 11 colonnes compactes ou une fenêtre de 8 colonnes centrée sur [0..max(a+b+1, 7)]
  const somme = paire.a + paire.b;
  const maxCol = Math.max(7, somme);
  const cols = Array.from({ length: maxCol + 1 }, (_, i) => i);
  const X0 = 86;
  const X1 = 736;
  const colW = (X1 - X0) / cols.length;
  const cx = (idx: number) => X0 + (idx + 0.5) * colW;

  const Y_TOP = 198;
  const Y_BOT = 278;
  const CELL_H = 62;

  const pRepere = easeCalm(clamp(u, 0, 1));
  const pArcs = easeCalm(clamp(u - 1, 0, 1));
  const pResult = easeCalm(clamp(u - 2, 0, 1));

  // Coordonnées des arcs synchronisés : arc "+" au-dessus (a → a+b) et arc "×" en dessous (a → a+b)
  const xA = cx(paire.a);
  const xB = cx(paire.b);
  const xS = cx(somme);
  const xMid = (xA + xS) / 2;
  const arcTopY = 86;
  const arcBotY = 434;

  // Point courant le long des deux courbes quadratiques synchronisées (même paramètre t = pArcs)
  const qPt = (x0: number, y0: number, xC: number, yC: number, x2: number, y2: number, t: number) => {
    const mt = 1 - t;
    return [mt * mt * x0 + 2 * mt * t * xC + t * t * x2, mt * mt * y0 + 2 * mt * t * yC + t * t * y2] as const;
  };
  const [topDotX, topDotY] = qPt(xA, Y_TOP - 8, xMid, arcTopY, xS, Y_TOP - 8, pArcs);
  const [botDotX, botDotY] = qPt(xA, Y_BOT + CELL_H + 8, xMid, arcBotY, xS, Y_BOT + CELL_H + 8, pArcs);

  const valA = Math.pow(2, paire.a);
  const valB = Math.pow(2, paire.b);
  const valS = Math.pow(2, somme);

  return (
    <article className="mq-card" aria-labelledby="mq-log-titre">
      <div className="border-b border-subtle px-4 py-3 bp-medium:px-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="mq-log-titre" className="font-display text-body-lg font-semibold text-primary">
          {ty("Logarithme : arc « + » sur les exposants et arc « × » sur les puissances")}
        </h2>
        <span className="font-mono text-caption text-secondary">{ty("Maths · table de Stifel")}</span>
      </div>

      <div className="grid grid-cols-1 bp-large:grid-cols-12">
        <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-4 bp-large:col-span-7 bp-large:border-b-0 bp-large:border-r bp-large:border-subtle">
          <svg
            viewBox="0 0 760 500"
            className="mq-svg"
            role="img"
            aria-label={ty(
              "Table des puissances de 2 couplant un arc additif sur les exposants et un arc multiplicatif sur les puissances"
            )}
          >
            {/* En-tête */}
            <text x={20} y={36} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {`${valA} × ${valB} = ?`}
            </text>
            <text x={740} y={36} textAnchor="end" fontSize={SVG_FS} className="mq-f-sig mq-mono">
              {pResult > 0.35 ? `${paire.a} + ${paire.b} = ${somme} → ${valS}` : `2^${paire.a} × 2^${paire.b}`}
            </text>

            {/* Étiquettes de lignes */}
            <text x={20} y={Y_TOP + 40} fontSize={SVG_FS} fontWeight={700} className="mq-f-sec mq-mono">
              pas
            </text>
            <text x={20} y={Y_BOT + 40} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink mq-mono">
              2ⁿ
            </text>

            {/* Grille des deux lignes */}
            {cols.map((n) => {
              const xCell = X0 + n * colW;
              const isFactor = (n === paire.a || n === paire.b) && pRepere > 0.1;
              const isSum = n === somme && pResult > 0.15;
              return (
                <g key={n}>
                  <rect
                    x={xCell + 2}
                    y={Y_TOP}
                    width={colW - 4}
                    height={CELL_H}
                    className={isSum ? "mq-f-sig-soft mq-s-sig" : isFactor ? "mq-f-ink-soft mq-s-ink" : "mq-f-panel mq-s-line"}
                    strokeWidth={isSum || isFactor ? 2.5 : 1.5}
                  />
                  <text
                    x={cx(n)}
                    y={Y_TOP + 40}
                    textAnchor="middle"
                    fontSize={SVG_FS}
                    fontWeight={isSum || isFactor ? 700 : 500}
                    className={isSum ? "mq-f-sig mq-mono" : "mq-f-ink mq-mono"}
                  >
                    {String(n)}
                  </text>

                  <rect
                    x={xCell + 2}
                    y={Y_BOT}
                    width={colW - 4}
                    height={CELL_H}
                    className={isSum ? "mq-f-sig-soft mq-s-sig" : isFactor ? "mq-f-ink-soft mq-s-ink" : "mq-f-stage mq-s-line"}
                    strokeWidth={isSum || isFactor ? 2.5 : 1.5}
                  />
                  <text
                    x={cx(n)}
                    y={Y_BOT + 40}
                    textAnchor="middle"
                    fontSize={SVG_FS}
                    fontWeight={isSum || isFactor ? 700 : 400}
                    className={isSum ? "mq-f-sig mq-mono" : "mq-f-ink mq-mono"}
                  >
                    {String(Math.pow(2, n))}
                  </text>
                </g>
              );
            })}

            {/* Flèches verticales de repérage (palier 1) */}
            {pRepere > 0.05 && (
              <g opacity={pRepere}>
                <line x1={xA} y1={Y_BOT} x2={xA} y2={Y_TOP + CELL_H} className="mq-s-ink" strokeWidth={3} strokeDasharray="4 4" />
                <line x1={xB} y1={Y_BOT} x2={xB} y2={Y_TOP + CELL_H} className="mq-s-ink" strokeWidth={3} strokeDasharray="4 4" />
              </g>
            )}

            {/* Arc "+" au-dessus et arc "×" en dessous, tracés simultanément (palier 2) */}
            {pArcs > 0.02 && (
              <g>
                <path
                  d={`M ${xA} ${Y_TOP - 8} Q ${xMid} ${arcTopY} ${xS} ${Y_TOP - 8}`}
                  className="mq-nofill mq-s-sig"
                  strokeWidth={4}
                  pathLength={100}
                  strokeDasharray={100}
                  strokeDashoffset={100 * (1 - pArcs)}
                />
                <circle cx={topDotX} cy={topDotY} r={6.5} className="mq-f-sig" />
                <text
                  x={xMid}
                  y={104}
                  textAnchor="middle"
                  fontSize={SVG_FS}
                  fontWeight={700}
                  className="mq-f-sig mq-mono"
                  opacity={clamp(pArcs * 1.4, 0, 1)}
                >
                  {`+ ${paire.b}`}
                </text>

                <path
                  d={`M ${xA} ${Y_BOT + CELL_H + 8} Q ${xMid} ${arcBotY} ${xS} ${Y_BOT + CELL_H + 8}`}
                  className="mq-nofill mq-s-ink"
                  strokeWidth={4}
                  pathLength={100}
                  strokeDasharray={100}
                  strokeDashoffset={100 * (1 - pArcs)}
                />
                <circle cx={botDotX} cy={botDotY} r={6.5} className="mq-f-ink" />
                <text
                  x={xMid}
                  y={422}
                  textAnchor="middle"
                  fontSize={SVG_FS}
                  fontWeight={700}
                  className="mq-f-ink mq-mono"
                  opacity={clamp(pArcs * 1.4, 0, 1)}
                >
                  {`× ${valB}`}
                </text>
              </g>
            )}

            {/* Descente finale vers le résultat (palier 3) */}
            {pResult > 0.05 && (
              <g opacity={pResult}>
                <line x1={xS} y1={Y_TOP + CELL_H} x2={xS} y2={Y_BOT} className="mq-s-sig" strokeWidth={4} />
                <text x={380} y={482} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink mq-mono">
                  {`2^${paire.a} × 2^${paire.b} = 2^(${paire.a}+${paire.b}) = ${valS}`}
                </text>
              </g>
            )}
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

            <div className="flex flex-wrap items-center gap-2">
              {PAIRES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={paire.id === p.id}
                  onClick={() => {
                    setPaire(p);
                    fixer(0);
                  }}
                  className="mq-seg"
                >
                  {ty(p.label)}
                </button>
              ))}
            </div>

            <div className="grid gap-1">
              <div className="flex items-center justify-between text-caption text-secondary">
                <label htmlFor="mq-log-slider">{ty("Curseur élève")}</label>
                <output htmlFor="mq-log-slider" className="font-mono">
                  {`Palier ${palierIdx + 1} / ${PALIERS.length}`}
                </output>
              </div>
              <input
                id="mq-log-slider"
                type="range"
                min={0}
                max={3}
                step={0.02}
                value={u}
                onChange={(e) => fixer(Number(e.target.value))}
                className="mq-slider"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
