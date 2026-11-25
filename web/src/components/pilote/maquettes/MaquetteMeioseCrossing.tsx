"use client";

import { clamp, easeCalm, lerp, SVG_FS, trouverPalier, ty, useLectureAnimee } from "./outils";
import { gametes, RECOMBINEES } from "../meiose-outils";

/**
 * Maquette 10 — Méiose : le crossing-over (chiasma entre chromatides non sœurs
 * puis suivi des quatre chromatides dans les quatre gamètes).
 *
 * Même grammaire graphique que MaquetteMeiose (chromosomes verticaux bichromatidiens
 * à un seul centromère par chromosome), avec bras supérieur (locus A / a) et bras
 * inférieur (locus D / d) qui s'échangent uniquement sur les deux chromatides
 * internes (non sœurs).
 *
 * Valeurs vérifiées par `gametes(0, 1)` et `RECOMBINEES` de `meiose-outils.js`.
 * Étapes cibles : `chiasma`, `echange`, `v-intra` (beat 6) dans `meiose-moteur.js`.
 */

const GAM_CO = (gametes(0, 1) as string[]).map((g) => g.split(" ")[0]); // ["AD", "Ad", "aD", "ad"]
const NB_REC: number = RECOMBINEES; // 2

const PALIERS = [
  {
    u: 0,
    court: "1. Tétrade",
    titre: "Prophase I : les deux homologues s’accolent en tétrade",
    texte:
      "La grande paire réunit 4 chromatides : deux chromatides sœurs paternelles (A D, rouge signal) et deux chromatides sœurs maternelles (a d, encre), chacune liée par son centromère.",
  },
  {
    u: 1,
    court: "2. Chiasma",
    titre: "Chiasma : deux chromatides NON sœurs se croisent",
    texte:
      "Seules les deux chromatides internes, issues chacune d’un homologue différent, se chevauchent entre les loci A/a et D/d. Échanger deux chromatides sœurs identiques ne changerait rien.",
  },
  {
    u: 2,
    court: "3. Échange",
    titre: "Échange accompli : les 4 chromatides sont maintenant différentes",
    texte:
      "Le chiasma se dénoue : les segments inférieurs portant D et d sont échangés. Les deux chromatides externes restent parentales (AD, ad) ; les deux internes sont recombinées (Ad, aD).",
  },
  {
    u: 3,
    court: "4. Division I",
    titre: "Anaphase I puis télophase I : séparation des homologues",
    texte:
      "Les centromères ne se clivent pas. La cellule gauche reçoit le chromosome paternel (chromatides AD et Ad) ; la cellule droite reçoit le chromosome maternel (chromatides aD et ad).",
  },
  {
    u: 4,
    court: "5. 4 gamètes",
    titre: `Division II : 4 types de gamètes (${GAM_CO.join(", ")}), dont ${NB_REC} recombinés`,
    texte:
      "Les centromères se clivent et chaque gamète reçoit une chromatide : deux parentaux (AD, ad) et deux recombinés (Ad, aD). Une seule cellule produit 4 types différents au lieu de 2.",
  },
];

interface ChromatideProps {
  x: number;
  y: number;
  armLen: number;
  curveDir: number; // -1 courbe vers la droite au centromère, +1 vers la gauche
  topPat: boolean;
  botPat: boolean;
  topAllele: string;
  botAllele: string;
  crossShift: number; // décalage horizontal du bout inférieur pendant le chiasma
  showAlleles: boolean;
}

function ChromatideSegmentee({
  x,
  y,
  armLen,
  curveDir,
  topPat,
  botPat,
  topAllele,
  botAllele,
  crossShift,
  showAlleles,
}: ChromatideProps) {
  const topCls = topPat ? "mq-s-sig" : "mq-s-ink";
  const botCls = botPat ? "mq-s-sig" : "mq-s-ink";
  const topFill = topPat ? "mq-f-sig" : "mq-f-ink";
  const botFill = botPat ? "mq-f-sig" : "mq-f-ink";
  const midY = y + armLen * 0.28; // point de cassure / chiasma sur le bras inférieur
  const cx = x + curveDir * 6;
  const botEndX = x + crossShift;

  // Bras supérieur + début du bras inférieur jusqu'au point de chiasma
  const dTop = `M ${x} ${y - armLen} Q ${cx} ${y} ${x + crossShift * 0.25} ${midY}`;
  // Segment inférieur après le point de chiasma (échangé sur les chromatides internes)
  const dBot = `M ${x + crossShift * 0.25} ${midY} Q ${x + crossShift * 0.7} ${y + armLen * 0.65} ${botEndX} ${y + armLen}`;

  return (
    <g>
      <path d={dTop} className={`${topCls} mq-nofill`} strokeWidth={7} strokeLinecap="round" />
      <path d={dBot} className={`${botCls} mq-nofill`} strokeWidth={7} strokeLinecap="round" />
      {showAlleles && (
        <>
          <text
            x={x}
            y={y - armLen - 14}
            textAnchor="middle"
            fontSize={SVG_FS}
            fontWeight={700}
            className={topFill}
          >
            {topAllele}
          </text>
          <text
            x={botEndX}
            y={y + armLen + 30}
            textAnchor="middle"
            fontSize={SVG_FS}
            fontWeight={700}
            className={botFill}
          >
            {botAllele}
          </text>
        </>
      )}
    </g>
  );
}

export function MaquetteMeioseCrossing() {
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
    vitesse: 0.65,
    palierSuivant: (prev) => Math.min(4, Math.floor(prev) + 1),
  });

  const allerAuPalier = (k: number) => {
    const dest = clamp(k, 0, 4);
    if (reducedMotion || Math.abs(dest - u) > 1.05 || dest < u) {
      fixer(dest);
      return;
    }
    lancerVers(dest);
  };

  const rejouer = () => {
    if (reducedMotion) fixer(0);
    else lancerVers(4, 0);
  };

  const { index: palierIdx, palier } = trouverPalier(PALIERS, u);

  // Interpolation des positions horizontales des 4 chromatides [c0, c1, c2, c3]
  // c0 = externe paternelle (AD), c1 = interne paternelle (Ad), c2 = interne maternelle (aD), c3 = externe maternelle (ad)
  const seg = Math.min(3, Math.floor(clamp(u, 0, 4)));
  const f = easeCalm(clamp(u - seg, 0, 1));

  // Positions x des 4 chromatides aux paliers 0..4
  const X_KF: [number, number, number, number][] = [
    [300, 344, 416, 460], // 0 : tétrade accolée
    [302, 346, 414, 458], // 1 : chiasma (les bras inférieurs de c1 et c2 se croisent)
    [292, 336, 424, 468], // 2 : échange accompli, chiasma dénoué
    [186, 232, 528, 574], // 3 : division I (2 cellules, centromères intacts)
    [118, 290, 470, 642], // 4 : division II (4 cellules, centromères clivés)
  ];

  const xs = [0, 1, 2, 3].map((i) => lerp(X_KF[seg][i], X_KF[seg + 1][i], f));

  // Décalage de croisement (chiasma) : maximum à u = 1, nul à u = 0 et u >= 2
  const crossAmp = u <= 1 ? easeCalm(clamp(u, 0, 1)) : u <= 2 ? 1 - easeCalm(clamp(u - 1, 0, 1)) : 0;
  const crossShift = 68 * crossAmp;

  // L'échange de couleur/allèle bascule au franchissement du chiasma (u >= 1.45)
  const echangeFait = u >= 1.45;
  const armLen = 78;
  const cy = 248;

  // Séparation des cellules : 1 cellule (u < 2.2), 2 cellules (u = 3), 4 cellules (u = 4)
  const split1 = easeCalm(clamp((u - 2.2) / 0.7, 0, 1));
  const split2 = easeCalm(clamp((u - 3.2) / 0.7, 0, 1));

  // Centromères : 2 centromères communs jusqu'à u = 3.2, puis 4 centromères clivés
  const cenClive = easeCalm(clamp((u - 3.15) / 0.35, 0, 1));

  const chiasmaOp = crossAmp;
  const gamOp = easeCalm(clamp((u - 3.65) / 0.35, 0, 1));

  // Boîtes des cellules [x, w, opacity]
  const c0x = lerp(160, lerp(70, 44, split2), split1);
  const c0w = lerp(440, lerp(296, 148, split2), split1);
  const c1x = lerp(220, 216, split2);
  const c1w = 148;
  const c2x = lerp(394, 396, split2);
  const c2w = lerp(296, 148, split2);
  const c3x = 568;
  const c3w = 148;

  return (
    <section className="mq-card" aria-label={ty("Maquette animée : le crossing-over")}>
      <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-3">
        <svg
          viewBox="0 0 760 500"
          className="mq-svg"
          role="img"
          aria-label={ty("Crossing-over en prophase I entre deux chromatides non sœurs puis séparation en quatre gamètes")}
        >
          {/* Titre de phase */}
          <text x={380} y={40} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            {ty(palier.court)}
          </text>

          {/* Enveloppes cellulaires : 1 -> 2 -> 4 */}
          <rect
            x={c0x}
            y={82}
            width={c0w}
            height={326}
            rx={Math.min(54, c0w / 2)}
            className="mq-f-stage mq-s-line"
            strokeWidth={2.2}
          />
          {split2 > 0.02 && (
            <rect
              x={c1x}
              y={82}
              width={c1w}
              height={326}
              rx={46}
              className="mq-f-stage mq-s-line"
              strokeWidth={2.2}
              opacity={split2}
            />
          )}
          {split1 > 0.02 && (
            <rect
              x={c2x}
              y={82}
              width={c2w}
              height={326}
              rx={Math.min(54, c2w / 2)}
              className="mq-f-stage mq-s-line"
              strokeWidth={2.2}
              opacity={split1}
            />
          )}
          {split2 > 0.02 && (
            <rect
              x={c3x}
              y={82}
              width={c3w}
              height={326}
              rx={46}
              className="mq-f-stage mq-s-line"
              strokeWidth={2.2}
              opacity={split2}
            />
          )}

          {/* Cadre de tétrade au début (u <= 2.2) */}
          {u < 2.2 && (
            <g opacity={1 - split1}>
              <rect
                x={256}
                y={122}
                width={248}
                height={252}
                rx={12}
                className="mq-nofill mq-s-dim"
                strokeWidth={2}
                strokeDasharray="6 6"
              />
              <text x={380} y={108} textAnchor="middle" fontSize={SVG_FS} className="mq-f-sec">
                {ty("tétrade (4 chromatides)")}
              </text>
            </g>
          )}

          {/* Les 4 chromatides */}
          {/* c0 : externe paternelle — reste A D */}
          <ChromatideSegmentee
            x={xs[0]}
            y={cy}
            armLen={armLen}
            curveDir={1}
            topPat={true}
            botPat={true}
            topAllele="A"
            botAllele="D"
            crossShift={0}
            showAlleles={true}
          />
          {/* c1 : interne paternelle — devient A d après échange */}
          <ChromatideSegmentee
            x={xs[1]}
            y={cy}
            armLen={armLen}
            curveDir={-1}
            topPat={true}
            botPat={!echangeFait}
            topAllele="A"
            botAllele={echangeFait ? "d" : "D"}
            crossShift={crossShift}
            showAlleles={true}
          />
          {/* c2 : interne maternelle — devient a D après échange */}
          <ChromatideSegmentee
            x={xs[2]}
            y={cy}
            armLen={armLen}
            curveDir={1}
            topPat={false}
            botPat={echangeFait}
            topAllele="a"
            botAllele={echangeFait ? "D" : "d"}
            crossShift={-crossShift}
            showAlleles={true}
          />
          {/* c3 : externe maternelle — reste a d */}
          <ChromatideSegmentee
            x={xs[3]}
            y={cy}
            armLen={armLen}
            curveDir={-1}
            topPat={false}
            botPat={false}
            topAllele="a"
            botAllele="d"
            crossShift={0}
            showAlleles={true}
          />

          {/* Centromères communs (avant division II) */}
          {cenClive < 0.98 && (
            <g opacity={1 - cenClive}>
              <circle
                cx={(xs[0] + xs[1]) / 2}
                cy={cy}
                r={8}
                className="mq-f-stage mq-s-sig"
                strokeWidth={3.2}
              />
              <circle
                cx={(xs[2] + xs[3]) / 2}
                cy={cy}
                r={8}
                className="mq-f-stage mq-s-ink"
                strokeWidth={3.2}
              />
            </g>
          )}

          {/* Centromères clivés (division II : un par chromatide) */}
          {cenClive > 0.02 && (
            <g opacity={cenClive}>
              {[0, 1, 2, 3].map((i) => (
                <circle
                  key={i}
                  cx={xs[i]}
                  cy={cy}
                  r={7.5}
                  className={`mq-f-stage ${i < 2 ? "mq-s-sig" : "mq-s-ink"}`}
                  strokeWidth={3}
                />
              ))}
            </g>
          )}

          {/* Repère visuel du chiasma (u ≈ 1) */}
          {chiasmaOp > 0.08 && (
            <g opacity={chiasmaOp}>
              <circle
                cx={380}
                cy={cy + armLen * 0.62}
                r={16}
                className="mq-nofill mq-s-sig"
                strokeWidth={2.5}
                strokeDasharray="4 4"
              />
              <text x={524} y={cy + armLen * 0.62 + 8} textAnchor="start" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
                {ty("chiasma")}
              </text>
              <line
                x1={398}
                y1={cy + armLen * 0.62}
                x2={516}
                y2={cy + armLen * 0.62}
                className="mq-s-sig"
                strokeWidth={2}
              />
            </g>
          )}

          {/* Bilan sous les 4 cellules finales */}
          {gamOp > 0.02 && (
            <g opacity={gamOp}>
              {GAM_CO.map((g, i) => {
                const isRec = i === 1 || i === 2;
                return (
                  <g key={g}>
                    <text
                      x={xs[i]}
                      y={442}
                      textAnchor="middle"
                      fontSize={SVG_FS}
                      fontWeight={700}
                      className={isRec ? "mq-f-sig" : "mq-f-ink"}
                    >
                      {g}
                    </text>
                    <text
                      x={xs[i]}
                      y={476}
                      textAnchor="middle"
                      fontSize={SVG_FS}
                      className={isRec ? "mq-f-sig" : "mq-f-sec"}
                    >
                      {isRec ? "recomb." : "parent."}
                    </text>
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* Bandeau de lecture et commandes */}
      <div className="p-4 bp-medium:p-6 space-y-4">
        <div className="space-y-1">
          <p className="font-mono text-caption text-secondary">
            {ty(`Crossing-over · Étape ${palierIdx + 1} / ${PALIERS.length}`)}
          </p>
          <h3 className="font-display text-h4 font-bold text-primary">{ty(palier.titre)}</h3>
          <p className="text-body-sm text-secondary max-w-reading">{ty(palier.texte)}</p>
        </div>

        {/* Barre d'actions principales */}
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={togglePlay} className="mq-btn mq-btn-primary">
            {playing ? "Pause" : u >= 3.98 ? "Rejouer" : "Lancer"}
          </button>
          <button type="button" onClick={rejouer} className="mq-btn">
            {ty("Depuis le début")}
          </button>
          <button
            type="button"
            onClick={() => allerAuPalier(palierIdx - 1)}
            disabled={palierIdx <= 0}
            className="mq-btn"
          >
            {ty("← Précédent")}
          </button>
          <button
            type="button"
            onClick={() => allerAuPalier(palierIdx + 1)}
            disabled={palierIdx >= PALIERS.length - 1}
            className="mq-btn"
          >
            {ty("Suivant →")}
          </button>
        </div>

        {/* Sélecteur direct des 5 paliers */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={ty("Paliers du crossing-over")}>
          {PALIERS.map((p, idx) => (
            <button
              key={p.u}
              type="button"
              aria-pressed={palierIdx === idx}
              onClick={() => allerAuPalier(p.u)}
              className="mq-seg text-caption"
            >
              {ty(p.court)}
            </button>
          ))}
        </div>

        {/* Curseur continu */}
        <label className="block space-y-1">
          <span className="text-caption font-medium text-secondary">
            {ty("Avancement continu (prophase I → chiasma → échange → 4 gamètes)")}
          </span>
          <input
            type="range"
            min={0}
            max={4}
            step={0.01}
            value={u}
            onChange={(e) => fixer(Number(e.target.value))}
            className="mq-slider"
            aria-label={ty("Avancement du crossing-over")}
          />
        </label>
      </div>
    </section>
  );
}
