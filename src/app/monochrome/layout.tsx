import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-mm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "示范页 · Minimalist Monochrome",
  description: "App 观察站 — Minimalist Monochrome 设计系统示范",
};

export default function MonochromeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} ${sourceSerif.variable} ${jetbrains.variable}`}>
      {children}
    </div>
  );
}
