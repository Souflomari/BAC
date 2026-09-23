"use client";

/**
 * ChampMagnetiquePanel — « une particule chargée dans un champ magnétique
 * uniforme » (pc/chute-mouvements-plans, R6 ; ADR 0041).
 *
 * Pourquoi de la 3D ici : la force de Lorentz est un PRODUIT VECTORIEL. v, B et
 * F sont deux à deux perpendiculaires, et la figure plane du manuel doit coder
 * la troisième direction par ⊗ et ⊙. Vue de biais, la scène montre ce que ces
 * symboles veulent dire ; la règle de la main droite devient une construction
 * dans l'espace, pas une formule à retenir. Et ce que la leçon établit — le
 * côté fixé par le signe de q, la vitesse qui ne change pas, R = m v₀ / (|q| B),
 * la déviation sin θ = ℓ / R — se VOIT, une chose par étape.
 *
 * Chaque étape pose son état, demande un pari, et la scène répond d'abord :
 * le verdict attend que la particule ait parcouru la fraction de course que
 * l'étape annonce (`revele_apres_course`). Avant le pari, rien de ce qui
 * dépend de l'issue n'est montré — ni la force, ni v₀ ∧ B, ni la fiche, ni la
 * phrase lue au lecteur d'écran (§11.190).
 *
 * Toute la physique vient de `lorentz.ts` (constantes de la leçon) ; le rendu
 * three.js (`champ-magnetique.ts`) n'est importé qu'au clic.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, PauseIcon, PlayIcon } from "@/components/ui/Icon";
import { TRANSPORT_BTN_CLASS } from "../TransportButton";
import { MathText } from "../ChoiceButton";
import * as L from "@/lib/scene3d/lorentz";
import type { SceneLorentz } from "@/lib/scene3d/champ-magnetique";
import { CURSEUR, MARGE_FOCUS, type Vue } from "./commun";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { useGlisserVue } from "./useGlisserVue";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { VuesBloc } from "./VuesBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, poser } from "./Plateau";

type NomVue = "manuel" | "biais";

// Deux vues, pas trois : la vue « par la tranche » ne montrait qu'une ligne
// et des étiquettes empilées — du bruit, pas une idée (§11.190).
const VUES: Record<NomVue, Vue> = {
  manuel: { azimut: -90, elevation: 88, libelle: "Comme la figure du manuel" },
  biais: { azimut: -72, elevation: 40, libelle: "De biais" },
};

function nomVue(v: unknown): NomVue | undefined {
  return v === "manuel" || v === "biais" ? v : undefined;
}

const surGrille = (x: number) => Math.round(x * 10) / 10;

function appliquer(etat: Scene3DEtat | undefined, courant: L.EtatLorentz): L.EtatLorentz {
  if (!etat) return { ...courant, t: 0 };
  return {
    particule: etat.particule === "electron" || etat.particule === "positon" ? etat.particule : courant.particule,
    B: typeof etat.B_mT === "number" ? surGrille(etat.B_mT) : courant.B,
    sens: etat.sens === "entrant" || etat.sens === "sortant" ? etat.sens : courant.sens,
    v0: typeof etat.v0 === "number" ? surGrille(etat.v0) : courant.v0,
    region: etat.region === "couloir" || etat.region === "partout" ? etat.region : courant.region,
    // Le cercle de référence est propre à l'étape qui le pose.
    traceB: typeof etat.trace_B_mT === "number" ? surGrille(etat.trace_B_mT) : null,
    // Entrer dans une étape : la particule repart de son point de départ.
    t: 0,
  };
}

const ETAT_DE_BASE: L.EtatLorentz = { particule: "electron", B: 2, sens: "entrant", v0: 1, region: "partout", traceB: null, t: 0 };

const NOM: Record<L.Particule, { le: string; un: string }> = {
  electron: { le: "l’électron", un: "un électron" },
  positon: { le: "le positon", un: "un positon" },
};

export function ChampMagnetiquePanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<L.EtatLorentz>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const vueInitiale = nomVue(etapes[0]?.etat?.vue) ?? "manuel";
  const [vue, setVue] = useState<NomVue | null>(vueInitiale);
  const [angles, setAngles] = useState(VUES[vueInitiale]);
  const [enLecture, setEnLecture] = useState(false);

  const idTitre = useId();
  const idConsigne = useId();
  const etiquetteV = useRef<HTMLSpanElement>(null);
  const etiquetteF = useRef<HTMLSpanElement>(null);
  const etiquetteB = useRef<HTMLSpanElement>(null);
  const etiquetteProduit = useRef<HTMLSpanElement>(null);
  const etiquetteC = useRef<HTMLSpanElement>(null);
  const etiquetteTheta = useRef<HTMLSpanElement>(null);

  // ── Le pari : il attend que la particule ait parcouru la fraction de course
  //    annoncée par l'étape ──
  const fin = L.finCourse(etat);
  const fraction = etape.pari?.revele_apres_course ?? 0;
  const pari = usePari(etape.pari, { attend: fraction > 0, montre: etat.t >= fraction * fin - 1e-9 });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const issue = pari.etapeOuverte;
  const montrerRayon = issue && (etape.lectures ?? []).includes("R");
  const montrerDeviation = issue && (etape.lectures ?? []).includes("theta");
  const forceMontree = pari.phase !== "attente";

  // ── Rendu ──
  const renduRef = useRef<SceneLorentz | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.orienter(angles.azimut, angles.elevation);
    s.mettreAJour({ etat, force: forceMontree, produit: issue, rayon: montrerRayon, deviation: montrerDeviation });
    s.rendre();
    const e = s.etiquettes();
    // Les ancres sont déjà AU-DELÀ des pointes (le rendu les calcule) : on centre.
    poser(etiquetteV.current, e.v);
    poser(etiquetteF.current, e.F);
    poser(etiquetteB.current, e.B, "-100%");
    poser(etiquetteProduit.current, e.produit);
    poser(etiquetteC.current, e.C, "30%");
    poser(etiquetteTheta.current, e.theta);
  }, [etat, angles, forceMontree, issue, montrerRayon, montrerDeviation]);

  const rendu = useSceneRendu<SceneLorentz>(
    () => import("@/lib/scene3d/champ-magnetique").then((m) => m.creerSceneLorentz),
    dessiner,
    { surPerte: () => setEnLecture(false) }
  );
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // ── Aller à une étape : pose son état, arrête la course, efface le pari ──
  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      setEnLecture(false);
      pari.reinitialiser();
      setEtat((courant) => appliquer(e.etat, courant));
      const v = nomVue(e.etat?.vue);
      if (v) {
        setVue(v);
        setAngles(VUES[v]);
      }
    },
    [etapes, pari]
  );

  // ── La course : elle ne part que lancée à la main, et s'arrête seule ──
  // Le temps courant est lu dans une référence (même raison que l'orbite : un
  // drapeau posé dans un updater de setState serait lu trop tard).
  const tempsRef = useRef(etat.t);
  tempsRef.current = etat.t;
  const finRef = useRef(fin);
  finRef.current = fin;
  useEffect(() => {
    if (!enLecture) return;
    let id = 0;
    let avant: number | null = null;
    const pas = (maintenant: number) => {
      if (avant !== null) {
        // Plafond à 0,25 s : au retour d'un onglet caché, la particule ne saute
        // pas ; sur un appareil lent, le ralenti annoncé reste vrai.
        const dt = Math.min(0.25, (maintenant - avant) / 1000);
        const t = Math.min(finRef.current, tempsRef.current + dt * L.NS_PAR_SECONDE);
        tempsRef.current = t;
        setEtat((e) => ({ ...e, t }));
        if (t >= finRef.current) {
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

  /** Un réglage change la trajectoire : la course repart de zéro, arrêtée. */
  const regler = (patch: Partial<L.EtatLorentz>) => {
    setEnLecture(false);
    setEtat((e) => ({ ...e, ...patch, t: 0 }));
  };

  const glisser = useGlisserVue(
    (dA, dE) => setAngles((a) => ({ ...a, azimut: a.azimut + dA, elevation: Math.max(-80, Math.min(88, a.elevation + dE)) })),
    () => setVue(null)
  );
  const choisirVue = (v: NomVue) => {
    setVue(v);
    setAngles(VUES[v]);
  };

  // ── Lectures (toutes calculées, au point courant) ──
  const p = L.point(etat, etat.t);
  const R = L.rayon(etat);
  const so = L.sortie(etat);
  const angle = L.angleForceVitesse(etat, p);
  const sensRotation = L.cote(etat) === 1 ? "inverse des aiguilles d’une montre" : "des aiguilles d’une montre";
  const horsCadre = etat.region === "partout" && (R > -L.CADRE.xMin || 2 * R > L.CADRE.yMax);
  const nom = NOM[etat.particule];
  const champTexte = `${L.formatChamp(etat.B)}, dirigé vers l’${etat.sens === "entrant" ? "arrière" : "avant"} de la figure`;

  const issueTexte =
    so.type === "aucune"
      ? `${nom.le.charAt(0).toUpperCase() + nom.le.slice(1)} décrit un cercle de rayon ${L.formatRayon(R).replace("≈", "environ")}, dans le sens ${sensRotation} vu comme sur la figure, à vitesse constante.`
      : so.type === "traverse"
        ? `${nom.le.charAt(0).toUpperCase() + nom.le.slice(1)} traverse le couloir et en ressort en ligne droite, dévié de ${L.formatDegres(so.theta).replace("≈", "environ")}.`
        : `Le rayon (${L.formatRayon(R).replace("≈", "environ")}) est plus petit que le couloir : ${nom.le} fait demi-tour et ressort par la face d’entrée.`;

  const description = useMemo(
    () =>
      `Scène en trois dimensions : ${nom.un} entre à ${L.formatVitesse(etat.v0)} dans un champ magnétique uniforme de ${champTexte}, ` +
      `perpendiculaire à sa vitesse ; le champ occupe ${etat.region === "couloir" ? "un couloir de 2,0 cm de large" : "tout l’espace"}.` +
      (issue ? ` ${issueTexte}` : ""),
    [nom.un, etat.v0, champTexte, etat.region, issue, issueTexte]
  );

  if (rendu.panneau === "ferme") {
    return <SceneOptIn sceneId={scene.scene} titre={scene.title} legende={scene.caption} onOuvrir={rendu.ouvrir} className={className} />;
  }

  const finie = etat.t >= fin - 1e-9;

  const ligneLecture = (cle: string, terme: React.ReactNode, valeur: string) => (
    <div key={cle} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-subtle pb-1.5">
      <dt className="text-secondary">{terme}</dt>
      <dd className="tabular-nums text-primary" data-lecture={cle}>
        {frenchTypography(valeur)}
      </dd>
    </div>
  );

  const radios = <T extends string>(nomGroupe: string, valeur: T, options: readonly (readonly [T, string])[], changer: (v: T) => void) =>
    options.map(([v, libelle]) => (
      <label key={v} className="flex min-h-touch items-center gap-2 text-body-sm text-primary">
        <input type="radio" name={`${idTitre}-${nomGroupe}`} checked={valeur === v} onChange={() => changer(v)} className="accent-figure-ink-soft" />
        <MathText>{libelle}</MathText>
      </label>
    ));

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-particule={etat.particule}
      data-b={etat.B}
      data-sens={etat.sens}
      data-v0={etat.v0}
      data-region={etat.region}
      data-t-ns={Math.round(etat.t * 100) / 100}
      data-course-finie={finie ? "oui" : "non"}
      data-pari={pari.phase}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Scène 3D
      </Eyebrow>
      <ConsigneEtape idTitre={idTitre} idConsigne={idConsigne} titre={etape.titre} consigne={etape.consigne} />

      <div className="grid gap-5 bp-expanded:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] bp-expanded:items-start">
        <Plateau
          hoteRef={rendu.hoteRef}
          canvasRef={rendu.canvasRef}
          panneau={rendu.panneau}
          description={description}
          glisser={glisser}
          legende={etat.region === "couloir" ? "Champ limité à un couloir de 2,0 cm" : "Champ uniforme dans tout l’espace"}
          messageSansWebgl="Ce navigateur n’affiche pas la 3D (WebGL indisponible). Les paris, les réglages et les calculs restent justes ; la figure de la déflexion magnétique, plus bas dans la leçon, en montre l’essentiel."
          onRelancer={rendu.relancer}
          vues={<VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="hidden bp-expanded:flex" />}
        >
          <Etiquette refEl={etiquetteV} nom="v">
            <MathText>{"$\\vec v$"}</MathText>
          </Etiquette>
          <Etiquette refEl={etiquetteF} nom="F">
            <MathText>{"$\\vec F$"}</MathText>
          </Etiquette>
          <Etiquette refEl={etiquetteB} nom="B">
            <MathText>{"$\\vec B$"}</MathText>
          </Etiquette>
          <Etiquette refEl={etiquetteProduit} nom="produit">
            <MathText>{"$\\vec v_0 \\wedge \\vec B$"}</MathText>
          </Etiquette>
          <Etiquette refEl={etiquetteC} texte="C" />
          <Etiquette refEl={etiquetteTheta} nom="theta">
            <MathText>{"$\\theta$"}</MathText>
          </Etiquette>
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
              invitation="Lance la particule et regarde : la scène répond d'abord."
            />
          )}

          {/* La course — ouverte dès que l'élève a parié */}
          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" role="group" aria-label="La course de la particule">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={cn("btn-primary", "focus-ring")}
                  onClick={() => {
                    if (!enLecture && finie) setEtat((e) => ({ ...e, t: 0 }));
                    setEnLecture((l) => !l);
                  }}
                >
                  {enLecture ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                  {enLecture ? "Pause" : finie ? "Relancer" : etat.t > 0 ? "Reprendre" : "Lancer la particule"}
                </button>
                <button
                  type="button"
                  className={TRANSPORT_BTN_CLASS}
                  onClick={() => {
                    setEnLecture(false);
                    setEtat((e) => ({ ...e, t: 0 }));
                  }}
                  aria-label="Ramener la particule à son point de départ"
                >
                  <Icon name="reset" size={13} />
                  <span>Départ</span>
                </button>
              </div>
              <p className="text-caption text-secondary">
                {frenchTypography(`Ralenti : ${L.NS_PAR_SECONDE} ns de vol par seconde — le vol réel dure quelques milliardièmes de seconde.`)}
              </p>
              {horsCadre && (
                <p className="text-caption text-secondary" data-hors-cadre>
                  {frenchTypography(`Ce cercle (R ${L.formatRayon(R)}) sort du cadre : la particule y revient au bout d’un tour.`)}
                </p>
              )}
            </div>
          )}

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {ouvre("particule") && (
            <fieldset className="flex flex-col gap-1" data-controle="particule">
              <legend className="mb-1 text-body-sm text-secondary">La particule</legend>
              {radios(
                "particule",
                etat.particule,
                [
                  ["electron", "Un électron, $q = -e$"],
                  ["positon", "Un positon, $q = +e$ (même masse)"],
                ] as const,
                (v) => regler({ particule: v })
              )}
            </fieldset>
          )}

          {ouvre("champ") && (
            <label className="flex flex-col gap-1" data-controle="champ">
              <span className="text-body-sm text-secondary">
                {frenchTypography("Champ magnétique : B =")} <span className="tabular-nums text-primary">{L.formatChamp(etat.B)}</span>
              </span>
              <input
                type="range"
                min={L.B_MIN}
                max={L.B_MAX}
                step={L.PAS}
                value={etat.B}
                onChange={(e) => regler({ B: surGrille(parseFloat(e.target.value)) })}
                aria-valuetext={`B = ${L.formatChamp(etat.B)}, rayon ${L.formatRayon(R)}`}
                className={CURSEUR}
              />
            </label>
          )}

          {ouvre("sens") && (
            <fieldset className="flex flex-col gap-1" data-controle="sens">
              <legend className="mb-1 text-body-sm text-secondary">Sens du champ</legend>
              {radios(
                "sens",
                etat.sens,
                [
                  ["entrant", "Entrant ⊗ — vers l’arrière de la figure"],
                  ["sortant", "Sortant ⊙ — vers l’avant de la figure"],
                ] as const,
                (v) => regler({ sens: v })
              )}
            </fieldset>
          )}

          {ouvre("vitesse") && (
            <label className="flex flex-col gap-1" data-controle="vitesse">
              <span className="text-body-sm text-secondary">
                {frenchTypography("Vitesse d’entrée :")} <span className="tabular-nums text-primary">{frenchTypography(`v₀ = ${L.formatVitesse(etat.v0)}`)}</span>
              </span>
              <input
                type="range"
                min={L.V_MIN}
                max={L.V_MAX}
                step={L.PAS}
                value={etat.v0}
                onChange={(e) => regler({ v0: surGrille(parseFloat(e.target.value)) })}
                aria-valuetext={`v₀ = ${L.formatVitesse(etat.v0)}, rayon ${L.formatRayon(R)}`}
                className={CURSEUR}
              />
            </label>
          )}

          {ouvre("region") && (
            <fieldset className="flex flex-col gap-1" data-controle="region">
              <legend className="mb-1 text-body-sm text-secondary">Où règne le champ</legend>
              {radios(
                "region",
                etat.region,
                [
                  ["couloir", "Dans un couloir de 2,0 cm de large"],
                  ["partout", "Dans tout l’espace"],
                ] as const,
                (v) => regler({ region: v })
              )}
            </fieldset>
          )}

          {/* Les lectures de l'étape, calculées au point courant de la course */}
          {lectures.length > 0 && (
            <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
              {lectures.includes("v") && ligneLecture("v", <>Norme de la vitesse, <i>v</i></>, L.formatVitesse(L.normeVitesse(p)))}
              {lectures.includes("F") &&
                ligneLecture("F", <>Norme de la force, <i>F</i> = |<i>q</i>|&#8239;<i>v</i>&#8239;<i>B</i></>, p.phase === "champ" ? L.formatForce(L.normeForce(etat, p)) : "0 N — hors du champ")}
              {lectures.includes("angle") &&
                ligneLecture("angle", <MathText>{"Angle entre $\\vec F$ et $\\vec v$"}</MathText>, angle === null ? "— hors du champ" : `${L.nombre(angle, 0)}°`)}
              {lectures.includes("R") && ligneLecture("R", <MathText>{"Rayon $R = \\dfrac{m\\,v_0}{|q|\\,B}$"}</MathText>, L.formatRayon(R))}
              {lectures.includes("theta") &&
                ligneLecture(
                  "theta",
                  <MathText>{"Déviation $\\theta$, avec $\\sin\\theta = \\ell/R$"}</MathText>,
                  so.type === "traverse" ? L.formatDegres(so.theta) : so.type === "demi-tour" ? "demi-tour : R < ℓ" : "— le champ est partout"
                )}
            </dl>
          )}

          {/* La fiche : la force, le rayon, et ce qui arrive — après la révélation
              seulement, elle EST la réponse (§11.190). */}
          {issue && (
            <div className="rounded-lg border border-subtle px-4 py-3" data-fiche>
              <p className="mb-2 text-caption font-medium text-secondary">La force de Lorentz</p>
              <div className="flex flex-col gap-1 text-body-sm text-primary">
                <MathText>{"$\\vec F = q\\,\\vec v \\wedge \\vec B$, de norme $F = |q|\\,v\\,B$, toujours perpendiculaire à $\\vec v$"}</MathText>
                <MathText>{"$R = \\dfrac{m\\,v_0}{|q|\\,B}$"}</MathText>
              </div>
              <p className="mt-2 text-body-sm font-medium text-primary" aria-live="polite" aria-atomic="true" data-issue>
                {frenchTypography(issueTexte)}
              </p>
            </div>
          )}
        </div>

        <VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="flex bp-expanded:hidden" />
      </div>

      <TransportEtapes index={indexEtape} total={etapes.length} onAller={allerA} idConsigne={idConsigne} />
    </section>
  );
}
