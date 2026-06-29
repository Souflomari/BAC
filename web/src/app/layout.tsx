import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
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

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "BAC — préparation · sciences",
    template: "%s · BAC",
  },
  description:
    "Un tuteur patient, omniscient, infiniment disponible — préparation bac sciences au Maroc.",
  robots: { index: false, follow: false }, // private during build
};

// ── Root layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      // Default to light; ThemeToggle will add/remove the "dark" class.
      // Starting without the class avoids a flash-of-dark on first paint.
      suppressHydrationWarning
      className={`${readingSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
