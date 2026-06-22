import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
  weight: ["700", "900"],
  style: ["normal"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-body",
  display: "swap",
  weight: ["400", "600"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "拆解 · 数字经济视角的 App 评测社区",
  description:
    "从用户价值与数据可靠性出发，拆解每一款热门应用。多人协作的社区型 App 评测平台。",
  keywords: ["拆解", "App评测", "数字经济", "隐私评估", "应用榜单", "社区评测"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${playfair.variable} ${sourceSerif.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
