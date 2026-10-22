"use client";

/**
 * ExpressionGenetiquePilote — la leçon pilote SVT « Du gène à la protéine »
 * au nouveau format (refonte 2026-10), habillée Grille.
 *
 * Même squelette que `LogarithmePilote` : une scène pleine largeur (à
 * gauche), un script court (à droite), avancés étape par étape par l'élève ;
 * un pari avant chaque révélation. Le moteur impératif vit dans
 * `expression-genetique-moteur.js` ; ce composant pose le squelette et le
 * monte / démonte.
 */

import { useEffect, useRef } from "react";
import { useHydrated } from "@/lib/useHydrated";
import { monterPilote } from "./expression-genetique-moteur";

export function ExpressionGenetiquePilote() {
  const racine = useRef<HTMLDivElement>(null);
  // ADR 0032 : servies par le serveur, les commandes restent `disabled` +
  // `aria-busy` jusqu'à ce que React ait la main. Le moteur ne se monte
  // qu'APRÈS ce rendu : c'est lui qui pose ensuite l'état réel des boutons
  // (« Retour » inerte à l'étape 1), et React ne repasse plus dessus.
  const pret = useHydrated();

  useEffect(() => {
    const el = racine.current;
    if (!el || !pret) return;
    const demonter = monterPilote(el);
    return () => demonter?.();
  }, [pret]);

  const attente = pret ? {} : { disabled: true, "aria-busy": true as const };

  return (
    <div ref={racine} className="pilote" data-pilote="expression-genetique" aria-busy={pret ? undefined : true}>
      <div className="pilote-barre">
        <div className="pilote-titre">
          <span className="pilote-matiere">SVT · 2ᵉ Bac</span>
          <strong className="font-display">Du gène à la protéine</strong>
          <span className="pilote-badge">pilote</span>
        </div>
        <nav className="beats" id="beats" aria-label="Parties de la leçon" />
        <div className="pilote-outils">
          <button type="button" className="tbtn" id="voice" aria-pressed="false" {...attente}>
            Voix
          </button>
          <button type="button" className="tbtn" id="why" {...attente}>
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
            aria-label="Animation de la leçon : la scène illustre l’étape décrite à droite"
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
        <h2>Pourquoi ce format</h2>
        <ul>
          <li>
            <b>Une idée par écran.</b> Le chapitre dense devient 36 étapes courtes. On ne lit jamais plus de
            trois phrases d’affilée.
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
            <b>Tes mains sur le code.</b> Tu lis toi-même le tableau du code, tu fais avancer le ribosome, tu
            mutes le gène lettre par lettre : chaque séquence affichée est calculée, aucune n’est recopiée.
          </li>
          <li>
            <b>Une vraie énigme, un vrai gène.</b> La drépanocytose, Pauling, Ingram, Nirenberg — et le gène de
            la chaîne β, tel que les bases de données le publient.
          </li>
          <li>
            <b>Le raisonnement du bac à la fin.</b> L’exercice « maladie héréditaire » qui revient presque chaque
            année, montré comme le ferait un expert.
          </li>
        </ul>
        <p className="small">Leçon pilote : elle sert à valider le format avant de l’étendre aux autres notions.</p>
        <form method="dialog">
          <button type="submit" className="tbtn" {...attente}>
            Fermer
          </button>
        </form>
      </dialog>
    </div>
  );
}
