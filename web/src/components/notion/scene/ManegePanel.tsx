"use client";

/**
 * ManegePanel — « le manège » : le moment d'une force PAR RAPPORT À UN AXE
 * (pc/rotation-axe-fixe, R2 ; ADR 0041 ; spec :
 * content/pc/rotation-axe-fixe/spec-scene-manege.md).
 *
 * Pourquoi de la 3D ici (spec §2) : la figure plane de la notion dessine l'axe
 * comme un POINT (⊙) et toutes les forces dans le plan de la page. Une force
 * PARALLÈLE à l'axe y est indessinable — vue de dessus un point, vue de côté un
 * énorme bras de levier. Le poids d'un enfant assis au bord (245 N, à 1,50 m de
 * l'axe) ne fait pas tourner le manège d'un degré ; basculez l'axe, et le même
 * poids, au même point, à la même distance, donne 367,5 N·m. Le moment n'est
 * pas une propriété de la force : c'est celle d'un couple (force, axe).
 *
 * Chaque étape pose son état, demande un pari, et la scène répond d'abord : le
 * verdict attend la course ENTIÈRE (`revele_apres_course: 1` — pour le poids,
 * la preuve est la durée pendant laquelle il ne se passe rien). Avant le pari,
 * rien de ce qui dépend de l'issue : ni lecture, ni droite d'action, ni bras de
 * levier, ni arc, ni trace, ni phrase lue (spec §7.6).
 *
 * Toute la physique vient de `manege.ts` ; le rendu three.js
 * (`manege-rendu.ts`) n'est importé qu'au clic.
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
import * as M from "@/lib/scene3d/manege";
import type { SceneManege } from "@/lib/scene3d/manege-rendu";
import { CURSEUR, LIGNE_RADIO, MARGE_FOCUS, type Vue } from "./commun";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { useGlisserVue } from "./useGlisserVue";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { VuesBloc } from "./VuesBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, disposer, poser } from "./Plateau";

type NomVue = "dessus" | "biais" | "cote";

/** « Δ » se lit au-dessus du bout de l'axe, puis à côté. */
const DESSUS_D_ABORD = [
  [0, -1],
  [1, -1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  [0, 1],
] as const;

// Les trois vues restent disponibles AVANT le pari (spec §7.6, exception
// argumentée) : elles sont l'équivalent clavier du glisser. La vue d'ouverture
// de l'étape 1 est « de côté » — la plus favorable à l'erreur, jamais celle
// qui trahit.
const VUES: Record<NomVue, Vue> = {
  dessus: { azimut: -90, elevation: 89, libelle: "Du dessus" },
  biais: { azimut: -55, elevation: 30, libelle: "De biais" },
  cote: { azimut: -90, elevation: 6, libelle: "De côté" },
};

function nomVue(v: unknown): NomVue | undefined {
  return v === "dessus" || v === "biais" || v === "cote" ? v : undefined;
}

const borne = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

function appliquer(etat: Scene3DEtat | undefined, courant: M.EtatManege): M.EtatManege {
  if (!etat) return { ...courant, t: 0 };
  const axe: M.Axe = etat.axe === "vertical" || etat.axe === "horizontal" ? etat.axe : courant.axe;
  const force: M.Force = etat.force === "poids" || etat.force === "radiale" || etat.force === "tangentielle" ? etat.force : courant.force;
  return {
    // Axe basculé : seul le poids agit (l'étape qui bascule n'ouvre pas la force).
    force: axe === "horizontal" ? "poids" : force,
    axe,
    rSieges: typeof etat.r_sieges === "number" ? borne(M.surGrille(etat.r_sieges), M.R_SIEGES_MIN, M.RAYON) : courant.rSieges,
    rPoussee: typeof etat.r_poussee === "number" ? borne(M.surGrille(etat.r_poussee), M.R_POUSSEE_MIN, M.RAYON) : courant.rPoussee,
    occupants: etat.occupants === "un" || etat.occupants === "deux" ? etat.occupants : courant.occupants,
    // Entrer dans une étape : le manège repart du repos.
    t: 0,
  };
}

const ETAT_DE_BASE: M.EtatManege = { force: "poids", axe: "vertical", rSieges: 1.5, rPoussee: 1.5, occupants: "un", t: 0 };

// « Moment DU poids », pas « moment de le poids » : l'article se contracte
// (capture du 2026-09-24).
const DU_FORCE: Record<M.Force, string> = {
  poids: "du poids de l’enfant",
  radiale: "de la poussée radiale",
  tangentielle: "de la poussée tangentielle",
};

const NOM_COURT: Record<M.Force, string> = {
  poids: "le poids",
  radiale: "la poussée radiale",
  tangentielle: "la poussée tangentielle",
};

/** La trace : la position finale d'un essai, et le réglage qui l'a produite. */
interface Trace {
  angle: number;
  reglage: Pick<M.EtatManege, "force" | "rSieges" | "rPoussee" | "occupants">;
}

/**
 * Ce que l'étiquette de la trace dit : ce qui DIFFÈRE entre l'essai précédent
 * et l'essai en cours — la force à l'étape 1, les sièges à l'étape 4. Elle
 * disait « sièges à 1,50 m » quand seule la force avait changé (capture du
 * 2026-09-24).
 */
function texteTrace(t: Trace, e: M.EtatManege): string {
  const diffs: string[] = [];
  if (t.reglage.force !== e.force) diffs.push(NOM_COURT[t.reglage.force]);
  if (t.reglage.rSieges !== e.rSieges) diffs.push(`sièges à ${M.texteDistance(t.reglage.rSieges)}`);
  if (t.reglage.force === "tangentielle" && e.force === "tangentielle" && t.reglage.rPoussee !== e.rPoussee)
    diffs.push(`poussée à ${M.texteDistance(t.reglage.rPoussee)}`);
  if (t.reglage.occupants !== e.occupants) diffs.push(t.reglage.occupants === "un" ? "un enfant" : "deux enfants");
  return diffs.length ? `essai précédent : ${diffs.join(", ")}` : "essai précédent";
}

export function ManegePanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<M.EtatManege>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const vueInitiale = nomVue(etapes[0]?.etat?.vue) ?? "cote";
  const [vue, setVue] = useState<NomVue | null>(vueInitiale);
  const [angles, setAngles] = useState(VUES[vueInitiale]);
  const [enLecture, setEnLecture] = useState(false);
  // `fin` : l'essai qui vient de se terminer ; `trace` : celui qu'on DESSINE —
  // l'essai d'avant, pour que les deux positions finales restent côte à côte.
  const [finEssai, setFinEssai] = useState<Trace | null>(null);
  const [trace, setTrace] = useState<Trace | null>(null);

  const idTitre = useId();
  const idConsigne = useId();
  const etiquetteAxe = useRef<HTMLSpanElement>(null);
  const etiquetteForce = useRef<HTMLSpanElement>(null);
  const etiquetteBras = useRef<HTMLSpanElement>(null);
  const etiquetteComposante = useRef<HTMLSpanElement>(null);
  const etiquetteTrace = useRef<HTMLSpanElement>(null);
  const repCentre = useRef<HTMLSpanElement>(null);
  const repRepere = useRef<HTMLSpanElement>(null);
  const repSiege = useRef<HTMLSpanElement>(null);
  const repQueue = useRef<HTMLSpanElement>(null);
  const repPointe = useRef<HTMLSpanElement>(null);
  const repBrasPied = useRef<HTMLSpanElement>(null);
  const repBrasBout = useRef<HTMLSpanElement>(null);

  // ── Le pari : il attend la course entière ──
  const fin = M.finCourse(etat);
  const fraction = etape.pari?.revele_apres_course ?? 0;
  const pari = usePari(etape.pari, { attend: fraction > 0, montre: etat.t >= fraction * fin - 1e-9 });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const issue = pari.etapeOuverte;
  const engage = pari.phase !== "attente";

  // ── Ce que la scène calcule (manege.ts), au point courant de la course ──
  const theta = M.angle(etat);
  const bras = M.brasDeLevier(etat);
  const mom = M.moment(etat);
  const J = M.inertie(etat);
  const thetaPP = M.acceleration(etat);
  const w = M.omega(etat);
  const finie = etat.t >= fin - 1e-9;
  const nbEnfants = M.nombreEnfants(etat.occupants);
  // Axe basculé : le moment VARIE pendant la descente. La révélation tombe à
  // l'équilibre, où il vaut 0,0 — le nombre du mauvais pari. La lecture garde
  // donc celui du lâcher à côté du courant (critique pédagogique, B1) : le
  // 367,5 que l'étape veut montrer reste à l'écran au moment du verdict.
  const momLacher = M.moment({ ...etat, t: 0 });
  const texteMoment =
    etat.axe === "horizontal" && etat.t > 0
      ? `au lâcher : ${M.nombre(momLacher, 1)} N·m · ${finie ? "à l’équilibre" : "maintenant"} : ${M.nombre(mom, 1)} N·m`
      : `${M.nombre(mom, 1)} N·m`;

  // ── Rendu ──
  const renduRef = useRef<SceneManege | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.orienter(angles.azimut, angles.elevation);
    s.mettreAJour({
      axe: etat.axe,
      theta,
      rSieges: etat.rSieges,
      occupants: etat.occupants,
      force: etat.force,
      rPoussee: etat.rPoussee,
      droiteAction: engage,
      bras: engage && bras > 1e-9 ? bras : null,
      arcs: engage,
      trace: engage && trace ? trace.angle : null,
    });
    s.rendre();
    const e = s.etiquettes();
    // Les étiquettes de TEXTE sont disposées (ni chevauchées, ni barrées) ;
    // les repères ci-dessous restent à leur point exact, pour la porte.
    disposer(
      [
        { el: etiquetteAxe.current, p: e.axe, directions: DESSUS_D_ABORD },
        { el: etiquetteForce.current, p: e.force },
        { el: etiquetteComposante.current, p: { ...e.composante, visible: e.composante.visible && issue && etat.axe === "vertical" && etat.force === "poids" }, surAncre: true },
        { el: etiquetteBras.current, p: e.bras, surAncre: true },
        { el: etiquetteTrace.current, p: e.trace, surAncre: true },
      ],
      s.segments(),
      s.cadre()
    );
    poser(repCentre.current, e.centre);
    poser(repRepere.current, e.repere);
    poser(repSiege.current, e.siege);
    poser(repQueue.current, e.queue);
    poser(repPointe.current, e.pointe);
    poser(repBrasPied.current, e.brasPied);
    poser(repBrasBout.current, e.brasBout);
  }, [etat, angles, theta, bras, engage, issue, trace]);

  const rendu = useSceneRendu<SceneManege>(
    () => import("@/lib/scene3d/manege-rendu").then((m) => m.creerSceneManege),
    dessiner,
    { surPerte: () => setEnLecture(false) }
  );
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // ── Aller à une étape : pose son état, arrête la course, efface la trace ──
  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      setEnLecture(false);
      // Chaque étape garde son pari ; « Recommencer » (dernière → première) repart à blanc.
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      setEtat((courant) => appliquer(e.etat, courant));
      setFinEssai(null);
      setTrace(null);
      const v = nomVue(e.etat?.vue);
      if (v) {
        setVue(v);
        setAngles(VUES[v]);
      }
    },
    [etapes, pari, indexEtape]
  );

  // ── La course : lancée à la main, en temps réel, et elle s'arrête seule ──
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
        // Plafond à 0,25 s : au retour d'un onglet caché, le manège ne saute pas.
        const dt = Math.min(0.25, (maintenant - avant) / 1000);
        const t = Math.min(finRef.current, tempsRef.current + dt);
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

  // Un essai terminé devient la trace du suivant (axe vertical : c'est là
  // qu'on compare des angles).
  useEffect(() => {
    if (finie && etat.axe === "vertical" && etat.t > 0)
      setFinEssai({ angle: theta, reglage: { force: etat.force, rSieges: etat.rSieges, rPoussee: etat.rPoussee, occupants: etat.occupants } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finie]);

  /** Le manège revient au repos ; l'essai terminé devient la trace. */
  const auDepart = () => {
    setEnLecture(false);
    if (finEssai) setTrace(finEssai);
    setEtat((e) => ({ ...e, t: 0 }));
  };

  /** Un réglage change la situation : la course repart de zéro, arrêtée. */
  const regler = (patch: Partial<M.EtatManege>) => {
    setEnLecture(false);
    if (finEssai) setTrace(finEssai);
    setEtat((e) => {
      const n = { ...e, ...patch, t: 0 };
      if (n.axe === "horizontal") n.force = "poids";
      return n;
    });
  };

  const glisser = useGlisserVue(
    (dA, dE) => setAngles((a) => ({ ...a, azimut: a.azimut + dA, elevation: Math.max(-10, Math.min(89, a.elevation + dE)) })),
    () => setVue(null)
  );
  const choisirVue = (v: NomVue) => {
    setVue(v);
    setAngles(VUES[v]);
  };

  // ── Les phrases : ce que la scène vient de montrer ──
  const F = M.intensite(etat.force);
  const issueTexte =
    etat.axe === "horizontal"
      ? finie
        ? `Au lâcher, siège à l’horizontale, le poids de l’enfant (245 N) était perpendiculaire à Δ, avec un bras de levier de ${M.texteDistance(etat.rSieges)} : moment ${M.nombre(momLacher, 1)} N·m. Le siège est descendu jusque sous l’axe — la roue a tourné de ${M.texteAngle(theta)} — et le bras de levier a fondu avec lui : à l’équilibre, la droite d’action passe par Δ et le moment vaut 0,0 N·m.`
        : `Axe horizontal : le poids de l’enfant (245 N) est perpendiculaire à Δ. Son bras de levier vaut ${M.texteDistance(bras)}, son moment ${M.nombre(mom, 1)} N·m.`
      : etat.force === "poids"
        ? `Le poids de l’enfant (245 N) est parallèle à Δ : dans le plan où le manège tourne, il n’a rien. Son moment vaut 0,0 N·m${finie ? `, et en ${M.nombre(M.DUREE, 1)} s le manège a tourné de ${M.texteAngle(theta)}.` : "."}`
        : etat.force === "radiale"
          ? `La poussée radiale (30 N) a sa droite d’action qui passe par Δ : bras de levier nul, moment 0,0 N·m${finie ? `, et en ${M.nombre(M.DUREE, 1)} s le manège a tourné de ${M.texteAngle(theta)}.` : "."}`
          : `La poussée tangentielle (30 N), à ${M.texteDistance(etat.rPoussee)} de l’axe, a un moment de ${M.nombre(mom, 1)} N·m` +
            // J et θ̈ ne sont NOMMÉS que par les étapes qui les affichent : θ̈
            // est en avance de deux chapitres, seule l'étape libre l'ouvre
            // (spec §3 ; critique pédagogique, SF3).
            ((etape.lectures ?? []).includes("inertie") ? ` ; J = ${M.nombre(J, 1)} kg·m²` : "") +
            ((etape.lectures ?? []).includes("acceleration") ? ` ; θ̈ = ${M.nombre(thetaPP, 3)} rad·s⁻²` : "") +
            (finie ? `, et en ${M.nombre(M.DUREE, 1)} s le manège a tourné de ${M.texteAngle(theta)}.` : ".");

  const axeTexte = etat.axe === "vertical" ? "vertical" : "horizontal";
  const enfantsTexte =
    nbEnfants === 1
      ? `un enfant de 25 kg assis à ${M.texteDistance(etat.rSieges)} de l’axe`
      : `deux enfants de 25 kg assis face à face, à ${M.texteDistance(etat.rSieges)} de l’axe`;
  const forceTexte =
    etat.force === "poids"
      ? "la force dessinée est son poids, 245 N, vertical"
      : `la force dessinée est une poussée de 30 N, ${etat.force === "radiale" ? "dirigée vers l’axe" : "perpendiculaire au rayon"}, à ${M.texteDistance(etat.rPoussee)} de l’axe`;
  const description = useMemo(
    () =>
      `Scène en trois dimensions : un manège, disque de 1,50 m de rayon, libre de tourner autour d’un axe Δ ${axeTexte} ; ${enfantsTexte} ; ${forceTexte}.` +
      (issue ? ` ${issueTexte}` : ""),
    [axeTexte, enfantsTexte, forceTexte, issue, issueTexte]
  );

  // La fiche : chaque ligne n'apparaît que si l'étape qui l'établit a été
  // RÉVÉLÉE — rien avant le pari, pour toute la scène (revue WAVE 2).
  const acquis = (id: string) => etapes.some((e) => e.id === id) && pari.revelee(id, etape.id);

  if (rendu.panneau === "ferme") {
    return <SceneOptIn sceneId={scene.scene} titre={scene.title} legende={scene.caption} onOuvrir={rendu.ouvrir} className={className} />;
  }

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
      <label key={v} className={LIGNE_RADIO}>
        <input type="radio" name={`${idTitre}-${nomGroupe}`} value={v} checked={valeur === v} onChange={() => changer(v)} className="accent-figure-ink-soft" />
        <MathText>{libelle}</MathText>
      </label>
    ));

  const libelleLancer =
    etat.axe === "horizontal"
      ? enLecture
        ? "Pause"
        : finie
          ? "Relâcher encore"
          : etat.t > 0
            ? "Reprendre"
            : "Lâcher le siège"
      : enLecture
        ? "Pause"
        : finie
          ? "Relancer"
          : etat.t > 0
            ? "Reprendre"
            : `Lancer — ${M.nombre(M.DUREE, 1)} s`;

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-force={etat.force}
      data-axe={etat.axe}
      data-r-sieges={M.nombre(etat.rSieges, 2).replace(",", ".")}
      data-r-poussee={M.nombre(etat.rPoussee, 2).replace(",", ".")}
      data-occupants={etat.occupants}
      data-t={Math.round(etat.t * 1000) / 1000}
      data-course-finie={finie ? "oui" : "non"}
      data-pari={pari.phase}
      data-vue={vue ?? "libre"}
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
          legende={etat.axe === "vertical" ? "Axe Δ vertical" : "Axe Δ horizontal"}
          messageSansWebgl="Ce navigateur n’affiche pas la 3D (WebGL indisponible). Les paris, les réglages et les calculs restent justes."
          onRelancer={rendu.relancer}
          vues={<VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="hidden bp-expanded:flex" />}
        >
          <Etiquette refEl={etiquetteAxe} nom="axe">
            <MathText>{"$\\Delta$"}</MathText>
          </Etiquette>
          <Etiquette refEl={etiquetteForce} nom="force" texte={`${M.nombre(F, 0)} N`} />
          <Etiquette refEl={etiquetteBras} nom="bras" texte={`d = ${M.texteDistance(bras)}`} />
          <Etiquette refEl={etiquetteComposante} nom="composante" texte="dans le plan de rotation : 0 N" />
          <Etiquette refEl={etiquetteTrace} nom="trace" texte={trace ? texteTrace(trace, etat) : ""} />
          {/* Des repères SANS texte : l'élève ne voit rien ; la porte y lit,
              en pixels, le rayon peint, le siège, la force et le bras. */}
          <Etiquette refEl={repCentre} nom="centre" texte="" />
          <Etiquette refEl={repRepere} nom="repere" texte="" />
          <Etiquette refEl={repSiege} nom="siege" texte="" />
          <Etiquette refEl={repQueue} nom="queue" texte="" />
          <Etiquette refEl={repPointe} nom="pointe" texte="" />
          <Etiquette refEl={repBrasPied} nom="bras-pied" texte="" />
          <Etiquette refEl={repBrasBout} nom="bras-bout" texte="" />
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
              invitation={etat.axe === "horizontal" ? "Lâche le siège et regarde : la scène répond d'abord." : "Lance la course et regarde : la scène répond d'abord."}
            />
          )}

          {/* La course — elle n'existe qu'une fois l'élève engagé */}
          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" role="group" aria-label="La course du manège">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={cn("btn-primary", "focus-ring")}
                  data-lancer
                  onClick={() => {
                    if (!enLecture && (finie || etat.t === 0)) {
                      if (finEssai) setTrace(finEssai);
                      if (finie) setEtat((e) => ({ ...e, t: 0 }));
                    }
                    setEnLecture((l) => !l);
                  }}
                >
                  {enLecture ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                  {libelleLancer}
                </button>
                <button type="button" className={TRANSPORT_BTN_CLASS} onClick={auDepart} aria-label="Ramener le manège au repos">
                  <Icon name="reset" size={13} />
                  <span>Départ</span>
                </button>
              </div>
              <p className="text-caption text-secondary">
                {frenchTypography(
                  etat.axe === "horizontal"
                    ? "En temps réel. Frottements nuls ; le palier tient l’axe fixe. Le poids du disque passe par Δ et la réaction de l’axe s’applique sur lui : de moment nul, ils ne sont pas dessinés."
                    : etat.force === "poids" && nbEnfants === 1
                      ? "En temps réel. Frottements nuls ; le palier tient l’axe fixe. Le poids du disque et la réaction de l’axe, de moment nul par rapport à Δ, ne sont pas dessinés."
                      : `En temps réel. Frottements nuls ; le palier tient l’axe fixe. ${etat.force === "poids" ? "Le poids du disque, celui de l’autre enfant" : "Les poids (disque et enfants)"} et la réaction de l’axe, de moment nul par rapport à Δ, ne sont pas dessinés.`
                )}
              </p>
              {finie && (
                <p className="text-caption text-secondary" data-fin-course>
                  {frenchTypography(
                    etat.axe === "horizontal"
                      ? "Arrêtée à l’équilibre. Sans frottement, la roue passerait ce point et remonterait de l’autre côté — c’est l’oscillation du chapitre 7, dont la scène ne montre pas la suite."
                      : `Course terminée, image arrêtée à t = ${M.nombre(M.DUREE, 1)} s.${mom > 0 ? " Sans frottement, le manège continuerait à tourner à vitesse angulaire constante ; la scène n’en montre pas la suite." : ""}`
                  )}
                </p>
              )}
            </div>
          )}

          {/* Au téléphone, les vues viennent juste après le pari et le lancement. */}
          <VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="flex bp-expanded:hidden" />

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {ouvre("force") && (
            <fieldset className="flex flex-col gap-1" data-controle="force">
              <legend className="mb-1 text-body-sm text-secondary">La force étudiée</legend>
              {radios(
                "force",
                etat.force,
                [
                  ["poids", "Le poids de l’enfant — 245 N, vertical, au siège"],
                  ["radiale", "Une poussée radiale — 30 N, droit vers l’axe"],
                  ["tangentielle", "Une poussée tangentielle — 30 N, perpendiculaire au rayon"],
                ] as const,
                (v) => regler({ force: v })
              )}
            </fieldset>
          )}

          {ouvre("axe") && (
            <fieldset className="flex flex-col gap-1" data-controle="axe">
              <legend className="mb-1 text-body-sm text-secondary">La direction de l’axe Δ</legend>
              {radios(
                "axe",
                etat.axe,
                [
                  ["vertical", "Vertical — le manège"],
                  ["horizontal", "Horizontal — la roue"],
                ] as const,
                (v) => regler({ axe: v })
              )}
            </fieldset>
          )}

          {ouvre("distance") && (
            <label className="flex flex-col gap-1" data-controle="distance">
              <span className="text-body-sm text-secondary">
                {frenchTypography("Les sièges, à")} <span className="tabular-nums text-primary">{M.texteDistance(etat.rSieges)}</span>{" "}
                {frenchTypography("de l’axe")}
              </span>
              <input
                type="range"
                min={M.R_SIEGES_MIN}
                max={M.RAYON}
                step={M.PAS}
                value={etat.rSieges}
                onChange={(e) => regler({ rSieges: borne(M.surGrille(parseFloat(e.target.value)), M.R_SIEGES_MIN, M.RAYON) })}
                aria-valuetext={`sièges à ${M.texteDistance(etat.rSieges)} de l’axe`}
                className={CURSEUR}
              />
            </label>
          )}

          {ouvre("bras") && (
            <label className="flex flex-col gap-1" data-controle="bras">
              <span className="text-body-sm text-secondary">
                {frenchTypography("La poussée, à")} <span className="tabular-nums text-primary">{M.texteDistance(etat.rPoussee)}</span>{" "}
                {frenchTypography("de l’axe")}
              </span>
              <input
                type="range"
                min={M.R_POUSSEE_MIN}
                max={M.RAYON}
                step={M.PAS}
                value={etat.rPoussee}
                onChange={(e) => regler({ rPoussee: borne(M.surGrille(parseFloat(e.target.value)), M.R_POUSSEE_MIN, M.RAYON) })}
                aria-valuetext={`poussée à ${M.texteDistance(etat.rPoussee)} de l’axe`}
                className={CURSEUR}
              />
            </label>
          )}

          {/* L'instant (étape 3) : on parcourt la MÊME course, en avant, en
              arrière. Il remplace le curseur des sièges, qui déplaçait des
              masses — donc J, donc l'angle — et donnait à lire, une étape trop
              tôt, la réponse du pari de l'étape 4 (capture du 2026-09-24). */}
          {ouvre("instant") && (
            <label className="flex flex-col gap-1" data-controle="instant">
              <span className="text-body-sm text-secondary">
                {frenchTypography("L’instant :")} <span className="tabular-nums text-primary">{frenchTypography(`t = ${M.nombre(etat.t, 1)} s`)}</span>
              </span>
              <input
                type="range"
                min={0}
                max={fin}
                step={0.1}
                value={etat.t}
                onChange={(e) => {
                  setEnLecture(false);
                  const t = borne(Math.round(parseFloat(e.target.value) * 10) / 10, 0, fin);
                  setEtat((x) => ({ ...x, t }));
                }}
                aria-valuetext={`t = ${M.nombre(etat.t, 1)} s`}
                className={CURSEUR}
              />
            </label>
          )}

          {/* Les lectures de l'étape, au point courant de la course */}
          {lectures.length > 0 && (
            <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
              {lectures.includes("moment") &&
                ligneLecture("moment", <MathText>{`Moment ${DU_FORCE[etat.force]}, $\\mathcal{M}_\\Delta$`}</MathText>, texteMoment)}
              {lectures.includes("inertie") &&
                ligneLecture(
                  "inertie",
                  <MathText>{"$J_\\Delta$ — disque + enfants"}</MathText>,
                  `${M.nombre(M.J_DISQUE, 1)} + ${nbEnfants === 2 ? "2 × " : ""}25 × ${M.nombre(etat.rSieges, 2)}² = ${M.nombre(J, 1)} kg·m²`
                )}
              {lectures.includes("acceleration") &&
                ligneLecture(
                  "acceleration",
                  <MathText>{"$\\ddot\\theta = \\Sigma\\mathcal{M}_\\Delta / J_\\Delta$"}</MathText>,
                  etat.axe === "vertical" ? `${M.nombre(thetaPP, 3)} rad·s⁻²` : "non affiché, axe basculé"
                )}
              {lectures.includes("omega") &&
                ligneLecture("omega", <MathText>{"Vitesse angulaire $\\omega$"}</MathText>, etat.axe === "vertical" ? `${M.nombre(w, 1)} rad/s` : "—")}
              {lectures.includes("angle") && ligneLecture("angle", <MathText>{"Angle tourné $\\theta$"}</MathText>, M.texteAngle(theta))}
            </dl>
          )}

          {lectures.includes("points") && (
            <div className="rounded-lg border border-subtle px-4 py-3" data-lecture="points">
              <p className="mb-2 text-caption font-medium text-secondary">Deux points du même disque</p>
              <table className="w-full text-body-sm tabular-nums">
                <thead>
                  <tr className="text-left text-caption text-secondary">
                    <th className="font-medium">point</th>
                    <th className="font-medium">
                      <MathText>{"$d$"}</MathText>
                    </th>
                    <th className="font-medium">
                      <MathText>{"$v = d\\,\\omega$"}</MathText>
                    </th>
                    <th className="font-medium">
                      <MathText>{"$s = d\\,\\theta$"}</MathText>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-primary">
                  {(
                    [
                      ["siege", "le siège", etat.rSieges],
                      ["bord", "le repère du bord", M.RAYON],
                    ] as const
                  ).map(([cle, nom, d]) => (
                    <tr key={cle} data-point={cle}>
                      <td>{frenchTypography(nom)}</td>
                      <td>{frenchTypography(M.texteDistance(d))}</td>
                      <td data-v>{frenchTypography(`${M.nombre(M.vitessePoint(d, w), 2)} m/s`)}</td>
                      <td data-s>{frenchTypography(`${M.nombre(M.arcPoint(d, theta), 2)} m`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* La fiche : ce que les étapes RÉVÉLÉES ont établi, et ce qui vient
              d'arriver — après la révélation seulement, elle EST la réponse. */}
          {issue && (
            <div className="rounded-lg border border-subtle px-4 py-3" data-fiche>
              <p className="mb-2 text-caption font-medium text-secondary">Le moment d’une force par rapport à un axe</p>
              <div className="flex flex-col gap-1 text-body-sm text-primary">
                <MathText>{"$\\mathcal{M}_\\Delta(\\vec F) = \\pm\\,d\\cdot F$, avec $d$ le bras de levier de ce que la force a dans le plan perpendiculaire à $\\Delta$"}</MathText>
                {acquis("poids-parallele") && <MathText>{"Nul dès que la droite d'action rencontre l'axe ou lui est parallèle"}</MathText>}
                {acquis("axe-bascule") && <MathText>{"Le même poids, axe horizontal : $\\mathcal{M}_\\Delta = m\\,g\\,d$ siège à l'horizontale, puis de moins en moins à mesure que le bras de levier fond — le moment dépend de l'axe"}</MathText>}
                {acquis("deux-points") && <MathText>{"Un seul angle pour tout le disque : $s = d\\,\\theta$ et $v = d\\,\\omega$"}</MathText>}
                {acquis("repartition") && <MathText>{"$J_\\Delta = 67{,}5 + 2\\times 25\\,r^2$ : une masse loin de l'axe résiste davantage"}</MathText>}
              </div>
              <p className="mt-2 text-body-sm font-medium text-primary" data-issue>
                {frenchTypography(issueTexte)}
              </p>
            </div>
          )}
        </div>
      </div>

      <TransportEtapes index={indexEtape} total={etapes.length} onAller={allerA} idConsigne={idConsigne} />
    </section>
  );
}
