"use client";

/**
 * OrbiteGeostationnairePanel — la scène de l'orbite géostationnaire
 * (pc/chute-mouvements-plans, R10 ; ADR 0041).
 *
 * Elle solde la substitution écrite en tête de `orbites-gravite.svg` — « au
 * lieu d'un curseur de rayon continu, TROIS rayons fixes ». Deux des trois
 * conditions géostationnaires sont spatiales (le PLAN, le SENS) et la
 * misconception CH-KEP-2 (« immobile dans l'absolu ») se casse en changeant
 * de RÉFÉRENTIEL sous les yeux de l'élève : c'est la manipulation qui
 * enseigne, pas le relief.
 *
 * Tout ce qui est commun aux scènes (ouverture au clic, cycle de vie du
 * rendu, PARI, vues, transport, plateau collant, focus jamais masqué) vit dans
 * `./` — ce fichier ne porte que l'orbite : son état, son temps, ses quatre
 * contrôles, ses trois conditions et ses lectures, toutes CALCULÉES par
 * `kepler.ts` (aucune mémoire navigateur : chaque montage repart de l'étape 1).
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckIcon, CrossIcon, Icon, PauseIcon, PlayIcon } from "@/components/ui/Icon";
import { TRANSPORT_BTN_CLASS } from "../TransportButton";
import { MathText } from "../ChoiceButton";
import * as K from "@/lib/scene3d/kepler";
import type { SceneOrbite } from "@/lib/scene3d/orbite-geostationnaire";
import { CURSEUR, LIGNE_RADIO, MARGE_FOCUS, type Vue } from "./commun";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { useGlisserVue } from "./useGlisserVue";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { VuesBloc } from "./VuesBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, poser } from "./Plateau";

type NomVue = "biais" | "dessus" | "cote";

const VUES: Record<NomVue, Vue> = {
  biais: { azimut: 28, elevation: 20, libelle: "De biais" },
  dessus: { azimut: 28, elevation: 88, libelle: "Du pôle Nord" },
  cote: { azimut: 28, elevation: 0, libelle: "Dans le plan de l’équateur" },
};

/** Temps simulé par seconde réelle : une heure par seconde (un jour en 24 s). */
const HEURES_PAR_SECONDE = 1;
const TEMPS_MAX = 48 * 3600;
/** Une pression sur « Lancer le temps » court au plus une rotation terrestre. */
const COURSE = 24 * 3600;
const RAYON_MIN_KM = 7000;
const RAYON_MAX_KM = 60000;

function nomVue(v: unknown): NomVue | undefined {
  return v === "biais" || v === "dessus" || v === "cote" ? v : undefined;
}

function rayonDepuis(v: Scene3DEtat[string], courant: number): number {
  if (v === "geo") return K.RAYON_GEO_GRILLE;
  if (typeof v === "number") return Math.round((v * 1000) / K.PAS_RAYON) * K.PAS_RAYON;
  return courant;
}

function appliquer(etat: Scene3DEtat | undefined, courant: K.EtatOrbite): K.EtatOrbite {
  if (!etat) return courant;
  const inclinaison = etat.inclinaison_deg;
  const referentiel = etat.referentiel;
  return {
    rayon: rayonDepuis(etat.rayon_km, courant.rayon),
    inclinaison: typeof inclinaison === "number" ? inclinaison : courant.inclinaison,
    sens: etat.sens ? (etat.sens === "retrograde" ? -1 : 1) : courant.sens,
    referentiel: referentiel === "geocentrique" || referentiel === "terrestre" ? referentiel : courant.referentiel,
    // Entrer dans une étape qui pose un état : le satellite repart à la
    // verticale de P. La consigne le dit.
    temps: 0,
  };
}

const ETAT_DE_BASE: K.EtatOrbite = {
  rayon: 26_000_000,
  inclinaison: 0,
  sens: 1,
  referentiel: "terrestre",
  temps: 0,
};

export function OrbiteGeostationnairePanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<K.EtatOrbite>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const vueInitiale = nomVue(etapes[0]?.etat?.vue) ?? "biais";
  const [vue, setVue] = useState<NomVue | null>(vueInitiale);
  const [angles, setAngles] = useState(VUES[vueInitiale]);
  const [enLecture, setEnLecture] = useState(false);
  const [saisieRayon, setSaisieRayon] = useState<string | null>(null);

  const idTitre = useId();
  const idConsigne = useId();
  const etiquetteN = useRef<HTMLSpanElement>(null);
  const etiquetteP = useRef<HTMLSpanElement>(null);

  // Le verdict attend que la scène ait montré : `revele_apres_h` heures simulées.
  const seuilPari = (etape.pari?.revele_apres_h ?? 0) * 3600;
  const pari = usePari(etape.pari, { attend: seuilPari > 0, montre: etat.temps >= seuilPari });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);

  // ── Rendu : à chaque changement d'état, et seulement alors ──
  const renduRef = useRef<SceneOrbite | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.mettreAJour(etat);
    s.orienter(angles.azimut, angles.elevation);
    s.rendre();
    const { N, P } = s.etiquettes();
    poser(etiquetteN.current, N);
    // « P » se pose au-dessus de son point, pas dessus : le point, l'équateur
    // et la verticale s'y croisent déjà.
    poser(etiquetteP.current, P, "-120%");
  }, [etat, angles]);

  const rendu = useSceneRendu<SceneOrbite>(
    () => import("@/lib/scene3d/orbite-geostationnaire").then((m) => m.creerSceneOrbite),
    dessiner,
    { surPerte: () => setEnLecture(false) }
  );
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // ── Aller à une étape : pose son état, arrête le temps, efface le pari ──
  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      setEnLecture(false);
      // Chaque étape garde son pari ; « Recommencer » (dernière → première) repart à blanc.
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      setEtat((courant) => appliquer(e.etat, courant));
      const v = nomVue(e.etat?.vue);
      if (v) {
        setVue(v);
        setAngles(VUES[v]);
      }
    },
    [etapes, pari, indexEtape]
  );

  // ── Le temps : il ne coule que lancé à la main ──
  // Le temps courant est lu dans une référence, pas dans un updater de
  // setState : React applique les updaters au rendu suivant, un drapeau
  // « fini » posé dedans serait lu trop tôt et la boucle ne s'arrêterait
  // jamais.
  const tempsRef = useRef(etat.temps);
  tempsRef.current = etat.temps;
  useEffect(() => {
    if (!enLecture) return;
    let id = 0;
    let avant: number | null = null;
    // Une course s'arrête à la prochaine rotation terrestre complète (24 h,
    // puis 48 h) : la trace d'un jour est l'image complète, et une scène
    // laissée seule ne tourne pas indéfiniment.
    const butee = Math.min(TEMPS_MAX, (Math.floor(tempsRef.current / COURSE + 1e-9) + 1) * COURSE);
    const pas = (maintenant: number) => {
      if (avant !== null) {
        // Plafond à 0,25 s : au retour d'un onglet caché, le satellite ne saute
        // pas de plusieurs heures ; mais un appareil lent (7 images/s mesurées
        // sous rendu logiciel) garde l'annonce « 1 h par seconde » vraie — un
        // plafond à 0,1 s la rendait fausse de 25 %.
        const dt = Math.min(0.25, (maintenant - avant) / 1000);
        const t = Math.min(butee, tempsRef.current + dt * HEURES_PAR_SECONDE * 3600);
        tempsRef.current = t;
        setEtat((e) => ({ ...e, temps: t }));
        if (t >= butee) {
          setEnLecture(false);
          return;
        }
      }
      avant = maintenant;
      id = requestAnimationFrame(pas);
    };
    id = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(id);
  }, [enLecture]);

  const glisser = useGlisserVue(
    (dA, dE) => setAngles((a) => ({ ...a, azimut: a.azimut + dA, elevation: Math.max(-80, Math.min(88, a.elevation + dE)) })),
    () => setVue(null)
  );
  const choisirVue = (v: NomVue) => {
    setVue(v);
    setAngles(VUES[v]);
  };

  // ── Lectures (toutes calculées) ──
  const T = K.periode(etat.rayon);
  const cond = K.conditions(etat);
  const vGeo = K.vitesseOrbitale(etat.rayon);
  const vSol = K.norme(K.vitesseTerrestre(etat));
  const rayonKm = Math.round(etat.rayon / 1000);
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];

  const description = useMemo(
    () =>
      `Scène en trois dimensions : la Terre, son axe, le point P de l’équateur et sa verticale, et un satellite ` +
      `sur une orbite de rayon ${K.formatKm(etat.rayon)}, inclinée de ${K.formatDegres(etat.inclinaison)} sur l’équateur, ` +
      `parcourue ${etat.sens === 1 ? "dans le même sens que la rotation de la Terre" : "en sens contraire de la rotation de la Terre"}, ` +
      `vue dans le référentiel ${etat.referentiel === "terrestre" ? "terrestre (lié au sol)" : "géocentrique"}.`,
    [etat.rayon, etat.inclinaison, etat.sens, etat.referentiel]
  );

  const verdict = cond.geostationnaire
    ? "Géostationnaire : vu du sol, le satellite reste au-dessus de P."
    : "Pas géostationnaire : vu du sol, le satellite ne reste pas au-dessus de P.";

  if (rendu.panneau === "ferme") {
    return <SceneOptIn sceneId={scene.scene} titre={scene.title} legende={scene.caption} onOuvrir={rendu.ouvrir} className={className} />;
  }

  const conditionLigne = (ok: boolean, texte: string, detail: React.ReactNode) => (
    <li className="flex items-start gap-2">
      {/* Coche et croix en encre : le glyphe ET le texte portent le sens (§9),
          l'accent reste à l'action et au satellite (§2). */}
      <span className={cn("mt-0.5 shrink-0", ok ? "text-primary" : "text-secondary")}>
        {ok ? <CheckIcon size={16} title="rempli" /> : <CrossIcon size={16} title="non rempli" />}
      </span>
      <span className="min-w-0 break-words">
        <span className="text-primary">{texte}</span>
        {detail ? (
          <>
            {" "}
            <span className="text-secondary tabular-nums">{detail}</span>
          </>
        ) : null}
      </span>
    </li>
  );

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-rayon-m={etat.rayon}
      data-inclinaison={etat.inclinaison}
      data-sens={etat.sens === 1 ? "direct" : "retrograde"}
      data-referentiel={etat.referentiel}
      data-temps-s={Math.round(etat.temps)}
      data-geostationnaire={cond.geostationnaire ? "oui" : "non"}
      data-pari={pari.phase}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Scène 3D
      </Eyebrow>
      <ConsigneEtape
        idTitre={idTitre}
        idConsigne={idConsigne}
        titre={etape.titre}
        consigne={etape.consigne}
        cle={etape.id}
        rang={{ index: indexEtape, total: etapes.length }}
      />

      <div className="grid gap-5 bp-expanded:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)] bp-expanded:items-start">
        <Plateau
          hoteRef={rendu.hoteRef}
          canvasRef={rendu.canvasRef}
          panneau={rendu.panneau}
          description={description}
          glisser={glisser}
          legende={etat.referentiel === "terrestre" ? "Référentiel terrestre — vu du sol" : "Référentiel géocentrique"}
          messageSansWebgl="Ce navigateur n’affiche pas la 3D (WebGL indisponible). Les paris, les réglages et les calculs restent justes ; la figure des trois rayons, plus bas dans la leçon, en montre l’essentiel."
          onRelancer={rendu.relancer}
          vues={<VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="hidden bp-expanded:flex" />}
        >
          <Etiquette refEl={etiquetteN} texte="N" />
          <Etiquette refEl={etiquetteP} texte="P" />
        </Plateau>

        <div className={cn("flex min-w-0 flex-col gap-5", MARGE_FOCUS)}>
          {etape.pari && (
            <PariBloc
              pari={etape.pari}
              phase={pari.phase}
              choixId={pari.choixId}
              choixRetenu={pari.choixRetenu}
              choixNotion={pari.choixNotion}
              onChoisir={pari.choisir}
              idBase={idTitre}
            />
          )}

          {/* Le temps — ouvert dès que l'élève a parié */}
          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" role="group" aria-label="Le temps">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={cn("btn-primary", "focus-ring")}
                  onClick={() => {
                    if (!enLecture && etat.temps >= TEMPS_MAX) setEtat((e) => ({ ...e, temps: 0 }));
                    setEnLecture((l) => !l);
                  }}
                >
                  {enLecture ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                  {enLecture ? "Pause" : etat.temps >= TEMPS_MAX ? "Relancer depuis 0 h" : "Lancer le temps"}
                </button>
                <button
                  type="button"
                  className={TRANSPORT_BTN_CLASS}
                  onClick={() => {
                    setEnLecture(false);
                    setEtat((e) => ({ ...e, temps: 0 }));
                  }}
                  aria-label="Remettre le temps à 0 h"
                >
                  <Icon name="reset" size={13} />
                  <span>0 h</span>
                </button>
              </div>
              <label className="flex flex-col gap-1">
                <span className="text-body-sm text-secondary">
                  {frenchTypography("Temps écoulé :")}{" "}
                  <span className="tabular-nums text-primary">{K.formatTemps(etat.temps)}</span>
                  <span className="text-caption"> (1 h de simulation par seconde)</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={48}
                  step={0.1}
                  value={Math.round(etat.temps / 360) / 10}
                  onChange={(e) => {
                    setEnLecture(false);
                    setEtat((st) => ({ ...st, temps: parseFloat(e.target.value) * 3600 }));
                  }}
                  aria-valuetext={`${K.formatTemps(etat.temps)} écoulées`}
                  className={CURSEUR}
                />
              </label>
            </div>
          )}

          {/* La suite, et le contrôle neuf de l'étape — une fois le pari révélé */}
          {/* Au téléphone, les vues viennent juste après le pari et le lancement —
              plus après la fiche, à 1 500 px de la scène qu'elles tournent. */}
          <VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="flex bp-expanded:hidden" />

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {ouvre("rayon") && (
            <div className="flex flex-col gap-1" data-controle="rayon">
              <label htmlFor={`${idTitre}-rayon`} className="text-body-sm text-secondary">
                Rayon de l’orbite <i>r</i>
              </label>
              <input
                id={`${idTitre}-rayon`}
                type="range"
                min={RAYON_MIN_KM}
                max={RAYON_MAX_KM}
                step={K.PAS_RAYON / 1000}
                value={rayonKm}
                onChange={(e) => setEtat((st) => ({ ...st, rayon: parseFloat(e.target.value) * 1000 }))}
                aria-valuetext={`${K.formatKm(etat.rayon)}, période ${K.formatHeures(T)}`}
                className={CURSEUR}
              />
              <div className="flex flex-wrap items-baseline gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  min={RAYON_MIN_KM}
                  max={RAYON_MAX_KM}
                  step={K.PAS_RAYON / 1000}
                  aria-label="Rayon de l’orbite, en kilomètres"
                  value={saisieRayon ?? String(rayonKm)}
                  onChange={(e) => {
                    setSaisieRayon(e.target.value);
                    const v = parseFloat(e.target.value);
                    if (Number.isFinite(v) && v >= RAYON_MIN_KM && v <= RAYON_MAX_KM) {
                      setEtat((st) => ({ ...st, rayon: Math.round((v * 1000) / K.PAS_RAYON) * K.PAS_RAYON }));
                    }
                  }}
                  onBlur={() => setSaisieRayon(null)}
                  className={cn(
                    "w-[9ch] min-h-touch rounded-md border border-subtle bg-surface-raised px-2",
                    "text-body-sm text-primary tabular-nums focus-ring [--focus-radius:8px]"
                  )}
                />
                <span className="text-body-sm text-secondary">km</span>
              </div>
            </div>
          )}

          {ouvre("inclinaison") && (
            <label className="flex flex-col gap-1" data-controle="inclinaison">
              <span className="text-body-sm text-secondary">
                {frenchTypography("Inclinaison du plan de l’orbite sur l’équateur :")}{" "}
                <span className="tabular-nums text-primary">{K.formatDegres(etat.inclinaison)}</span>
              </span>
              <input
                type="range"
                min={0}
                max={90}
                step={1}
                value={etat.inclinaison}
                onChange={(e) => setEtat((st) => ({ ...st, inclinaison: parseFloat(e.target.value) }))}
                aria-valuetext={K.formatDegres(etat.inclinaison)}
                className={CURSEUR}
              />
            </label>
          )}

          {ouvre("sens") && (
            <fieldset className="flex flex-col gap-1" data-controle="sens">
              <legend className="mb-1 text-body-sm text-secondary">Sens de rotation du satellite</legend>
              {(
                [
                  [1, "Même sens que la Terre (vers l’est)"],
                  [-1, "Sens contraire (vers l’ouest)"],
                ] as const
              ).map(([v, libelle]) => (
                <label key={v} className={LIGNE_RADIO}>
                  <input
                    type="radio"
                    name={`${idTitre}-sens`}
                    checked={etat.sens === v}
                    onChange={() => setEtat((st) => ({ ...st, sens: v }))}
                    className="accent-figure-ink-soft"
                  />
                  {libelle}
                </label>
              ))}
            </fieldset>
          )}

          {ouvre("referentiel") && (
            <fieldset className="flex flex-col gap-1" data-controle="referentiel">
              <legend className="mb-1 text-body-sm text-secondary">Référentiel d’observation</legend>
              {(
                [
                  ["terrestre", "Terrestre : lié au sol, il tourne avec la Terre"],
                  ["geocentrique", "Géocentrique : centré sur la Terre, axes fixes"],
                ] as const
              ).map(([v, libelle]) => (
                <label key={v} className={LIGNE_RADIO}>
                  <input
                    type="radio"
                    name={`${idTitre}-ref`}
                    checked={etat.referentiel === v}
                    onChange={() => setEtat((st) => ({ ...st, referentiel: v }))}
                    className="accent-figure-ink-soft"
                  />
                  {frenchTypography(libelle)}
                </label>
              ))}
            </fieldset>
          )}

          {/* Les lectures de l'étape, calculées — aucune par défaut, et juste
              sous le contrôle qui les fait bouger. */}
          {lectures.length > 0 && (
            <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
              {(
                [
                  ["periode", <>Période <i>T</i></>, K.formatHeures(T), "periode-dl"],
                  ["altitude", <>Altitude <i>h</i> = <i>r</i> − <i>R</i><sub>T</sub></>, K.formatKm(etat.rayon - K.R_TERRE), "altitude"],
                  ["v-geo", <>Vitesse <i>v</i> dans le référentiel géocentrique</>, K.formatKmParSeconde(vGeo), "v-geo"],
                  ["v-sol", <>Vitesse par rapport au sol</>, K.formatKmParSeconde(vSol), "v-sol"],
                  ["rapports", <><i>T</i>&#8239;/&#8239;<i>r</i></>, K.formatRapportTSurR(T, etat.rayon), "t-r"],
                  ["rapports", <><i>T</i>²&#8239;/&#8239;<i>r</i>³</>, K.formatRapportKepler(T, etat.rayon), "kepler"],
                  ["rapports", <><i>T</i>³&#8239;/&#8239;<i>r</i>²</>, K.formatRapportT3SurR2(T, etat.rayon), "t3-r2"],
                ] as const
              )
                .filter(([groupe]) => lectures.includes(groupe))
                .map(([, terme, valeur, cle]) => (
                  <div key={cle} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-subtle pb-1.5">
                    <dt className="text-secondary">{terme}</dt>
                    <dd className="tabular-nums text-primary" data-lecture={cle}>
                      {valeur}
                    </dd>
                  </div>
                ))}
            </dl>
          )}

          {/* Les trois conditions, et le verdict. Le détail d'une condition
              n'est écrit que si aucun contrôle visible ne le montre déjà
              (critique calme : un même fait deux fois dans le même regard).
              JAMAIS avant la révélation du pari : les coches et le verdict
              SONT la réponse — « période 24 h ✓, plan ✗ … pas géostationnaire »
              répondait aux étapes 2 et 3 avant que l'élève ait parié
              (§11.190). La scène répond d'abord, le texte ensuite. */}
          {pari.etapeOuverte && (
            <div className="rounded-lg border border-subtle px-4 py-3" data-conditions>
              <p className="mb-2 text-caption font-medium text-secondary">Les trois conditions</p>
              <ul className="flex flex-col gap-1.5 text-body-sm">
                {conditionLigne(cond.periode, "Une période de 24 h", <>— ici <span data-lecture="periode">{K.formatHeures(T)}</span></>)}
                {conditionLigne(
                  cond.plan,
                  "Une orbite dans le plan de l’équateur",
                  ouvre("inclinaison") ? null : `— ici inclinée de ${K.formatDegres(etat.inclinaison)}`
                )}
                {conditionLigne(
                  cond.sens,
                  "Le même sens de rotation que la Terre",
                  ouvre("sens") ? null : `— ici ${etat.sens === 1 ? "vers l’est" : "vers l’ouest"}`
                )}
              </ul>
              <p className="mt-2 text-body-sm font-medium text-primary" aria-live="polite" aria-atomic="true" data-verdict>
                {frenchTypography(verdict)}
              </p>
            </div>
          )}
        </div>
      </div>

      <TransportEtapes index={indexEtape} total={etapes.length} onAller={allerA} idConsigne={idConsigne} />
    </section>
  );
}
