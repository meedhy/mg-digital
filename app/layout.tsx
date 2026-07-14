import type { Metadata } from "next";
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
  title: "Création de sites internet à Kinshasa | MG Digital",
  description:
    "MG Digital conçoit des sites professionnels pour les entrepreneurs et PME de Kinshasa : vitrine, e-commerce et solutions sur mesure.",
  keywords: [
    "création de site internet à Kinshasa",
    "agence web à Kinshasa",
    "création de site en RDC",
    "site internet pour PME",
    "site vitrine",
    "développement web sur mesure",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Création de sites internet à Kinshasa | MG Digital",
    description:
      "Sites vitrines, e-commerce et plateformes sur mesure conçus autour de vos objectifs.",
    url: "/",
    siteName: "MG Digital",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Création de sites internet à Kinshasa | MG Digital",
    description:
      "MG Digital transforme votre présence en ligne en opportunités business.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
