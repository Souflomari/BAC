"use client";

/**
 * useSceneRendu — le cycle de vie d'un rendu three.js dans un panneau.
 *
 *   ferme → chargement → prete
 *                      ↘ sans-webgl  (la 3D manque ; les calculs restent)
 *                      ↘ erreur      (module non chargé, contexte perdu ;
 *                                     `relancer` recommence)
 *
 * Le module de rendu n'est importé qu'au passage en « chargement » (le clic de
 * l'élève) : three.js ne pèse rien sur une leçon qui n'ouvre pas la scène.
 * Redimensionnement, changement de thème (classe `.dark` sur <html>) et perte
 * de contexte WebGL sont suivis ici ; le panneau n'a qu'à fournir `dessiner`.
 * Au démontage, le rendu est détruit et son contexte rendu au navigateur.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { EtatPanneau, FabriqueRendu, RenduScene } from "./commun";

export function useSceneRendu<R extends RenduScene>(
  charger: () => Promise<FabriqueRendu<R>>,
  dessiner: () => void,
  options: { surPerte?: () => void } = {}
) {
  const [panneau, setPanneau] = useState<EtatPanneau>("ferme");
  const [tentative, setTentative] = useState(0);
  const hoteRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renduRef = useRef<R | null>(null);

  // Les rappels les plus récents, lus par les observateurs sans les recréer.
  const dessinerRef = useRef(dessiner);
  dessinerRef.current = dessiner;
  const chargerRef = useRef(charger);
  chargerRef.current = charger;
  const surPerteRef = useRef(options.surPerte);
  surPerteRef.current = options.surPerte;

  // ── Chargement, au clic seulement ──
  useEffect(() => {
    if (panneau !== "chargement") return;
    let annule = false;
    chargerRef
      .current()
      .then((fabriquer) => {
        if (annule) return;
        const canvas = canvasRef.current;
        const hote = hoteRef.current;
        if (!canvas || !hote) return;
        try {
          renduRef.current = fabriquer(canvas, hote);
        } catch {
          setPanneau("sans-webgl");
          return;
        }
        const r = hote.getBoundingClientRect();
        renduRef.current.redimensionner(r.width, r.height);
        setPanneau("prete");
      })
      .catch(() => {
        if (!annule) setPanneau("erreur");
      });
    return () => {
      annule = true;
    };
  }, [panneau, tentative]);

  // La scène vient d'exister : premier dessin.
  useEffect(() => {
    if (panneau === "prete") dessinerRef.current();
  }, [panneau]);

  // ── Redimensionnement, thème, contexte perdu ──
  useEffect(() => {
    if (panneau !== "prete") return;
    const hote = hoteRef.current;
    const canvas = canvasRef.current;
    const rendu = renduRef.current;
    if (!hote || !canvas || !rendu) return;
    const ro = new ResizeObserver(([entree]) => {
      const { width, height } = entree.contentRect;
      rendu.redimensionner(width, height);
      dessinerRef.current();
    });
    ro.observe(hote);
    const mo = new MutationObserver(() => {
      rendu.relireCouleurs();
      dessinerRef.current();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    const perdu = (ev: Event) => {
      ev.preventDefault();
      surPerteRef.current?.();
      setPanneau("erreur");
    };
    canvas.addEventListener("webglcontextlost", perdu);
    return () => {
      ro.disconnect();
      mo.disconnect();
      canvas.removeEventListener("webglcontextlost", perdu);
    };
  }, [panneau]);

  // ── Démontage : le contexte est rendu au navigateur ──
  useEffect(
    () => () => {
      renduRef.current?.detruire();
      renduRef.current = null;
    },
    []
  );

  const ouvrir = useCallback(() => setPanneau("chargement"), []);
  const relancer = useCallback(() => {
    renduRef.current?.detruire();
    renduRef.current = null;
    setTentative((n) => n + 1);
    setPanneau("chargement");
  }, []);

  return { panneau, ouvrir, relancer, hoteRef, canvasRef, renduRef };
}
