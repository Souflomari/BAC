"use client";

/**
 * PiloteCoquille — le squelette commun des leçons pilotes (refonte 2026-10),
 * habillé Grille : la barre (titre, filières, parties, exercices, voix, mode
 * d'emploi), la scène à gauche, le script à droite.
 *
 * Le moteur impératif de chaque leçon (`*-moteur.js`, sur `noyau.js`) se
 * monte dans ce squelette après l'hydratation et rend son démontage.
 *
 * Le quadrillé de la scène ne montre que des carrés entiers (retour du
 * propriétaire, 2026-10-26) : il est posé dans une zone d'un nombre entier
 * de carrés, centrée, recalculée quand la scène change de taille.
 */

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { useHydrated } from "@/lib/useHydrated";

const CARRE = 40;

function Quadrille() {
  const zone = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = zone.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const ajuster = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const nx = Math.max(1, Math.floor((w - 1) / CARRE));
      const ny = Math.max(1, Math.floor((h - 1) / CARRE));
      el.style.width = `${nx * CARRE + 1}px`;
      el.style.height = `${ny * CARRE + 1}px`;
      el.style.left = `${Math.floor((w - nx * CARRE - 1) / 2)}px`;
      el.style.top = `${Math.floor((h - ny * CARRE - 1) / 2)}px`;
    };
    ajuster();
    const obs = new ResizeObserver(ajuster);
    obs.observe(parent);
    return () => obs.disconnect();
  }, []);
  return <div ref={zone} className="quadrille" aria-hidden="true" />;
}

export function PiloteCoquille({
  nom,
  matiere,
  titre,
  filieres,
  exercices,
  monter,
  touches = "← → pour avancer · 1 2 3 pour répondre",
  sceneLabel = "Animation de la leçon : la scène illustre l’étape décrite à droite",
  pourquoi,
  format2 = true,
}: {
  nom: string;
  matiere: string;
  titre: string;
  /** les filières qui étudient cette notion, telles que l'élève les nomme (« SM · PC · SVT ») */
  filieres?: string;
  /** la page d'exercices de la leçon */
  exercices?: string;
  monter: (racine: HTMLElement) => (() => void) | void;
  touches?: string;
  sceneLabel?: string;
  /** Les raisons propres à cette leçon, ajoutées à celles du format. */
  pourquoi?: ReactNode;
  /** Faux tant que la leçon n'est pas passée sur le noyau commun (questions « Vérifie », fiches de mots). */
  format2?: boolean;
}) {
  const racine = useRef<HTMLDivElement>(null);
  // ADR 0032 : servies par le serveur, les commandes restent `disabled` +
  // `aria-busy` jusqu'à ce que React ait la main. Le moteur ne se monte
  // qu'APRÈS ce rendu : c'est lui qui pose ensuite l'état réel des boutons
  // (« Retour » inerte à l'étape 1), et React ne repasse plus dessus.
  const pret = useHydrated();

  useEffect(() => {
    const el = racine.current;
    if (!el || !pret) return;
    const demonter = monter(el);
    return () => demonter?.();
  }, [pret, monter]);

  const attente = pret ? {} : { disabled: true, "aria-busy": true as const };

  return (
    <div ref={racine} className="pilote" data-pilote={nom} aria-busy={pret ? undefined : true}>
      <div className="pilote-barre">
        <div className="pilote-titre">
          <span className="pilote-matiere">{matiere}</span>
          <strong className="font-display">{titre}</strong>
          {filieres && <span className="pilote-filieres">{filieres}</span>}
        </div>
        <nav className="beats" id="beats" aria-label="Parties de la leçon" />
        <div className="pilote-outils">
          {exercices && (
            <Link className="tbtn" href={exercices}>
              Exercices
            </Link>
          )}
          <button type="button" className="tbtn" id="voice" aria-pressed="false" {...attente}>
            Voix
          </button>
          <button type="button" className="tbtn" id="why" {...attente}>
            Mode d’emploi
          </button>
        </div>
      </div>
      <div className="pilote-main">
        <section className="stage-wrap" aria-label="Scène animée">
          <Quadrille />
          <div className="plaque" id="plaque" />
          <svg
            data-pilote-scene=""
            viewBox="0 0 1000 720"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={sceneLabel}
          />
          <div className="stage-foot">
            <span id="count" />
            <span className="keys">{touches}</span>
          </div>
        </section>
        <aside className="script" id="script">
          <div className="kicker" id="kicker" />
          <div className="body" id="body" aria-live="polite" />
          <div className="nav">
            <button type="button" id="prev" className="ghost" {...attente}>
              ← Retour
            </button>
            <button type="button" id="next" className="primary" {...attente}>
              Suivant →
            </button>
          </div>
        </aside>
      </div>
      <dialog id="whyd">
        <h2>Mode d’emploi</h2>
        <ul>
          <li>
            <b>Une idée par écran.</b> Le chapitre est découpé en étapes courtes, de deux à quatre phrases chacune.
          </li>
          <li>
            <b>La scène et le script.</b> Le visuel occupe la largeur de l’écran ; le texte le commente à côté,
            au rythme de l’animation.
          </li>
          <li>
            <b>À ton rythme.</b> Rien ne bouge sans toi : chaque étape, et chaque ligne d’un calcul, se
            déclenche avec → ou espace.
          </li>
          <li>
            <b>Un pari avant chaque révélation.</b> Tu t’engages avant de voir : c’est ce qui fait retenir.
          </li>
          {format2 && (
            <>
              <li>
                <b>« Vérifie » à la fin de chaque partie.</b> Une question pour t’assurer que tu as compris
                avant d’aller plus loin. Une erreur ? Un indice, et tu as un second essai.
              </li>
              <li>
                <b>Chaque mot technique s’explique.</b> Un mot souligné en pointillés ouvre sa fiche, sans
                quitter l’étape.
              </li>
            </>
          )}
          {pourquoi}
        </ul>
        <form method="dialog">
          <button type="submit" className="tbtn" {...attente}>
            Fermer
          </button>
        </form>
      </dialog>
    </div>
  );
}
