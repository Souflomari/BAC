"use client";

/**
 * ElectrolysePanel — « le banc d'électrolyse » : la cellule zinc/cuivre de la
 * leçon, un générateur, un rhéostat, un ampèremètre, un chronomètre et deux
 * balances (pc/electrolyse, en tête de R4 ; spec
 * content/pc/electrolyse/spec-scene-electrolyse.md).
 *
 * Le treizième manipulable sur l'appareillage des scènes (ADR 0041) : opt-in
 * au clic, étapes, pari avant tout, un contrôle neuf par étape, une COURSE —
 * on ferme le circuit, le chronomètre part, la balance monte, et la course
 * s'arrête à la durée réglée. C'est la paillasse qui répond, avant le texte.
 *
 * LA TENSION NE DÉCIDE QUE DU SENS (spec §5.5) : un rhéostat tient le courant ;
 * la charge Q = I·Δt décide de la quantité. Rien dans ce panneau ne calcule
 * avec la tension — le modèle ne la prend pas en argument.
 *
 * AVANT LE PARI (spec §7.6) : à S1, ni aiguille, ni flèche, ni étiquette
 * « anode » / « cathode », ni lame entamée ; aux étapes suivantes, l'énoncé
 * que la consigne décrit (le dépôt déjà pesé), et rien de ce qu'il devient.
 *
 * `etat_revele`, DANS UNE SCÈNE À COURSE : le réglage que le pari décrit est
 * posé à l'ENGAGEMENT — la course qui répond court dans ce réglage-là (les deux
 * temps du tremplin). S4 n'en a pas : la course refait la mesure décrite.
 */

import { createRef, useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PauseIcon, PlayIcon } from "@/components/ui/Icon";
import { TRANSPORT_BTN_CLASS } from "../TransportButton";
import { MathText } from "../ChoiceButton";
import * as M from "@/lib/scene2d/electrolyse-modele";
import type { RenduElectrolyse } from "@/lib/scene2d/electrolyse-rendu";
import { GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS_CARRE } from "./commun";
import { EncadreRepli } from "./EncadreRepli";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, boiteLegende, disposer, poser } from "./Plateau";

interface EtatElectrolyse {
  u: M.Tension;
  cablage: M.Cablage;
  i: M.Intensite;
  duree: M.Duree;
}

type Phase = "repos" | "course" | "finie";

function appliquer(e: Scene3DEtat | undefined, c: EtatElectrolyse): EtatElectrolyse {
  if (!e) return c;
  const u = String(e.u_v ?? ""), cab = String(e.cablage ?? ""), i = String(e.i_ma ?? ""), d = String(e.duree_s ?? "");
  return {
    u: (M.TENSIONS as readonly string[]).includes(u) ? (u as M.Tension) : c.u,
    cablage: (M.CABLAGES as readonly string[]).includes(cab) ? (cab as M.Cablage) : c.cablage,
    i: (M.INTENSITES as readonly string[]).includes(i) ? (i as M.Intensite) : c.i,
    duree: (M.DUREES as readonly string[]).includes(d) ? (d as M.Duree) : c.duree,
  };
}

const ETAT_DE_BASE: EtatElectrolyse = { u: "6.0", cablage: "oppose", i: "200", duree: "1800" };

const REPERES_PORTE = [
  "gen", "borne-plus", "borne-moins", "croisement", "coin-g", "coin-d", "rheostat", "ampere-pivot", "ampere-zero", "aiguille-bout",
  "bain-cu", "bain-zn", "pont", "lame-cu-haut", "lame-cu-mi", "lame-cu-tete", "lame-zn-haut", "lame-zn-mi", "lame-zn-tete",
  "balance-cu", "balance-zn", "temoin-g", "temoin-d",
  "i-g-queue", "i-g-tete", "i-d-queue", "i-d-tete", "e-g-queue", "e-g-tete", "e-d-queue", "e-d-tete",
] as const;

/** Le système demande-t-il moins de mouvement ? */
function useMouvementReduit() {
  const [reduit, setReduit] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduit(mq.matches);
    const suivre = () => setReduit(mq.matches);
    mq.addEventListener?.("change", suivre);
    return () => mq.removeEventListener?.("change", suivre);
  }, []);
  return reduit;
}

const BRANCHEMENT: Record<M.Cablage, string> = { oppose: "borne + sur le cuivre (B)", accord: "borne + sur le zinc (A)" };
const DUREE_CRAN: Record<M.Duree, string> = { "1800": "30 min", "2700": "45 min", "5400": "1 h 30" };

export function ElectrolysePanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<EtatElectrolyse>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [phase, setPhase] = useState<Phase>("repos");
  const [enLecture, setEnLecture] = useState(false);
  const [pCourse, setPCourse] = useState(0);
  const [annonce, setAnnonce] = useState("");
  const mouvementReduit = useMouvementReduit();
  const rapideRef = useRef(false);
  const tRef = useRef(0);
  const etatRef = useRef<EtatElectrolyse>(etat);
  const phaseRef = useRef<Phase>(phase);
  etatRef.current = etat;
  phaseRef.current = phase;
  /** l'engagement de CETTE entrée dans l'étape a-t-il posé son réglage ? */
  const engageApplique = useRef(false);
  const reveleApplique = useRef(false);

  const idTitre = useId();
  const idConsigne = useId();
  const refs = {
    plus: useRef<HTMLSpanElement>(null),
    moins: useRef<HTMLSpanElement>(null),
    tension: useRef<HTMLSpanElement>(null),
    chrono: useRef<HTMLSpanElement>(null),
    rheostat: useRef<HTMLSpanElement>(null),
    intensite: useRef<HTMLSpanElement>(null),
    pont: useRef<HTMLSpanElement>(null),
    cuivre: useRef<HTMLSpanElement>(null),
    zinc: useRef<HTMLSpanElement>(null),
    roleCu: useRef<HTMLSpanElement>(null),
    roleZn: useRef<HTMLSpanElement>(null),
    balanceCu: useRef<HTMLSpanElement>(null),
    balanceZn: useRef<HTMLSpanElement>(null),
    i: useRef<HTMLSpanElement>(null),
    e: useRef<HTMLSpanElement>(null),
    temoin: useRef<HTMLSpanElement>(null),
  };
  const repRefs = useRef(Object.fromEntries(REPERES_PORTE.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES_PORTE)[number], React.RefObject<HTMLSpanElement>>);

  // ── Le pari : il attend la course ENTIÈRE (la balance répond à la durée réglée) ──
  const finie = phase === "finie";
  const fraction = etape.pari?.revele_apres_course ?? 0;
  const pari = usePari(etape.pari, { attend: fraction > 0, montre: finie });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const revele = pari.phase === "revele" || pari.phase === "aucun";
  const engage = pari.phase !== "attente";
  const libre = etape.controles.length > 1;
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const premiere = indexEtape === 0;

  // l'ENGAGEMENT pose le réglage que le pari décrit : la course courra dans ce réglage-là
  useEffect(() => {
    if (pari.phase !== "note" || engageApplique.current) return;
    engageApplique.current = true;
    const r = etape.etat_revele;
    if (r) setEtat((c) => appliquer(r, c));
    setAnnonce("Le pari est pris : ferme le circuit.");
  }, [pari.phase, etape]);

  // la RÉVÉLATION dit ce que la balance affiche
  useEffect(() => {
    if (pari.phase !== "revele" || reveleApplique.current) return;
    reveleApplique.current = true;
    const s = etatRef.current;
    setAnnonce(phrasePesee(s));
  }, [pari.phase, etape]);

  // ── Ce que la paillasse montre ──
  // p : la fraction de la course. Avant l'engagement, S1 montre des lames neuves et
  // les étapes suivantes l'énoncé que leur consigne décrit (la mesure déjà faite) ;
  // après, la course repart de zéro dans le réglage du pari.
  const p = !engage ? (premiere ? 0 : 1) : phase === "course" ? pCourse : phase === "finie" || revele ? 1 : 0;
  const circuit = premiere ? engage && (phase !== "repos" || revele) : true;
  const accentCircuit = premiere && circuit;
  const accentDepot = engage;
  const temoin = !premiere;

  // ── Rendu ──
  const renduRef = useRef<RenduElectrolyse | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.mettreAJour({ cablage: etat.cablage, iMa: +etat.i, dureeS: +etat.duree, p, circuit, accentCircuit, accentDepot, temoin });
    s.rendre();
    const q = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    const en = (n: string, visible = true) => (q[n] && q[n].visible && visible ? q[n] : cache);
    const roles = premiere ? revele : true;
    // les lectures posées sur leurs instruments : à leur place, pas négociées
    poser(refs.balanceCu.current, en("balance-cu"));
    poser(refs.balanceZn.current, en("balance-zn"));
    poser(refs.chrono.current, en("chrono"), "0%", "-100%");
    const gauche = { ...en("lame-cu-mi"), x: en("lame-cu-mi").x - 22 };
    const droite = { ...en("lame-zn-mi"), x: en("lame-zn-mi").x + 22 };
    disposer(
      [
        { el: refs.plus.current, p: { ...en("borne-plus"), y: en("borne-plus").y - 15 }, surAncre: true, directions: [[0, -1], [-1, -1], [-1, 0]], portee: 8 },
        { el: refs.moins.current, p: { ...en("borne-moins"), y: en("borne-moins").y - 15 }, surAncre: true, directions: [[0, -1], [1, -1], [1, 0]], portee: 8 },
        { el: refs.roleCu.current, p: roles ? gauche : cache, directions: [[-1, 0], [-1, -1], [-1, 1]], portee: 18 },
        { el: refs.roleZn.current, p: roles ? droite : cache, directions: [[1, 0], [1, -1], [1, 1]], portee: 18 },
        { el: refs.cuivre.current, p: en("lame-cu-tete"), directions: [[-1, 0], [-1, -1], [-1, 1], [1, -1]], portee: 18 },
        { el: refs.zinc.current, p: en("lame-zn-tete"), directions: [[1, 0], [1, -1], [1, 1], [-1, -1]], portee: 18 },
        { el: refs.intensite.current, p: en("intensite"), directions: [[1, 0], [1, 1], [1, -1], [-1, 1]], portee: 32 },
        { el: refs.tension.current, p: en("tension"), directions: [[1, 0], [1, -1], [1, 1]], portee: 18 },
        { el: refs.rheostat.current, p: en("rheostat-nom"), directions: [[-1, 0], [-1, -1], [-1, 1]], portee: 18 },
        { el: refs.i.current, p: en("i-g-mi", circuit), surAncre: true, directions: [[0, -1], [1, -1], [-1, -1]], portee: 8 },
        { el: refs.e.current, p: en("e-g-mi", circuit), surAncre: true, directions: [[0, 1], [1, 1], [-1, 1]], portee: 8 },
        { el: refs.pont.current, p: en("pont"), directions: [[0, -1], [0, 1]], portee: 18 },
        { el: refs.temoin.current, p: en("temoin-d", temoin), directions: [[1, 0], [1, -1], [1, 1]], portee: 8 },
      ],
      s.segments(),
      s.cadre(),
      [boiteLegende(rendu.hoteRef.current), ...s.zones()].filter((b): b is NonNullable<typeof b> => b !== null)
    );
    for (const n of REPERES_PORTE) poser(repRefs.current[n].current, q[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, p, circuit, accentCircuit, accentDepot, temoin, indexEtape, revele]);

  const rendu = useSceneRendu<RenduElectrolyse>(() => import("@/lib/scene2d/electrolyse-rendu").then((m) => m.creerRenduElectrolyse), dessiner, {
    surPerte: () => setEnLecture(false),
  });
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // ── Changer d'étape : lames neuves, chronomètre à zéro ──
  const auRepos = useCallback(() => {
    setEnLecture(false);
    setPhase("repos");
    tRef.current = 0;
    setPCourse(0);
  }, []);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      engageApplique.current = false;
      reveleApplique.current = false;
      setEtat((c) => appliquer(e.etat, c));
      auRepos();
    },
    [etapes, pari, indexEtape, auRepos]
  );

  // ── La course : de zéro à la durée réglée, accélérée ×900, mesurée contre l'HORLOGE ──
  const demarrer = (sansAnimation = mouvementReduit) => {
    rapideRef.current = sansAnimation;
    tRef.current = 0;
    setPCourse(0);
    setPhase("course");
    setEnLecture(true);
    setAnnonce(sansAnimation ? "Manipulation calculée sans animation." : "Le circuit est fermé : le chronomètre part.");
  };

  useEffect(() => {
    if (!enLecture) return;
    let id = 0;
    let avant: number | null = null;
    const T = M.dureeEcran(+etatRef.current.duree);
    const terminer = () => {
      tRef.current = T;
      setPCourse(1);
      setPhase("finie");
      setEnLecture(false);
      setAnnonce(phrasePesee(etatRef.current));
    };
    const image = (maintenant: number) => {
      const dt = avant === null ? 0 : Math.min(0.1, (maintenant - avant) / 1000);
      avant = maintenant;
      if (rapideRef.current) {
        terminer();
        return;
      }
      tRef.current = Math.min(T, tRef.current + dt);
      setPCourse(tRef.current / T);
      if (tRef.current >= T - 1e-9) {
        terminer();
        return;
      }
      id = requestAnimationFrame(image);
    };
    id = requestAnimationFrame(image);
    return () => cancelAnimationFrame(id);
  }, [enLecture]);

  const regler = (patch: Partial<EtatElectrolyse>) => {
    const s = { ...etatRef.current, ...patch };
    // un réglage pendant une course l'ARRÊTE, et la paillasse montre la fin de la
    // nouvelle manipulation (la course courait dans l'ancien réglage)
    if (phaseRef.current === "course") {
      setEnLecture(false);
    }
    setPhase("finie");
    setPCourse(1);
    setEtat(s);
    // chaque réglage est DIT : le lecteur d'écran ne relit pas l'image
    if (patch.cablage !== undefined) setAnnonce(`Branchement : ${BRANCHEMENT[s.cablage]}. ${phrasePesee(s)}`);
    else if (patch.duree !== undefined) setAnnonce(`Durée : ${DUREE_CRAN[s.duree]}. ${phrasePesee(s)}`);
    else if (patch.i !== undefined) setAnnonce(`Intensité : ${M.ecrireIntensite(+s.i)}. ${phrasePesee(s)}`);
    else if (patch.u !== undefined) setAnnonce(`Tension : ${M.ecrireTension(+s.u)}. L’ampèremètre affiche toujours ${M.ecrireIntensite(+s.i)}. ${phrasePesee(s)}`);
  };

  if (rendu.panneau === "ferme") {
    return (
      <SceneOptIn
        sceneId={scene.scene}
        titre={scene.title}
        legende={scene.caption}
        onOuvrir={rendu.ouvrir}
        className={className}
        surtitre="Simulation"
        libelleOuvrir="Ouvrir le banc d’électrolyse"
      />
    );
  }

  // ── Les nombres (une seule voie : la loi de Faraday, sans la tension) ──
  const lu = M.lire(+etat.i, +etat.duree, etat.cablage, p);
  const fin = M.lire(+etat.i, +etat.duree, etat.cablage, 1);
  const plusSurCuivre = etat.cablage === "oppose";
  const roleCu = plusSurCuivre ? "anode" : "cathode";
  const roleZn = plusSurCuivre ? "cathode" : "anode";
  const roleVisible = premiere ? revele : true;
  const accentTexte = "text-figure-accent";

  const ligneLecture = (cleL: string, terme: React.ReactNode, valeur: React.ReactNode) => (
    <div key={cleL} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-subtle pb-1.5">
      <dt className="text-secondary">{terme}</dt>
      <dd className="ml-auto text-right tabular-nums text-primary" data-lecture={cleL}>
        {typeof valeur === "string" ? frenchTypography(valeur) : valeur}
      </dd>
    </div>
  );

  const description =
    `La cellule de la leçon, sur la paillasse : à gauche une lame de cuivre (B) dans sa solution, à droite une lame de zinc (A) dans la sienne, un pont salin entre les deux. En haut, le générateur, réglé sur ${M.ecrireTension(+etat.u)} : sa borne plus est à gauche, sa borne moins à droite. ` +
    (plusSurCuivre ? "Ses deux fils descendent sans se croiser : la borne plus alimente le cuivre (B), la borne moins le zinc (A). " : "Ses deux fils se croisent sous lui : la borne plus alimente le zinc (A), la borne moins le cuivre (B). ") +
    `Sur le fil du cuivre, un rhéostat tient le courant à ${M.ecrireIntensite(+etat.i)} ; sur celui du zinc, un ampèremètre à zéro central` +
    (circuit ? `, dont l’aiguille penche à ${plusSurCuivre ? "droite" : "gauche"}.` : ", sans aiguille : le circuit est ouvert.") +
    ` Le chronomètre marque ${M.ecrireDuree(lu.tempsReel)}.` +
    (p > 0 ? ` La balance du zinc (A) affiche ${M.ecrireMasse(lu.masseZinc)} g, celle du cuivre (B) ${M.ecrireMasse(lu.masseCuivre)} g.` : "");

  const blocLectures =
    lectures.length > 0 ? (
      <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
        {lectures.includes("tension") && ligneLecture("tension", <MathText>{"Tension du générateur, $U$"}</MathText>, M.ecrireTension(+etat.u))}
        {lectures.includes("fem") && ligneLecture("fem", <MathText>{"Force électromotrice propre de la cellule, $E$"}</MathText>, `environ ${M.ecrireTension(M.FEM)}`)}
        {lectures.includes("sens") && ligneLecture("sens", "Sens de la transformation", M.ECRIRE_SENS[fin.sens])}
        {lectures.includes("intensite") && ligneLecture("intensite", <MathText>{"Intensité, tenue par le rhéostat, $I$"}</MathText>, M.ecrireIntensite(+etat.i))}
        {lectures.includes("duree") && ligneLecture("duree", <MathText>{"Durée, $\\Delta t$"}</MathText>, `${DUREE_CRAN[etat.duree]} = ${M.entier(+etat.duree)} s`)}
        {lectures.includes("charge") && ligneLecture("charge", <MathText>{"Quantité d’électricité, $Q = I\\,\\Delta t$"}</MathText>, `${M.ecrireCharge(fin.Q)} C`)}
        {lectures.includes("masse-zinc") && ligneLecture("masse-zinc", "Masse gagnée par la lame de zinc (A)", `${M.ecrireMasse(fin.masseZinc)} g`)}
        {lectures.includes("masse-cuivre") && ligneLecture("masse-cuivre", "Masse gagnée par la lame de cuivre (B)", `${M.ecrireMasse(fin.masseCuivre)} g`)}
        {lectures.includes("quantite-electrons") &&
          ligneLecture(
            "quantite-electrons",
            <MathText>{"Électrons échangés, $n(e^-) = \\dfrac{2\\,m(Zn)}{M(Zn)}$"}</MathText>,
            <MathText>{`$${M.scientifique(fin.electrons, 4)}$ mol`}</MathText>
          )}
        {lectures.includes("faraday-mesure") &&
          ligneLecture(
            "faraday-mesure",
            <MathText>{"Charge par mole d’électrons, $\\dfrac{Q}{n(e^-)}$"}</MathText>,
            <MathText>{`$${M.scientifique(fin.faraday, 3)}$ C·mol⁻¹`}</MathText>
          )}
      </dl>
    ) : null;

  const groupe = (id: string, legende: string, valeurs: readonly string[], courant: string, texte: (v: string) => string, choisir: (v: string) => void) => (
    <fieldset className="flex flex-col gap-1" data-controle={id}>
      <legend className="mb-1 text-body-sm text-secondary">
        <MathText>{legende}</MathText>
      </legend>
      <div className="flex flex-wrap gap-x-1">
        {valeurs.map((x) => (
          <label key={x} className={LIGNE_RADIO}>
            <input type="radio" name={`${idTitre}-${id}`} value={x} checked={courant === x} onChange={() => choisir(x)} className="accent-figure-ink-soft" />
            <span className="tabular-nums">{frenchTypography(texte(x))}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  const libelleLancer = enLecture ? "Pause" : phase === "course" ? "Reprendre" : finie || revele ? "Refaire la manipulation" : "Fermer le circuit";
  const balanceClasse = (m: number) => cn("tabular-nums", accentDepot && m !== 0 ? accentTexte : "text-primary");

  return (
    <section
      className={cn("my-10 scroll-mt-14 bp-expanded:scroll-mt-20 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-pari={pari.phase}
      data-course={phase}
      data-u-v={etat.u}
      data-cablage={etat.cablage}
      data-i-ma={etat.i}
      data-duree-s={etat.duree}
      data-p={p.toFixed(3)}
      data-accelere={M.ACCELERE}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Simulation
      </Eyebrow>
      <ConsigneEtape idTitre={idTitre} idConsigne={idConsigne} titre={etape.titre} consigne={etape.consigne} cle={etape.id} rang={{ index: indexEtape, total: etapes.length }} />

      <div className={GRILLE_SCENE} data-scene-grille>
        <Plateau
          hoteRef={rendu.hoteRef}
          canvasRef={rendu.canvasRef}
          panneau={rendu.panneau}
          description={description}
          legende="Accéléré : 1 s pour un quart d’heure"
          messageSansWebgl="Ce navigateur n’affiche pas la paillasse (dessin indisponible). Les paris et les réglages restent."
          onRelancer={rendu.relancer}
          // CARRÉE partout : le générateur, les deux fils, les instruments, les
          // béchers et les balances s'empilent — en 4:3 au téléphone, l'ampèremètre
          // n'avait plus que 33 px de hauteur entre le fil et la lame
          format="carre-partout"
        >
          <Etiquette refEl={refs.plus} nom="nom-plus" texte="+" />
          <Etiquette refEl={refs.moins} nom="nom-moins" texte="−" />
          <Etiquette refEl={refs.tension} nom="nom-tension">
            <span className="tabular-nums">{frenchTypography(M.ecrireTension(+etat.u))}</span>
          </Etiquette>
          <Etiquette refEl={refs.chrono} nom="nom-chrono" fond>
            <span className="tabular-nums">{frenchTypography(`t = ${M.ecrireDuree(lu.tempsReel)}`)}</span>
          </Etiquette>
          <Etiquette refEl={refs.rheostat} nom="nom-rheostat" texte="rhéostat" discret />
          <Etiquette refEl={refs.intensite} nom="nom-intensite">
            <span className="tabular-nums">{frenchTypography(M.ecrireIntensite(+etat.i))}</span>
          </Etiquette>
          <Etiquette refEl={refs.pont} nom="nom-pont" texte="pont salin" discret />
          <Etiquette refEl={refs.cuivre} nom="nom-cuivre" texte="cuivre (B)" />
          <Etiquette refEl={refs.zinc} nom="nom-zinc" texte="zinc (A)" />
          {/* les rôles n'EXISTENT qu'une fois dits : à S1, après la révélation (une
              étiquette cachée reste dans le texte du panneau, et la réponse fuit) */}
          <Etiquette refEl={refs.roleCu} nom="nom-role-cu" fond>
            {roleVisible && <span className={premiere ? accentTexte : "text-secondary"}>{roleCu}</span>}
          </Etiquette>
          <Etiquette refEl={refs.roleZn} nom="nom-role-zn" fond>
            {roleVisible && <span className={premiere ? accentTexte : "text-secondary"}>{roleZn}</span>}
          </Etiquette>
          <Etiquette refEl={refs.balanceCu} nom="nom-balance-cu">
            <span className={balanceClasse(lu.masseCuivre)}>{frenchTypography(`${M.ecrireMasse(lu.masseCuivre)} g`)}</span>
          </Etiquette>
          <Etiquette refEl={refs.balanceZn} nom="nom-balance-zn">
            <span className={balanceClasse(lu.masseZinc)}>{frenchTypography(`${M.ecrireMasse(lu.masseZinc)} g`)}</span>
          </Etiquette>
          <Etiquette refEl={refs.i} nom="nom-i">
            {circuit && <MathText>{"$I$"}</MathText>}
          </Etiquette>
          <Etiquette refEl={refs.e} nom="nom-e">
            {circuit && <MathText>{"$e^-$"}</MathText>}
          </Etiquette>
          <Etiquette refEl={refs.temoin} nom="nom-temoin" texte="1 g" discret />
          {REPERES_PORTE.map((r) => (
            <Etiquette key={r} refEl={repRefs.current[r]} nom={r} texte="" />
          ))}
        </Plateau>

        <div className={cn("flex min-w-0 flex-col gap-5", MARGE_FOCUS_CARRE)}>
          {etape.pari && (
            <PariBloc
              pari={etape.pari}
              invitation="Ferme le circuit et regarde : la paillasse répond d’abord."
              phase={pari.phase}
              choixId={pari.choixId}
              choixRetenu={pari.choixRetenu}
              choixNotion={pari.choixNotion}
              onChoisir={pari.choisir}
              idBase={idTitre}
            />
          )}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" role="group" aria-label="La manipulation">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={cn("btn-primary", "focus-ring")}
                  data-lancer
                  onClick={() => {
                    if (enLecture) setEnLecture(false);
                    else if (phase === "course") setEnLecture(true);
                    else demarrer();
                  }}
                >
                  {enLecture ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                  {libelleLancer}
                </button>
                {/* Toujours MONTÉ : pendant une course il l'abrège ; sinon il la
                    calcule sans la jouer et donne l'image de la fin. */}
                <button
                  type="button"
                  className={TRANSPORT_BTN_CLASS}
                  data-image-finale
                  onClick={() => {
                    if (phase === "course") {
                      rapideRef.current = true;
                      setEnLecture(true);
                    } else demarrer(true);
                  }}
                >
                  <span>Image finale</span>
                </button>
              </div>
            </div>
          )}

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {libre && blocLectures}

          <div className="flex flex-col gap-5">
            {ouvre("branchement") && groupe("branchement", "Le branchement", M.CABLAGES, etat.cablage, (v) => BRANCHEMENT[v as M.Cablage], (v) => regler({ cablage: v as M.Cablage }))}
            {ouvre("duree") && groupe("duree", "La durée, $\\Delta t$", M.DUREES, etat.duree, (v) => DUREE_CRAN[v as M.Duree], (v) => regler({ duree: v as M.Duree }))}
            {ouvre("courant") && groupe("courant", "L’intensité que tient le rhéostat, $I$", M.INTENSITES, etat.i, (v) => M.ecrireIntensite(+v), (v) => regler({ i: v as M.Intensite }))}
            {ouvre("tension") && groupe("tension", "La tension du générateur, $U$", M.TENSIONS, etat.u, (v) => M.ecrireTension(+v), (v) => regler({ u: v as M.Tension }))}
          </div>

          {!libre && blocLectures}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" data-notes>
              <EncadreRepli titre="Ce que ce banc simplifie">
                {frenchTypography(
                  "L’épaisseur du dépôt est dessinée bien plus grande qu’elle ne l’est — un vrai dépôt de moins d’un gramme ferait quelques dizaines de micromètres. Le facteur est le même partout, et le témoin « 1 g » le montre : deux fois plus de grammes, deux fois plus épais. Le nombre, lui, est sur la balance. La balance affiche ce qu’on obtiendrait en pesant la lame avant et après : le banc la montre monter pendant la manipulation ; dans un vrai montage, on fait deux pesées. Un rhéostat maintient le courant à la valeur affichée, quelle que soit la tension : c’est ce que veut dire « intensité constante » dans un énoncé. Sans lui, monter la tension ferait monter le courant — et ce banc ne sait pas le chiffrer. Ici, deux récipients reliés par un pont salin, le montage de ce chapitre ; le jour de l’examen, tu verras le plus souvent un tube en U avec les deux électrodes dans la même solution : le dessin change, le raisonnement pas. Enfin, la manipulation est accélérée : une seconde à l’écran pour un quart d’heure réel."
                )}
              </EncadreRepli>
            </div>
          )}
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite" data-annonce>
        {annonce}
      </p>
      <TransportEtapes index={indexEtape} total={etapes.length} onAller={allerA} idConsigne={idConsigne} />
    </section>
  );
}

/** Ce que la balance affiche à la fin d'une manipulation, en une phrase (la région vivante). */
function phrasePesee(s: EtatElectrolyse): string {
  const r = M.lire(+s.i, +s.duree, s.cablage, 1);
  return `Au bout de ${DUREE_CRAN[s.duree]}, la balance du zinc (A) affiche ${M.ecrireMasse(r.masseZinc)} g, celle du cuivre (B) ${M.ecrireMasse(r.masseCuivre)} g.`;
}

