"use client";

/**
 * LogarithmePilote — la leçon pilote au nouveau format (refonte 2026-10),
 * habillée Grille.
 *
 * Le format : une scène pleine largeur (à gauche) et un script court (à
 * droite), avancés étape par étape par l'élève ; un pari avant chaque
 * révélation ; l'histoire comme moteur. Le moteur impératif vit dans
 * `logarithme-moteur.js` (porté du prototype) ; ce composant ne fait que
 * poser le squelette et le monter / démonter.
 */

import { useEffect, useRef } from "react";
import { monterPilote } from "./logarithme-moteur";

export function LogarithmePilote() {
  const racine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = racine.current;
    if (!el) return;
    const demonter = monterPilote(el);
    return () => demonter?.();
  }, []);

  return (
    <div ref={racine} className="pilote" data-pilote="logarithme">
      <div className="pilote-barre">
        <div className="pilote-titre">
          <span className="pilote-matiere">Maths · 2ᵉ Bac</span>
          <strong className="font-display">Fonction logarithme népérien</strong>
          <span className="pilote-badge">pilote</span>
        </div>
        <nav className="beats" id="beats" aria-label="Parties de la leçon" />
        <div className="pilote-outils">
          <button type="button" className="tbtn" id="voice" aria-pressed="false">
            Voix
          </button>
          <button type="button" className="tbtn" id="why">
            Pourquoi ce format&#8239;?
          </button>
        </div>
      </div>
      <div className="pilote-main">
        <section className="stage-wrap" aria-label="Scène animée">
          <div className="plaque" id="plaque" />
          <svg
            data-pilote-scene=""
            viewBox="0 0 1000 720"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Animation de la leçon"
          />
          <div className="stage-foot">
            <span id="count" />
            <span className="keys">← → pour avancer · 1 2 3 pour répondre</span>
          </div>
        </section>
        <aside className="script" id="script">
          <div className="kicker" id="kicker" />
          <div className="body" id="body" aria-live="polite" />
          <div className="nav">
            <button type="button" id="prev" className="ghost">
              ← Retour
            </button>
            <button type="button" id="next" className="primary">
              Suivant →
            </button>
          </div>
        </aside>
      </div>
      <dialog id="whyd">
        <h2>Pourquoi ce format</h2>
        <ul>
          <li>
            <b>Une idée par écran.</b> La page de cours dense devient 34 étapes courtes. On ne lit jamais plus
            de trois phrases d’affilée.
          </li>
          <li>
            <b>La scène et le script.</b> Le visuel occupe la largeur de l’écran ; le texte le commente à côté.
          </li>
          <li>
            <b>À ton rythme.</b> Chaque animation est découpée en étapes que tu déclenches (→ ou espace).
          </li>
          <li>
            <b>Un pari avant chaque révélation.</b> Tu t’engages avant de voir : c’est ce qui fait retenir.
          </li>
          <li>
            <b>L’histoire comme moteur.</b> Chaque idée arrive parce que quelqu’un en a eu besoin — Napier,
            Gunter, Oughtred, Saint-Vincent.
          </li>
          <li>
            <b>Le pourquoi d’abord, la définition du bac ensuite.</b> Quand elle arrive, elle paraît évidente.
          </li>
        </ul>
        <p className="small">Leçon pilote : elle sert à valider le format avant de l’étendre aux autres notions.</p>
        <form method="dialog">
          <button type="submit" className="tbtn">
            Fermer
          </button>
        </form>
      </dialog>
    </div>
  );
}
