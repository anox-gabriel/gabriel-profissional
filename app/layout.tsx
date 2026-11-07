import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://gabrielsoares-design.vercel.app"),
  title: "Gabriel Soares · Designer & Web Designer",
  description:
    "Portfólio de Gabriel Soares: sites, landing pages, social media e criativos com domínio de IA generativa. Designer & Web Designer em Goiânia.",
  openGraph: {
    title: "Gabriel Soares · Designer & Web Designer",
    description: "Sites, landing pages e criativos com domínio de IA generativa.",
    images: ["/og.png"],
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#0A0A0A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${montserrat.variable}`}>
      <body className="grain min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
