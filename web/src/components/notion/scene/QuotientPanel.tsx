"use client";

/**
 * QuotientPanel — « l'échelle des quotients » (PC · evolution-spontanee, en tête de R2 /
 * chapitre 3 ; spec
 * docs/pipeline/propositions/pc-evolution-spontanee-scene-quotient.md).
 *
 * Le seizième manipulable sur l'appareillage des scènes (ADR 0041) : opt-in au clic, cinq
 * étapes à pari, ni temps ni course — le verdict est immédiat, c'est le DESSIN qui répond
 * avant le texte (§6.1). TROIS BAINS (A : zinc/cuivre — l'accroche ; B : étain/plomb — le seul
 * dont le sens se retourne ; C : cuivre/argent — le seul dont $Q_r$ porte un exposant), CINQ
 * CRANS de concentration par solution, et UN CRITÈRE : $Q_{r,i}$ face à $K$, jamais face à $1$
 * (`seuil-un-au-lieu-de-k`, §8.2).
 *
 * LA MAISON, PLUS STRICTE QUE LA TABLE DU §7.6 A DE LA SPEC (décision prise, §7.6 A du
 * modèle) : AUCUN contrôle n'est ouvert pendant AUCUN pari, à AUCUNE étape (ADR 0041 §6,
 * `usePari`). Les `controles` du descripteur sont ceux que la RÉVÉLATION ouvre.
 *
 * DEUX OBJETS SÉPARÉS SUR LE DESSIN (§5.5), donc deux ancrages possibles pour les DEUX SEULS
 * labels numériques de la scène ($Q_{r,i}$ et $K$) : la BANDE DE TRAVAIL quand elle est au DOM
 * (à partir de S3 — c'est pour ça qu'elle existe, §5.5 B), l'AXE D'ENSEMBLE sinon, ou quand
 * $Q_{r,i}$ tombe hors bande (le chevron n'a pas de pastille où accrocher un nombre). Budget de
 * six étiquettes HTML au total : $Q_{r,i}$, $K$, les deux espèces dissoutes, les deux rôles
 * (`data-etiquette="qri"|"k"|"espece-produit"|"espece-oxydant"|"role-oxyde"|"role-reduit"`).
 *
 * LE PARI DE S4 PORTE SUR L'EXPRESSION, PAS SUR LA VALEUR (§7.4) : avant son engagement, le
 * modèle exporte `logQ: null` au rendu — ni pastille, ni étiquette, ni chevron, sur l'axe comme
 * dans la bande (F4). C'est la lecture `qri` elle-même (via `estEnonce`) qui décide ce moment ;
 * une seule source de vérité pour le texte ET pour le pixel.
 *
 * LA LECTURE `ecart`, UN CAS NEUF (correction du coordinateur, 2026-09-27) : après la révélation
 * de S4, le bain B redevient atteignable et son écart à $K$ tombe SOUS une décade pour plusieurs
 * réglages ($Q_{r,i}=10$, $K=2{,}5$ ⇒ $0{,}602$ décade, entier $0$) — « 0 ordre de grandeur »
 * serait un nombre vide (§5.7). `texteEcart` écrit donc le CAS, jamais le zéro.
 */

import { createRef, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MathText } from "../ChoiceButton";
import * as M from "@/lib/scene2d/quotient-modele";
import type { RenduQuotient } from "@/lib/scene2d/quotient-rendu";
import { GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS_CARRE } from "./commun";
import { EncadreRepli } from "./EncadreRepli";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, boiteLegende, disposer, poser } from "./Plateau";

interface EtatQuotient {
  bain: M.Bain;
  produit: M.Cran;
  oxydant: M.Cran;
}

const ETAT_DE_BASE: EtatQuotient = { bain: "A", produit: "1.0e-3", oxydant: "1.0e-1" };

function appliquer(e: Scene3DEtat | undefined, c: EtatQuotient): EtatQuotient {
  if (!e) return c;
  const bain = String(e.bain ?? ""), produit = String(e.c_produit ?? ""), oxydant = String(e.c_oxydant ?? "");
  return {
    bain: (M.BAINS as readonly string[]).includes(bain) ? (bain as M.Bain) : c.bain,
    produit: (M.CRANS as readonly string[]).includes(produit) ? (produit as M.Cran) : c.produit,
    oxydant: (M.CRANS as readonly string[]).includes(oxydant) ? (oxydant as M.Cran) : c.oxydant,
  };
}

/** les deux étapes qui bornent la formule graduée des lectures (§5.7) — jamais de littéral ailleurs */
const ID_S2 = M.PLAN[1].id;
const ID_S4 = M.PLAN[3].id;

/**
 * Ce que la CONSIGNE énonce, avant même le pari (§5.7, la colonne « avant le pari ? ») :
 * `equation`, `k` et `melange` toujours ; `expression` et `qri` toujours SAUF à S4 (le pari y
 * porte justement sur l'expression) ; `ecart` seulement à S2 (à S4 c'est une conséquence de la
 * révélation). `sens` et `especes` jamais avant l'engagement. Vérifié contre le compte par
 * étape de la spec (5 · 6 · 6 · 6 · 6) : il tombe juste aux cinq étapes.
 */
const TOUJOURS: readonly string[] = ["equation", "k", "melange"];
function estEnonce(lecture: string, etapeId: string): boolean {
  if (TOUJOURS.includes(lecture)) return true;
  if (lecture === "expression" || lecture === "qri") return etapeId !== ID_S4;
  if (lecture === "ecart") return etapeId === ID_S2;
  return false;
}

/**
 * La lecture `ecart`, en entier, par défaut vers le bas (§5.4). Sur le bain B, atteignable après
 * la révélation de S4, l'écart tombe SOUS une décade pour plusieurs réglages ($Q_{r,i}=10$,
 * $K=2{,}5$ ⇒ $0{,}602$ décade, entier $0$) : « 0 ordre de grandeur » serait un nombre vide,
 * comme au §5.7 pour S3/S5 — on écrit donc le CAS, jamais le zéro (coordinateur, 2026-09-27).
 * Le sens se lit sur l'axe ; cette ligne ne l'affirme pas.
 */
function texteEcart(s: M.Etat): string {
  const e = M.ecart(s);
  return e.entier === 0 ? "moins d’un ordre de grandeur" : `au moins ${e.entier} ordres de grandeur`;
}

/** Un nombre TeX dit en clair — pour les `aria-label` des boutons radio et la région vivante. */
function enClair(t: string): string {
  return t
    .replace(/\{,\}/g, ",")
    .replace(/\\times10\^\{(-?\d+)\}/g, " × 10 puissance $1")
    .replace(/\\ \\text\{([^{}]*)\}/g, " $1")
    .replace(/\\text\{([^{}]*)\}/g, "$1")
    .replace(/\^\{(-?\d+)\}/g, " puissance $1")
    .replace(/[{}]/g, "")
    .replace(/\\,/g, " ");
}

const LIBELLE_BAIN: Record<M.Bain, string> = {
  A: "A — zinc / cuivre",
  B: "B — étain / plomb",
  C: "C — cuivre / argent",
};

/**
 * k = -4 → "m4" : la MÊME formule que `quotient-rendu.ts` (non exportée là-bas, pour ne pas
 * forcer le chargement du module de rendu — three.js n'y est pour rien, mais la règle « importé
 * au clic seulement » vaut pour tous les modules de rendu de la maison, `useSceneRendu`).
 */
const cleDecade = (k: number) => (k < 0 ? `m${-k}` : String(k));

/** les repères SANS texte, lus par une porte future : l'axe (statique, 46 décades), la bande
 * (nommée par RANG relatif 0…7 — sa valeur absolue change avec le bain, §5.5 B) et le bécher */
const REPERES = [
  "axe-debut", "axe-fin", "bande-debut", "bande-fin", "bande-crochet", "bande-chevron",
  "lame-tete", "lame", "depot",
  ...Array.from({ length: M.AXE.max - M.AXE.min + 1 }, (_, i) => `axe-decade-${cleDecade(M.AXE.min + i)}`),
  ...Array.from({ length: 8 }, (_, i) => `bande-decade-${i}`),
] as const;

export function QuotientPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<EtatQuotient>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [annonce, setAnnonce] = useState("");
  const etatRef = useRef<EtatQuotient>(etat);
  etatRef.current = etat;
  const reveleApplique = useRef(false);

  const idTitre = useId();
  const idConsigne = useId();
  const refs = {
    qri: useRef<HTMLSpanElement>(null),
    k: useRef<HTMLSpanElement>(null),
    especeProduit: useRef<HTMLSpanElement>(null),
    especeOxydant: useRef<HTMLSpanElement>(null),
    roleOxyde: useRef<HTMLSpanElement>(null),
    roleReduit: useRef<HTMLSpanElement>(null),
  };
  const repRefs = useRef(Object.fromEntries(REPERES.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES)[number], React.RefObject<HTMLSpanElement>>);

  // ── Le pari : sans temps, le verdict est immédiat (§6.1) ──
  const pari = usePari(etape.pari, { attend: false, montre: true });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const revele = pari.phase === "revele" || pari.phase === "aucun";
  const lectures = (etape.lectures ?? []).filter((l) => estEnonce(l, etape.id) || pari.etapeOuverte);
  const lit = (l: string) => lectures.includes(l);

  // ── Les nombres : une seule voie, le modèle exact ──
  const etatCourant: M.Etat = { bain: etat.bain, produit: etat.produit, oxydant: etat.oxydant };
  const couple = M.COUPLES[etat.bain];
  const verdictCourant = M.verdict(etatCourant);
  const deuxSolides = M.bainADeuxSolides(etat.bain);
  const esp = M.especes(etatCourant);
  // le pari de S4 porte sur l'EXPRESSION : `logQ` est null tant qu'il n'est pas révélé, et c'est
  // la MÊME condition que la lecture `qri` — un seul fait, deux consommateurs (F4)
  const logQ = lit("qri") ? M.log10Q(M.qri(etatCourant)) : null;
  // la bande de travail vient du PLAN du modèle (source unique de ce fait par étape, §5.5 B) :
  // le descripteur JSON ne porte pas de champ générique pour ça, et l'id d'étape est le pont
  const planEtape = useMemo(() => M.PLAN.find((p) => p.id === etape.id), [etape.id]);
  const bandeActive = planEtape?.bande ?? false;
  const horsBande = bandeActive && logQ !== null && !M.dansLaBande(etatCourant);
  const ecartHorsBande = horsBande ? M.ecart(etatCourant) : null;
  const texteChevron = ecartHorsBande ? `à ${ecartHorsBande.entier} décades ${ecartHorsBande.cote === "sous" ? "à gauche" : "à droite"}` : "";

  // le bain n'offre que les couples déjà POSÉS par une étape jusqu'ici (A toujours ; B depuis
  // S3 ; C depuis S4) — dérivé du descripteur, jamais d'un numéro d'étape en dur (§5.6)
  const bainsOfferts = useMemo(() => {
    const vus = new Set<string>();
    for (let i = 0; i <= indexEtape; i++) {
      const b = etapes[i]?.etat?.bain;
      if (typeof b === "string") vus.add(b);
    }
    return M.BAINS.filter((b) => vus.has(b));
  }, [etapes, indexEtape]);

  // la révélation pose, UNE fois par entrée dans l'étape, le réglage que le pari décrivait
  // (seule S2 en a un : le mélange extrême, §7.2) — et le DIT dans la région vivante
  useEffect(() => {
    if (pari.phase !== "revele" || reveleApplique.current) return;
    reveleApplique.current = true;
    const r = etape.etat_revele;
    if (!r) return;
    const s = appliquer(r, etatRef.current);
    setEtat(s);
    const cp = M.COUPLES[s.bain];
    setAnnonce(
      `La scène se règle sur le mélange extrême : solution de ${enClair(cp.produitTex)} à ${enClair(M.texCranUnite(s.produit))}, solution de ${enClair(cp.oxydantTex)} à ${enClair(M.texCranUnite(s.oxydant))}.`
    );
  }, [pari.phase, etape]);

  // « oxydé » / « réduit » sont gatées par la formule graduée (§7.6 C, autorisées à partir de
  // S3 seulement — la même rangée que « étain », « 2,5 », « se retourne ») : le bain B, seul
  // signe que S3 est passée (§5.6), sert de condition — jamais `accent` seul, sans quoi le bain
  // A (toujours direct) les afficherait dès la révélation de S1. La flèche du verdict, SUR
  // L'AXE, ne porte aucun mot : elle reste due dès S1 (`accent` seul la gouverne, dans le rendu).
  const rolesAutorises = bainsOfferts.includes("B");

  // ── Rendu ──
  const renduRef = useRef<RenduQuotient | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.mettreAJour({
      bain: etat.bain,
      logK: M.log10K(etat.bain),
      logQ,
      bande: bandeActive,
      verdict: verdictCourant,
      accent: revele,
      deuxSolides,
      rolesAutorises,
      metaux: { lame: couple.metalDirect, depot: deuxSolides ? couple.metalInverse : null },
    });
    s.rendre();
    const p = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    const en = (n: string, visible = true) => (p[n] && p[n].visible && visible ? p[n] : cache);
    // les DEUX SEULS labels numériques s'ancrent sur la bande quand elle porte une marque ;
    // sinon (bande absente, ou Q_{r,i} hors bande — le chevron n'a pas de pastille) sur l'axe
    const ancreQri = bandeActive && p["bande-qri-marque"]?.visible ? "bande-qri-marque" : "qri-marque";
    const ancreK = bandeActive ? "bande-k-marque" : "k-marque";
    const rolesVisibles = revele && rolesAutorises && verdictCourant !== "equilibre";
    disposer(
      [
        { el: refs.qri.current, p: en(ancreQri, logQ !== null), directions: [[0, -1], [1, -1], [-1, -1], [0, 1], [1, 1], [-1, 1]], portee: 40 },
        { el: refs.k.current, p: en(ancreK), directions: [[0, -1], [-1, -1], [1, -1], [0, 1], [-1, 1], [1, 1]], portee: 40 },
        { el: refs.especeProduit.current, p: en("espece-produit"), directions: [[1, 0]], portee: 4 },
        { el: refs.especeOxydant.current, p: en("espece-oxydant"), directions: [[1, 0]], portee: 4 },
        { el: refs.roleOxyde.current, p: en("role-oxyde", rolesVisibles), directions: [[1, 0], [-1, 0], [0, -1]], portee: 4 },
        { el: refs.roleReduit.current, p: en("role-reduit", rolesVisibles), directions: [[-1, 0], [0, -1], [0, 1]], portee: 4 },
      ],
      s.segments(),
      s.cadre(),
      [boiteLegende(rendu.hoteRef.current), ...s.zones()].filter((b): b is NonNullable<typeof b> => b !== null)
    );
    for (const n of REPERES) poser(repRefs.current[n].current, p[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, logQ, bandeActive, verdictCourant, revele, deuxSolides, rolesAutorises, indexEtape]);

  const rendu = useSceneRendu<RenduQuotient>(() => import("@/lib/scene2d/quotient-rendu").then((m) => m.creerRenduQuotient), dessiner);
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      reveleApplique.current = false;
      // la région vivante se TAIT en changeant d'étape : elle gardait la dernière phrase de l'étape
      // d'avant — « Q_{r,i} = 10. sens inverse (2). » restait dite avant le pari de S4, dont
      // Q_{r,i} est précisément la réponse (première mesure de la porte)
      setAnnonce("");
      setEtat((c) => appliquer(e.etat, c));
    },
    [etapes, pari, indexEtape]
  );

  const regler = (patch: Partial<EtatQuotient>) => {
    const s = { ...etatRef.current, ...patch };
    setEtat(s);
    // chaque réglage est DIT : le lecteur d'écran ne relit pas l'image — et seulement avec les
    // mots que l'étape a le droit d'écrire (les contrôles ne s'ouvrent qu'après la révélation :
    // « sens » est déjà légal partout où `regler` peut être appelé)
    const bits: string[] = [];
    if (lit("qri")) bits.push(`Q_{r,i} = ${M.texQri(s)}`);
    if (lit("ecart")) bits.push(texteEcart(s));
    const phrase = bits.length ? enClair(bits.join(" ; ")) : "";
    const v = M.verdict(s);
    setAnnonce(lit("sens") ? `${phrase ? `${phrase}. ` : ""}${M.TEX_SENS[v]}.` : phrase);
  };

  if (rendu.panneau === "ferme") {
    return (
      <SceneOptIn
        sceneId={scene.scene}
        titre={scene.title}
        legende={scene.caption}
        onOuvrir={rendu.ouvrir}
        className={className}
        surtitre="Chimie"
        libelleOuvrir="Ouvrir l’échelle des quotients"
      />
    );
  }

  const math = (tex: string) => <MathText>{`$${tex}$`}</MathText>;

  const ligneLecture = (cleL: string, terme: React.ReactNode, valeur: React.ReactNode, empile = false) => (
    <div key={cleL} className={cn("flex min-w-0 border-b border-subtle pb-1.5", empile ? "flex-col gap-1" : "flex-wrap items-baseline justify-between gap-x-3")}>
      <dt className="text-secondary">{terme}</dt>
      <dd className={cn("tabular-nums text-primary", empile ? "min-w-0 pl-3" : "ml-auto text-right")} data-lecture={cleL}>
        {typeof valeur === "string" ? frenchTypography(valeur) : valeur}
      </dd>
    </div>
  );

  const kSeul = couple.kTex.replace(/^K = /, "");

  const blocLectures =
    lectures.length > 0 ? (
      <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
        {lit("equation") && ligneLecture("equation", "L’équation", math(couple.equationTex), true)}
        {lit("expression") && ligneLecture("expression", <MathText>{"L’expression de $Q_r$"}</MathText>, math(couple.expressionTex), true)}
        {lit("qri") && ligneLecture("qri", <MathText>{"Le quotient à l’instant initial, $Q_{r,i}$"}</MathText>, math(M.texQri(etatCourant)))}
        {lit("k") && ligneLecture("k", <MathText>{"La constante, donnée"}</MathText>, math(kSeul))}
        {lit("ecart") && ligneLecture("ecart", "L’écart avec K, en ordres de grandeur", texteEcart(etatCourant))}
        {lit("melange") &&
          ligneLecture(
            "melange",
            "Le mélange, à l’instant initial",
            <span className="flex flex-col items-end gap-1">
              <span data-melange="produit">{math(`[${couple.produitTex}] = ${M.texCranUnite(etat.produit)}`)}</span>
              <span data-melange="oxydant">{math(`[${couple.oxydantTex}] = ${M.texCranUnite(etat.oxydant)}`)}</span>
            </span>,
            true
          )}
        {lit("sens") && ligneLecture("sens", "Le sens d’évolution", M.TEX_SENS[verdictCourant])}
        {lit("especes") &&
          ligneLecture(
            "especes",
            "Qui s’oxyde, qui se réduit",
            esp ? math(`${esp.oxyde}\\ \\text{oxydé, }\\ ${esp.reduit}\\ \\text{réduit}`) : "aucune, à l’échelle macroscopique"
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

  const groupes: Record<string, () => React.ReactNode> = {
    // texte(x) porte le $...$ lui-même (MathText ne parse le LaTeX qu'entre délimiteurs —
    // sans eux, « \times10^{-3} » s'afficherait tel quel, en clair, backslash compris)
    oxydant: () => groupe("oxydant", `solution de $${couple.oxydantTex}$`, M.CRANS, etat.oxydant, (v) => `$${M.texCranUnite(v as M.Cran)}$`, (v) => regler({ oxydant: v as M.Cran })),
    produit: () => groupe("produit", `solution de $${couple.produitTex}$`, M.CRANS, etat.produit, (v) => `$${M.texCranUnite(v as M.Cran)}$`, (v) => regler({ produit: v as M.Cran })),
    bain: () => groupe("bain", "Le couple étudié", bainsOfferts, etat.bain, (v) => LIBELLE_BAIN[v as M.Bain], (v) => regler({ bain: v as M.Bain })),
  };

  // ── Ce que le lecteur d'écran entend ──
  const description =
    `Un axe gradué de 10 puissance −4 à 10 puissance 42, décade par décade. Le pivot K est marqué à ${enClair(kSeul)}` +
    (logQ !== null ? `, le repère Q_{r,i} à ${enClair(M.texQri(etatCourant))}` : "") +
    "." +
    (bandeActive ? " En dessous, une bande de travail agrandit huit décades autour de K." : "") +
    (texteChevron ? ` ${texteChevron}.` : "") +
    ` À côté, un bécher avec une lame de ${couple.metalDirect}${deuxSolides ? ` et un dépôt de ${couple.metalInverse} au fond` : ""}.` +
    (revele && verdictCourant !== "equilibre" ? " Une flèche part du repère vers le pivot." : "");

  const legende = `Bain ${etat.bain}`;

  return (
    <section
      className={cn("my-10 scroll-mt-14 bp-expanded:scroll-mt-20 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-pari={pari.phase}
      data-bain={etat.bain}
      data-c-produit={etat.produit}
      data-c-oxydant={etat.oxydant}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Chimie
      </Eyebrow>
      <ConsigneEtape idTitre={idTitre} idConsigne={idConsigne} titre={etape.titre} consigne={etape.consigne} cle={etape.id} rang={{ index: indexEtape, total: etapes.length }} />

      <div className={GRILLE_SCENE} data-scene-grille>
        <Plateau
          hoteRef={rendu.hoteRef}
          canvasRef={rendu.canvasRef}
          panneau={rendu.panneau}
          description={description}
          legende={legende}
          messageSansWebgl="Ce navigateur n’affiche pas l’échelle (dessin indisponible). Les paris et les réglages restent."
          onRelancer={rendu.relancer}
          format="carre-partout"
        >
          <Etiquette refEl={refs.qri} nom="qri" fond>
            {logQ !== null && math(`Q_{r,i} = ${M.texQri(etatCourant)}`)}
          </Etiquette>
          <Etiquette refEl={refs.k} nom="k" fond>
            {math(couple.kTex)}
          </Etiquette>
          <Etiquette refEl={refs.especeProduit} nom="espece-produit" fond>
            {math(`[${couple.produitTex}]`)}
          </Etiquette>
          <Etiquette refEl={refs.especeOxydant} nom="espece-oxydant" fond>
            {math(`[${couple.oxydantTex}]`)}
          </Etiquette>
          <Etiquette refEl={refs.roleOxyde} nom="role-oxyde" fond>
            {revele && rolesAutorises && verdictCourant !== "equilibre" && <span className="text-figure-accent">oxydé</span>}
          </Etiquette>
          <Etiquette refEl={refs.roleReduit} nom="role-reduit" fond>
            {revele && rolesAutorises && verdictCourant !== "equilibre" && <span className="text-figure-accent">réduit</span>}
          </Etiquette>
          {/* le texte du chevron, aussi porté par la description du canvas (ci-dessus) : un
              second nœud, pour la porte et pour qui navigue directement au canvas (§11.2) */}
          <span className="sr-only" data-chevron>
            {texteChevron}
          </span>
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
              <EncadreRepli titre="Ce que cette échelle simplifie">
                {frenchTypography(
                  /* aucun nombre littéral ici : « 2,5 » est une chaîne gatée (en position de K,
                     autorisée à partir de S3 seulement, §7.6 C) et cet encadré est visible dès
                     S1 — la formule reste qualitative, comme le veut §10.1 */
                  "L’axe est logarithmique : une même longueur y vaut toujours un même facteur, jamais une même différence — c’est ce qui permet de faire tenir une constante minuscule et une constante énorme sur le même axe. La scène place le mélange ; elle ne le fait pas évoluer : la flèche dit vers où, jamais à quelle vitesse ni jusqu’où. Les trois constantes sont des données, à une température qu’on ne règle pas — changer de bain change la réaction, jamais la température. Les concentrations sont celles de l’instant où l’on vient de mélanger." +
                    (bandeActive
                      ? " En dessous de l’axe d’ensemble, une bande agrandit huit décades autour de K : quand le repère n’y est pas, aucun mélange préparable n’approche K d’aussi près — c’est un fait sur le couple, pas un défaut d’affichage."
                      : "")
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
