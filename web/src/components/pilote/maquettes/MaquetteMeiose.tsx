"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clamp, easeCalm, lerp, ty, useReducedMotion } from "./outils";

/**
 * Maquette 1 — La première division de méiose (méiose I) et sa seconde orientation équiprobable.
 *
 * Cellule diploïde 2n = 4 (deux paires d'homologues de tailles distinctes) :
 *   - grande paire : G1 (allèle A, origine paternelle, rouge signal) et G2 (allèle a, origine maternelle, encre) ;
 *   - petite paire : P1 (allèle B, paternelle, rouge signal) et P2 (allèle b, maternelle, encre).
 *
 * Six paliers continus u ∈ [0, 5] pilotés par l'élève (rien ne démarre seul) :
 *   u = 0 : Prophase I (début) — chromosomes dupliqués (2 chromatides sœurs par centromère) dans l'enveloppe nucléaire.
 *   u = 1 : Prophase I (synapsis) — les homologues s'apparient en 2 bivalents (tétrades) ; l'enveloppe s'efface.
 *   u = 2 : Métaphase I (orientation 1) — les centromères homologues s'alignent de part et d'autre du plan équatorial.
 *   u = 3 : Anaphase I → Télophase I (orientation 1) — séparation des homologues (centromères intacts) → (A, B) et (a, b).
 *   u = 4 : Métaphase I (seconde orientation) — la petite paire bascule (P2 à gauche, P1 à droite), grande paire inchangée.
 *   u = 5 : Anaphase I → Télophase I (seconde orientation) — séparation → (A, b) et (a, B) : 4 gamètes équiprobables après M II.
 */

const PALIERS = [
  {
    u: 0,
    court: "1. Avant appariement",
    titre: "Début de prophase I : 2n = 4 chromosomes à deux chromatides",
    texte:
      "Après la réplication (phase S), chacun des 4 chromosomes possède deux chromatides sœurs réunies par un seul centromère. Rouge signal : origine paternelle (A, B) ; encre : origine maternelle (a, b).",
  },
  {
    u: 1,
    court: "2. Appariement",
    titre: "Prophase I : les homologues s’apparient en deux bivalents",
    texte:
      "Chaque chromosome rejoint son homologue de même taille pour former un bivalent (tétrade de 4 chromatides). L’enveloppe nucléaire se fragmente et le fuseau se met en place entre les deux pôles.",
  },
  {
    u: 2,
    court: "3. Alignement (cas 1)",
    titre: "Métaphase I (1re disposition, 50 %) : de part et d’autre de l’équateur",
    texte:
      "Contrairement à la mitose, les centromères ne se posent pas sur la plaque équatoriale mais de part et d’autre : ici A et B font face au pôle gauche, a et b au pôle droit.",
  },
  {
    u: 3,
    court: "4. Séparation (cas 1)",
    titre: "Anaphase I puis télophase I : séparation des homologues → (A, B) et (a, b)",
    texte:
      "Les fibres du fuseau raccourcissent et séparent les chromosomes homologues entiers : les centromères ne clivent pas. On obtient deux cellules haploïdes (n = 2) à chromosomes bichromatidiens : (A, B) et (a, b).",
  },
  {
    u: 4,
    court: "5. 2e orientation",
    titre: "Métaphase I (2e disposition équiprobable, 50 %) : la petite paire s’inverse",
    texte:
      "Les deux bivalents s’orientent indépendamment : si la petite paire place b à gauche et B à droite pendant que A reste à gauche, l’alignement est tout aussi probable (1 chance sur 2).",
  },
  {
    u: 5,
    court: "6. Séparation (cas 2)",
    titre: "Anaphase I puis télophase I (2e disposition) → (A, b) et (a, B)",
    texte:
      "La séparation produit alors les lots recombinés (A, b) et (a, B). Sur un grand nombre de méioses, le brassage interchromosomique engendre 50 % de lots parentaux et 50 % de lots recombinés.",
  },
];

interface ChromState {
  x: number;
  y: number;
  armLen: number;
  paternal: boolean;
  allele: string;
  labelAbove: boolean;
}

/** Calcule les coordonnées exactes des 4 chromosomes bichromatidiens pour u ∈ [0, 5]. */
function computeMeioseState(u: number) {
  const seg = Math.min(4, Math.floor(clamp(u, 0, 5)));
  const f = easeCalm(clamp(u - seg, 0, 1));

  // Positions clés [x, y] aux paliers 0..5 pour G1(A), G2(a), P1(B), P2(b)
  const KF: Record<string, [number, number][]> = {
    G1: [
      [275, 188], // 0 : dispersé dans le noyau
      [310, 186], // 1 : bivalent grand (haut-gauche)
      [322, 186], // 2 : métaphase I cas 1 (gauche de x=380)
      [195, 188], // 3 : télophase I cas 1 (cellule gauche)
      [322, 186], // 4 : métaphase I cas 2 (gauche de x=380)
      [195, 188], // 5 : télophase I cas 2 (cellule gauche)
    ],
    G2: [
      [470, 202],
      [372, 186],
      [438, 186],
      [565, 188],
      [438, 186],
      [565, 188],
    ],
    P1: [
      [330, 302],
      [410, 302], // 1 : bivalent petit
      [332, 302], // 2 : métaphase I cas 1 (P1 à gauche)
      [195, 302], // 3 : télophase I cas 1 (cellule gauche -> A,B)
      [428, 302], // 4 : métaphase I cas 2 (P1 basculé à DROITE !)
      [565, 302], // 5 : télophase I cas 2 (cellule droite -> a,B)
    ],
    P2: [
      [455, 294],
      [462, 302],
      [428, 302], // 2 : métaphase I cas 1 (P2 à droite)
      [565, 302], // 3 : télophase I cas 1 (cellule droite -> a,b)
      [332, 302], // 4 : métaphase I cas 2 (P2 basculé à GAUCHE !)
      [195, 302], // 5 : télophase I cas 2 (cellule gauche -> A,b)
    ],
  };

  // Pendant le basculement 3 -> 4, P1 et P2 décrivent un léger arc vertical pour ne pas se traverser
  const arc = seg === 3 ? Math.sin(Math.PI * clamp(u - 3, 0, 1)) * 24 : 0;

  const posOf = (id: "G1" | "G2" | "P1" | "P2") => {
    const a = KF[id][seg];
    const b = KF[id][seg + 1];
    const dyArc = id === "P1" ? -arc : id === "P2" ? arc : 0;
    return [lerp(a[0], b[0], f), lerp(a[1], b[1], f) + dyArc] as const;
  };

  const [g1x, g1y] = posOf("G1");
  const [g2x, g2y] = posOf("G2");
  const [p1x, p1y] = posOf("P1");
  const [p2x, p2y] = posOf("P2");

  // Enveloppe nucléaire initiale : visible à u=0, disparaît entre u=0,15 et u=0,65
  const nucOpacity = clamp(1 - (u - 0.15) / 0.5, 0, 1);

  // Fuseau et plaque équatoriale : présents pendant métaphase/anaphase (u ∈ [0.7..2.9] et [3.45..4.9])
  let spindleOpacity = 0;
  if (u >= 0.7 && u <= 2.9) {
    spindleOpacity = Math.min(clamp((u - 0.7) / 0.45, 0, 1), clamp((2.9 - u) / 0.35, 0, 1));
  } else if (u >= 3.45 && u <= 4.9) {
    spindleOpacity = Math.min(clamp((u - 3.45) / 0.35, 0, 1), clamp((4.9 - u) / 0.35, 0, 1));
  }

  // Division cytoplasmique (0 = une cellule mère, 1 = deux cellules filles n=2 séparées)
  let split = 0;
  if (u >= 2.35 && u <= 3.0) split = easeCalm((u - 2.35) / 0.65);
  else if (u > 3.0 && u < 3.65) split = 1 - easeCalm((u - 3.0) / 0.65);
  else if (u >= 4.35) split = easeCalm((u - 4.35) / 0.65);

  const chroms: ChromState[] = [
    { x: g1x, y: g1y, armLen: 46, paternal: true, allele: "A", labelAbove: true },
    { x: g2x, y: g2y, armLen: 46, paternal: false, allele: "a", labelAbove: true },
    { x: p1x, y: p1y, armLen: 30, paternal: true, allele: "B", labelAbove: false },
    { x: p2x, y: p2y, armLen: 30, paternal: false, allele: "b", labelAbove: false },
  ];

  const cas1Done = u >= 2.85;
  const cas2Done = u >= 4.85;
  const isCas2 = u >= 3.5;

  return { chroms, nucOpacity, spindleOpacity, split, cas1Done, cas2Done, isCas2 };
}

/** Dessine un chromosome bichromatidien (2 chromatides sœurs incurvées + 1 centromère non clivé). */
function ChromosomeBichromatidien({ c }: { c: ChromState }) {
  const { x, y, armLen, paternal, allele, labelAbove } = c;
  const strokeCls = paternal ? "mq-s-sig" : "mq-s-ink";
  const fillCls = paternal ? "mq-f-sig" : "mq-f-ink";
  const spread = 9;
  // Deux chromatides sœurs verticales légèrement arquées qui se rejoignent au centromère (x, y)
  const dLeft = `M ${x - spread} ${y - armLen} Q ${x - 2} ${y} ${x - spread} ${y + armLen}`;
  const dRight = `M ${x + spread} ${y - armLen} Q ${x + 2} ${y} ${x + spread} ${y + armLen}`;
  const locusY = y - armLen * 0.52;
  const labelY = labelAbove ? y - armLen - 12 : y + armLen + 26;

  return (
    <g>
      <path d={dLeft} className={`${strokeCls} mq-nofill`} strokeWidth={6.5} strokeLinecap="round" />
      <path d={dRight} className={`${strokeCls} mq-nofill`} strokeWidth={6.5} strokeLinecap="round" />
      {/* Marqueurs du locus sur les deux chromatides sœurs identiques */}
      <line
        x1={x - spread - 4}
        y1={locusY}
        x2={x + spread + 4}
        y2={locusY}
        className="mq-s-stage"
        strokeWidth={2.5}
      />
      {/* Centromère unique reliant les deux chromatides sœurs */}
      <circle cx={x} cy={y} r={6.5} className={`mq-f-stage ${strokeCls}`} strokeWidth={3} />
      <text x={x} y={labelY} textAnchor="middle" fontSize={23} fontWeight={700} className={fillCls}>
        {allele}
      </text>
    </g>
  );
}

export function MaquetteMeiose() {
  const reducedMotion = useReducedMotion();
  const [u, setU] = useState(0);
  const [playing, setPlaying] = useState(false);
  const targetRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  const stopAnim = useCallback(() => {
    setPlaying(false);
    targetRef.current = null;
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
      setU((prev) => {
        const limit = targetRef.current ?? 5;
        const next = prev + dt * 0.62;
        if (next >= limit) {
          setPlaying(false);
          targetRef.current = null;
          lastTsRef.current = null;
          return limit;
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

  const allerAuPalier = (k: number) => {
    const dest = clamp(k, 0, 5);
    stopAnim();
    if (reducedMotion || Math.abs(dest - u) > 1.05 || dest < u) {
      setU(dest);
      return;
    }
    targetRef.current = dest;
    setPlaying(true);
  };

  const basculerLecture = () => {
    if (playing) {
      stopAnim();
      return;
    }
    if (reducedMotion) {
      setU((prev) => (prev >= 5 ? 0 : Math.min(5, Math.floor(prev) + 1)));
      return;
    }
    if (u >= 4.98) setU(0);
    targetRef.current = 5;
    lastTsRef.current = null;
    setPlaying(true);
  };

  const rejouer = () => {
    stopAnim();
    setU(0);
    if (!reducedMotion) {
      targetRef.current = 5;
      lastTsRef.current = null;
      setPlaying(true);
    }
  };

  const palierIdx = Math.min(5, Math.round(u));
  const palier = PALIERS[palierIdx];
  const st = computeMeioseState(u);

  // Contour cellulaire : passe continûment d'une cellule mère unique (split=0) à deux cellules filles (split=1)
  const poleL = lerp(115, 78, st.split);
  const poleR = lerp(645, 682, st.split);

  return (
    <article className="mq-card" aria-labelledby="mq-meiose-titre">
      <div className="border-b border-subtle px-4 py-3 bp-medium:px-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="mq-meiose-titre" className="font-display text-body-lg font-semibold text-primary">
          {ty("Méiose I : appariement, séparation des homologues et seconde orientation")}
        </h2>
        <span className="font-mono text-caption text-secondary">
          {ty("SVT · 35 min")}
        </span>
      </div>

      <div className="grid grid-cols-1 bp-large:grid-cols-12">
        <div className="mq-stage-box px-2 py-2 bp-medium:px-4 bp-medium:py-4 bp-large:col-span-7 bp-large:border-b-0 bp-large:border-r bp-large:border-subtle">
          <svg
            viewBox="0 0 760 500"
            className="mq-svg"
            role="img"
            aria-label={ty(
              "Animation de la première division de méiose d’une cellule 2n = 4 montrant l’appariement des homologues, leur séparation en anaphase I, puis la seconde orientation équiprobable"
            )}
          >
            {/* Bandeau d'état en haut de scène */}
            <text x={24} y={34} fontSize={23} fontWeight={700} className="mq-f-ink">
              {ty(st.isCas2 ? "2e orientation équiprobable (50 %)" : "1re orientation équiprobable (50 %)")}
            </text>
            <text x={736} y={34} textAnchor="end" fontSize={23} className="mq-f-sec mq-mono">
              {ty(st.split > 0.75 ? "2 cellules à n = 2" : "1 cellule à 2n = 4")}
            </text>

            {/* Membrane cellulaire : 1 cellule mère puis cytodiérèse en 2 cellules haploïdes */}
            {st.split < 0.55 ? (
              <rect
                x={lerp(105, 86, st.split)}
                y={66}
                width={lerp(550, 588, st.split)}
                height={348}
                rx={lerp(165, 110, st.split)}
                className="mq-f-panel mq-s-line"
                strokeWidth={2.5}
              />
            ) : (
              <>
                <rect
                  x={68}
                  y={72}
                  width={lerp(295, 255, (st.split - 0.55) / 0.45)}
                  height={336}
                  rx={120}
                  className="mq-f-panel mq-s-line"
                  strokeWidth={2.5}
                />
                <rect
                  x={lerp(397, 437, (st.split - 0.55) / 0.45)}
                  y={72}
                  width={lerp(295, 255, (st.split - 0.55) / 0.45)}
                  height={336}
                  rx={120}
                  className="mq-f-panel mq-s-line"
                  strokeWidth={2.5}
                />
              </>
            )}

            {/* Enveloppe nucléaire en pointillés (début de prophase I) */}
            {st.nucOpacity > 0.02 && (
              <g opacity={st.nucOpacity}>
                <circle
                  cx={380}
                  cy={248}
                  r={140}
                  className="mq-nofill mq-s-dim"
                  strokeWidth={2}
                  strokeDasharray="8 6"
                />
                <text x={380} y={96} textAnchor="middle" fontSize={23} className="mq-f-dim">
                  {ty("enveloppe nucléaire")}
                </text>
              </g>
            )}

            {/* Plaque équatoriale et fibres du fuseau achromatique */}
            {st.spindleOpacity > 0.02 && (
              <g opacity={st.spindleOpacity}>
                <line
                  x1={380}
                  y1={106}
                  x2={380}
                  y2={402}
                  className="mq-s-dim"
                  strokeWidth={2}
                  strokeDasharray="7 6"
                />
                <text x={380} y={96} textAnchor="middle" fontSize={23} className="mq-f-sec">
                  {ty("plan équatorial")}
                </text>
                <circle cx={poleL} cy={244} r={7} className="mq-f-ink" />
                <circle cx={poleR} cy={244} r={7} className="mq-f-ink" />
                {st.chroms.map((c) => {
                  const versGauche = c.x <= 380;
                  const px = versGauche ? poleL : poleR;
                  return (
                    <line
                      key={c.allele}
                      x1={px}
                      y1={244}
                      x2={c.x}
                      y2={c.y}
                      className="mq-s-dim"
                      strokeWidth={1.8}
                    />
                  );
                })}
              </g>
            )}

            {/* Les 4 chromosomes bichromatidiens */}
            {st.chroms.map((c) => (
              <ChromosomeBichromatidien key={c.allele} c={c} />
            ))}

            {/* Étiquettes des lots haploïdes formés en fin de division I */}
            {st.split > 0.82 && (
              <g>
                <text x={195} y={398} textAnchor="middle" fontSize={23} fontWeight={700} className="mq-f-ink mq-mono">
                  {st.isCas2 ? "(A, b)" : "(A, B)"}
                </text>
                <text x={565} y={398} textAnchor="middle" fontSize={23} fontWeight={700} className="mq-f-ink mq-mono">
                  {st.isCas2 ? "(a, B)" : "(a, b)"}
                </text>
              </g>
            )}

            {/* Bandeau récapitulatif permanent des deux orientations équiprobables */}
            <line x1={24} y1={438} x2={736} y2={438} className="mq-s-subtle" strokeWidth={1.5} />
            <text
              x={24}
              y={474}
              fontSize={23}
              fontWeight={st.cas1Done && !st.isCas2 ? 700 : 500}
              className={st.cas1Done ? "mq-f-ink mq-mono" : "mq-f-dim mq-mono"}
            >
              {ty("Cas 1 : (A,B) + (a,b)")}
            </text>
            <text
              x={736}
              y={474}
              textAnchor="end"
              fontSize={23}
              fontWeight={st.isCas2 ? 700 : 500}
              className={st.cas2Done || st.isCas2 ? "mq-f-sig mq-mono" : "mq-f-dim mq-mono"}
            >
              {ty("Cas 2 : (A,b) + (a,B)")}
            </text>
          </svg>
        </div>

        {/* Explication synchronisée et commandes pilotées par l'élève */}
        <div className="space-y-3.5 px-4 py-4 bp-medium:px-5 bp-large:col-span-5 flex flex-col justify-between">
          <div>
            <p className="font-mono text-caption text-signal">
              {ty(`Palier ${palierIdx + 1} / ${PALIERS.length} · ${palier.court}`)}
            </p>
            <h3 className="mt-1 font-display text-body font-semibold text-primary">
              {ty(palier.titre)}
            </h3>
            <p className="mt-1.5 text-body-sm text-secondary">{ty(palier.texte)}</p>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={basculerLecture} className="mq-btn mq-btn-primary">
                {playing ? ty("⏸ Pause") : ty(u >= 4.98 ? "▶ Rejouer tout" : "▶ Dérouler")}
              </button>
              <button
                type="button"
                onClick={() => allerAuPalier(Math.floor(u - 0.05))}
                disabled={u <= 0.01}
                className="mq-btn"
              >
                {ty("← Préc.")}
              </button>
              <button
                type="button"
                onClick={() => allerAuPalier(Math.floor(u + 1.01))}
                disabled={u >= 4.99}
                className="mq-btn"
              >
                {ty("Suiv. →")}
              </button>
              <button type="button" onClick={rejouer} className="mq-btn">
                {ty("↺ Rejouer")}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                aria-pressed={!st.isCas2}
                onClick={() => allerAuPalier(2)}
                className="mq-seg"
              >
                {ty("1re orientation (AB / ab)")}
              </button>
              <button
                type="button"
                aria-pressed={st.isCas2}
                onClick={() => allerAuPalier(4)}
                className="mq-seg"
              >
                {ty("2e orientation (Ab / aB)")}
              </button>
            </div>

            <div className="grid gap-1">
              <div className="flex items-center justify-between text-caption text-secondary">
                <label htmlFor="mq-meiose-slider">{ty("Curseur élève")}</label>
                <output htmlFor="mq-meiose-slider" className="font-mono">
                  {ty(`Palier ${palierIdx + 1} / 6`)}
                </output>
              </div>
              <input
                id="mq-meiose-slider"
                type="range"
                min={0}
                max={5}
                step={0.02}
                value={u}
                onChange={(e) => {
                  stopAnim();
                  setU(Number(e.target.value));
                }}
                className="mq-slider"
              />
            </div>

            <p className="border-l-2 border-subtle pl-3 text-caption text-secondary">
              {ty(
                "Sans crossing-over ici pour isoler le seul brassage interchromosomique ; les centromères restent intacts jusqu’en méiose II."
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
