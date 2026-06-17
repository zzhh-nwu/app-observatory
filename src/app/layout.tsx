import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App 观察站 · 数字经济视角的App评测社区",
  description:
    "从用户价值与数据可靠性出发，评测和追踪热门App。多人协作的社区型App评测平台，聚焦AI工具、隐私透明度和商业模式分析。",
  keywords: ["App评测", "AI工具", "数字经济", "隐私评估", "应用榜单", "社区评测"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
