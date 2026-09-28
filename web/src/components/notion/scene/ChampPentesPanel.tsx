"use client";

/**
 * ChampPentesPanel — « ce que l'équation dit en chaque point » (Maths ·
 * equations-differentielles, R2 ; spec
 * docs/pipeline/propositions/maths-equations-differentielles-scene-pentes.md).
 *
 * Le seizième manipulable sur l'appareillage des scènes (ADR 0041) : opt-in au clic,
 * SIX étapes, pari avant tout. Ni temps ni course : le verdict est immédiat, et c'est
 * le PLAN qui répond avant le texte — un segment se trace en P, le champ se déplie sur
 * une horizontale puis sur tout le plan, la ligne plate se pose, les courbes se tracent,
 * le coefficient bascule sur −1.
 *
 * LA PENTE EN UN POINT → ELLE NE REGARDE QUE LA HAUTEUR → LA LIGNE PLATE → LA COURBE →
 * LA FAMILLE → LE CRAN OÙ LA RÈGLE FAUSSE SE CACHE (§7).
 *
 * EXACT, OU RIEN (§5.4) : tout nombre écrit vient du modèle exact
 * (`champ-pentes-modele.ts`), en entiers et demi-entiers ; les flottants ne servent qu'à
 * dessiner.
 *
 * LES CRANS OFFERTS SONT UNE DONNÉE DE L'ÉTAPE (§5.5, B1) : à S4 et S5, le coefficient
 * n'offre que −0,5 et 0,5 (`crans` du descripteur) — le cran −1 est la RÉPONSE du pari de
 * S6, et un cran offert est une réponse à un clic.
 *
 * UNE DÉCISION DE CONSTRUCTION, écrite (§7.6 : « `b`, `point`, `champ` et `famille` sont
 * rouverts dès l'énoncé » à S6) : ICI, AUCUN contrôle n'existe avant le pari, à aucune
 * étape — ADR 0041 §6 sans exception, comme les quinze autres scènes. À S6 le contrôle `a`
 * est donc absent avant l'engagement (B2), et les quatre autres aussi : ils ne portaient
 * pas le pari, les fermer ne coûte aucun geste que le pari demande, et le panneau garde une
 * seule règle.
 *
 * CE QUI SE VOIT AVANT LE PARI, lu dans le DESCRIPTEUR plutôt que dans le rang de l'étape :
 * le champ n'est montré avant l'engagement que si l'étape le POSE entier (`champ: "plan"`,
 * S4–S6 : l'énoncé) ; la ligne du palier que si l'étape la lit (`palier`) ET la pose déjà
 * (S4–S6) — à S3, elle n'a aucune existence avant la révélation (règle du tremplin) ; le point
 * fixe (0 ; 3) là où l'étape compare deux pentes ; les trois départs là où la révélation
 * tracera trois courbes.
 */

import { createRef, useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MathText } from "../ChoiceButton";
import * as M from "@/lib/scene2d/champ-pentes-modele";
import type { RenduChamp } from "@/lib/scene2d/champ-pentes-rendu";
import { GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS_CARRE } from "./commun";
import { EncadreRepli } from "./EncadreRepli";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, boiteLegende, disposer, poser } from "./Plateau";

interface EtatChamp {
  a: M.Coef;
  b: M.Terme;
  point: M.Point;
  champ: M.Champ;
  famille: M.Famille;
}

const dans = <T extends string>(liste: readonly T[], v: unknown): v is T => typeof v === "string" && (liste as readonly string[]).includes(v);

function appliquer(e: Scene3DEtat | undefined, c: EtatChamp): EtatChamp {
  if (!e) return c;
  return {
    a: dans(M.COEFS, e.a) ? e.a : c.a,
    b: dans(M.TERMES, e.b) ? e.b : c.b,
    point: dans(M.POINTS, e.point) ? e.point : c.point,
    champ: dans(M.CHAMPS, e.champ) ? e.champ : c.champ,
    famille: dans(M.FAMILLES, e.famille) ? e.famille : c.famille,
  };
}

const ETAT_DE_BASE: EtatChamp = { a: "-1", b: "0", point: "origine", champ: "un-point", famille: "aucune" };

const REPERES = [
  "origine", "coin-hg", "coin-bd", "axe-x-droite", "axe-y-haut",
  "point-P", "point-fixe", "palier-gauche", "palier-droite",
  "depart-0-5", "depart-0-2", "depart-0--3",
  ...Array.from({ length: 11 }, (_, k) => `grad-x${k - 7}`).filter((n) => n !== "grad-x0"),
  ...Array.from({ length: 11 }, (_, k) => `grad-y${k - 5}`).filter((n) => n !== "grad-y0"),
] as const;

const LIBELLE_CHAMP: Record<M.Champ, string> = {
  aucun: "aucun",
  "un-point": "en $P$",
  ligne: "sur l’horizontale de $P$",
  plan: "sur tout le plan",
};
const CLAIR_CHAMP: Record<M.Champ, string> = {
  aucun: "aucun segment",
  "un-point": "un segment, en P",
  ligne: "les segments de l’horizontale de P",
  plan: "les segments de tout le plan",
};
const LIBELLE_FAMILLE: Record<M.Famille, string> = {
  aucune: "aucune",
  une: "celle qui passe par $P$",
  trois: "les trois départs",
};
const CLAIR_FAMILLE: Record<M.Famille, string> = {
  aucune: "aucune courbe",
  une: "la courbe qui passe par P",
  trois: "les trois courbes des départs",
};

/** Les directions de l'étiquette de P : d'abord à DROITE (la moitié gauche du cadre ne porte que du champ). */
const DIRECTIONS_P: readonly (readonly [number, number])[] = [[1, -1], [1, 1], [1, 0], [-1, -1], [-1, 1], [0, -1], [0, 1], [-1, 0]];

export function ChampPentesPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<EtatChamp>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [annonce, setAnnonce] = useState("");
  const etatRef = useRef<EtatChamp>(etat);
  etatRef.current = etat;
  const reveleApplique = useRef(false);

  const idTitre = useId();
  const idConsigne = useId();
  const refs = {
    P: useRef<HTMLSpanElement>(null),
    fixe: useRef<HTMLSpanElement>(null),
    palier: useRef<HTMLSpanElement>(null),
  };
  const repRefs = useRef(Object.fromEntries(REPERES.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES)[number], React.RefObject<HTMLSpanElement>>);

  // ── Le pari : sans temps, le verdict est immédiat ──
  const pari = usePari(etape.pari, { attend: false, montre: true });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const revele = pari.phase === "revele" || pari.phase === "aucun";
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const lit = (l: string) => lectures.includes(l);

  // ── Ce que l'étape POSE, lu dans le descripteur (voir l'en-tête) ──
  const champPose = dans(M.CHAMPS, etape.etat?.champ) ? etape.etat!.champ : null;
  const revelePalier = etape.etat_revele?.champ === "plan" || etape.etat_revele?.a !== undefined;
  const compare = (etape.lectures ?? []).includes("pentes-comparees");
  const troisAuReveal = etape.etat_revele?.famille === "trois";

  // ── Les nombres : une seule voie, le modèle exact ──
  const [px, py] = M.POINT_XY[etat.point];
  const m = M.pente(etat.a, etat.b, py);
  const k = M.palier(etat.a, etat.b);
  const ecart = M.ecartAuPalier(etat.a, etat.b, py);
  const mFixe = M.pente(etat.a, etat.b, M.POINT_FIXE[1]);

  // ── Ce que le plan montre (§6.2, §7.7) ──
  const champAffiche: M.Champ = revele ? etat.champ : champPose === "plan" ? "plan" : "aucun";
  const palierVu = (etape.lectures ?? []).includes("palier") && (revele || champPose === "plan");
  const palierAccent = palierVu && revele && revelePalier;
  const rangeePlate = revele && etape.etat_revele?.champ === "plan";
  const courbes: [number, number][] = !revele ? [] : etat.famille === "une" ? [[px, py]] : etat.famille === "trois" ? M.DEPARTS.map((d) => [...M.POINT_XY[d]] as [number, number]) : [];
  const departs: [number, number][] = etat.famille === "trois" && revele ? M.DEPARTS.map((d) => [...M.POINT_XY[d]] as [number, number]) : !revele && troisAuReveal ? M.DEPARTS.map((d) => [...M.POINT_XY[d]] as [number, number]) : [];

  // la révélation pose, UNE fois par entrée dans l'étape, l'état que le pari interrogeait — et le DIT
  useEffect(() => {
    if (pari.phase !== "revele" || reveleApplique.current) return;
    reveleApplique.current = true;
    const r = etape.etat_revele;
    if (!r) return;
    const s = appliquer(r, etatRef.current);
    setEtat(s);
    const kk = M.clairQ(M.palier(s.a, s.b));
    const pose =
      r.a !== undefined ? `pose le coefficient sur ${M.CLAIR_COEF[s.a]} : l’équation devient ${M.clairEquation(s.a, s.b)}, et la ligne plate est à la hauteur ${kk}`
      : r.champ === "plan" ? `trace les segments sur tout le plan ; la ligne plate est à la hauteur ${kk}`
      : r.champ === "ligne" ? "étend les segments à toute l’horizontale de P"
      : r.famille === "une" ? "trace la courbe qui passe par P"
      : r.famille === "trois" ? "trace les trois courbes, une par départ"
      : "pose le réglage du pari";
    setAnnonce(`La scène ${pose}.`);
  }, [pari.phase, etape]);

  // ── Rendu ──
  const renduRef = useRef<RenduChamp | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.mettreAJour({
      a: M.valeur(M.COEF_Q[etat.a]),
      b: M.valeur(M.TERME_Q[etat.b]),
      P: [px, py],
      pointFixe: compare ? [M.POINT_FIXE[0], M.POINT_FIXE[1]] : null,
      segmentFixe: compare && revele,
      departs,
      champ: champAffiche,
      palier: palierVu ? { hauteur: M.valeur(k), accent: palierAccent } : null,
      rangeePlate,
      courbes,
      reserve: boiteLegende(rendu.hoteRef.current),
    });
    s.rendre();
    const p = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    const en = (n: string, visible = true) => (p[n] && visible ? p[n] : cache);
    const obstacles = [boiteLegende(rendu.hoteRef.current), ...s.zones()].filter((b): b is NonNullable<typeof b> => b !== null);
    const r = disposer(
      [
        { el: refs.P.current, p: en("point-P"), portee: 50, filet: 16, directions: DIRECTIONS_P },
        { el: refs.fixe.current, p: en("point-fixe", compare), portee: 50, filet: 16, directions: DIRECTIONS_P },
        { el: refs.palier.current, p: en("palier-etiquette", palierVu), portee: 18, directions: [[0, -1], [0, 1], [0.5, -1], [0.5, 1]] },
      ],
      s.segments(),
      s.cadre(),
      obstacles
    );
    s.lier(r.flatMap((b) => (b?.filet ? [b.filet] : [])));
    for (const n of REPERES) poser(repRefs.current[n].current, p[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, revele, indexEtape, pari.phase]);

  const rendu = useSceneRendu<RenduChamp>(() => import("@/lib/scene2d/champ-pentes-rendu").then((mod) => mod.creerRenduChamp), dessiner);
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
      setEtat((c) => appliquer(e.etat, c));
    },
    [etapes, pari, indexEtape]
  );

  const regler = (patch: Partial<EtatChamp>) => {
    const s = { ...etatRef.current, ...patch };
    setEtat(s);
    // chaque réglage est DIT — et seulement avec les mots que l'étape a le droit d'écrire
    const [, y] = M.POINT_XY[s.point];
    const pen = M.clairQ(M.pente(s.a, s.b, y));
    const kk = M.clairQ(M.palier(s.a, s.b));
    const lu = etape.lectures ?? [];
    const suite = [
      lu.includes("pentes-comparees") ? `pente ${M.clairQ(M.pente(s.a, s.b, M.POINT_FIXE[1]))} en (0 ; 3), ${pen} en P` : lu.includes("pente") ? `pente ${pen} en P` : null,
      lu.includes("palier") ? `ligne plate à la hauteur ${kk}` : null,
      lu.includes("ecart-au-palier") ? `écart au palier ${M.clairQ(M.ecartAuPalier(s.a, s.b, y))}` : null,
    ].filter(Boolean).join(", ");
    if (patch.point !== undefined) setAnnonce(`P en ${M.clairPoint(M.POINT_XY[s.point])}${suite ? ` : ${suite}` : ""}.`);
    else if (patch.a !== undefined || patch.b !== undefined) setAnnonce(`Équation ${M.clairEquation(s.a, s.b)}${suite ? ` : ${suite}` : ""}.`);
    else if (patch.champ !== undefined) setAnnonce(`Tracé : ${CLAIR_CHAMP[s.champ]}.`);
    else if (patch.famille !== undefined) setAnnonce(`Tracé : ${CLAIR_FAMILLE[s.famille]}.`);
  };

  if (rendu.panneau === "ferme") {
    return (
      <SceneOptIn
        sceneId={scene.scene}
        titre={scene.title}
        legende={scene.caption}
        onOuvrir={rendu.ouvrir}
        className={className}
        surtitre="Équation différentielle"
        libelleOuvrir="Ouvrir le plan"
      />
    );
  }

  const math = (tex: string) => <MathText>{`$${tex}$`}</MathText>;
  const ligneLecture = (cleL: string, terme: React.ReactNode, valeur: React.ReactNode, formule = false) => (
    <div key={cleL} className={cn("flex min-w-0 border-b border-subtle pb-1.5", formule ? "flex-col gap-1" : "flex-wrap items-baseline justify-between gap-x-3")}>
      <dt className="text-secondary">{terme}</dt>
      <dd className={cn("tabular-nums text-primary", formule ? "min-w-0 pl-3" : "ml-auto text-right")} data-lecture={cleL}>
        {typeof valeur === "string" ? frenchTypography(valeur) : valeur}
      </dd>
    </div>
  );

  const blocLectures =
    lectures.length > 0 ? (
      <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
        {lit("pente") && ligneLecture("pente", <MathText>{"La pente imposée en $P$"}</MathText>, math(M.texQ(m)))}
        {lit("pentes-comparees") &&
          ligneLecture(
            "pentes-comparees",
            "La pente imposée",
            <span className="flex flex-col items-start gap-1">
              <span data-pente="fixe">
                <MathText>{`en $(0\\,;3)$ : $${M.texQ(mFixe)}$`}</MathText>
              </span>
              <span data-pente="P">
                <MathText>{`en $P$ : $${M.texQ(m)}$`}</MathText>
              </span>
            </span>,
            true
          )}
        {lit("palier") && ligneLecture("palier", "La hauteur de la ligne plate", math(M.texQ(k)))}
        {lit("ecart-au-palier") && ligneLecture("ecart-au-palier", <MathText>{"L’écart de $P$ au palier"}</MathText>, math(M.texQ(ecart)))}
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
            <input
              type="radio"
              name={`${idTitre}-${id}`}
              value={x}
              checked={courant === x}
              onChange={() => choisir(x)}
              aria-label={texte(x).replace(/\$/g, "").replace(/\\,/g, "").replace(/-/g, "−").replace(/\{,\}/g, ",")}
              className="accent-figure-ink-soft"
            />
            <span className="tabular-nums" data-libelle={x}>
              <MathText>{texte(x)}</MathText>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
  /** les crans qu'un contrôle OFFRE à cette étape : ceux du descripteur, sinon tous (§5.5) */
  const crans = <T extends string>(id: string, tous: readonly T[]): readonly T[] => (etape.crans?.[id]?.filter((v): v is T => (tous as readonly string[]).includes(v)) ?? tous);

  const groupes: Record<string, () => React.ReactNode> = {
    point: () => groupe("point", "Le point $P$", M.POINTS, etat.point, (v) => `$${M.texPoint(M.POINT_XY[v as M.Point])}$`, (v) => regler({ point: v as M.Point })),
    champ: () => groupe("champ", "Les segments tracés", M.CHAMPS, etat.champ, (v) => LIBELLE_CHAMP[v as M.Champ], (v) => regler({ champ: v as M.Champ })),
    b: () => groupe("b", "Le terme constant, $b$", crans("b", M.TERMES), etat.b, (v) => `$${v}$`, (v) => regler({ b: v as M.Terme })),
    a: () => groupe("a", "Le coefficient, $a$", crans("a", M.COEFS), etat.a, (v) => `$${M.TEX_COEF[v as M.Coef]}$`, (v) => regler({ a: v as M.Coef })),
    famille: () => groupe("famille", "Les courbes tracées", M.FAMILLES, etat.famille, (v) => LIBELLE_FAMILLE[v as M.Famille], (v) => regler({ famille: v as M.Famille })),
  };

  // ── Ce que le lecteur d'écran entend : seulement ce que le plan MONTRE ──
  const kClair = M.clairQ(k);
  const description =
    `Plan gradué, x de −8 à 4 et y de −6 à 6, avec son quadrillage. Équation : ${M.clairEquation(etat.a, etat.b)}. Le point P en ${M.clairPoint([px, py])}. ` +
    (compare ? "Un second point, en (0 ; 3). " : "") +
    (champAffiche === "un-point" ? `En P, un segment de pente ${M.clairQ(m)}. ` : "") +
    (champAffiche === "ligne" ? `Sur l’horizontale de P, treize segments de pente ${M.clairQ(m)}. ` : "") +
    (champAffiche === "plan" ? "Sur tout le plan, un segment par point entier, incliné selon la pente que l’équation impose à cette hauteur. " : "") +
    (compare && revele && champAffiche !== "plan" && !(champAffiche === "ligne" && py === M.POINT_FIXE[1]) ? `En (0 ; 3), un segment de pente ${M.clairQ(mFixe)}. ` : "") +
    (palierVu ? `Une ligne en tirets à la hauteur ${kClair} : là, les segments sont horizontaux. ` : "") +
    (departs.length > 0 ? "Trois points de départ marqués : (0 ; 5), (0 ; 2) et (0 ; −3). " : "") +
    (courbes.length === 1
      ? `La courbe qui passe par P ${M.valeur(ecart) === 0 ? "reste sur la ligne en tirets" : M.valeur(M.COEF_Q[etat.a]) < 0 ? "se rapproche de la ligne en tirets sans la toucher" : "s’éloigne de la ligne en tirets et sort du cadre"}. `
      : "") +
    (courbes.length === 3 ? `Trois courbes, une par départ : ${M.valeur(M.COEF_Q[etat.a]) < 0 ? "elles se rapprochent toutes de la ligne en tirets" : "elles s’éloignent toutes de la ligne en tirets"}, sans jamais se croiser. ` : "");

  const legende = <span className="[&_.katex]:text-[1em]">{math(M.texEquation(etat.a, etat.b))}</span>;
  const courbesDansLEtape = etape.controles.includes("famille") || etape.etat_revele?.famille !== undefined;

  return (
    <section
      className={cn("my-10 scroll-mt-14 bp-expanded:scroll-mt-20 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-pari={pari.phase}
      data-a={etat.a}
      data-b={etat.b}
      data-point={etat.point}
      data-champ={etat.champ}
      data-famille={etat.famille}
      data-champ-affiche={champAffiche}
      data-palier-vu={palierVu ? "oui" : "non"}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Équation différentielle
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
          <Etiquette refEl={refs.P} nom="nom-P" fond>
            {math(`P${M.texPoint([px, py])}`)}
          </Etiquette>
          <Etiquette refEl={refs.fixe} nom="nom-fixe" fond>
            {compare && math(M.texPoint(M.POINT_FIXE))}
          </Etiquette>
          <Etiquette refEl={refs.palier} nom="nom-palier" fond>
            {palierVu && <span className={palierAccent ? "text-figure-accent" : undefined}>{math(`y = ${M.texQ(k)}`)}</span>}
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
                  // le texte de l'encadré obéit à la formule graduée comme le reste (§7.7 C) : ni
                  // « courbe » avant qu'une courbe existe dans l'étape
                  "Un segment par point entier : l’équation impose pourtant une pente en CHAQUE point du plan, entre les segments aussi. Les segments ont tous la même longueur, quelle que soit leur pente. " +
                    "Cinq positions de P et quelques équations seulement : c’est ce qui permet d’écrire chaque nombre exactement. Le plan montre la règle sur des exemples ; il ne la démontre pas." +
                    (courbesDansLEtape
                      ? " Et aucun dessin ne peut montrer « jamais » : près du bord, une courbe et la ligne en tirets ne sont plus qu’à quelques pixels l’une de l’autre, et plus loin elles se confondraient au pixel. « Jamais » ne se voit pas ; il se calcule."
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
