"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/components/splash/splash-screen";
import Link from "next/link";
import { Search, TrendingUp, Shield, Sparkles, ArrowRight, Telescope, Star } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { ReviewCard } from "@/components/ui/review-card";
import { SectionTitle } from "@/components/ui/section-title";
import { mockReviews, mockRankings } from "@/lib/mock-data";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const featuredApps = mockRankings[0].apps.slice(0, 3);
  const latestReviews = mockReviews;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <SplashScreen />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b-2 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-12 py-24 md:py-32 lg:py-40">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-24 h-1.5 bg-black" />
              <div className="w-3 h-3 border-2 border-black" />
            </div>

            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tighter"
              style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
            >
              拆解
            </h1>

            <p
              className="mt-8 text-lg md:text-xl text-[#525252] max-w-md leading-relaxed"
              style={{ fontFamily: "var(--font-serif-body), Georgia, serif" }}
            >
              从「用户价值」与「数据可靠性」出发，
              拆解每一款热门应用。社区共建的 App 评测平台。
            </p>

            <div className="mt-10 flex items-center gap-6">
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 bg-black text-white border-2 border-black px-8 py-4 text-sm font-medium
                           tracking-widest uppercase transition-colors duration-100 hover:bg-white hover:text-black"
              >
                探索 App 库
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
              <Link
                href="/submit"
                className="text-sm font-medium tracking-widest uppercase text-black hover:underline underline-offset-4"
              >
                开始写评测 →
              </Link>
            </div>

            <div className="mt-14 max-w-md">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search size={18} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索 App 名称…"
                    className="w-full h-12 pl-10 pr-4 border-0 border-b-2 border-black bg-transparent
                               text-sm placeholder:text-[#A3A3A3] placeholder:italic
                               focus:border-b-4 focus:outline-none transition-all duration-100"
                  />
                </div>
              </form>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Link
                  href="/apps?tag=AI工具"
                  className="text-xs border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors duration-100"
                >
                  AI 工具
                </Link>
                <Link
                  href="/apps?sort=privacy"
                  className="text-xs border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors duration-100"
                >
                  隐私最佳
                </Link>
                <Link
                  href="/apps?sort=rating"
                  className="text-xs border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors duration-100"
                >
                  最高评分
                </Link>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-4">
              <MetaLabel icon={<Telescope size={14} strokeWidth={1.5} />} text="社区评测平台" />
              <div className="w-px h-3 bg-[#D4D4D4]" />
              <MetaLabel icon={<Star size={14} strokeWidth={1.5} />} text="2026" />
              <div className="w-px h-3 bg-[#D4D4D4]" />
              <MetaLabel icon={<Shield size={14} strokeWidth={1.5} />} text="开源数据" />
            </div>
          </div>
        </section>

        <div className="h-2 bg-black w-full" />

        {/* Featured Ranking */}
        <section className="mx-auto max-w-6xl px-6 lg:px-12 py-20 md:py-28">
          <SectionTitle title="热门评测" description="过去7天最受关注的App" moreLink="/apps?sort=trending" moreLabel="完整榜单" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredApps.map((app, i) => (
              <AppCard key={app.id} app={app} variant={i === 0 ? "featured" : "default"} />
            ))}
          </div>
        </section>

        <div className="h-2 bg-black w-full" />

        {/* Stats — black bg */}
        <section className="relative py-20 md:py-28 px-6 lg:px-12 bg-black text-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {[
                { value: "328", label: "已收录 App" },
                { value: "742", label: "社区评测" },
                { value: "2,860", label: "社区成员" },
                { value: "96.5%", label: "好评率" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-5xl md:text-6xl font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="mt-3 text-xs tracking-widest uppercase text-white/40 font-medium"
                    style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-2 bg-black w-full" />

        {/* Latest Reviews */}
        <section className="mx-auto max-w-6xl px-6 lg:px-12 py-20 md:py-28">
          <SectionTitle title="最新评测" description="社区成员的最新深度评测" moreLink="/apps" moreLabel="浏览全部" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        <div className="h-2 bg-black w-full" />

        {/* Feature Highlights */}
        <section className="mx-auto max-w-6xl px-6 lg:px-12 py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: TrendingUp, title: "多维度评分", desc: "好用度、隐私透明、商业模式、技术创新——四个维度全面评估每款App" },
              { icon: Shield, title: "隐私可信度", desc: "社区共同维护的数据可靠性评级，让隐私透明成为选择标准" },
              { icon: Sparkles, title: "社区协作", desc: "多人协作撰写评测，像开源一样共建App知识库" },
            ].map((f) => (
              <div
                key={f.title}
                className="group border-2 border-black p-8 transition-colors duration-100 hover:bg-black hover:text-white"
              >
                <f.icon size={24} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors duration-100" />
                <h3
                  className="mt-5 text-xl font-bold tracking-tight text-black group-hover:text-white transition-colors duration-100"
                  style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
                >
                  {f.title}
                </h3>
                <p className="mt-3 text-[#525252] leading-relaxed group-hover:text-white/70 transition-colors duration-100">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-2 bg-black w-full" />

        {/* CTA */}
        <section className="relative py-20 md:py-28 px-6 lg:px-12 text-center bg-black text-white">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
          >
            准备好分享你的 App 见解了吗？
          </h2>
          <p className="mt-5 text-white/50 text-lg leading-relaxed max-w-md mx-auto">
            写一篇评测，帮助更多人做出更好的选择。
          </p>
          <div className="mt-8">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 text-sm font-medium
                         tracking-widest uppercase transition-colors duration-100 hover:bg-white hover:text-black"
            >
              开始写评测
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

function MetaLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#525252]"
      style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
