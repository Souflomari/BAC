"use client";

/**
 * PlanComplexeRapportPanel — « le rapport lu depuis un sommet » (Maths ·
 * nombres-complexes-2, R6 ; spec
 * docs/pipeline/propositions/maths-nombres-complexes-2-scene-w.md).
 *
 * Le quinzième manipulable sur l'appareillage des scènes (ADR 0041), la scène
 * sœur de `plan-complexe-transformation` (R5) : opt-in au clic, quatre étapes,
 * pari avant tout, UN contrôle neuf par étape. Ni temps ni course : le verdict
 * est immédiat, et c'est le PLAN qui répond avant le texte — les flèches se
 * tracent, l'arc s'ouvre au sommet, le petit carré se pose en C, les trois lieux
 * se dessinent.
 *
 * LE SOMMET → LES DEUX LECTURES → LA NATURE → LE POINT QUI BOUGE (§2.3) :
 * former w depuis un point qui n'est pas l'origine (S1), le module comme
 * quotient et l'argument comme écart (S2), la nature comme propriété du COUPLE
 * (triangle, sommet) (S3), et le rapport lu en M quand M est l'inconnue (S4).
 *
 * EXACT, OU RIEN (§5.4) : tout nombre écrit vient du modèle exact
 * (`plan-complexe-rapport-modele.ts`) ; les flottants ne servent qu'à dessiner
 * — et au balayage, où la ligne INVARIANTE reste écrite, exacte, et l'autre
 * s'efface en « — » en gardant sa hauteur (§6.1, BQ-1).
 *
 * LES LIBELLÉS NE SONT PAS LES IDS (§5.2, B1) : les crans s'affichent en
 * ordinaux neutres (« Triangle 3 ») et en affixes, jamais en réponses.
 *
 * UNE DÉCISION DE CONSTRUCTION, écrite (spec §7.1 ambigu) : À S1, AUCUN ARC.
 * Son étiquette écrirait un argument — mot et nombre interdits à S1 (§7.5 C) —,
 * et sa constance sous le contrôle `position` répondrait d'avance à la moitié
 * du pari de S2 (l'argument se lit entre les flèches, pas depuis l'axe). L'arc
 * paraît à la révélation de S2, et il est l'énoncé de S3.
 */

import { createRef, useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MathText } from "../ChoiceButton";
import * as M from "@/lib/scene2d/plan-complexe-rapport-modele";
import type { RenduRapport } from "@/lib/scene2d/plan-complexe-rapport-rendu";
import { CURSEUR, GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS_CARRE } from "./commun";
import { EncadreRepli } from "./EncadreRepli";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, boiteLegende, disposer, poser } from "./Plateau";

interface EtatRapport {
  forme: M.Forme;
  position: M.Position;
  sommet: M.Sommet;
  pointM: M.PointM;
  mode: M.Mode;
}

const dans = <T extends string>(liste: readonly T[], v: unknown): v is T => typeof v === "string" && (liste as readonly string[]).includes(v);

function appliquer(e: Scene3DEtat | undefined, c: EtatRapport): EtatRapport {
  if (!e) return c;
  return {
    forme: dans(M.FORMES, e.forme) ? e.forme : c.forme,
    position: dans(M.POSITIONS, e.position) ? e.position : c.position,
    sommet: dans(M.SOMMETS, e.sommet) ? e.sommet : c.sommet,
    pointM: dans(M.POINTS_M, e.pointM) ? e.pointM : c.pointM,
    mode: dans(M.MODES, e.mode) ? e.mode : c.mode,
  };
}

const ETAT_DE_BASE: EtatRapport = { forme: "rect-isocele", position: "posee", sommet: "A", pointM: "libre", mode: "triangle" };

/**
 * Les lectures que la CONSIGNE énonce : écrites AVANT le pari (§7.5, les trois exceptions
 * déclarées). Toutes les autres attendent l'engagement. Rangées par ce que l'étape FAIT —
 * son premier contrôle —, pas par son rang : un descripteur réordonné ne les déplace pas.
 */
const ENONCEES: Record<string, readonly string[]> = {
  forme: ["w"],
  // (vague 2, calme : |w| et arg(w) ne sont plus des lectures de S3 — la consigne les donne, et la
  // lecture `nature` les redit avec leur verdict ; cinq écritures du même nombre dans un écran)
  sommet: ["w"],
};

const REPERES = [
  "origine", "coin-hg", "coin-bd", "axe-x-droite", "axe-y-haut",
  "point-A", "point-B", "point-C", "point-M",
  "fleche-num-1", "fleche-num-2", "fleche-den-1", "fleche-den-2",
  "arc-debut", "arc-fin", "arc-milieu",
  "report-debut", "report-fin", "report-milieu",
  "angle-droit",
  "courbe-mediatrice", "courbe-cercle", "courbe-droite",
  "cercle-e", "cercle-n", "cercle-o", "cercle-s",
  ...Array.from({ length: 17 }, (_, k) => `grad-x${k - 8}`).filter((n) => n !== "grad-x0"),
  ...Array.from({ length: 17 }, (_, k) => `grad-y${k - 8}`).filter((n) => n !== "grad-y0"),
] as const;

/** Un nombre TeX dit en clair (la description du canvas, la région vivante, les noms des boutons) */
function enClair(t: string): string {
  return t
    .replace(/\\[dt]frac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*)\}/g, "($1)/$2")
    .replace(/\(\\pi\)/g, "π")
    .replace(/\\sqrt\{(\d+)\}/g, "√$1")
    .replace(/\\pi/g, "π")
    .replace(/\\,/g, "")
    .replace(/\\vert/g, "|")
    .replace(/\((\d+)\)\//g, "$1/")
    .replace(/-/g, "−");
}

/** Les RÉPONSES s'écrivent en fractions pleines (leçon de la scène sœur : π/6 en \tfrac ne se lit pas). */
const grand = (t: string) => t.replace(/\\tfrac/g, "\\dfrac");
/** Sur le PLAN, en ligne : une fraction pleine fait une pastille de 40 px de haut. */
const enLigne = (t: string) => t.replace(/\\[td]frac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2");
/** Une affixe longue (√3, ou deux termes composés) s'écrit SOUS le nom du point. */
const longue = (tex: string) => /\\sqrt/.test(tex) && /[+-]/.test(tex.slice(1));

const DIRECTIONS_FINES: readonly (readonly [number, number])[] = [
  [1, 0], [-1, 0], [0, 1], [0, -1], [1, -1], [1, 1], [-1, -1], [-1, 1], [0.5, -1], [-0.5, -1], [0.5, 1], [-0.5, 1],
  ...[0.25, 0.8, 0.9].flatMap((f) => [[f, -1], [-f, -1], [f, 1], [-f, 1]] as [number, number][]),
];
/** L'étiquette d'angle d'abord le long de la BISSECTRICE (du sommet vers le milieu de l'arc). */
function bissectrice(p: Record<string, { x: number; y: number }>, sommet: string): readonly (readonly [number, number])[] {
  const m = p["arc-milieu"], c = p[`point-${sommet}`];
  if (!m || !c) return DIRECTIONS_FINES;
  const th = Math.atan2(m.y - c.y, m.x - c.x);
  const dir = (a: number): [number, number] => { const x = Math.cos(a), y = Math.sin(a), k = Math.max(Math.abs(x), Math.abs(y)); return [x / k, y / k]; };
  return [dir(th), dir(th + 0.35), dir(th - 0.35), dir(th + 0.7), dir(th - 0.7), ...DIRECTIONS_FINES];
}

/**
 * La valeur PARLÉE du curseur de balayage : ce qui CHANGE, et rien d'autre. L'invariant et « Échap
 * le remet à sa place » sont dits UNE fois, par la région vivante, au début du geste (`balayer`) —
 * les répéter ici les faisait relire à chaque appui de flèche, 67 fois sur la médiatrice (vague 2,
 * ergonomie : un flot où la seule chose qui change ne s'entend plus).
 */
function valeurBalayage(lieu: M.Lieu, p: number, depart: number): string {
  if (Math.abs(p - depart) < 1e-9) return "M à sa place";
  if (lieu === "mediatrice") return Math.abs(p) > Math.abs(depart) ? "plus loin de [AB] : MA et MB ont augmenté ensemble" : "plus près de [AB] : MA et MB ont diminué ensemble";
  if (lieu === "cercle") return p > depart ? "plus près de A : MA a diminué, MB a augmenté" : "plus près de B : MA a augmenté, MB a diminué";
  return p > depart ? "plus loin de B : MA et MB ont augmenté ensemble" : "plus près de B : MA et MB ont diminué ensemble";
}

const NOM_LIEU: Record<M.Lieu, string> = { mediatrice: "la médiatrice de [AB]", cercle: "le cercle de diamètre [AB]", droite: "la droite (AB)" };

export function PlanComplexeRapportPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<EtatRapport>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [annonce, setAnnonce] = useState("");
  /** le balayage, en PAS depuis le cran (0 = M à sa place) */
  const [balayage, setBalayage] = useState(0);
  const etatRef = useRef<EtatRapport>(etat);
  etatRef.current = etat;

  const idTitre = useId();
  const idConsigne = useId();
  const refs = {
    A: useRef<HTMLSpanElement>(null),
    B: useRef<HTMLSpanElement>(null),
    C: useRef<HTMLSpanElement>(null),
    M: useRef<HTMLSpanElement>(null),
    angle: useRef<HTMLSpanElement>(null),
    mediatrice: useRef<HTMLSpanElement>(null),
    cercle: useRef<HTMLSpanElement>(null),
    droite: useRef<HTMLSpanElement>(null),
  };
  const repRefs = useRef(Object.fromEntries(REPERES.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES)[number], React.RefObject<HTMLSpanElement>>);

  // ── Le pari : sans temps, le verdict est immédiat ──
  const pari = usePari(etape.pari, { attend: false, montre: true });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const revele = pari.phase === "revele" || pari.phase === "aucun";
  const premier = etape.controles[0] ?? "";
  const enoncees = ENONCEES[premier] ?? [];
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : (etape.lectures ?? []).filter((l) => enoncees.includes(l));
  const lit = (l: string) => lectures.includes(l);

  // ── Les nombres : une seule voie, le modèle exact ──
  const lieu = etat.mode === "lieu";
  const T = M.triangle(etat.forme, etat.position);
  const L = M.lecture(T, etat.sommet);
  const w = M.rapport(L);
  const zM = M.pointM(etat.pointM);
  const u = M.rapportLieu(zM);
  const lieuCran = M.LIEU_DU_CRAN[etat.pointM];
  const parc = M.parcours(etat.pointM);
  const balaie = lieu && balayage !== 0 && ouvre("balayage") && parc !== null;
  // Le SENS du curseur : vers la droite, le côté LONG du parcours (vague 2, ergonomie : au cran
  // −√3 + i, tirer à droite — le geste naturel — donnait trois pas de 7,5° puis butait ; on concluait
  // que le contrôle était cassé). Le pas reste exact, et 0 reste M à son cran.
  const sensBal = parc && parc.max - parc.depart < parc.depart - parc.min ? -1 : 1;
  const pBal = parc ? parc.depart + sensBal * balayage * parc.pas : 0;
  const mF: [number, number] = balaie && parc ? parc.point(pBal) : M.enFlottants(zM);
  const uF = M.rapportLieuF(mF);

  // ce que le plan montre (§6.2, §7.5)
  const fleches = lieu ? revele : etape.controles.includes("position") ? revele : true;
  const flechesAccent = lieu || etape.controles.includes("position");
  // l'arc : révélé à S2 ; énoncé (encre) à S3 ; révélé à S4 ; jamais à S1 (voir l'en-tête)
  const kW = M.argument(w);
  const kU = M.argument(u);
  const arcW = !lieu && (etape.controles.includes("sommet") || (etape.controles.includes("forme") && revele)) && kW !== null && kW !== 0 ? (kW * Math.PI) / 12 : null;
  const arcU = lieu && revele ? (balaie ? uF.argument : kU !== null ? (kU * Math.PI) / 12 : null) : null;
  const arc = lieu ? (arcU !== null && Math.abs(arcU) > 1e-9 ? arcU : null) : arcW;
  const arcAccent = lieu || etape.controles.includes("forme");
  const report = !lieu && etape.controles.includes("forme") && revele;
  const angleDroit = !lieu && etape.controles.includes("sommet") && revele ? "C" : null;
  // la médiatrice (la réponse) dès la révélation ; le cercle et la droite seulement quand M est posé
  // sur un de leurs crans — chacun paraît quand il sert (vague 2, calme ; voir le rendu)
  const courbes = lieu && revele ? { mediatrice: true, cercle: lieuCran === "cercle", droite: lieuCran === "droite" } : null;

  // ── Rendu ──
  const renduRef = useRef<RenduRapport | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    const points: Record<string, [number, number]> = lieu
      ? { A: M.enFlottants(M.Z_A_LIEU), B: M.enFlottants(M.Z_B_LIEU), M: mF }
      : { A: M.enFlottants(T.A), B: M.enFlottants(T.B), C: M.enFlottants(T.C) };
    s.mettreAJour({
      mode: etat.mode,
      points,
      sommet: lieu ? "M" : etat.sommet,
      fleches: fleches ? (lieu ? { num: "A", den: "B", accent: true, arrivent: true } : { num: L.versNum, den: L.versDen, accent: flechesAccent, arrivent: false }) : null,
      segmentsEnonce: lieu && !revele,
      arc,
      arcAccent,
      report,
      angleDroit,
      cercleUnite: lieu,
      courbes,
    });
    s.rendre();
    const p = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    const en = (n: string, visible = true) => (p[n] && visible ? p[n] : cache);
    const entrees = [
      { el: refs.angle.current, p: en("arc-milieu", arc !== null && !(balaie && lieuCran !== "cercle")), portee: 50, filet: 14, directions: bissectrice(p, lieu ? "M" : etat.sommet) },
      { el: refs.A.current, p: en("point-A"), portee: 50, filet: 14, directions: DIRECTIONS_FINES },
      { el: refs.B.current, p: en("point-B"), portee: 50, filet: 14, directions: DIRECTIONS_FINES },
      { el: refs.C.current, p: en("point-C", !lieu), portee: 50, filet: 14, directions: DIRECTIONS_FINES },
      { el: refs.M.current, p: en("point-M", lieu), portee: 50, filet: 14, directions: DIRECTIONS_FINES },
      { el: refs.mediatrice.current, p: en("lieu-mediatrice", !!courbes?.mediatrice), portee: 40, directions: DIRECTIONS_FINES },
      { el: refs.droite.current, p: en("lieu-droite", !!courbes?.droite), portee: 40, directions: DIRECTIONS_FINES },
      { el: refs.cercle.current, p: en("lieu-cercle", !!courbes?.cercle), portee: 50, filet: 14, directions: DIRECTIONS_FINES },
    ];
    const obstacles = [boiteLegende(rendu.hoteRef.current), ...s.zones()].filter((b): b is NonNullable<typeof b> => b !== null);
    // Plusieurs ORDRES de pose, le meilleur retenu (la scène sœur en essaie deux) : le placeur pose
    // dans l'ordre et la dernière venue se débrouille. Premier lancement, au téléphone : à S3,
    // l'affixe longue de C, posée APRÈS B, tirait son filet sous « B(4i) » ; à S4, « droite (AB) »,
    // posée après B, n'avait plus de place que sur lui. Le compte des conflits GRAVES tranche, puis
    // la somme des coûts ; le dernier appel pose les étiquettes, donc on repose l'ordre retenu.
    const ORDRES: readonly (readonly number[])[] = [
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 3, 1, 2, 4, 5, 6, 7],
      [0, 5, 6, 7, 1, 2, 3, 4],
      [0, 2, 3, 1, 4, 5, 6, 7],
    ];
    const placerDans = (ordre: readonly number[]) => {
      const res = disposer(ordre.map((k) => entrees[k]), s.segments(), s.cadre(), obstacles);
      return { res, graves: res.reduce((a, b) => a + (b?.graves ?? 0), 0), somme: res.reduce((a, b) => a + (b?.cout ?? 0), 0) };
    };
    let meilleur = { k: 0, ...placerDans(ORDRES[0]) };
    for (let k = 1; k < ORDRES.length && meilleur.graves > 0; k++) {
      const autre = placerDans(ORDRES[k]);
      if (autre.graves < meilleur.graves || (autre.graves === meilleur.graves && autre.somme < meilleur.somme)) meilleur = { k, ...autre };
      if (k === ORDRES.length - 1 || meilleur.graves === 0) {
        if (meilleur.k !== k) meilleur = { k: meilleur.k, ...placerDans(ORDRES[meilleur.k]) };
        break;
      }
    }
    const r = meilleur.res;
    s.lier(r.flatMap((b) => (b?.filet ? [b.filet] : [])));
    for (const n of REPERES) poser(repRefs.current[n].current, p[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, revele, balayage, indexEtape, pari.phase]);

  const rendu = useSceneRendu<RenduRapport>(() => import("@/lib/scene2d/plan-complexe-rapport-rendu").then((m) => m.creerRenduRapport), dessiner);
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // LE BALAYAGE, DIT : son début et son relâchement une fois chacun ; pendant, la valeur du curseur
  const balayageRef = useRef(0);
  balayageRef.current = balayage;
  const balayer = (v: number) => {
    if (balayageRef.current === 0 && v !== 0 && lieuCran) {
      const inv = M.INVARIANT[lieuCran] === "module" ? "le module du rapport reste écrit, il ne bouge pas ; l’argument s’efface" : "l’argument du rapport reste écrit, il ne bouge pas ; le module s’efface";
      setAnnonce(`M glisse sur ${NOM_LIEU[lieuCran]} : ${inv}, et l’affixe de M n’est plus écrite.`);
    }
    setBalayage(v);
  };
  const relacher = () => {
    if (balayageRef.current !== 0) setAnnonce("M revenu à sa place.");
    setBalayage(0);
  };
  const relacherRef = useRef(relacher);
  relacherRef.current = relacher;
  const tient = useRef(false);
  useEffect(() => {
    const lacher = () => {
      if (!tient.current) return;
      tient.current = false;
      relacherRef.current();
    };
    window.addEventListener("pointerup", lacher);
    window.addEventListener("pointercancel", lacher);
    return () => {
      window.removeEventListener("pointerup", lacher);
      window.removeEventListener("pointercancel", lacher);
    };
  }, []);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      setBalayage(0);
      setEtat((c) => appliquer(e.etat, c));
    },
    [etapes, pari, indexEtape]
  );

  const regler = (patch: Partial<EtatRapport>) => {
    const s = { ...etatRef.current, ...patch };
    setEtat(s);
    setBalayage(0);
    // chaque réglage est DIT : le lecteur d'écran ne relit pas l'image — et seulement avec les
    // mots que l'étape a le droit d'écrire
    if (patch.position !== undefined || patch.forme !== undefined) {
      const t = M.triangle(s.forme, s.position);
      const nom = patch.position !== undefined ? M.LIBELLE_POSITION[s.position] : M.LIBELLE_FORME[s.forme];
      setAnnonce(`${nom} : A en ${enClair(M.texComplexe(t.A))}, B en ${enClair(M.texComplexe(t.B))}, C en ${enClair(M.texComplexe(t.C))}.`);
    } else if (patch.sommet !== undefined) {
      const l = M.lecture(M.triangle(s.forme, s.position), s.sommet);
      setAnnonce(`Lu depuis ${s.sommet} : w = ${enClair(M.texRapport(M.rapport(l)))}.`);
    } else if (patch.pointM !== undefined) {
      const uu = M.rapportLieu(M.pointM(s.pointM));
      const k = M.argument(uu);
      setAnnonce(`M en ${enClair(M.TEX_POINT_M[s.pointM])} : module ${enClair(M.moduleDe(uu).tex)}, argument ${k === null ? "non défini" : enClair(M.texAngle(k))}.`);
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
        surtitre="Plan complexe"
        libelleOuvrir="Ouvrir le plan complexe"
      />
    );
  }

  const ligneLecture = (cleL: string, terme: React.ReactNode, valeur: React.ReactNode, formule = false) => (
    <div key={cleL} className={cn("flex min-w-0 border-b border-subtle pb-1.5", formule ? "flex-col gap-1" : "flex-wrap items-baseline justify-between gap-x-3")}>
      <dt className="text-secondary">{terme}</dt>
      <dd className={cn("tabular-nums text-primary", formule ? "min-w-0 pl-3" : "ml-auto text-right")} data-lecture={cleL}>
        {typeof valeur === "string" ? frenchTypography(valeur) : valeur}
      </dd>
    </div>
  );
  const math = (tex: string) => <MathText>{`$${tex}$`}</MathText>;
  const TIRET = "—";
  const S = etat.sommet;
  const mW = M.moduleDe(w);
  const mU = M.moduleDe(u);
  const lDen = M.moduleDe(L.den), lNum = M.moduleDe(L.num);
  const invariant = lieuCran ? M.INVARIANT[lieuCran] : null;

  /** une valeur qui garde sa place pendant le balayage : « — » PAR-DESSUS la valeur rendue invisible */
  const tenue = (efface: boolean, contenu: React.ReactNode) => (
    <span className="grid justify-items-end">
      {efface && <span className="self-center [grid-area:1/1]">{TIRET}</span>}
      <span className={cn("[grid-area:1/1]", efface && "invisible")} aria-hidden={efface || undefined} data-reserve={efface ? "" : undefined}>
        {contenu}
      </span>
    </span>
  );

  const blocLectures =
    lectures.length > 0 ? (
      <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
        {lit("vecteurs") &&
          ligneLecture(
            "vecteurs",
            <MathText>{`Les deux vecteurs issus de $${S}$`}</MathText>,
            <span className="flex flex-col items-start gap-1">
              <span data-vecteur="num">{math(`z_${L.versNum}-z_${S}=${M.texComplexe(L.num)}`)}</span>
              <span data-vecteur="den">{math(`z_${L.versDen}-z_${S}=${M.texComplexe(L.den)}`)}</span>
            </span>,
            true
          )}
        {lit("w") && ligneLecture("w", <MathText>{`Le rapport au sommet $${S}$, $w$`}</MathText>, math(grand(M.texRapport(w))))}
        {lit("module-w") && ligneLecture("module-w", <MathText>{"Module, $\\vert w\\vert$"}</MathText>, math(grand(mW.tex)))}
        {lit("argument-w") && ligneLecture("argument-w", <MathText>{"Argument, $\\arg(w)$"}</MathText>, kW === null ? TIRET : math(grand(M.texAngle(kW))))}
        {lit("longueurs") &&
          ligneLecture(
            "longueurs",
            <MathText>{`Les deux longueurs au sommet $${S}$`}</MathText>,
            <MathText>{`$${S}${L.versDen} = ${grand(lDen.tex)}$ et $${S}${L.versNum} = ${grand(lNum.tex)}$`}</MathText>,
            true
          )}
        {lit("nature") &&
          ligneLecture(
            "nature",
            <MathText>{`Ce que $w$ dit, au sommet $${S}$`}</MathText>,
            <span className="flex flex-col items-start gap-1">
              {M.nature(w, S).map((l, i) => (
                <span key={i} data-critere={i}>
                  <MathText>{l}</MathText>
                </span>
              ))}
            </span>,
            true
          )}
        {lit("rapport-lieu") &&
          ligneLecture(
            "rapport-lieu",
            <MathText>{"Le rapport lu au sommet $M$, $u$"}</MathText>,
            <span className="flex flex-col items-end gap-1.5">
              <span data-rapport="module">{tenue(balaie && invariant !== "module", math(`\\vert u\\vert = ${grand(mU.tex)}`))}</span>
              <span data-rapport="argument">{tenue(balaie && invariant !== "argument", math(`\\arg(u) = ${kU === null ? "" : grand(M.texAngle(kU))}`))}</span>
            </span>
          )}
      </dl>
    ) : null;

  const groupe = (id: string, legende: string, valeurs: readonly string[], courant: string, texte: (v: string) => string, choisir: (v: string) => void) => (
    <fieldset key={id} className="flex flex-col gap-1" data-controle={id}>
      <legend className="mb-1 text-body-sm text-secondary">
        <MathText>{legende}</MathText>
      </legend>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {valeurs.map((x) => (
          <label key={x} className={LIGNE_RADIO}>
            <input type="radio" name={`${idTitre}-${id}`} value={x} checked={courant === x} onChange={() => choisir(x)} aria-label={enClair(texte(x).replace(/\$/g, ""))} className="accent-figure-ink-soft" />
            <span className="tabular-nums" data-libelle={x}>
              <MathText>{texte(x)}</MathText>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  const lacher = () => {
    tient.current = false;
    relacher();
  };
  const pasBas = parc ? Math.ceil((parc.min - parc.depart) / parc.pas - 1e-9) : 0, pasHaut = parc ? Math.floor((parc.max - parc.depart) / parc.pas + 1e-9) : 0;
  const bornes = sensBal === 1 ? { min: pasBas, max: pasHaut } : { min: -pasHaut, max: -pasBas };
  const groupes: Record<string, () => React.ReactNode> = {
    position: () => groupe("position", "Le placement de la figure", M.POSITIONS, etat.position, (v) => M.LIBELLE_POSITION[v as M.Position], (v) => regler({ position: v as M.Position })),
    forme: () => groupe("forme", "Le triangle", M.FORMES, etat.forme, (v) => M.LIBELLE_FORME[v as M.Forme], (v) => regler({ forme: v as M.Forme })),
    sommet: () => groupe("sommet", "Le sommet d’où l’on lit", M.SOMMETS, etat.sommet, (v) => M.LIBELLE_SOMMET[v as M.Sommet], (v) => regler({ sommet: v as M.Sommet })),
    pointM: () => groupe("pointM", "Le point $M$", M.POINTS_M, etat.pointM, (v) => `$${M.TEX_POINT_M[v as M.PointM]}$`, (v) => regler({ pointM: v as M.PointM })),
    // INERTE au cran 2 + 4i, jamais absent : glisser « au hasard » ne montre rien (§6.1 a) — mais un
    // curseur qui paraît et disparaît avec le cran faisait sauter tout le panneau de ~115 px à chaque
    // flèche du groupe de crans, et la consigne « fais glisser M » ne montrait rien à glisser (vague 2,
    // ergonomie). La place est tenue, le curseur désactivé, et son libellé dit quoi faire d'abord.
    balayage: () => (
      <label key="balayage" className="flex flex-col gap-1" data-controle="balayage">
        <span className="text-body-sm text-secondary">
          <MathText>
            {parc && lieuCran
              ? `Fais glisser $M$ sur ${NOM_LIEU[lieuCran].replace("[AB]", "$[AB]$").replace("(AB)", "$(AB)$")} — sans lâcher ; au clavier, les flèches, puis Échap`
              : "Pose d’abord $M$ sur un lieu (un des crans ci-dessus) pour le faire glisser."}
          </MathText>
        </span>
        <input
          type="range"
          min={bornes.min}
          max={bornes.max}
          step={1}
          value={balayage}
          disabled={!(parc && lieuCran)}
          onPointerDown={() => {
            tient.current = true;
          }}
          onChange={(e) => balayer(parseInt(e.target.value, 10) || 0)}
          onKeyDown={(e) => {
            // Échap est aussi la touche qui ferme les surcouches : on la garde pour ce geste
            if (e.key === "Escape") {
              e.stopPropagation();
              lacher();
            }
          }}
          onBlur={lacher}
          aria-valuetext={parc && lieuCran ? valeurBalayage(lieuCran, pBal, parc.depart) : "inactif : M n’est sur aucun lieu"}
          className={CURSEUR}
        />
      </label>
    ),
  };

  // ── Ce que le lecteur d'écran entend ──
  const texA = M.texComplexe(T.A), texB = M.texComplexe(T.B), texC = M.texComplexe(T.C);
  const description = lieu
    ? "Plan complexe, repère orthonormé gradué de −9 à 9, avec le cercle de rayon 1 centré en O. " +
      `A en −2, B en 2 ; le point M ${balaie ? `glisse sur ${lieuCran ? NOM_LIEU[lieuCran] : "son lieu"}` : `en ${enClair(M.TEX_POINT_M[etat.pointM])}`}, relié à A et à B. ` +
      (courbes
        ? `En tirets : la médiatrice de [AB] (l’axe imaginaire)${courbes.cercle ? ", et le cercle de diamètre [AB] (centre O, rayon 2)" : ""}${courbes.droite ? ", et la droite (AB) (l’axe réel)" : ""}. `
        : "") +
      (arc !== null && revele ? "Un arc marque, en M, l’écart de la direction de B à celle de A. " : "")
    : `Plan complexe, repère orthonormé gradué de −7 à 7. Trois points : A en ${enClair(texA)}, B en ${enClair(texB)}, C en ${enClair(texC)}. ` +
      (fleches ? `Deux flèches partent de ${S} : la plus épaisse vers ${L.versDen}, la plus fine vers ${L.versNum}. ` : "") +
      (arc !== null ? `Un arc, en ${S}, va de la flèche vers ${L.versDen} à la flèche vers ${L.versNum}. ` : "") +
      (report ? `La longueur ${S}${L.versNum} est reportée le long de la flèche vers ${L.versDen} : elle s’arrête avant ${L.versDen}. ` : "") +
      (angleDroit ? "Un petit carré marque un angle droit en C." : "");

  const legende = <span className="[&_.katex]:text-[1em]">{math(lieu ? M.TEX_BADGE_LIEU : M.TEX_BADGE[etat.sommet])}</span>;
  const nomPoint = (n: "A" | "B" | "C", tex: string) => (longue(tex) ? <span className="flex flex-col items-center leading-tight">{math(n)}{math(tex)}</span> : math(`${n}(${tex})`));

  return (
    <section
      className={cn("my-10 scroll-mt-14 bp-expanded:scroll-mt-20 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-pari={pari.phase}
      data-forme={etat.forme}
      data-position={etat.position}
      data-sommet={etat.sommet}
      data-point-m={etat.pointM}
      data-mode={etat.mode}
      data-balayage={balaie ? "oui" : "non"}
      data-balayage-p={balaie ? pBal.toFixed(4) : undefined}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Plan complexe
      </Eyebrow>
      <ConsigneEtape idTitre={idTitre} idConsigne={idConsigne} titre={etape.titre} consigne={etape.consigne} cle={etape.id} rang={{ index: indexEtape, total: etapes.length }} />

      <div className={GRILLE_SCENE} data-scene-grille>
        <Plateau
          hoteRef={rendu.hoteRef}
          canvasRef={rendu.canvasRef}
          panneau={rendu.panneau}
          description={description}
          legende={legende}
          messageSansWebgl="Ce navigateur n’affiche pas le plan (dessin indisponible). Les paris et les réglages restent."
          onRelancer={rendu.relancer}
          format="carre-partout"
        >
          <Etiquette refEl={refs.A} nom="nom-A" fond>
            {lieu ? math("A(-2)") : nomPoint("A", texA)}
          </Etiquette>
          <Etiquette refEl={refs.B} nom="nom-B" fond>
            {lieu ? math("B(2)") : nomPoint("B", texB)}
          </Etiquette>
          <Etiquette refEl={refs.C} nom="nom-C" fond>
            {!lieu && nomPoint("C", texC)}
          </Etiquette>
          <Etiquette refEl={refs.M} nom="nom-M" fond>
            {lieu && (balaie ? math("M") : math(`M(${M.TEX_POINT_M[etat.pointM]})`))}
          </Etiquette>
          <Etiquette refEl={refs.angle} nom="nom-angle" fond>
            {arc !== null && (
              <span className={arcAccent ? "text-figure-accent" : undefined}>
                {math(enLigne(lieu ? (balaie && lieuCran === "cercle" ? M.texAngle(-6) : kU !== null ? M.texAngle(kU) : "") : kW !== null ? M.texAngle(kW) : ""))}
              </span>
            )}
          </Etiquette>
          <Etiquette refEl={refs.mediatrice} nom="nom-mediatrice" fond discret>
            {courbes && <span className="text-figure-accent"><MathText>{"médiatrice de $[AB]$"}</MathText></span>}
          </Etiquette>
          <Etiquette refEl={refs.cercle} nom="nom-cercle" fond discret>
            {courbes?.cercle && <span className="text-figure-accent"><MathText>{"cercle de diamètre $[AB]$"}</MathText></span>}
          </Etiquette>
          <Etiquette refEl={refs.droite} nom="nom-droite" fond discret>
            {courbes?.droite && <span className="text-figure-accent"><MathText>{"droite $(AB)$"}</MathText></span>}
          </Etiquette>
          {REPERES.map((r) => (
            <Etiquette key={r} refEl={repRefs.current[r]} nom={r} texte="" />
          ))}
        </Plateau>

        <div className={cn("flex min-w-0 flex-col gap-5", MARGE_FOCUS_CARRE)}>
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

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {blocLectures}

          {/* dans l'ordre que l'ÉTAPE déclare */}
          <div className="flex flex-col gap-5">{etape.controles.filter(ouvre).map((c) => groupes[c]?.())}</div>

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" data-notes>
              <EncadreRepli titre="Ce que ce plan simplifie">
                {frenchTypography(
                  // le texte de l'encadré obéit à la formule graduée comme le reste (§7.5 C) : ni
                  // « longueur » à S1, ni « lieu » avant S4
                  (lieu
                    ? "Cinq positions de M : c’est ce qui permet d’écrire chaque nombre exactement — une racine, une fraction de π, jamais un décimal. Entre deux positions, seul le glissement le long d’une courbe est permis, et il n’écrit que ce qui ne change pas."
                    : "Quatre triangles, quatre placements : c’est ce qui permet d’écrire chaque nombre exactement, jamais un décimal. Les quatre triangles partagent le même premier côté : ils se comparent d’un coup d’œil, mais le plan ne montre jamais un triangle dont la base change.") +
                    " Le plan montre la règle sur des exemples ; il ne la démontre pas." +
                    ((etape.lectures ?? []).some((l) => l === "argument-w" || l === "rapport-lieu") ? " L’arc est dessiné à la même taille quel que soit l’éloignement des points : sans cela, tout près, il serait invisible." : "") +
                    " Le dessin est exact au pixel près, les nombres sont exacts tout court."
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
