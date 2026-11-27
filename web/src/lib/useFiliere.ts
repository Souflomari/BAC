/**
 * useFiliere — the student's chosen stream, as a persisted DEVICE PREFERENCE.
 *
 * Filière is a real choice the user makes (SM-A / SM-B / PC / SVT), not
 * fabricated state — so persisting it locally is honest (ADR 0025 §2.11:
 * chrome/device preferences may persist; the honest-state rule governs
 * LEARNING state — progress, mastery — which still does not exist and is not
 * invented). Stored in localStorage under `bac-filiere`; no server, no account.
 *
 * The dashboard defaults to "all sciences" when no filière is set — it never
 * blocks behind a chooser — so the preference NARROWS the view, it doesn't gate
 * it. `mounted` lets callers avoid a hydration flash: render the neutral
 * server state until the client has read storage.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import type { FiliereId } from "./curriculum";

export const FILIERE_KEY = "bac-filiere";

const VALID: FiliereId[] = ["sm-a", "sm-b", "pc", "svt"];

function read(): FiliereId | null {
  try {
    const v = localStorage.getItem(FILIERE_KEY);
    return v && (VALID as string[]).includes(v) ? (v as FiliereId) : null;
  } catch {
    return null;
  }
}

export function useFiliere() {
  const [filiere, setFiliereState] = useState<FiliereId | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFiliereState(read());
    setMounted(true);
  }, []);

  const setFiliere = useCallback((id: FiliereId | null) => {
    try {
      if (id) localStorage.setItem(FILIERE_KEY, id);
      else localStorage.removeItem(FILIERE_KEY);
    } catch {
      /* storage unavailable — session-only, no persistence */
    }
    setFiliereState(id);
  }, []);

  return { filiere, setFiliere, mounted };
}
