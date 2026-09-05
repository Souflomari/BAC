"use client";

/**
 * Apparition — l'entrée en scène d'un bloc, avec la physique M3 Expressive.
 *
 * Retour owner : « on n'a aucune animation ; il faut du niveau Google, du
 * M3 ». Le système M3 Expressive ne décrit pas les entrées avec des durées
 * et des courbes de Bézier mais avec des RESSORTS. On applique donc le même
 * intégrateur que `useRessort` à une progression 0 → 1, et on en dérive
 * l'opacité et le déplacement.
 *
 * RESSORT STANDARD, PAS EXPRESSIF — correction. Première rédaction : on
 * prenait `expressiveDefault` (amortissement 0,8) pour son DÉPASSEMENT, le
 * bloc allant deux pixels trop loin avant de se poser. C'est précisément ce
 * que la DESIGN-BIBLE §5 interdit (« pas d'overshoot/bounce »), et la bible
 * a raison ici pour une raison qui dépasse le style : le même ressort sert à
 * animer des NOMBRES et des PENTES, et un dépassement y affiche brièvement
 * une valeur fausse. Un ressort à 0,9 dépasse de 0,15 % — invisible à deux
 * décimales, donc honnête. On garde la physique, on abandonne le rebond.
 *
 * Trois garde-fous, les mêmes que partout ailleurs :
 *   · `prefers-reduced-motion` → on saute à l'état final, le contenu est
 *     identique, seul le trajet disparaît ;
 *   · la boucle rAF s'arrête dès que le ressort est au repos ;
 *   · un changement de `cle` REJOUE l'entrée — c'est ainsi qu'un nouvel
 *     écran se distingue du précédent au lieu de le remplacer d'un coup.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { pasRessort, ressortAuRepos, SPATIAL, type Ressort } from "@/lib/m3-motion";

function reduit() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Progression 0 → 1 (avec dépassement) relancée à chaque changement de `cle`.
 * `delai` en millisecondes permet d'échelonner plusieurs blocs.
 */
export function useApparition(
  cle: string | number,
  { delai = 0, ressort = SPATIAL.standardDefault }: { delai?: number; ressort?: Ressort } = {}
) {
  const [p, setP] = useState(0);
  const raf = useRef<number | null>(null);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduit()) {
      setP(1);
      return;
    }
    setP(0);
    let position = 0;
    let vitesse = 0;
    let precedent = 0;

    const boucle = (t: number) => {
      if (precedent === 0) precedent = t;
      const dt = (t - precedent) / 1000;
      precedent = t;
      const r = pasRessort(position, vitesse, 1, ressort, dt);
      position = r.position;
      vitesse = r.vitesse;
      setP(position);
      if (ressortAuRepos(position, vitesse, 1)) {
        setP(1);
        raf.current = null;
        return;
      }
      raf.current = requestAnimationFrame(boucle);
    };

    minuteur.current = setTimeout(() => {
      raf.current = requestAnimationFrame(boucle);
    }, delai);

    return () => {
      if (minuteur.current != null) clearTimeout(minuteur.current);
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [cle, delai, ressort]);

  return p;
}

/**
 * Le bloc qui entre. `decalage` est la distance parcourue, en pixels : on
 * reste petit (10-20 px) parce qu'au-delà le mouvement se remarque plus que
 * le contenu — et c'est le contenu qu'on veut voir.
 */
export function Apparition({
  cle,
  delai = 0,
  decalage = 14,
  echelle = 0,
  ressort,
  className,
  children,
}: {
  cle: string | number;
  delai?: number;
  decalage?: number;
  /** Grandissement de départ, en fraction (0,04 = part à 96 %). */
  echelle?: number;
  ressort?: Ressort;
  className?: string;
  children: ReactNode;
}) {
  const p = useApparition(cle, { delai, ressort });
  // L'opacité arrive avant la position : le bloc est lisible pendant qu'il
  // finit de se poser, au lieu d'être encore fantomatique une fois arrêté.
  const opacite = Math.min(1, Math.max(0, p * 1.8));
  const y = (1 - p) * decalage;
  const s = 1 - (1 - p) * echelle;

  return (
    <div
      className={className}
      style={{
        opacity: opacite,
        transform: `translate3d(0, ${y.toFixed(2)}px, 0) scale(${s.toFixed(4)})`,
        willChange: p === 1 ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
