import { SplashScreen } from "@/components/splash/splash-screen";
import Link from "next/link";
import { Search, TrendingUp, Shield, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { AppCard } from "@/components/ui/app-card";
import { ReviewCard } from "@/components/ui/review-card";
import { SectionTitle } from "@/components/ui/section-title";
import { mockApps, mockReviews, mockRankings } from "@/lib/mock-data";

export default function HomePage() {
  const featuredApps = mockRankings[0].apps.slice(0, 3);
  const latestReviews = mockReviews;

  return (
    <>
      <SplashScreen />
      <div className="min-h-screen">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pb-8 pt-12 md:pt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="container mx-auto max-w-6xl px-4 relative">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              发现值得信赖的
              <span className="text-primary"> App</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              从用户价值与数据可靠性出发，<br className="md:hidden" />
              评测和追踪热门应用。人人参与，共建透明的App数据库。
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索 App 名称或评测关键词…"
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border bg-card text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Quick tags */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Link href="/apps?tag=AI工具" className="text-xs bg-white border border-border px-3 py-1.5 rounded-full hover:border-primary/30 hover:text-primary transition-colors">
                🔥 AI工具
              </Link>
              <Link href="/apps?sort=privacy" className="text-xs bg-white border border-border px-3 py-1.5 rounded-full hover:border-brand-green/30 hover:text-brand-green transition-colors">
                🛡️ 隐私最佳
              </Link>
              <Link href="/apps?sort=rating" className="text-xs bg-white border border-border px-3 py-1.5 rounded-full hover:border-interact/30 hover:text-interact transition-colors">
                ⭐ 最高评分
              </Link>
              <Link href="/apps?category=效率工具" className="text-xs bg-white border border-border px-3 py-1.5 rounded-full hover:border-primary/30 hover:text-primary transition-colors">
                ⚡ 效率工具
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Featured Ranking ===== */}
      <section className="container mx-auto max-w-6xl px-4 py-10">
        <SectionTitle
          title="🔥 本周热门评测"
          description="过去7天最受关注的App"
          moreLink="/apps?sort=trending"
          moreLabel="完整榜单"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredApps.map((app, i) => (
            <AppCard key={app.id} app={app} variant={i === 0 ? "featured" : "default"} />
          ))}
        </div>
      </section>

      {/* ===== Latest Reviews ===== */}
      <section className="container mx-auto max-w-6xl px-4 py-10">
        <SectionTitle
          title="📝 最新评测"
          description="社区成员的最新深度评测"
          moreLink="/apps"
          moreLabel="浏览全部"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latestReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* ===== Feature Highlights ===== */}
      <section className="container mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">多维度评分</h3>
            <p className="text-sm text-muted-foreground">
              好用度、隐私透明、商业模式、技术创新 — 四个维度全面评估每款App
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-brand-green" />
            </div>
            <h3 className="font-semibold mb-2">数据可信度</h3>
            <p className="text-sm text-muted-foreground">
              社区共同维护App的数据可靠性评级，让隐私透明成为选择标准
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <div className="w-12 h-12 bg-interact/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-interact" />
            </div>
            <h3 className="font-semibold mb-2">社区协作</h3>
            <p className="text-sm text-muted-foreground">
              多人协作撰写评测，像开源一样共建App知识库
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="container mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-3">准备好分享你的App见解了吗？</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            写一篇评测，帮助更多人做出更好的选择。你的声音会被整个社区听到。
          </p>
          <LinkButton size="lg" className="rounded-xl text-base px-8" href="/submit">
            ✍️ 开始写评测
          </LinkButton>
        </div>
      </section>
    </div>
    </>
  );
}
