"use client";

import { clamp, creerRepere, easeCalm, lerp, SVG_FS, trouverPalier, ty, useLectureAnimee } from "./outils";
import { T14 } from "../radioactivite-outils";

/**
 * Maquette 6 — Radioactivité β⁻ du carbone 14 couplée au diagramme (N, Z).
 * À gauche : un neutron du noyau ¹⁴₆C se transforme en proton en éjectant un électron β⁻.
 * À droite : au même instant, le noyau saute en diagonale de (N=8 ; Z=6) vers (N=7 ; Z=7)
 * sur la vallée de stabilité (N = Z).
 * Étapes cibles : `c14` et `nz` (beat 2) dans `radioactivite-moteur.js`.
 */

const PALIERS = [
  {
    u: 0,
    court: "1. Noyau ¹⁴C",
    titre: "Carbone 14 : 6 protons et 8 neutrons (au-dessus de la stabilité)",
    texte: `Avec N = 8 et Z = 6 (demi-vie ${T14.toLocaleString("fr-FR")} ans), le noyau possède un excès de neutrons par rapport à la vallée N = Z.`,
  },
  {
    u: 1,
    court: "2. Transmutation",
    titre: "Un neutron devient proton et éjecte un électron β⁻",
    texte:
      "Un neutron interne se transforme en proton : la charge électrique totale reste conservée grâce à l’émission de ⁰₋₁e (et d’un antineutrino).",
  },
  {
    u: 2,
    court: "3. Saut sur (N, Z)",
    titre: "N diminue de 1 et Z augmente de 1 : vecteur (−1 ; +1)",
    texte:
      "Sur le diagramme (N, Z), le point quitte la zone β⁻ en diagonale vers le haut-gauche, à nombre de nucléons A = N + Z = 14 constant.",
  },
  {
    u: 3,
    court: "4. Azote 14 stable",
    titre: "¹⁴₆C → ¹⁴₇N + ⁰₋₁e : le noyau fils rejoint la vallée de stabilité",
    texte:
      "L’élément chimique a changé (Z = 7 : azote), tandis que le nombre de masse A = 14 est inchangé.",
  },
] as const;

// 14 nucléons déterministes en grappe serrée (6 protons initiaux + 7 neutrons spectateurs + 1 neutron actif index 13)
const NUCLEONS: { dx: number; dy: number; isProtonInit: boolean; actif?: boolean }[] = [
  { dx: -44, dy: -26, isProtonInit: true },
  { dx: -14, dy: -44, isProtonInit: false },
  { dx: 20, dy: -40, isProtonInit: true },
  { dx: 46, dy: -18, isProtonInit: false },
  { dx: -52, dy: 8, isProtonInit: false },
  { dx: -20, dy: -8, isProtonInit: true },
  { dx: 12, dy: -8, isProtonInit: false },
  { dx: 46, dy: 16, isProtonInit: true },
  { dx: -36, dy: 38, isProtonInit: true },
  { dx: -4, dy: 26, isProtonInit: false },
  { dx: 26, dy: 38, isProtonInit: false },
  { dx: -18, dy: 52, isProtonInit: false },
  { dx: 12, dy: 56, isProtonInit: true },
  { dx: 34, dy: -46, isProtonInit: false, actif: true }, // le neutron qui vire au proton !
];

export function MaquetteRadioactivite() {
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

  // pTrans : conversion neutron -> proton (u ∈ [0,5 ; 1,5]), pJump : saut sur (N,Z) (u ∈ [1 ; 2,2])
  const pTrans = easeCalm(clamp((u - 0.45) / 0.9, 0, 1));
  const pEject = easeCalm(clamp((u - 0.65) / 1.1, 0, 1));
  const pJump = easeCalm(clamp((u - 1.0) / 1.15, 0, 1));

  // Centre du noyau à gauche
  const NCX = 186;
  const NCY = 248;

  // Diagramme (N, Z) à droite : N ∈ [5 ; 9], Z ∈ [5 ; 9] (orthonormé carré 280 × 280)
  const rep = creerRepere({
    x0: 444,
    y0: 382,
    w: 280,
    h: 280,
    xMin: 5,
    xMax: 9,
    yMin: 5,
    yMax: 9,
  });

  const curN = lerp(8, 7, pJump);
  const curZ = lerp(6, 7, pJump);
  const isN14 = pJump > 0.65;

  return (
    <article className="mq-card" aria-labelledby="mq-rad-titre">
      <div className="border-b border-subtle px-4 py-3 bp-medium:px-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="mq-rad-titre" className="font-display text-body-lg font-semibold text-primary">
          {ty("Radioactivité β⁻ : un neutron devient proton et le point saute sur (N, Z)")}
        </h2>
        <span className="font-mono text-caption text-secondary">{ty("PC · désintégration β⁻")}</span>
      </div>

      <div className="grid grid-cols-1 bp-large:grid-cols-12">
        <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-4 bp-large:col-span-7 bp-large:border-b-0 bp-large:border-r bp-large:border-subtle">
          <svg
            viewBox="0 0 760 500"
            className="mq-svg"
            role="img"
            aria-label={ty(
              "Désintégration bêta moins du carbone 14 couplée au déplacement diagonal sur le diagramme (N, Z)"
            )}
          >
            {/* En-tête */}
            <text x={20} y={36} fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              {isN14 ? ty("Noyau fils : ¹⁴₇N") : ty("Noyau père : ¹⁴₆C")}
            </text>
            <text x={740} y={36} textAnchor="end" fontSize={SVG_FS} className="mq-f-sig mq-mono">
              {`Z = ${isN14 ? 7 : 6} · N = ${isN14 ? 7 : 8} · A = 14`}
            </text>

            {/* ==================== GAUCHE : ZOOM SUR LE NOYAU ==================== */}
            <circle cx={NCX} cy={NCY} r={112} className="mq-f-panel mq-s-line" strokeWidth={2} strokeDasharray="6 6" />
            {NUCLEONS.map((nuc, idx) => {
              const devientProton = Boolean(nuc.actif && pTrans > 0.45);
              const estProton = nuc.isProtonInit || devientProton;
              return (
                <g key={idx}>
                  <circle
                    cx={NCX + nuc.dx}
                    cy={NCY + nuc.dy}
                    r={nuc.actif ? 18 : 15}
                    className={
                      nuc.actif
                        ? devientProton
                          ? "mq-f-sig mq-s-ink"
                          : "mq-f-stage mq-s-sig"
                        : estProton
                          ? "mq-f-ink mq-s-stage"
                          : "mq-f-stage mq-s-line"
                    }
                    strokeWidth={nuc.actif ? 3 : 2}
                  />
                </g>
              );
            })}

            {/* Électron β⁻ éjecté vers l'extérieur */}
            {pEject > 0.04 && (
              <g opacity={clamp(pEject * 1.5, 0, 1)}>
                <line
                  x1={NCX + 34}
                  y1={NCY - 46}
                  x2={lerp(NCX + 46, 344, pEject)}
                  y2={lerp(NCY - 58, 126, pEject)}
                  className="mq-s-sig"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                />
                <circle cx={lerp(NCX + 46, 344, pEject)} cy={lerp(NCY - 58, 126, pEject)} r={9} className="mq-f-sig" />
                <text
                  x={lerp(NCX + 64, 348, pEject)}
                  y={lerp(NCY - 68, 108, pEject)}
                  textAnchor="middle"
                  fontSize={SVG_FS}
                  fontWeight={700}
                  className="mq-f-sig"
                >
                  β⁻
                </text>
              </g>
            )}

            {/* Légende minimale sous le noyau */}
            <text x={NCX} y={404} textAnchor="middle" fontSize={SVG_FS} className="mq-f-ink mq-mono">
              {pTrans > 0.5 ? "n → p⁺ + e⁻" : "6 p⁺ et 8 n"}
            </text>

            {/* ==================== DROITE : DIAGRAMME (N, Z) ==================== */}
            {/* Bande de stabilité N = Z */}
            <polygon
              points={`${rep.X(5)},${rep.Y(5.35)} ${rep.X(8.65)},${rep.Y(9)} ${rep.X(9)},${rep.Y(9)} ${rep.X(9)},${rep.Y(8.65)} ${rep.X(5.35)},${rep.Y(5)} ${rep.X(5)},${rep.Y(5)}`}
              className="mq-f-ink-soft"
            />
            <line x1={rep.X(5)} y1={rep.Y(5)} x2={rep.X(9)} y2={rep.Y(9)} className="mq-s-dim" strokeWidth={2} strokeDasharray="6 6" />

            {/* Axes N et Z */}
            <line x1={rep.x0} y1={rep.y0} x2={rep.x0 + rep.w} y2={rep.y0} className="mq-s-line" strokeWidth={2} />
            <line x1={rep.x0} y1={rep.y0 - rep.h} x2={rep.x0} y2={rep.y0} className="mq-s-line" strokeWidth={2} />
            {[6, 7, 8].map((v) => (
              <g key={v}>
                <text x={rep.X(v)} y={rep.y0 + 30} textAnchor="middle" fontSize={SVG_FS} className="mq-f-dim mq-mono">
                  {String(v)}
                </text>
                <text x={rep.x0 - 12} y={rep.Y(v) + 8} textAnchor="end" fontSize={SVG_FS} className="mq-f-dim mq-mono">
                  {String(v)}
                </text>
              </g>
            ))}
            <text x={rep.x0 + rep.w} y={rep.y0 + 30} textAnchor="end" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              N
            </text>
            <text x={rep.x0 - 12} y={rep.y0 - rep.h + 10} textAnchor="end" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
              Z
            </text>
            <text x={rep.X(8.9)} y={rep.Y(8.3)} textAnchor="end" fontSize={SVG_FS} className="mq-f-dim">
              N = Z
            </text>

            {/* Point initial ¹⁴C (8 ; 6), flèche diagonale (−1 ; +1) et point mobile */}
            <circle cx={rep.X(8)} cy={rep.Y(6)} r={7} className="mq-f-stage mq-s-dim" strokeWidth={2.5} />
            <text x={rep.X(8) + 12} y={rep.Y(6) + 8} fontSize={SVG_FS} className="mq-f-sec mq-mono">
              ¹⁴C
            </text>
            {pJump > 0.03 && (
              <line
                x1={rep.X(8)}
                y1={rep.Y(6)}
                x2={rep.X(curN)}
                y2={rep.Y(curZ)}
                className="mq-s-sig"
                strokeWidth={3.5}
              />
            )}
            <circle cx={rep.X(curN)} cy={rep.Y(curZ)} r={9} className="mq-f-sig" />
            {pJump > 0.7 && (
              <text x={rep.X(7) - 14} y={rep.Y(7) - 12} textAnchor="end" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig mq-mono">
                ¹⁴N
              </text>
            )}

            {/* Équation bilan en bas */}
            <text x={380} y={482} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink mq-mono">
              {ty("¹⁴₆C → ¹⁴₇N + ⁰₋₁e")}
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
                <label htmlFor="mq-rad-slider">{ty("Curseur élève")}</label>
                <output htmlFor="mq-rad-slider" className="font-mono">
                  {`Palier ${palierIdx + 1} / ${PALIERS.length}`}
                </output>
              </div>
              <input
                id="mq-rad-slider"
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
                "Lois de Soddy vérifiées : A = 14 = 14 + 0 et Z = 6 = 7 + (−1). L’antineutrino électronique est hors programme du bac marocain et signalé en texte uniquement."
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
