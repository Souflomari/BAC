import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// ── Fonts ─────────────────────────────────────────────────────────────────────
// DESIGN-BIBLE §3: IBM Plex Sans — screen-optimized sans with unambiguous
// figures (critical for a maths product). Two weights: regular + semibold.
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
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
