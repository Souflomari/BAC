"use client";

/**
 * NoyauxPanel — « la courbe et les noyaux » : la loi de décroissance LUE sur
 * le quadrillage du bac, et une population de noyaux qui TIRE sa
 * désintégration au sort (pc/decroissance-radioactive, en tête de R4 ; spec
 * content/pc/decroissance-radioactive/spec-scene-noyaux.md).
 *
 * Le troisième manipulable PLAN sur l'appareillage des scènes (ADR 0041) :
 * opt-in au clic, étapes, pari avant tout, un contrôle neuf par étape, porte
 * qui lit le rendu — ni caméra, ni three.js. DEUX VOIES DE CALCUL (spec §5.3),
 * et chaque lecture dit de laquelle elle vient : la COURBE est la loi en forme
 * fermée (nombres exacts, « la loi prévoit ») ; la GRILLE est un tirage, noyau
 * par noyau (« on compte »), dont la porte ne vérifie que des invariants.
 *
 * Un seul appareil existe à la fois (`support`) : on ne peut pas répondre au
 * pari de la grille depuis une étape qui n'a pas de grille. À l'étape libre,
 * l'élève choisit l'appareil — une VUE, comme les vues d'une scène 3D, pas un
 * contrôle du phénomène.
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
import * as N from "@/lib/scene2d/noyaux-modele";
import type { Grandeur, RenduNoyaux, Support } from "@/lib/scene2d/noyaux-rendu";
import { CURSEUR, GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS } from "./commun";
import { EncadreRepli } from "./EncadreRepli";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, boiteLegende, disposer, poser } from "./Plateau";

interface EtatNoyaux {
  iso: N.Isotope;
  instant: number;
  depart: number;
  population: N.Population;
  grandeur: Grandeur;
  support: Support;
  fenetre: number;
}

/** Où en est la course de la grille : pleine, en course, finie. */
type Phase = "repos" | "course" | "finie";

const borne = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

function appliquer(e: Scene3DEtat | undefined, courant: EtatNoyaux): EtatNoyaux {
  if (!e) return courant;
  const pop = Number(e.population_n);
  return {
    iso: e.t_demi_j === "4" ? "4" : e.t_demi_j === "8" ? "8" : courant.iso,
    instant: typeof e.instant_j === "number" ? borne(N.surGrille(e.instant_j, N.INSTANT_PAS, N.INSTANT_MIN), N.INSTANT_MIN, N.INSTANT_MAX) : courant.instant,
    depart: typeof e.depart_j === "number" ? borne(N.surGrille(e.depart_j, N.DEPART_PAS, N.DEPART_MIN), N.DEPART_MIN, N.DEPART_MAX) : courant.depart,
    population: (N.POPULATIONS as readonly number[]).includes(pop) ? (pop as N.Population) : courant.population,
    grandeur: e.grandeur === "activite" ? "activite" : e.grandeur === "noyaux" ? "noyaux" : courant.grandeur,
    support: e.support === "grille" ? "grille" : e.support === "courbe" ? "courbe" : courant.support,
    fenetre: e.fenetre_j === "10" ? 10 : e.fenetre_j === "32" ? 32 : courant.fenetre,
  };
}

const ETAT_DE_BASE: EtatNoyaux = { iso: "8", instant: 0, depart: 0, population: 64, grandeur: "noyaux", support: "courbe", fenetre: 32 };

const REPERES = [
  "axe-t0", "axe-t4", "axe-t8", "axe-t12", "axe-t16", "axe-t20", "axe-t24", "axe-t28", "axe-t32", "axe-tfin",
  "axe-y0", "axe-y1", "axe-y2", "axe-y3", "axe-y4", "axe-y5", "axe-y6", "axe-y7", "axe-y8", "axe-y9",
  "courbe-0", "courbe-fin", "second-0", "second-fin",
  "curseur", "depart", "depart-axe", "crochet-g", "crochet-d", "demi",
  "construction-y", "construction-p", "construction-t",
  "grille-0", "grille-1", "graphe-o", "graphe-t16", "graphe-n", "graphe-demi", "graphe-compte",
] as const;

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

/** Trois chiffres significatifs, comme les retours les citent (2,59×10¹⁴ ; 1,68×10¹⁴). */
const sci = (x: number) => N.scientifique(x, 3);
const jours = (x: number, d = 1) => `${N.nombre(x, d)} jours`;
const pourcent = (x: number) => `${N.nombre(x, 1)} %`;

export function NoyauxPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<EtatNoyaux>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [phase, setPhase] = useState<Phase>("repos");
  const [enLecture, setEnLecture] = useState(false);
  const [tJours, setTJours] = useState(0);
  const [tirage, setTirage] = useState<Float64Array | null>(null);
  /**
   * Les comptes à une demi-vie des derniers tirages, PAR RÉGLAGE (isotope ×
   * population), le plus récent à la fin. Vague 2, ergonomie : une seule série,
   * vidée en silence à chaque changement de population — alors que la suite
   * demande justement de passer de 64 à 1024 et de comparer. Revenir à 64 rend
   * la série de 64.
   */
  const [historiques, setHistoriques] = useState<Record<string, number[]>>({});
  const nTiragesRef = useRef(0);
  /** combien de tirages depuis l'ouverture (la porte distingue ainsi deux tirages au même compte) */
  const [nTirages, setNTirages] = useState(0);
  const [facteur, setFacteur] = useState(1);
  const [rapide, setRapide] = useState(false);
  const rapideRef = useRef(false);
  const mouvementReduit = useMouvementReduit();
  const tRef = useRef(0);
  const [annonce, setAnnonce] = useState("");
  const etatRef = useRef<EtatNoyaux>(etat);
  const phaseRef = useRef<Phase>(phase);
  const tirageRef = useRef<Float64Array | null>(null);
  etatRef.current = etat;
  phaseRef.current = phase;
  tirageRef.current = tirage;

  const idTitre = useId();
  const idConsigne = useId();
  const refs = {
    axeY: useRef<HTMLSpanElement>(null),
    axeT: useRef<HTMLSpanElement>(null),
    tDemi: useRef<HTMLSpanElement>(null),
    crochet: useRef<HTMLSpanElement>(null),
    t1: useRef<HTMLSpanElement>(null),
    grapheY: useRef<HTMLSpanElement>(null),
    grapheT: useRef<HTMLSpanElement>(null),
  };
  // Des repères SANS texte : l'élève ne voit rien ; la porte y lit, en pixels,
  // les graduations, la courbe, le curseur, le crochet, la construction, la grille.
  const repRefs = useRef(Object.fromEntries(REPERES.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES)[number], React.RefObject<HTMLSpanElement>>);

  // ── Le pari : à l'étape de la grille, il attend la course entière ──
  const fraction = etape.pari?.revele_apres_course ?? 0;
  const finie = phase === "finie";
  const pari = usePari(etape.pari, { attend: fraction > 0, montre: finie });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const revele = pari.phase === "revele" || pari.phase === "aucun";
  const libre = etape.controles.includes("isotope");
  const deuxCourbes = libre && revele;
  const aCurseur = etape.controles.includes("instant");
  const aDepart = etape.controles.includes("depart");
  // la construction de t½ : aux étapes qui la font LIRE (1 et 4) ; le crochet : aux étapes du départ (2 et 5)
  const construction = !aDepart && !libre;
  const courbe = etat.support === "courbe";
  const th = N.T_DEMI[etat.iso];
  // les lectures de l'appareil MONTRÉ : à l'étape libre, la courbe et la grille n'ont pas les mêmes
  const DE_LA_GRILLE = ["population", "restants-comptes", "ecart-a-la-loi", "tirages-precedents"];
  const lectures = (pari.etapeOuverte ? etape.lectures ?? [] : [])
    .filter((l) => (courbe ? !DE_LA_GRILLE.includes(l) : DE_LA_GRILLE.includes(l) || l === "noyaux"))
    // à l'étape libre, la lecture de la grandeur que porte l'AXE, pas les deux
    // (vague 2, calme : N et A côte à côte y défaisaient la leçon de l'étape 4,
    // « lis l'axe ») ; l'étape 4, elle, les montre ensemble — c'est son sujet
    .filter((l) => !(libre && courbe && l === (etat.grandeur === "noyaux" ? "activite" : "noyaux")));

  // ── Rendu ──
  const renduRef = useRef<RenduNoyaux | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.mettreAJour({
      support: etat.support,
      isotope: etat.iso,
      deuxCourbes,
      fenetre: etat.fenetre,
      grandeur: etat.grandeur,
      curseur: aCurseur ? etat.instant : null,
      depart: aDepart ? etat.depart : null,
      construction,
      crochet: aDepart,
      revele: revele && (courbe || finie),
      population: etat.population,
      tirage,
      t: tJours,
    });
    s.rendre();
    const p = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    const en = (n: string, visible = true) => (p[n] && visible ? p[n] : cache);
    // les titres d'axes, à leur place (aucune direction essayée)
    poser(refs.axeY.current, en("axe-titre-y", courbe), "-50%", "0%");
    poser(refs.axeT.current, en("axe-titre-t", courbe), "-50%", "-100%");
    poser(refs.grapheY.current, en("graphe-titre", !courbe), "-50%", "0%");
    poser(refs.grapheT.current, en("graphe-titre-t", !courbe), "-50%", "-100%");
    disposer(
      [
        { el: refs.tDemi.current, p: en("construction-t", construction && revele && courbe), directions: [[1, -1], [-1, -1], [1, -2]] },
        // `portee` : la cote reste contre son crochet, quitte à recouvrir un bout
        // de tracé (vague 2, captures : à l'étape 5 elle dérivait sous la courbe
        // du second isotope — « 8,0 jours » y nommait la mauvaise courbe)
        { el: refs.crochet.current, p: en("crochet-cote", aDepart && revele && courbe), directions: [[0, 1], [0, 1.6], [0, -1], [1, -1], [-1, -1]], portee: 8 },
        { el: refs.t1.current, p: en("depart", aDepart && courbe), directions: [[1, -1], [-1, -1], [1, 0], [-1, 0]] },
      ],
      s.segments(),
      s.cadre(),
      // la légende du plateau, et les bandes des nombres d'axes (vague 2, dessin)
      [boiteLegende(rendu.hoteRef.current), ...s.zones()].filter((b): b is NonNullable<typeof b> => b !== null)
    );
    for (const n of REPERES) poser(repRefs.current[n].current, p[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, phase, tJours, tirage, revele, finie, deuxCourbes, aCurseur, aDepart, construction, courbe]);

  const rendu = useSceneRendu<RenduNoyaux>(() => import("@/lib/scene2d/noyaux-rendu").then((m) => m.creerRenduNoyaux), dessiner, {
    surPerte: () => setEnLecture(false),
  });
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // ── Changer de réglage ──
  const auRepos = useCallback((annoncer = true) => {
    if (annoncer && phaseRef.current !== "repos") setAnnonce("La grille est de nouveau pleine : lance un tirage.");
    setEnLecture(false);
    setPhase("repos");
    setTirage(null);
    setTJours(0);
    tRef.current = 0;
  }, []);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      setEtat((c) => appliquer(e.etat, c));
      setHistoriques({});
      auRepos(false);
    },
    [etapes, pari, indexEtape, auRepos]
  );

  // ── La course de la grille ──
  const demarrer = (sansAnimation = mouvementReduit) => {
    const e = etatRef.current;
    rapideRef.current = sansAnimation;
    setRapide(sansAnimation);
    // un tirage NEUF à chaque course : personne ne décide à l'avance combien partiront
    const t = N.tirer(e.iso, e.population);
    tirageRef.current = t;
    setTirage(t);
    nTiragesRef.current += 1;
    setNTirages(nTiragesRef.current);
    tRef.current = 0;
    setTJours(0);
    setAnnonce(`Tirage ${nTiragesRef.current} : ${sansAnimation ? "calculé sans animation." : "chaque noyau joue sa chance."}`);
    setPhase("course");
    setEnLecture(true);
  };

  useEffect(() => {
    if (!enLecture) return;
    let id = 0;
    let avant: number | null = null;
    // Le facteur de temps se mesure contre l'HORLOGE, par fenêtres d'une
    // demi-seconde (leçon de la cuve : un onglet ralenti ne doit pas se lire
    // comme un appareil qui suit).
    let joursFenetre = 0;
    let murFenetre = 0;
    const terminer = () => {
      const t = N.COURSE_J;
      tRef.current = t;
      setTJours(t);
      setPhase("finie");
      setEnLecture(false);
      const e = etatRef.current;
      const tirage = tirageRef.current;
      if (tirage) {
        const demi = N.restants(tirage, N.T_DEMI[e.iso]);
        const fin = N.restants(tirage, t);
        const cle = `${e.iso}-${e.population}`;
        setHistoriques((h) => ({ ...h, [cle]: [...(h[cle] ?? []), demi].slice(-N.MEMOIRE_TIRAGES) }));
        // le NUMÉRO du tirage : une annonce identique à la précédente n'est pas relue
        setAnnonce(`Tirage ${nTiragesRef.current} terminé : ${demi} noyaux restants à ${N.nombre(N.T_DEMI[e.iso], 1)} jours, ${fin} à 16 jours ; image arrêtée.`);
      }
    };
    const image = (maintenant: number) => {
      const dtReel = avant === null ? 0 : (maintenant - avant) / 1000;
      avant = maintenant;
      if (phaseRef.current === "course") {
        if (rapideRef.current) {
          terminer();
          return;
        }
        // un trou de plus de 2 s n'est pas la lenteur de l'appareil : l'onglet était caché
        const dt = Math.min(0.1, dtReel);
        const avance = dt / N.ECRAN_S_PAR_JOUR;
        tRef.current = Math.min(N.COURSE_J, tRef.current + avance);
        if (dtReel > 0 && dtReel < 2) {
          murFenetre += dtReel;
          joursFenetre += avance;
        }
        if (murFenetre >= 0.5) {
          setFacteur(Math.min(1, (joursFenetre * N.ECRAN_S_PAR_JOUR) / murFenetre));
          murFenetre = 0;
          joursFenetre = 0;
        }
        setTJours(tRef.current);
        if (tRef.current >= N.COURSE_J - 1e-12) {
          terminer();
          return;
        }
      }
      id = requestAnimationFrame(image);
    };
    id = requestAnimationFrame(image);
    return () => cancelAnimationFrame(id);
  }, [enLecture]);

  const regler = (patch: Partial<EtatNoyaux>) => {
    const suivant = { ...etatRef.current, ...patch };
    setEtat(suivant);
    // la grille : changer d'échantillon ou de population, c'est une autre
    // expérience — la grille redevient pleine, et la ligne des tirages repart
    // à blanc (elle compare des tirages du MÊME réglage)
    // (changer de VUE n'est pas changer d'expérience : le tirage reste — vague 2,
    // ergonomie ; la suite de l'étape libre demande justement l'aller-retour)
    if ((patch.population !== undefined || patch.iso !== undefined) && phaseRef.current !== "repos") auRepos(false);
    // chaque changement d'appareil est DIT : l'image entière change, et la
    // description du canvas n'est pas réannoncée
    if (patch.support !== undefined) setAnnonce(patch.support === "grille" ? `Vue : la grille, ${suivant.population} noyaux.` : "Vue : la courbe de l’échantillon réel.");
    else if (patch.iso !== undefined) setAnnonce(patch.iso === "8" ? "Échantillon : l’iode 131." : "Échantillon : le second isotope, λ deux fois plus grande.");
    else if (patch.grandeur !== undefined) setAnnonce(patch.grandeur === "noyaux" ? "Axe vertical : le nombre de noyaux restants." : "Axe vertical : l’activité, en becquerels.");
    else if (patch.population !== undefined) setAnnonce(`Grille de ${patch.population} noyaux, toutes pleines : lance un tirage.`);
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
        libelleOuvrir="Ouvrir la courbe et les noyaux"
      />
    );
  }

  const ligneLecture = (cleL: string, terme: React.ReactNode, valeur: React.ReactNode) => (
    <div key={cleL} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-subtle pb-1.5">
      <dt className="text-secondary">{terme}</dt>
      <dd className="ml-auto text-right tabular-nums text-primary" data-lecture={cleL}>
        {typeof valeur === "string" ? frenchTypography(valeur) : valeur}
      </dd>
    </div>
  );

  // ── Les nombres de la LOI (voie analytique) ──
  const tLu = aCurseur ? etat.instant : 0;
  const unite = etat.grandeur === "noyaux" ? "noyaux" : "Bq";
  const valeur = (t: number) => (etat.grandeur === "noyaux" ? N.noyaux(etat.iso, t) : N.activite(etat.iso, t));
  const nomIso = etat.iso === "8" ? "l’iode 131" : "le second isotope";
  // ── Les nombres du TIRAGE (voie stochastique) ──
  const n = etat.population;
  const cotes = Math.round(Math.sqrt(n));
  const compteMaintenant = tirage ? N.restants(tirage, tJours) : n;
  const passeDemi = tirage !== null && tJours >= th - 1e-9;
  const compteDemi = tirage && passeDemi ? N.restants(tirage, th) : null;
  const prevuDemi = n / 2;
  const prevuFin = n * Math.pow(2, -N.COURSE_J / th);
  const aMesurer = "lance le tirage pour compter";

  const libelleLancer = enLecture ? "Pause" : finie ? "Relancer" : phase === "repos" ? "Lancer le tirage" : "Reprendre";
  const description = courbe
    ? `Courbe ${etat.grandeur === "noyaux" ? "du nombre de noyaux restants" : "de l’activité"} en fonction du temps, de 0 à ${etat.fenetre} jours, sur un quadrillage : un gros trait tous les 8 jours et tous les ${etat.grandeur === "noyaux" ? "10¹⁴ noyaux" : "10⁸ becquerels"} ; la courbe part du quatrième gros trait et décroît.` +
      (aCurseur ? ` Le curseur est à ${jours(etat.instant)}.` : "") +
      (aDepart ? ` Un repère marque t₁ = ${jours(etat.depart)}.` : "") +
      (construction && revele ? ` La construction part de l’ordonnée moitié du départ et redescend sur l’axe des temps à ${jours(th)}.` : "") +
      (aDepart && revele ? ` Le crochet va de t₁ jusqu’à la courbe, là où la hauteur de t₁ est divisée par deux : ${jours(N.dureeDeMoitie(etat.iso, etat.depart))} de large.` : "") +
      (deuxCourbes ? " Une seconde courbe, en couleur : le second isotope." : "")
    : `Grille de ${n} cases, un noyau par case : ${tirage ? `${compteMaintenant} pleines, ${n - compteMaintenant} vidées` : "toutes pleines"}. À droite, le compte des noyaux restants en fonction du temps.`;

  // Les deux courbes de l'étape libre se nomment dans la LÉGENDE, avec un
  // échantillon de trait (vague 2, captures) : posés sur le graphe, « second
  // isotope » (101 px au téléphone, 21 jours d'axe) ne tenait nulle part sous
  // sa courbe et s'installait dans la rangée des nombres, sur le « 8 ». L'encre
  // et l'accent diffèrent aussi en CLARTÉ (≈ 3:1) : la clé ne tient pas à la
  // seule teinte (WCAG 1.4.1).
  const cleDesCourbes = (
    <span className="inline-flex flex-wrap items-center gap-x-2" data-cle-courbes>
      {frenchTypography("Loi tracée :")}{" "}
      <span className="inline-flex items-center gap-1">
        <span aria-hidden className="inline-block h-0.5 w-4 rounded-full bg-figure-ink" />
        {frenchTypography("iode 131")}
      </span>
      {/* un vrai séparateur : sans lui, le texte lu est « iode 131second isotope » */}
      <span className="sr-only">, </span>{" "}
      <span className="inline-flex items-center gap-1">
        <span aria-hidden className="inline-block h-0.5 w-4 rounded-full bg-figure-accent" />
        {frenchTypography("second isotope")}
      </span>
    </span>
  );

  // Les lectures : sous les réglages pour la courbe ; pour la grille, JUSTE SOUS
  // le bouton qui les produit (vague 2, ergonomie : au téléphone, « On compte »
  // était à 540 px de « Relancer » — relancer vingt fois, c'était quarante
  // allers-retours de défilement).
  const blocLectures =
    lectures.length > 0 ? (
      <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
        {lectures.includes("population") && ligneLecture("population", "Noyaux de la grille", `${n} (${cotes} × ${cotes} cases)`)}
        {lectures.includes("restants-comptes") &&
          ligneLecture(
            "restants-comptes",
            "On compte",
            !tirage ? aMesurer : finie ? `${N.restants(tirage, th)} à ${jours(th)} · ${N.restants(tirage, N.COURSE_J)} à 16 jours` : `${compteMaintenant} maintenant`
          )}
        {lectures.includes("instant") && ligneLecture("instant", "Instant du curseur", jours(etat.instant))}
        {lectures.includes("noyaux") &&
          (courbe
            ? ligneLecture("noyaux", <MathText>{aCurseur ? "Noyaux restants au curseur, $N(t)$" : "Noyaux restants à l'instant zéro, $N_0$"}</MathText>, `${sci(N.noyaux(etat.iso, tLu))} noyaux`)
            : ligneLecture("noyaux", "La loi prévoit", `${prevuDemi} à ${jours(th)} · ${prevuFin} à 16 jours`))}
        {lectures.includes("activite") && ligneLecture("activite", <MathText>{aCurseur ? "Activité au curseur, $A(t)$" : "Activité à l'instant zéro, $A_0$"}</MathText>, `${sci(N.activite(etat.iso, tLu))} Bq`)}
        {lectures.includes("depart") && ligneLecture("depart", <MathText>{"Départ du crochet, $t_1$"}</MathText>, jours(etat.depart))}
        {lectures.includes("restants-depart") && ligneLecture("restants-depart", <MathText>{"Hauteur du crochet, à $t_1$"}</MathText>, `${sci(valeur(etat.depart))} ${unite}`)}
        {lectures.includes("duree-de-moitie") && ligneLecture("duree-de-moitie", "Largeur du crochet : la durée pour tomber à la moitié", jours(N.dureeDeMoitie(etat.iso, etat.depart)))}
        {lectures.includes("demi-vie") && ligneLecture("demi-vie", <MathText>{`Demi-vie de ${nomIso}, $t_{1/2}$`}</MathText>, jours(th))}
        {lectures.includes("lambda") &&
          ligneLecture("lambda", <MathText>{"Constante radioactive, $\\lambda$"}</MathText>, `${N.troisCs(N.lambdaJ(etat.iso))} j⁻¹ · ${N.scientifique(N.lambdaS(etat.iso), 3)} s⁻¹`)}
        {lectures.includes("tau") && ligneLecture("tau", <MathText>{"Constante de temps, $\\tau = 1/\\lambda$"}</MathText>, `${N.troisCs(N.tau(etat.iso))} jours`)}
        {lectures.includes("ecart-a-la-loi") &&
          ligneLecture("ecart-a-la-loi", `Écart à la loi, à ${jours(th)}`, !tirage ? aMesurer : compteDemi === null ? `au passage de ${jours(th)}` : pourcent((Math.abs(compteDemi - prevuDemi) / prevuDemi) * 100))}
        {lectures.includes("tirages-precedents") &&
          ligneLecture("tirages-precedents", `Derniers tirages, à ${jours(th)}`, (historiques[`${etat.iso}-${etat.population}`] ?? []).length ? historiques[`${etat.iso}-${etat.population}`].join(" · ") : "aucun encore")}
      </dl>
    ) : null;

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-support={etat.support}
      data-fenetre={etat.fenetre}
      data-grandeur={etat.grandeur}
      data-isotope={etat.iso}
      data-instant-j={etat.instant}
      data-depart-j={etat.depart}
      data-population={etat.population}
      data-t-jours={Math.round(tJours * 10000) / 10000}
      data-phase={phase}
      data-course-finie={finie ? "oui" : "non"}
      data-pari={pari.phase}
      data-facteur-temps={facteur.toFixed(2)}
      data-p-pas={N.pPas(etat.iso).toFixed(7)}
      data-pas-demi={N.T_DEMI[etat.iso] / N.DT}
      data-pas-depart={N.DEPART_PAS / N.DT}
      data-pas-instant={N.INSTANT_PAS / N.DT}
      data-restants={compteMaintenant}
      data-tirages={nTirages}
      data-deux-courbes={deuxCourbes ? "oui" : "non"}
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
          legende={courbe ? (deuxCourbes ? cleDesCourbes : "Loi tracée · valeurs de la leçon") : mouvementReduit ? "Une case = un noyau" : "Une case = un noyau · 1 jour = 0,25 s"}
          messageSansWebgl="Ce navigateur n’affiche pas la courbe (dessin indisponible). Les paris et les réglages restent."
          onRelancer={rendu.relancer}
          format="paysage-haut"
        >
          <Etiquette refEl={refs.axeY} nom="axe-y">
            <MathText>{etat.grandeur === "noyaux" ? "$N$ (en $10^{14}$ noyaux)" : "$A$ (en $10^{8}$ Bq)"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.axeT} nom="axe-t" texte="t (jours)" />
          <Etiquette refEl={refs.tDemi} nom="t-demi" fond>
            <MathText>{"$t_{1/2}$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.crochet} nom="crochet" texte={jours(N.dureeDeMoitie(etat.iso, etat.depart))} fond />
          <Etiquette refEl={refs.t1} nom="t1" fond>
            <MathText>{"$t_1$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.grapheY} nom="graphe-y" texte="noyaux restants" />
          <Etiquette refEl={refs.grapheT} nom="graphe-t" texte="t (jours)" />
          {REPERES.map((r) => (
            <Etiquette key={r} refEl={repRefs.current[r]} nom={r} texte="" />
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
              invitation="Lance le tirage et regarde : la grille répond d'abord."
            />
          )}

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {libre && pari.etapeOuverte && (
            <fieldset className="flex flex-col gap-1" data-vue-support>
              <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("Ce que la scène montre")}</legend>
              {(["courbe", "grille"] as const).map((x) => (
                <label key={x} className={LIGNE_RADIO}>
                  <input type="radio" name={`${idTitre}-support`} value={x} checked={etat.support === x} onChange={() => regler({ support: x })} className="accent-figure-ink-soft" />
                  {frenchTypography(x === "courbe" ? "la courbe de l’échantillon réel" : "la grille de noyaux, tirés au sort")}
                </label>
              ))}
            </fieldset>
          )}

          {pari.tempsOuvert && !courbe && (
            <div className="flex flex-col gap-2" role="group" aria-label="Le tirage de la grille">
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
                {/* Toujours MONTÉ (vague 2 de la corde) : pendant une course, il
                    l'abrège ; au repos ou après, il tire et donne l'image finale
                    sans la jouer. */}
                <button
                  type="button"
                  className={TRANSPORT_BTN_CLASS}
                  data-image-finale
                  onClick={() => {
                    if (phase === "repos" || phase === "finie") demarrer(true);
                    else {
                      rapideRef.current = true;
                      setRapide(true);
                      setEnLecture(true);
                    }
                  }}
                >
                  <span>Image finale</span>
                </button>
                <button
                  type="button"
                  className={TRANSPORT_BTN_CLASS}
                  onClick={() => {
                    if (phase !== "repos") auRepos();
                  }}
                  aria-disabled={phase === "repos" || undefined}
                  aria-label="Remplir de nouveau la grille"
                >
                  <Icon name="reset" size={13} />
                  <span>Grille pleine</span>
                </button>
              </div>
              {/* Pas de compteur qui défile PENDANT la course (vague 2, calme) :
                  l'axe du graphe du compte montre déjà l'instant. */}
              {!enLecture && (
                <p className="text-caption text-secondary" data-temps-grille>
                  {frenchTypography(`Temps de l’échantillon : t = ${N.nombre(tJours, 1)} jours.`)}
                </p>
              )}
            </div>
          )}

          {!courbe && blocLectures}

          <div className="flex flex-col gap-5">
            {ouvre("isotope") && (
              <fieldset className="flex flex-col gap-1" data-controle="isotope">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("L’échantillon que lisent le curseur, le crochet et la grille")}</legend>
                {N.ISOTOPES.map((x) => (
                  <label key={x} className={LIGNE_RADIO}>
                    <input type="radio" name={`${idTitre}-isotope`} value={x} checked={etat.iso === x} onChange={() => regler({ iso: x })} className="accent-figure-ink-soft" />
                    {frenchTypography(x === "8" ? "l’iode 131" : "le second isotope, λ deux fois plus grande")}
                  </label>
                ))}
              </fieldset>
            )}

            {ouvre("instant") && courbe && (
              <label className="flex flex-col gap-1" data-controle="instant">
                <span className="text-body-sm text-secondary">
                  {frenchTypography("L’instant lu sur la courbe :")} <span className="tabular-nums text-primary" aria-hidden="true">{frenchTypography(`t = ${jours(etat.instant)}`)}</span>
                </span>
                <input
                  type="range"
                  min={N.INSTANT_MIN}
                  max={N.INSTANT_MAX}
                  step={N.INSTANT_PAS}
                  value={etat.instant}
                  onChange={(e) => regler({ instant: borne(N.surGrille(parseFloat(e.target.value), N.INSTANT_PAS, N.INSTANT_MIN), N.INSTANT_MIN, N.INSTANT_MAX) })}
                  aria-valuetext={`t = ${jours(etat.instant)}`}
                  className={CURSEUR}
                />
              </label>
            )}

            {ouvre("depart") && courbe && (
              <label className="flex flex-col gap-1" data-controle="depart">
                <span className="text-body-sm text-secondary">
                  {frenchTypography("Le départ du crochet :")} <span className="tabular-nums text-primary" aria-hidden="true">{frenchTypography(`t₁ = ${jours(etat.depart)}`)}</span>
                </span>
                <input
                  type="range"
                  min={N.DEPART_MIN}
                  max={N.DEPART_MAX}
                  step={N.DEPART_PAS}
                  value={etat.depart}
                  onChange={(e) => regler({ depart: borne(N.surGrille(parseFloat(e.target.value), N.DEPART_PAS, N.DEPART_MIN), N.DEPART_MIN, N.DEPART_MAX) })}
                  aria-valuetext={`départ à ${jours(etat.depart)}`}
                  className={CURSEUR}
                />
              </label>
            )}

            {ouvre("population") && !courbe && (
              <fieldset className="flex flex-col gap-1" data-controle="population">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("Le nombre de noyaux de la grille")}</legend>
                {N.POPULATIONS.map((x) => (
                  <label key={x} className={LIGNE_RADIO}>
                    <input type="radio" name={`${idTitre}-population`} value={x} checked={etat.population === x} onChange={() => regler({ population: x })} className="accent-figure-ink-soft" />
                    {frenchTypography(`${x} noyaux — ${Math.round(Math.sqrt(x))} × ${Math.round(Math.sqrt(x))} cases`)}
                  </label>
                ))}
              </fieldset>
            )}

            {ouvre("grandeur") && courbe && (
              <fieldset className="flex flex-col gap-1" data-controle="grandeur">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("Ce que porte l’axe vertical")}</legend>
                {(["noyaux", "activite"] as const).map((x) => (
                  <label key={x} className={LIGNE_RADIO}>
                    <input type="radio" name={`${idTitre}-grandeur`} value={x} checked={etat.grandeur === x} onChange={() => regler({ grandeur: x })} className="accent-figure-ink-soft" />
                    {frenchTypography(x === "noyaux" ? "le nombre de noyaux restants" : "l’activité, en becquerels")}
                  </label>
                ))}
              </fieldset>
            )}
          </div>

          {courbe && blocLectures}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" data-notes>
              {finie && !courbe && (
                <p className="text-caption text-secondary" data-fin-course>
                  {frenchTypography("Image arrêtée à 16 jours ; les noyaux restants continueraient de partir, un par un.")}
                </p>
              )}
              <EncadreRepli titre="Ce que cette scène simplifie">
                {frenchTypography(
                  "La courbe n’est pas une mesure : c’est la loi tracée avec les valeurs de la leçon ; sur un vrai enregistrement, les points sont un peu dispersés. La grille montre un échantillon impossible : un microgramme d’iode 131 contient environ 4,6×10¹⁵ noyaux — c’est pourquoi sa courbe, elle, paraît lisse. Et le temps de la grille est accéléré : seize jours en quatre secondes, un jour vaut un quart de seconde."
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
