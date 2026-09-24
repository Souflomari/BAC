"use client";

/**
 * CuvePanel — « la cuve à ondes » : la diffraction par une ouverture, et la
 * COMPARAISON de deux longueurs, a et λ (pc/ondes-mecaniques-periodiques, R5 ;
 * spec content/pc/ondes-mecaniques-periodiques/spec-scene-cuve.md).
 *
 * Un manipulable en DEUX dimensions (ADR 0041, « Retractions and Corrections »,
 * première entrée : la diffraction dans une cuve est un phénomène PLAN). Il
 * reprend l'appareillage des scènes — opt-in au clic, étapes, pari avant tout,
 * porte qui lit le rendu — et n'en reprend ni la caméra, ni three.js.
 *
 * Le champ est CALCULÉ pendant que l'élève regarde (`lib/scene2d/fdtd.ts`),
 * montré au ralenti déclaré (×5 : à 40 Hz, le temps réel ne serait qu'un
 * brouillage sur un écran à 60 images par seconde). Avant le pari, l'eau est
 * PLATE : rien de ce qui dépend de l'issue n'existe (spec §7.6).
 */

import { createRef, useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, PauseIcon, PlayIcon } from "@/components/ui/Icon";
import { TRANSPORT_BTN_CLASS } from "../TransportButton";
import { MathText } from "../ChoiceButton";
import * as K from "@/lib/scene2d/cuve";
import { DT } from "@/lib/scene2d/fdtd";
import type { RenduCuve } from "@/lib/scene2d/cuve-rendu";
import { CURSEUR, GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS } from "./commun";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, disposer, poser } from "./Plateau";

type Chemin = "aucun" | "axe" | "arc";

interface EtatCuve {
  aCm: number;
  f: K.Frequence;
  chemin: Chemin;
  sondeCm: number;
  recepteurDeg: number;
  reference: boolean;
}

/** Où en est la course : l'eau plate, la référence (étape 2), l'effacement, la mesure, le balayage (étape 4), la fin. */
type Phase = "repos" | "reference" | "effacement" | "mesure" | "balayage" | "finie";

const borne = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const estFrequence = (v: unknown): v is K.Frequence => K.FREQUENCES.some((f) => String(f) === String(v));

function appliquer(e: Scene3DEtat | undefined, courant: EtatCuve): EtatCuve {
  if (!e) return courant;
  return {
    aCm: typeof e.a_cm === "number" ? borne(K.surGrilleA(e.a_cm), K.A_MIN, K.A_MAX) : courant.aCm,
    f: estFrequence(e.f_hz) ? (Number(e.f_hz) as K.Frequence) : courant.f,
    chemin: e.chemin === "axe" || e.chemin === "arc" || e.chemin === "aucun" ? e.chemin : courant.chemin,
    sondeCm: typeof e.sonde_cm === "number" ? borne(e.sonde_cm, K.SONDE_MIN, K.SONDE_MAX) : courant.sondeCm,
    recepteurDeg: typeof e.recepteur_deg === "number" ? borne(e.recepteur_deg, -K.RECEPTEUR_MAX, K.RECEPTEUR_MAX) : courant.recepteurDeg,
    reference: e.reference === "40Hz",
  };
}

const REPERES = ["a-debut", "a-fin", "lambda-debut", "lambda-fin", "ouverture-haut", "ouverture-bas", "sonde", "recepteur", "arc-centre", "arc-0", "arc--60", "arc-60", "regle"] as const;

/** Les directions essayées pour les pastilles de l'énoncé : vers l'onde qui arrive d'abord. */
const GAUCHE: readonly (readonly [number, number])[] = [
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 1],
  [1, 0],
];

/** Le système demande-t-il moins de mouvement ? (lu au montage, et suivi) */
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

const ETAT_DE_BASE: EtatCuve = { aCm: 4.0, f: 40, chemin: "aucun", sondeCm: -4.0, recepteurDeg: 0, reference: false };
/** La durée du balayage scripté du récepteur, en secondes d'ÉCRAN (spec §6). */
const BALAYAGE_S = 2.0;
/** L'effacement du champ entre la référence et la mesure, en secondes d'écran. */
const EFFACEMENT_S = 0.5;
/** Budget de calcul par image : au-delà, la cuve ralentit ET le dit. */
const BUDGET_MS = 11;

export function CuvePanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<EtatCuve>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [phase, setPhase] = useState<Phase>("repos");
  const [enLecture, setEnLecture] = useState(false);
  const [tCuve, setTCuve] = useState(0);
  const [facteur, setFacteur] = useState(1);
  const [releve, setReleve] = useState<(K.Releve & { cle: string }) | null>(null);
  const [angleBalaye, setAngleBalaye] = useState<number | null>(null);
  const [visites, setVisites] = useState<number[]>([]);
  const courseRef = useRef<K.Course | null>(null);
  // Calculer sans animer : sur demande (« Image finale »), ou d'office si le
  // système demande moins de mouvement (WCAG 2.3.3 ; revue ergonomie, vague 2).
  const [rapide, setRapide] = useState(false);
  const rapideRef = useRef(false);
  const mouvementReduit = useMouvementReduit();
  // le temps écoulé du balayage et de l'effacement : dans des refs, pour qu'une
  // PAUSE les retrouve (des variables locales à l'effet repartaient de zéro, et
  // la reprise sautait d'un coup à 60°)
  const balayageRef = useRef(0);
  const effacementRef = useRef(0);
  // ce que la cuve dit d'elle-même au lecteur d'écran : repos, course, fin
  const [annonce, setAnnonce] = useState("");
  const etatRef = useRef<EtatCuve>(etat);
  const phaseRef = useRef<Phase>(phase);

  const idTitre = useId();
  const idConsigne = useId();
  const refs = {
    a: useRef<HTMLSpanElement>(null),
    lambda: useRef<HTMLSpanElement>(null),
    regleDevant: useRef<HTMLSpanElement>(null),
    regleDerriere: useRef<HTMLSpanElement>(null),
  };
  // Des repères SANS texte : l'élève ne voit rien ; la porte y lit, en pixels,
  // le crochet de a, la règle de λ, la paroi, les instruments.
  const repRefs = useRef(Object.fromEntries(REPERES.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES)[number], React.RefObject<HTMLSpanElement>>);

  const lambdaCm = K.lambda(etat.f);
  const cle = `${etat.aCm}|${etat.f}`;
  // Un relevé ne vaut que pour une course FINIE de ce réglage : revenir au même
  // réglage sur une eau plate ne ressuscite pas ses mesures (revue ergonomie).
  const releveCourant = releve && releve.cle === cle && (phase === "finie" || phase === "balayage") ? releve : null;
  etatRef.current = etat;
  phaseRef.current = phase;

  // ── Le pari : il attend la course entière (et le balayage, à l'étape 4) ──
  const fraction = etape.pari?.revele_apres_course ?? 0;
  const pari = usePari(etape.pari, { attend: fraction > 0, montre: phase === "finie" });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const engage = pari.phase !== "attente";
  // Après le verdict, relancer sert à EXPLORER : ni la référence à 40 Hz de
  // l'étape 2, ni le balayage de l'étape 4 ne rejouent (ils coûtaient, à chaque
  // relance, 9 s de rappel déjà vu, ou le récepteur que l'élève tenait).
  const reveleRef = useRef(false);
  reveleRef.current = pari.phase === "revele";

  // ── Ce que la course a mesuré, relu à l'instrument de l'étape ──
  const lamDevant = releveCourant ? K.lambdaMesuree(releveCourant, -8.5, -1.0) : NaN;
  const lamDerriere = releveCourant ? K.lambdaMesuree(releveCourant, 2.0, 12.0) : NaN;
  const fSonde = releveCourant ? K.frequenceSonde(releveCourant, etat.sondeCm) : NaN;
  const ampSonde = releveCourant ? K.amplitudeSonde(releveCourant, etat.sondeCm) : NaN;
  const angleLu = angleBalaye ?? etat.recepteurDeg;
  const ampArc = releveCourant ? K.amplitudeArc(releveCourant, angleLu) : NaN;
  const profil = releveCourant ? visites.map((a) => ({ angle: a, amplitude: K.amplitudeArc(releveCourant, a) })) : [];

  // ── Rendu ──
  const renduRef = useRef<RenduCuve | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    const r = releveCourant;
    const regles = (() => {
      if (!r || etat.chemin !== "axe") return null;
      const l0 = K.lambdaMesuree(r, -8.5, -1.0), l1 = K.lambdaMesuree(r, 2.0, 12.0);
      if (!Number.isFinite(l0) || !Number.isFinite(l1)) return null;
      return { devant: [-1.0 - l0, -1.0] as [number, number], derriere: [2.0, 2.0 + l1] as [number, number] };
    })();
    const calcule = phase === "reference" || phase === "mesure";
    s.mettreAJour({
      // sans animation, l'eau reste plate pendant le calcul ; la référence figée
      // se montre pendant l'effacement (elle n'a pas été vue autrement)
      champ: courseRef.current && phase !== "repos" && (phase !== "effacement" || rapide) && !(rapide && calcule) ? courseRef.current.ch : null,
      aCm: etat.aCm,
      lambdaCm,
      chemin: etat.chemin,
      sondeCm: etat.sondeCm,
      recepteurDeg: angleLu,
      engage: engage && pari.etapeOuverte,
      ombre: etat.chemin !== "arc",
      reglesMesurees: pari.etapeOuverte ? regles : null,
      profil: engage ? profil : [],
      pale: enLecture && !rapide && calcule && (phase === "reference" ? 40 : etat.f) * K.RALENTI > 3,
    });
    s.rendre();
    const p = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    // Les pastilles « a = … » et « λ = … » : à gauche des crochets (sur le côté
    // de l'onde qui arrive, pas sur le couloir que l'étape regarde) ; absentes au
    // téléphone et à l'étape du flotteur, où les valeurs sont déjà dans la
    // consigne et les lectures, et où elles couvraient l'image (revues visuelle
    // et calme, vague 2).
    const sansPastilles = etat.chemin === "axe" || s.cadre().largeur < 480;
    disposer(
      [
        { el: refs.a.current, p: sansPastilles ? cache : p["etiquette-a"] ?? cache, directions: GAUCHE },
        { el: refs.lambda.current, p: sansPastilles ? cache : p["etiquette-lambda"] ?? cache, directions: GAUCHE },
        { el: refs.regleDevant.current, p: p["regle-devant"] ?? cache, surAncre: false },
        { el: refs.regleDerriere.current, p: p["regle-derriere"] ?? cache, surAncre: false },
      ],
      s.segments(),
      s.cadre()
    );
    for (const n of REPERES) poser(repRefs.current[n].current, p[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, lambdaCm, phase, engage, pari.etapeOuverte, releveCourant, angleLu, visites, tCuve, rapide, enLecture]);

  const rendu = useSceneRendu<RenduCuve>(() => import("@/lib/scene2d/cuve-rendu").then((m) => m.creerRenduCuve), dessiner, {
    surPerte: () => setEnLecture(false),
  });
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // ── Changer de réglage : l'eau redevient plate, la course repart de zéro ──
  const reinitialiser = useCallback((annoncer = true) => {
    if (annoncer && phaseRef.current !== "repos") setAnnonce("L’eau est remise au repos : relance la règle pour mesurer.");
    setEnLecture(false);
    courseRef.current = null;
    setPhase("repos");
    setTCuve(0);
    setAngleBalaye(null);
  }, []);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      setEtat((c) => appliquer(e.etat, c));
      setReleve(null);
      setVisites([]);
      reinitialiser(false);
    },
    [etapes, pari, indexEtape, reinitialiser]
  );

  // ── La course ──
  const demarrer = (sansAnimation = mouvementReduit) => {
    const e = etatRef.current;
    setVisites([]);
    setAngleBalaye(null);
    rapideRef.current = sansAnimation;
    setRapide(sansAnimation);
    balayageRef.current = 0;
    effacementRef.current = 0;
    setAnnonce(sansAnimation ? "Calcul de la cuve, sans animation." : "La règle bat.");
    if (e.reference && !reveleRef.current) {
      courseRef.current = new K.Course(e.aCm, 40, K.DUREE_REFERENCE);
      setPhase("reference");
    } else {
      courseRef.current = new K.Course(e.aCm, e.f, K.DUREE);
      setPhase("mesure");
    }
    setTCuve(0);
    setEnLecture(true);
  };

  useEffect(() => {
    if (!enLecture) return;
    let id = 0;
    let avant: number | null = null;
    let reste = 0; // pas fractionnaires en attente
    // Le facteur de temps se mesure contre l'HORLOGE, par fenêtres d'une
    // demi-seconde : temps de cuve calculé / temps de cuve promis. La première
    // version divisait les pas faits par les pas DEMANDÉS — plafonnés à 0,1 s
    // par image : dans un onglet ralenti à une image par seconde, elle disait
    // « ×0,52 » quand la cuve avançait à 6 % (vu par la porte, 2026-09-24).
    let cuveFenetre = 0;
    let murFenetre = 0;
    const image = (maintenant: number) => {
      const dtReel = avant === null ? 0 : (maintenant - avant) / 1000;
      const dt = Math.min(0.1, dtReel);
      avant = maintenant;
      const ph = phaseRef.current;
      const c = courseRef.current;
      if ((ph === "reference" || ph === "mesure") && c && rapideRef.current) {
        // sans animation : calculer vite, sans dessiner l'eau (ni éclair, ni saccade)
        const t0 = performance.now();
        while (!c.finie && performance.now() - t0 < 40) c.avancer(1);
        setTCuve(c.t);
      } else if ((ph === "reference" || ph === "mesure") && c) {
        reste += (K.RALENTI * dt) / DT;
        const voulus = Math.floor(reste);
        reste -= voulus;
        const t0 = performance.now();
        let faits = 0;
        while (faits < voulus && !c.finie && performance.now() - t0 < BUDGET_MS) {
          c.avancer(1);
          faits++;
        }
        if (faits < voulus) reste = 0; // la machine ne suit pas : on ralentit, et on le dit
        // un trou de plus de 2 s n'est pas la lenteur de l'appareil : l'onglet était caché
        if (dtReel > 0 && dtReel < 2) {
          murFenetre += dtReel;
          cuveFenetre += faits * DT;
        }
        if (murFenetre >= 0.5) {
          setFacteur(Math.min(1, cuveFenetre / (K.RALENTI * murFenetre)));
          murFenetre = 0;
          cuveFenetre = 0;
        }
        setTCuve(c.t);
      }
      if ((ph === "reference" || ph === "mesure") && c?.finie) {
        if (ph === "reference") {
          effacementRef.current = 0;
          setPhase("effacement");
        } else {
          const r = c.releve();
          setReleve({ ...r, cle: `${c.aCm}|${c.f}` });
          if (etatRef.current.chemin === "arc" && etape.pari?.revele_apres_course && !reveleRef.current) {
            balayageRef.current = 0;
            setPhase("balayage");
          } else {
            // après le verdict, pas de balayage : l'angle que l'élève tient reste, et compte
            if (etatRef.current.chemin === "arc") setVisites([etatRef.current.recepteurDeg]);
            setPhase("finie");
            setEnLecture(false);
            setAnnonce(`Course terminée : image arrêtée à t = ${K.nombre(c.t, 2)} s de cuve.`);
            return;
          }
        }
      } else if (ph === "effacement") {
        effacementRef.current += dtReel * 1000;
        // sans animation, la référence figée reste plus longtemps : c'est la seule fois qu'on la voit
        if (effacementRef.current >= (rapideRef.current ? 1500 : EFFACEMENT_S * 1000)) {
          const e = etatRef.current;
          courseRef.current = new K.Course(e.aCm, e.f, K.DUREE);
          setTCuve(0);
          setPhase("mesure");
          setAnnonce("L’ancien réglage est effacé ; la règle bat au nouveau.");
        }
      } else if (ph === "balayage") {
        balayageRef.current += dtReel * 1000;
        const k = Math.min(1, balayageRef.current / (BALAYAGE_S * 1000));
        const angle = Math.round((k * K.RECEPTEUR_MAX) / K.RECEPTEUR_PAS) * K.RECEPTEUR_PAS;
        setAngleBalaye(angle);
        setVisites((v) => (v.includes(angle) ? v : [...v, angle]));
        if (k >= 1) {
          setPhase("finie");
          setAngleBalaye(null);
          setEtat((e) => ({ ...e, recepteurDeg: K.RECEPTEUR_MAX }));
          setEnLecture(false);
          setAnnonce("Course terminée : le récepteur a parcouru l’arc, du centre jusqu’au bout.");
          return;
        }
      }
      id = requestAnimationFrame(image);
    };
    id = requestAnimationFrame(image);
    return () => cancelAnimationFrame(id);
  }, [enLecture, etape.pari?.revele_apres_course]);

  const regler = (patch: Partial<EtatCuve>) => {
    const change = ("aCm" in patch && patch.aCm !== etat.aCm) || ("f" in patch && patch.f !== etat.f);
    setEtat((e) => ({ ...e, ...patch }));
    if (change) reinitialiser();
    // un instrument déplacé après la course : l'angle visité s'ajoute au profil
    if ("recepteurDeg" in patch && releveCourant && typeof patch.recepteurDeg === "number") {
      const a = patch.recepteurDeg;
      setVisites((v) => (v.includes(a) ? v : [...v, a]));
    }
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
        libelleOuvrir="Ouvrir la cuve à ondes"
      />
    );
  }

  const ligneLecture = (cleL: string, terme: React.ReactNode, valeur: string) => (
    <div key={cleL} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-subtle pb-1.5">
      <dt className="text-secondary">{terme}</dt>
      <dd className="ml-auto text-right tabular-nums text-primary" data-lecture={cleL}>
        {frenchTypography(valeur)}
      </dd>
    </div>
  );
  const aMesurer = "relance la cuve pour mesurer";
  // le ralenti RÉEL, arrondi : « ×5 (×5 sur cet appareil) » ne dirait rien
  const ralentiReel = Math.round(5 / Math.max(0.05, facteur));
  // le réglage courant fait-il défiler des rides RAPIDES (plus de 3 inversions par seconde) ?
  const rapidesADessiner = (etat.reference && pari.phase !== "revele") || etat.f * K.RALENTI > 3;
  const finie = phase === "finie";
  const libelleLancer = enLecture ? "Pause" : phase === "finie" ? "Relancer" : phase === "repos" ? "Lancer la règle" : "Reprendre";

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-a-cm={etat.aCm}
      data-f-hz={etat.f}
      data-chemin={etat.chemin}
      data-sonde-cm={etat.sondeCm}
      data-recepteur-deg={angleLu}
      data-t={Math.round(tCuve * 1000) / 1000}
      data-phase={phase}
      data-course-finie={finie ? "oui" : "non"}
      data-pari={pari.phase}
      data-facteur-temps={facteur.toFixed(2)}
      data-cellules-a={K.cellules(etat.aCm)}
      data-cellules-lambda={K.cellules(lambdaCm)}
      data-lambda-mesuree-devant={Number.isFinite(lamDevant) ? lamDevant : undefined}
      data-lambda-mesuree-derriere={Number.isFinite(lamDerriere) ? lamDerriere : undefined}
      data-f-sonde={Number.isFinite(fSonde) ? fSonde : undefined}
      data-reflexion-max={releveCourant ? releveCourant.reflexion : undefined}
      data-profil={releveCourant ? K.ANGLES.map((a) => Math.round(K.amplitudeArc(releveCourant, a))).join(",") : undefined}
      data-profil-points={visites.length}
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
          description={`Cuve à ondes vue de dessus : une règle vibrante à gauche, à ${K.nombre(etat.f, 0)} Hz (rides de ${K.cm(lambdaCm)}), une paroi percée d’une ouverture de ${K.cm(etat.aCm)}.${phase === "repos" ? " L’eau est immobile." : ""}`}
          legende="Cuve à ondes · ralenti ×5"
          messageSansWebgl="Ce navigateur n’affiche pas la cuve (dessin indisponible). Les paris et les réglages restent."
          onRelancer={rendu.relancer}
          format="paysage"
        >
          <Etiquette refEl={refs.a} nom="a" texte={`a = ${K.cm(etat.aCm)}`} fond />
          <Etiquette refEl={refs.lambda} nom="lambda" fond>
            <MathText>{`$\\lambda$ = ${K.cm(lambdaCm)}`}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.regleDevant} nom="regle-devant" texte={Number.isFinite(lamDevant) ? `${K.deuxCS(lamDevant)} cm` : ""} fond />
          <Etiquette refEl={refs.regleDerriere} nom="regle-derriere" texte={Number.isFinite(lamDerriere) ? `${K.deuxCS(lamDerriere)} cm` : ""} fond />
          {REPERES.map((n) => (
            <Etiquette key={n} refEl={repRefs.current[n]} nom={n} texte="" />
          ))}
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
              invitation="Lance la règle et regarde : la cuve répond d'abord."
            />
          )}

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" role="group" aria-label="La course de la cuve">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={cn("btn-primary", "focus-ring")}
                  data-lancer
                  onClick={() => {
                    if (enLecture) setEnLecture(false);
                    else if (phase === "repos" || phase === "finie") demarrer();
                    else setEnLecture(true);
                  }}
                >
                  {enLecture ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                  {libelleLancer}
                </button>
                {/* Toujours MONTÉ (vague 2 de la corde) : il se démontait sous le
                    focus à la fin de la course qu'il abrège, et le focus tombait à
                    <body> ; et « Repos » sautait de place à chaque course. */}
                <button
                  type="button"
                  className={TRANSPORT_BTN_CLASS}
                  data-image-finale
                  aria-disabled={!(enLecture && !rapide && (phase === "reference" || phase === "mesure")) || undefined}
                  onClick={() => {
                    if (!(enLecture && !rapide && (phase === "reference" || phase === "mesure"))) return;
                    rapideRef.current = true;
                    setRapide(true);
                  }}
                >
                  <span>Image finale</span>
                </button>
                <button type="button" className={TRANSPORT_BTN_CLASS} onClick={() => reinitialiser()} aria-label="Remettre l’eau au repos">
                  <Icon name="reset" size={13} />
                  <span>Repos</span>
                </button>
              </div>
              <p className="text-caption text-secondary">
                {frenchTypography(
                  rapide && enLecture
                    ? `Calcul sans animation : t = ${K.nombre(tCuve, 1)} s de cuve.`
                    : `Au ralenti ×5 : une seconde à l’écran montre 0,20 s de cuve ; une course dure 2,0 s de cuve, une dizaine de secondes à l’écran. Temps de cuve : t = ${K.nombre(tCuve, enLecture ? 1 : 2)} s${phase === "reference" ? " — d’abord l’ancien réglage, 40 Hz" : ""}.`
                )}
              </p>
            </div>
          )}

          <div
            className="flex flex-col gap-5"
            onKeyDown={(ev) => {
              // Entrée sur un réglage relance la cuve : le geste que l'étape demande quinze fois
              if (ev.key === "Enter" && (ev.target as HTMLElement).tagName === "INPUT" && pari.tempsOuvert && !enLecture) {
                ev.preventDefault();
                demarrer();
              }
            }}
          >
          {ouvre("fente") && (
            <label className="flex flex-col gap-1" data-controle="fente">
              <span className="text-body-sm text-secondary">
                {frenchTypography("L’ouverture :")} <span className="tabular-nums text-primary">{frenchTypography(`a = ${K.cm(etat.aCm)}`)}</span>
              </span>
              <input
                type="range"
                min={K.A_MIN}
                max={K.A_MAX}
                step={K.A_PAS}
                value={etat.aCm}
                onChange={(e) => regler({ aCm: borne(K.surGrilleA(parseFloat(e.target.value)), K.A_MIN, K.A_MAX) })}
                aria-valuetext={`ouverture de ${K.cm(etat.aCm)}`}
                className={CURSEUR}
              />
            </label>
          )}

          {ouvre("frequence") && (
            <fieldset className="flex flex-col gap-1" data-controle="frequence">
              <legend className="mb-1 text-body-sm text-secondary">Le battement de la règle</legend>
              {K.FREQUENCES.map((f) => (
                <label key={f} className={LIGNE_RADIO}>
                  <input type="radio" name={`${idTitre}-frequence`} value={f} checked={etat.f === f} onChange={() => regler({ f })} className="accent-figure-ink-soft" />
                  <MathText>{`${K.nombre(f, 0)} Hz — rides de ${K.cm(K.lambda(f))}`}</MathText>
                </label>
              ))}
            </fieldset>
          )}

          {ouvre("sonde") && (
            <label className="flex flex-col gap-1" data-controle="sonde">
              <span className="text-body-sm text-secondary">
                {frenchTypography("Le flotteur, sur l’axe :")}{" "}
                <span className="tabular-nums text-primary">{frenchTypography(`${K.nombre(Math.abs(etat.sondeCm), 2)} cm ${etat.sondeCm < 0 ? "avant" : "après"} la paroi`)}</span>
              </span>
              <input
                type="range"
                min={K.SONDE_MIN}
                max={K.SONDE_MAX}
                step={K.SONDE_PAS}
                value={etat.sondeCm}
                onChange={(e) => regler({ sondeCm: borne(parseFloat(e.target.value), K.SONDE_MIN, K.SONDE_MAX) })}
                aria-valuetext={`flotteur à ${K.nombre(Math.abs(etat.sondeCm), 2)} cm ${etat.sondeCm < 0 ? "avant" : "après"} la paroi`}
                className={CURSEUR}
              />
            </label>
          )}

          {ouvre("recepteur") && (
            <label className="flex flex-col gap-1" data-controle="recepteur">
              <span className="text-body-sm text-secondary">
                {frenchTypography("Le récepteur, sur l’arc :")} <span className="tabular-nums text-primary">{`${angleLu}°`}</span>
                {phase === "balayage" && <span className="text-secondary">{frenchTypography(" — la cuve le promène")}</span>}
              </span>
              <input
                type="range"
                min={-K.RECEPTEUR_MAX}
                max={K.RECEPTEUR_MAX}
                step={K.RECEPTEUR_PAS}
                value={angleLu}
                disabled={phase === "balayage"}
                onChange={(e) => regler({ recepteurDeg: borne(Math.round(parseFloat(e.target.value)), -K.RECEPTEUR_MAX, K.RECEPTEUR_MAX) })}
                aria-valuetext={`récepteur à ${angleLu} degrés`}
                className={CURSEUR}
              />
            </label>
          )}
          </div>

          {lectures.length > 0 && (
            <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
              {lectures.includes("largeur") && ligneLecture("largeur", "Largeur de l’ouverture, a", K.cm(etat.aCm))}
              {lectures.includes("longueur-onde") && ligneLecture("longueur-onde", <MathText>{"Longueur d'onde, $\\lambda = c/f$"}</MathText>, K.cm(lambdaCm))}
              {lectures.includes("comparaison") && ligneLecture("comparaison", "La comparaison", K.comparaison(etat.aCm, etat.f))}
              {lectures.includes("lambda-mesuree") &&
                ligneLecture(
                  "lambda-mesuree",
                  <MathText>{"$\\lambda$ mesurée sur l'eau"}</MathText>,
                  releveCourant && Number.isFinite(lamDevant) && Number.isFinite(lamDerriere) ? `avant : ${K.deuxCS(lamDevant)} cm · après : ${K.deuxCS(lamDerriere)} cm` : aMesurer
                )}
              {lectures.includes("periode-sonde") && ligneLecture("periode-sonde", "Crêtes par seconde, au flotteur", releveCourant && Number.isFinite(fSonde) ? `${K.deuxCS(fSonde)} Hz` : aMesurer)}
              {lectures.includes("amplitude") &&
                ligneLecture(
                  "amplitude",
                  etat.chemin === "arc" ? "Amplitude au récepteur (100 % = le maximum sur l’arc)" : "Amplitude au flotteur (100 % = le maximum sur l’axe)",
                  releveCourant ? `${K.nombre(etat.chemin === "arc" ? ampArc : ampSonde, 0)} %` : aMesurer
                )}
              {lectures.includes("angle") && ligneLecture("angle", "Direction du récepteur", `${angleLu}°`)}
              {lectures.includes("celerite") && ligneLecture("celerite", "Célérité, fixée par l’eau", `${K.nombre(0.2, 2)} m/s`)}
            </dl>
          )}

          {/* Les notes, APRÈS les lectures : entre la commande et le réglage
              qu'elle sert, cinq paragraphes éloignaient le bouton du curseur
              que l'étape fait déplacer quinze fois (revue ergonomie, vague 2). */}
          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" data-notes>
              {rapidesADessiner && (
                <p className="text-caption text-secondary" data-pale>
                  {frenchTypography("À cette fréquence, l’eau en mouvement est dessinée pâle — des rayures qui défilent vite fatiguent l’œil ; l’image arrêtée reprend son contraste.")}
                </p>
              )}
              {finie && (
                <p className="text-caption text-secondary" data-fin-course>
                  {frenchTypography(
                    `Image arrêtée à t = ${K.nombre(tCuve, 2)} s de cuve, à l’instant où les rides devant la paroi sont les plus nettes ; la règle continuerait à battre, la cuve n’en montre pas la suite.${ralentiReel > 5 ? ` Sur cet appareil, la course a tourné au ralenti ×${ralentiReel}.` : ""}`
                  )}
                </p>
              )}
              {pari.etapeOuverte && etape.controles.length > 0 && (
                <p className="text-caption text-secondary">{frenchTypography("Entrée, sur un réglage, relance la cuve. Changer l’ouverture ou le battement remet l’eau au repos.")}</p>
              )}
              <details className="text-caption text-secondary">
                <summary className="cursor-pointer select-none">{frenchTypography("Cuve idéalisée : ce que cette cuve simplifie")}</summary>
                <p className="mt-1">
                  {frenchTypography("Ici toutes les fréquences avancent à la même célérité ; dans une vraie cuve, elle dépend un peu de la longueur d’onde — c’est le chapitre 7. Derrière la paroi, les bords absorbent l’onde, comme les berges inclinées d’une vraie cuve ; devant, ils sont rigides, et la règle va de l’un à l’autre. De chaque côté de la paroi, l’image est à l’échelle de la ride la plus forte de ce côté : elle montre la forme de l’onde, pas son énergie.")}
                </p>
              </details>
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
