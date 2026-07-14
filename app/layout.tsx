import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mgdigital-conseil.com"),
  title: "Création de sites internet sur mesure | MG Digital",
  description:
    "MG Digital conçoit des sites professionnels pour les entrepreneurs, indépendants et PME : vitrine, e-commerce et solutions sur mesure.",
  keywords: [
    "création de site internet",
    "conception UX UI",
    "développement web sur mesure",
    "site internet pour PME",
    "site vitrine",
    "refonte de site internet",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Création de sites internet sur mesure | MG Digital",
    description:
      "Sites vitrines, e-commerce et plateformes sur mesure conçus autour de vos objectifs.",
    url: "/",
    siteName: "MG Digital",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Création de sites internet sur mesure | MG Digital",
    description:
      "MG Digital transforme votre présence en ligne en opportunités business.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MG Digital",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050507",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
