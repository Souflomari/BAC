import { execSync } from "node:child_process";

// ── Build stamp (Day-8.5 — deployment truth, the permanent fix) ──────────────
// Twice in one week the owner could not tell WHICH version he was looking at
// (Day-4.5, mooted when the symptom self-resolved; Day-8, during his review
// window). The stamp answers that question forever: the footer colophon
// renders the short commit SHA + build date, injected here at BUILD time.
// On Vercel, VERCEL_GIT_COMMIT_SHA is provided; locally we ask git. If both
// fail (tarball build), the stamp says "inconnu" rather than lying.
function buildSha() {
  const vercel = process.env.VERCEL_GIT_COMMIT_SHA;
  if (vercel) return vercel.slice(0, 7);
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "inconnu";
  }
}

// ── En-têtes de sécurité (§11.138) ──────────────────────────────────────────
// Mesuré le 2026-09-20 sur l'artefact déployé : sur cinq en-têtes attendus,
// ZÉRO était servi. Vercel pose `strict-transport-security` de lui-même ; tout
// le reste manquait, parce que rien n'était configuré ici.
//
// Les quatre ci-dessous sont le sous-ensemble SANS ARBITRAGE : ils ne changent
// rien à ce que la page rend, et chacun ferme une classe d'attaque connue.
//   • nosniff — le navigateur cesse de deviner un type MIME et d'exécuter comme
//     script ce qui est servi comme texte.
//   • SAMEORIGIN — la page ne peut plus être encadrée par un tiers, donc plus
//     être recouverte d'un faux bouton (clickjacking). Le site CADRE des
//     iframes (PhET) ; il n'a jamais besoin d'être cadré, lui.
//   • Referrer-Policy — l'adresse complète d'une leçon ne part plus vers un
//     tiers ; l'origine seule suffit. C'est déjà le défaut de Chrome, pas de
//     Safari ni des vieux Android.
//   • Permissions-Policy — caméra, micro et position ne servent nulle part
//     dans le produit, ni dans les simulations embarquées. On les refuse à
//     tout le monde, y compris aux iframes tierces.
//
// CE QUI N'EST PAS POSÉ ICI, et c'est délibéré : `Content-Security-Policy`.
// Une CSP juste demande de connaître chaque origine de script, de style et de
// cadre du produit (Next inline, KaTeX, PhET, Supabase) ; posée à l'aveugle
// elle casse la page en silence chez l'élève, et aucun contrôle local ne le
// verrait puisqu'il n'y a pas de CSP à vérifier. C'est un arbitrage de
// propriétaire, chiffré dans `DECISIONS-EN-ATTENTE` §11.
const EN_TETES_SECURITE = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: EN_TETES_SECURITE }];
  },
  env: {
    NEXT_PUBLIC_BUILD_SHA: buildSha(),
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
  // ESM-only packages in the unified markdown/math pipeline need transpilation
  // so Next.js's webpack/SWC can bundle them without "require of ES module" errors.
  transpilePackages: [
    "react-markdown",
    "remark-math",
    "rehype-katex",
    "remark",
    "rehype",
    "unified",
    "bail",
    "is-plain-obj",
    "trough",
    "vfile",
    "vfile-message",
    "unist-util-stringify-position",
    "unist-util-visit",
    "unist-util-visit-parents",
    "unist-util-is",
    "hast-util-to-jsx-runtime",
    "hast-util-whitespace",
    "property-information",
    "space-separated-tokens",
    "comma-separated-tokens",
    "remark-parse",
    "remark-rehype",
    "mdast-util-to-hast",
    "mdast-util-from-markdown",
    "mdast-util-to-markdown",
    "micromark",
    "micromark-core-commonmark",
    "micromark-factory-destination",
    "micromark-factory-label",
    "micromark-factory-space",
    "micromark-factory-title",
    "micromark-factory-whitespace",
    "micromark-util-character",
    "micromark-util-chunked",
    "micromark-util-classify-character",
    "micromark-util-combine-extensions",
    "micromark-util-decode-numeric-character-reference",
    "micromark-util-decode-string",
    "micromark-util-encode",
    "micromark-util-html-tag-name",
    "micromark-util-normalize-identifier",
    "micromark-util-resolve-all",
    "micromark-util-sanitize-uri",
    "micromark-util-subtokenize",
    "micromark-util-symbol",
    "micromark-util-types",
    "micromark-extension-math",
    "mdast-util-math",
    "rehype-raw",
    "hast-util-raw",
    "hast-util-from-parse5",
    "hast-util-to-parse5",
    "parse5",
    "zwitch",
    "extend",
    "hastscript",
    "ccount",
    "decode-named-character-reference",
    "character-entities",
  ],
};

export default nextConfig;
