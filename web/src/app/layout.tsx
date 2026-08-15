import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth/provider";
import "./globals.css";

// ── Fonts (editorial pairing — ADR 0023) ──────────────────────────────────────
// Reading SERIF for lesson prose + headings (warmth, scholarship — a fine
// textbook); IBM Plex SANS for UI chrome, labels, controls, and figure/math
// labels (unambiguous 1/l/I/0 for a maths product). Math stays live KaTeX.
//
// Source Serif 4: a screen-optimized transitional text serif with full French
// diacritic + guillemet coverage and a true weight range; warm-but-crisp, holds
// at 17px body. Italic for <em> in prose. Preloaded — prose is above the fold.
const readingSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-reading-serif",
  display: "swap",
  preload: true,
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  preload: false,
});

// ── Metadata (head pack: July-2026 external-audit F5) ─────────────────────────
// Icons come from the app-router convention files (src/app/icon.svg +
// apple-icon.png). metadataBase = the deployed preview domain — swap when a
// production domain is decided (owner call). robots stays noindex: private
// during build; the og/canonical set is in place for when indexing opens.
const SITE_URL = "https://bac-pink.vercel.app";
const SITE_DESCRIPTION =
  "Un tuteur patient, omniscient, infiniment disponible — préparation bac sciences au Maroc.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BAC — préparation · sciences",
    template: "%s · BAC",
  },
  description: SITE_DESCRIPTION,
  robots: { index: false, follow: false }, // private during build
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "BAC · sciences",
    title: "BAC — préparation · sciences",
    description: SITE_DESCRIPTION,
    locale: "fr_MA",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BAC · sciences — deux heures calmes, une notion à fond." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BAC — préparation · sciences",
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
};

// Site-level JSON-LD (per-notion LearningResource lives on the notion page).
const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BAC · sciences",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "fr",
};

// No-flash theme boot (bible §2 + July-2026 audit F4): parser-blocking, first
// child of <body>, so the .dark class is set before any content paints.
// Explicit stored choice wins; otherwise the OS preference. Kept as a plain
// string — it must run before React exists.
// Thème ET taille de texte, avant la première peinture. La taille rejoint
// le thème ici (audit 2026-08-15) : appliquée après hydratation, elle
// faisait sauter toute la page d'un cran une fois le JS chargé — sur le
// réglage même dont dépendent les élèves qui voient mal.
const THEME_BOOT = `(function(){try{var t=localStorage.getItem("bac-theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");var s=localStorage.getItem("bac-textsize");var m={small:"0.9375",base:"1",large:"1.125"};if(s&&m[s])document.documentElement.style.setProperty("--font-scale",m[s]);}catch(e){}})();`;

// ── Root layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      // The "dark" class is set pre-paint by THEME_BOOT (first child of
      // <body>) and toggled by ThemeToggle; the server always renders
      // without it, so suppressHydrationWarning covers the class mismatch.
      suppressHydrationWarning
      className={`${readingSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }}
        />
        {/*
          AuthProvider (web/src/lib/auth/provider.tsx) — the ONLY auth wiring
          at the root. A minimal client boundary: it holds mode + user state.
          In "off"/"mock" it never imports @supabase/* or touches the
          network; in "live" it reaches Supabase ONLY via a dynamic import()
          inside the provider's own live-only code paths — see AUTH-SPEC §5 /
          ledger 14.14. This server component (RootLayout) can render a
          client provider directly; the boundary starts exactly there.
        */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
