/**
 * explications.ts — l'index des explications animées réellement en ligne.
 *
 * Le site ne lit JAMAIS `animations/manifest.yaml` : le manifeste dit
 * quelles scènes sont *écrites et validées*, ce qui n'implique pas
 * qu'elles soient rendues et téléversées. La seule source de vérité côté
 * produit est `animations/published.json`, écrit par
 * `scripts/publish-explications.py` APRÈS un téléversement réussi.
 *
 * Conséquence voulue — état honnête (DESIGN-BIBLE) : une scène validée
 * mais non publiée n'a pas de lecteur sur la fiche. Pas de lecteur vide,
 * pas de « bientôt disponible », pas de 404 déguisée en player. Rien.
 *
 * Lecture publique : le bucket `explications` est public (migration 051),
 * donc l'URL suffit — aucune clé Supabase, aucun client, aucun appel
 * authentifié. `NEXT_PUBLIC_SUPABASE_URL` est la seule variable requise,
 * et elle est déjà présente pour l'auth.
 */

import fs from "node:fs";
import path from "node:path";

/** Une étape : un clip, son libellé humain et son transcript. */
export interface ExplicationStep {
  n: number;
  /** Le slug d'auteur (`04-q2-equation-sphere`) — identifiant stable. */
  slug: string;
  /** Libellé lisible — la première phrase de narration de l'étape. */
  label: string;
  /** Narration de l'étape : le transcript (repli reduced-motion, a11y). */
  captions: string[];
  /** Chemin dans le bucket — jamais une URL absolue (le bucket peut bouger). */
  path: string;
  /** Affiche propre à CETTE étape (une affiche globale montrerait la
   *  mauvaise image). Null si l'extraction a échoué. */
  poster: string | null;
  durationS: number | null;
}

export interface Explication {
  notion: string;
  entry: string;
  quality: string;
  poster: string | null;
  full: { path: string; durationS: number | null };
  steps: ExplicationStep[];
}

/**
 * Où vivent les fichiers.
 *
 *   "public"   — `web/public/explications/…`, servis par Vercel comme
 *                actifs statiques. Mode du PILOTE : aucune infrastructure,
 *                aucune clé, visible dès le déploiement de la branche. Ne
 *                passe pas à l'échelle (≈1 Go pour les 54 scènes) — c'est
 *                exactement pourquoi l'ADR 0029 a choisi Supabase pour le
 *                fan-out.
 *   "supabase" — bucket public `explications` (migration 051). Mode du
 *                fan-out, dès que la porte humaine est franchie.
 *
 * Le champ vit dans l'index : basculer de l'un à l'autre ne touche pas
 * une ligne de composant.
 */
type Stockage = "public" | "supabase";

interface IndexFichier {
  storage?: Stockage;
  bucket?: string;
  quality?: string;
  entries?: Record<string, Explication>;
}

/**
 * Lu une fois au build (composant serveur). `published.json` est versionné,
 * donc présent dans le bundle de déploiement ; son absence ou sa
 * corruption ne doit jamais faire tomber une page — même discipline
 * fail-safe que les chargeurs de `content.ts`.
 */
let cache: {
  storage: Stockage;
  bucket: string;
  entries: Record<string, Explication>;
} | null = null;

function chargeIndex() {
  if (cache) return cache;
  let parsed: IndexFichier = {};
  try {
    // process.cwd() est `web/` en dev comme au build Vercel (rootDirectory).
    const p = path.join(process.cwd(), "..", "animations", "published.json");
    parsed = JSON.parse(fs.readFileSync(p, "utf-8")) as IndexFichier;
  } catch {
    // Index absent/illisible → aucune explication. Silencieux par dessein :
    // c'est l'état normal tant que rien n'est publié.
  }
  cache = {
    storage: parsed.storage === "supabase" ? "supabase" : "public",
    bucket: parsed.bucket ?? "explications",
    entries: parsed.entries ?? {},
  };
  return cache;
}

/**
 * L'explication publiée pour une entrée de banque, ou null.
 *
 * @param notion  slug complet, ex. "maths/geometrie-espace"
 * @param entryId id d'entrée de banque, ex. "bk-2024-n-x2"
 */
export function getExplication(notion: string, entryId: string): Explication | null {
  return chargeIndex().entries[`${notion}::${entryId}`] ?? null;
}

/**
 * URL publique d'un fichier d'explication, selon le mode de stockage.
 *
 * En mode "supabase", retourne null si `NEXT_PUBLIC_SUPABASE_URL` manque :
 * sans base, on ne fabrique pas une URL bancale qui donnerait un lecteur
 * cassé — on préfère ne rien rendre (même règle d'état honnête).
 */
export function explicationUrl(objectPath: string): string | null {
  const idx = chargeIndex();
  if (idx.storage === "public") return `/explications/${objectPath}`;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/storage/v1/object/public/${idx.bucket}/${objectPath}`;
}

/**
 * L'explication résolue en URLs absolues, prête pour le composant client.
 * Null dès qu'un maillon manque (pas d'entrée, pas de base d'URL).
 */
export interface ExplicationResolue {
  entry: string;
  quality: string;
  posterUrl: string | null;
  fullUrl: string;
  fullDurationS: number | null;
  steps: Array<{
    n: number;
    slug: string;
    label: string;
    captions: string[];
    url: string;
    posterUrl: string | null;
    durationS: number | null;
  }>;
}

export function resolveExplication(notion: string, entryId: string): ExplicationResolue | null {
  const x = getExplication(notion, entryId);
  if (!x) return null;
  const fullUrl = explicationUrl(x.full.path);
  if (!fullUrl) return null;

  const steps = [];
  for (const s of x.steps) {
    const url = explicationUrl(s.path);
    if (!url) return null; // index incohérent → on ne rend rien
    steps.push({
      n: s.n,
      slug: s.slug,
      label: s.label,
      captions: s.captions ?? [],
      url,
      posterUrl: s.poster ? explicationUrl(s.poster) : null,
      durationS: s.durationS,
    });
  }
  if (steps.length === 0) return null;

  return {
    entry: x.entry,
    quality: x.quality,
    posterUrl: x.poster ? explicationUrl(x.poster) : null,
    fullUrl,
    fullDurationS: x.full.durationS,
    steps,
  };
}
