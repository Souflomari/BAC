"use client";

/**
 * useGlisserVue — glisser sur la scène pour tourner la caméra.
 *
 * Au doigt, le geste VERTICAL appartient au défilement de la page (le canvas
 * porte `touch-action: pan-y`) : seul l'azimut suit le doigt. À la souris, les
 * deux. Les vues prédéfinies (VuesBloc) en sont l'équivalent clavier.
 */
import { useRef } from "react";
import type React from "react";

export function useGlisserVue(
  tourner: (dAzimut: number, dElevation: number) => void,
  surDebut?: () => void
) {
  const glisse = useRef<{ x: number; y: number; souris: boolean } | null>(null);
  return {
    onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
      if (e.button !== 0) return;
      glisse.current = { x: e.clientX, y: e.clientY, souris: e.pointerType === "mouse" };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
      const g = glisse.current;
      if (!g) return;
      const dx = e.clientX - g.x;
      const dy = e.clientY - g.y;
      g.x = e.clientX;
      g.y = e.clientY;
      surDebut?.();
      tourner(-dx * 0.4, g.souris ? dy * 0.3 : 0);
    },
    onPointerUp() {
      glisse.current = null;
    },
    onPointerCancel() {
      glisse.current = null;
    },
  };
}
