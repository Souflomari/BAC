"use client";

import { useState } from "react";
import { calculerJauge, clamp, creerRepere, frNum, SVG_FS, ty, useLectureAnimee } from "./outils";
import { C_F, E_V, I0, iDech, P37, R_OHM, TAU, U37, uDech } from "../dipole-rc-outils";

/**
 * Maquette 11 — Dipôle RC : la décharge du condensateur (circuit + courbes couplés).
 *
 * Règle M9 respectée strictement pour l'étape `i-decharge` :
 *   - Tant que l'élève n'a pas parié sur le signe de i(t), la scène ne révèle NI
 *     le sens réel du courant dans la boucle, NI la courbe négative i(t), NI le signe
 *     de i dans le bandeau de lecture.
 *   - Dès que l'élève choisit un pari, le courant réel (inversé par rapport à la flèche
 *     de convention i) et la courbe i(t) = −(E/R) e^{−t/τ} se révèlent et suivent t.
 *
 * Valeurs calculées depuis `dipole-rc-outils.js` : E = 12 V, R = 10 kΩ, C = 220 µF, τ = 2,2 s.
 * Étapes cibles : `ed-decharge`, `sol-decharge`, `i-decharge`, `v-37` (beat 7) dans `dipole-rc-moteur.js`.
 */

type PariSigne = null | "neg" | "pos" | "nul";

const INSTANTS = [
  { theta: 0, label: "t = 0⁺ (u = E)" },
  { theta: 1, label: "t = τ (37 %)" },
  { theta: 2, label: "t = 2τ (14 %)" },
  { theta: 5, label: "t = 5τ (vide)" },
];

export function MaquetteDipoleRcDecharge() {
  const [pari, setPari] = useState<PariSigne>(null);

  // Paramètre piloté θ = t / τ ∈ [0, 5]
  const {
    valeur: theta,
    playing,
    reduced: reducedMotion,
    togglePlay,
    lancerVers,
    fixer,
  } = useLectureAnimee({
    initial: 0,
    min: 0,
    max: 5,
    vitesse: 0.9,
    palierSuivant: (prev) => {
      const next = INSTANTS.find((inst) => inst.theta > prev + 0.08);
      return next ? next.theta : 0;
    },
  });

  const revele = pari !== null;
  const tSec = theta * TAU;
  const uVal = uDech(tSec); // E * e^{-t/τ}
  const iVal = iDech(tSec); // -(E/R) * e^{-t/τ} en A
  const iMa = iVal * 1e3; // en mA (négatif)
  const i0Ma = I0 * 1e3; // 1,2 mA
  const ratioU = clamp(uVal / E_V, 0, 1);
  const ratioI = clamp(Math.abs(iVal) / I0, 0, 1);

  const choisirPari = (choix: Exclude<PariSigne, null>) => {
    setPari(choix);
    if (!reducedMotion && theta < 0.05) {
      lancerVers(1, 0);
    }
  };

  const rejouerTout = () => {
    fixer(0);
    setPari(null);
  };

  // Repères empilés à droite du circuit (x ∈ [392, 728])
  const repU = creerRepere({
    x0: 410,
    y0: 214,
    w: 312,
    h: 136,
    xMin: 0,
    xMax: 5,
    yMin: 0,
    yMax: E_V,
  });

  // Repère i(t) sous l'axe 0 (valeurs négatives de 0 à -I0)
  const repI = creerRepere({
    x0: 410,
    y0: 426,
    w: 312,
    h: 132,
    xMin: 0,
    xMax: 5,
    yMin: -i0Ma,
    yMax: 0,
  });

  const pathUComplet = repU.tracerCourbe((th) => uDech(th * TAU), 0, 5, 64);
  const pathUActuel = theta > 0.01 ? repU.tracerCourbe((th) => uDech(th * TAU), 0, theta, 48) : "";
  const pathIComplet = repI.tracerCourbe((th) => iDech(th * TAU) * 1e3, 0, 5, 64);
  const pathIActuel = theta > 0.01 ? repI.tracerCourbe((th) => iDech(th * TAU) * 1e3, 0, theta, 48) : "";

  const nbCharges = Math.round(ratioU * 4);
  const jaugeU = calculerJauge(uVal, E_V, 210);

  return (
    <section className="mq-card" aria-label={ty("Maquette animée : décharge du dipôle RC")}>
      {/* Bandeau de lectures chiffrées hors SVG (13–14 px natifs, lisible sur téléphone) */}
      <div className="border-b border-subtle bg-surface-container-low px-4 py-2.5 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-caption bp-medium:text-body-sm">
        <span className="text-primary font-semibold">
          {ty(`t = ${frNum(tSec, 2)} s (${frNum(theta, 1)} τ)`)}
        </span>
        <span className="text-primary">
          {ty(`uC = ${frNum(uVal, 2)} V`)}
        </span>
        <span className={revele ? "text-signal font-semibold" : "text-secondary"}>
          {revele ? ty(`i = ${frNum(iMa, 2)} mA`) : ty("i = ? (choisis son signe ci-dessous)")}
        </span>
        <span className="text-secondary">
          {ty(`uR + uC = 0`)}
        </span>
      </div>

      <div className="mq-stage-box px-1 py-2 bp-medium:px-4 bp-medium:py-3">
        <svg
          viewBox="0 0 760 500"
          className="mq-svg"
          role="img"
          aria-label={ty("Circuit RC en décharge (interrupteur en position 2, sans générateur) couplé aux courbes uC(t) et i(t)")}
        >
          {/* ===== GAUCHE : CIRCUIT DE DÉCHARGE (K en position 2, sans générateur) ===== */}
          <text x={182} y={38} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            {ty("Maille de décharge (K en 2)")}
          </text>

          {/* Fil de la maille RC (pas de générateur dans la boucle) */}
          <path
            d="M 76 116 L 288 116 L 288 228 M 288 272 L 288 386 L 76 386 L 76 116"
            className="mq-s-ink mq-nofill"
            strokeWidth={3.5}
            strokeLinejoin="round"
          />

          {/* Borne K en position (2) en haut à gauche */}
          <circle cx={76} cy={116} r={6} className="mq-f-ink" />
          <text x={52} y={122} textAnchor="end" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            K
          </text>
          <text x={76} y={96} textAnchor="middle" fontSize={SVG_FS} className="mq-f-sec">
            (2)
          </text>

          {/* Conducteur ohmique R sur la branche verticale gauche */}
          <rect
            x={58}
            y={202}
            width={36}
            height={98}
            className="mq-f-stage mq-s-ink"
            strokeWidth={3.5}
          />
          <text x={44} y={260} textAnchor="end" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            R
          </text>

          {/* Condensateur C sur la branche droite (armatures A en haut, B en bas, isolant entre les deux) */}
          <rect x={238} y={232} width={100} height={36} className="mq-f-ink-soft" />
          <line x1={236} y1={228} x2={340} y2={228} className="mq-s-ink" strokeWidth={6} strokeLinecap="round" />
          <line x1={236} y1={272} x2={340} y2={272} className="mq-s-ink" strokeWidth={6} strokeLinecap="round" />
          <text x={220} y={234} textAnchor="end" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            A
          </text>
          <text x={220} y={280} textAnchor="end" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            B
          </text>

          {/* Charges + sur A (extérieur) et − sur B (extérieur) qui diminuent proportionnellement à uC */}
          {[0, 1, 2, 3].map((k) => {
            const cx = 250 + k * 25;
            const visible = k < nbCharges;
            return (
              <g key={k} opacity={visible ? 1 : 0.14}>
                <text x={cx} y={214} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
                  +
                </text>
                <text x={cx} y={302} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
                  −
                </text>
              </g>
            );
          })}

          {/* Flèche de convention uC (de B vers A) */}
          <line x1={356} y1={276} x2={356} y2={222} className="mq-s-ink" strokeWidth={3} />
          <polygon points="356,214 349,228 363,228" className="mq-f-ink" />
          <text x={366} y={258} textAnchor="start" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            uC
          </text>

          {/* Flèche de convention i (vers A, identique à la charge) */}
          <line x1={154} y1={116} x2={212} y2={116} className="mq-s-sec" strokeWidth={3} />
          <polygon points="220,116 206,109 206,123" className="mq-f-sec" />
          <text x={184} y={96} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sec">
            i (conv.)
          </text>

          {/* Sens réel du courant : MASQUÉ avant le pari (règle M9), puis flèche rouge inversée */}
          {!revele ? (
            <g>
              <rect
                x={112}
                y={136}
                width={142}
                height={38}
                rx={6}
                className="mq-f-panel mq-s-line"
                strokeWidth={2}
              />
              <text x={183} y={163} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sec">
                {ty("sens réel : ?")}
              </text>
            </g>
          ) : (
            <g opacity={0.28 + 0.72 * ratioI}>
              {/* Flèche rouge en sens INVERSE de la convention (de A vers R) */}
              <line
                x1={232}
                y1={152}
                x2={140}
                y2={152}
                className="mq-s-sig"
                strokeWidth={2.5 + 3.5 * ratioI}
                strokeLinecap="round"
              />
              <polygon points="128,152 146,143 146,161" className="mq-f-sig" />
              <text x={182} y={184} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
                {ty("i < 0 (sens réel)")}
              </text>
            </g>
          )}

          {/* Jauge visuelle de charge restante sous le circuit */}
          <text x={76} y={432} textAnchor="start" fontSize={SVG_FS} className="mq-f-sec">
            {ty(`Charge : ${jaugeU.pctEntier} %`)}
          </text>
          <rect x={76} y={446} width={210} height={18} rx={4} className="mq-f-panel mq-s-line" strokeWidth={1.5} />
          <rect x={76} y={446} width={jaugeU.largeur} height={18} rx={4} className="mq-f-ink" />

          {/* ===== DROITE HAUT : COURBE uC(t) ===== */}
          <text x={410} y={66} textAnchor="start" fontSize={SVG_FS} fontWeight={700} className="mq-f-ink">
            {ty("uC(t) = E · e^(−t/τ)")}
          </text>
          {/* Axes uC */}
          <line x1={repU.x0} y1={repU.y0} x2={repU.x0 + repU.w} y2={repU.y0} className="mq-s-dim" strokeWidth={2} />
          <line x1={repU.x0} y1={repU.y0} x2={repU.x0} y2={repU.y0 - repU.h} className="mq-s-dim" strokeWidth={2} />
          <text x={repU.x0 - 8} y={repU.Y(E_V) + 8} textAnchor="end" fontSize={SVG_FS} className="mq-f-sec">
            12
          </text>
          <text x={repU.x0 - 8} y={repU.Y(0) + 8} textAnchor="end" fontSize={SVG_FS} className="mq-f-sec">
            0
          </text>

          {/* Repère 37 % à t = τ */}
          <line
            x1={repU.X(1)}
            y1={repU.Y(U37)}
            x2={repU.X(1)}
            y2={repU.Y(0)}
            className="mq-s-dim"
            strokeWidth={1.8}
            strokeDasharray="5 5"
          />
          <line
            x1={repU.x0}
            y1={repU.Y(U37)}
            x2={repU.X(1)}
            y2={repU.Y(U37)}
            className="mq-s-dim"
            strokeWidth={1.8}
            strokeDasharray="5 5"
          />
          <circle cx={repU.X(1)} cy={repU.Y(U37)} r={5.5} className="mq-f-ink" />
          <text x={repU.X(1) + 10} y={repU.Y(U37) - 6} textAnchor="start" fontSize={SVG_FS} className="mq-f-sec">
            {ty(`${Math.round(P37 * 100)} %`)}
          </text>

          {/* Courbe uC en pointillé puis partie vécue */}
          <path d={pathUComplet} className="mq-s-dim mq-nofill" strokeWidth={2} strokeDasharray="6 6" />
          {pathUActuel && <path d={pathUActuel} className="mq-s-ink mq-nofill" strokeWidth={4} />}
          <circle cx={repU.X(theta)} cy={repU.Y(uVal)} r={7} className="mq-f-ink" />

          {/* ===== DROITE BAS : COURBE i(t) (MASQUÉE AVANT PARI — RÈGLE M9) ===== */}
          {revele ? (
            <g>
              <text x={410} y={272} textAnchor="start" fontSize={SVG_FS} fontWeight={700} className="mq-f-sig">
                {ty("i(t) = −(E/R) · e^(−t/τ)")}
              </text>
              {/* Axe t (en haut, à i = 0) et axe vertical vers le bas */}
              <line x1={repI.x0} y1={repI.Y(0)} x2={repI.x0 + repI.w} y2={repI.Y(0)} className="mq-s-dim" strokeWidth={2} />
              <line x1={repI.x0} y1={repI.Y(0)} x2={repI.x0} y2={repI.y0} className="mq-s-dim" strokeWidth={2} />
              <text x={repI.x0 - 8} y={repI.Y(0) + 8} textAnchor="end" fontSize={SVG_FS} className="mq-f-sec">
                0
              </text>
              <text x={repI.x0 - 8} y={repI.Y(-i0Ma) + 8} textAnchor="end" fontSize={SVG_FS} className="mq-f-sig">
                {ty(`−${frNum(i0Ma, 1)}`)}
              </text>
              <path d={pathIComplet} className="mq-s-dim mq-nofill" strokeWidth={2} strokeDasharray="6 6" />
              {pathIActuel && <path d={pathIActuel} className="mq-s-sig mq-nofill" strokeWidth={4} />}
              <circle cx={repI.X(theta)} cy={repI.Y(iMa)} r={7} className="mq-f-sig" />
            </g>
          ) : (
            <g>
              <rect
                x={410}
                y={284}
                width={312}
                height={142}
                rx={8}
                className="mq-f-panel mq-s-line"
                strokeWidth={2}
                strokeDasharray="6 6"
              />
              <text x={566} y={346} textAnchor="middle" fontSize={SVG_FS} fontWeight={700} className="mq-f-sec">
                {ty("Courbe i(t) masquée")}
              </text>
              <text x={566} y={382} textAnchor="middle" fontSize={SVG_FS} className="mq-f-sec">
                {ty("Choisis le signe de i")}
              </text>
            </g>
          )}

          {/* Repère vertical commun sur l'axe des temps */}
          <line
            x1={repU.X(theta)}
            y1={repU.Y(E_V)}
            x2={repU.X(theta)}
            y2={revele ? repI.y0 : repU.y0}
            className="mq-s-ink"
            strokeWidth={1.8}
            strokeDasharray="4 4"
          />

          {/* Graduations communes en τ */}
          {[0, 1, 3, 5].map((k) => (
            <text
              key={k}
              x={repU.X(k)}
              y={466}
              textAnchor="middle"
              fontSize={SVG_FS}
              className="mq-f-sec"
            >
              {k === 0 ? "0" : k === 1 ? "τ" : `${k}τ`}
            </text>
          ))}
        </svg>
      </div>

      {/* Panneau de pari (règle M9) et commandes */}
      <div className="p-4 bp-medium:p-6 space-y-4">
        <div className="space-y-2">
          <p className="font-mono text-caption text-secondary">
            {ty(`Décharge · E = ${frNum(E_V, 0)} V · R = ${frNum(R_OHM / 1e3, 0)} kΩ · C = ${frNum(C_F * 1e6, 0)} µF · τ = ${frNum(TAU, 1)} s`)}
          </p>
          <h3 className="font-display text-h4 font-bold text-primary">
            {ty("À la décharge (K en 2), quel est le signe de i(t) ?")}
          </h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label={ty("Choix du signe de i à la décharge")}>
            <button
              type="button"
              aria-pressed={pari === "neg"}
              onClick={() => choisirPari("neg")}
              className="mq-seg"
            >
              {ty("i(t) < 0 : −(E/R) e^(−t/τ)")}
            </button>
            <button
              type="button"
              aria-pressed={pari === "pos"}
              onClick={() => choisirPari("pos")}
              className="mq-seg"
            >
              {ty("i(t) > 0 : +(E/R) e^(−t/τ)")}
            </button>
            <button
              type="button"
              aria-pressed={pari === "nul"}
              onClick={() => choisirPari("nul")}
              className="mq-seg"
            >
              {ty("i(0⁺) = 0, comme uC est continue")}
            </button>
          </div>
          {pari === "neg" && (
            <p className="text-body-sm text-primary max-w-reading">
              {ty("Oui : i = C · duC/dt et uC décroît, donc i < 0. Le courant réel circule à l’inverse de sa flèche de convention.")}
            </p>
          )}
          {pari === "pos" && (
            <p className="text-body-sm text-secondary max-w-reading">
              {ty("Regarde le sens réel révélé en rouge : uC diminue, donc duC/dt < 0 et i = C · duC/dt est négatif.")}
            </p>
          )}
          {pari === "nul" && (
            <p className="text-body-sm text-secondary max-w-reading">
              {ty("uC est continue (elle part de E = 12 V), mais i saute aussitôt de 0 à −E/R = −1,2 mA.")}
            </p>
          )}
        </div>

        {/* Commandes de lecture temporelle */}
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={togglePlay} className="mq-btn mq-btn-primary">
            {playing ? "Pause" : theta >= 4.95 ? "Rejouer" : "Lancer la décharge"}
          </button>
          <button type="button" onClick={rejouerTout} className="mq-btn">
            {ty("Réinitialiser le pari")}
          </button>
          {INSTANTS.map((inst) => (
            <button
              key={inst.theta}
              type="button"
              aria-pressed={Math.abs(theta - inst.theta) < 0.12}
              onClick={() => (reducedMotion ? fixer(inst.theta) : lancerVers(inst.theta))}
              className="mq-seg text-caption"
            >
              {ty(inst.label)}
            </button>
          ))}
        </div>

        <label className="block space-y-1">
          <span className="text-caption font-medium text-secondary">
            {ty("Instant t (de 0 à 5τ)")}
          </span>
          <input
            type="range"
            min={0}
            max={5}
            step={0.02}
            value={theta}
            onChange={(e) => fixer(Number(e.target.value))}
            className="mq-slider"
            aria-label={ty("Instant t pendant la décharge")}
          />
        </label>
      </div>
    </section>
  );
}
