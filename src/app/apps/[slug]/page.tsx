import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, PlusCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { StarRating } from "@/components/ui/star-rating";
import { PrivacyBadge } from "@/components/ui/privacy-badge";
import { ScoreBars } from "@/components/ui/score-bar";
import { ReviewCard } from "@/components/ui/review-card";
import { mockApps, mockReviews } from "@/lib/mock-data";

interface AppDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AppDetailPage({ params }: AppDetailPageProps) {
  const { slug } = await params;
  const app = mockApps.find((a) => a.slug === slug);
  if (!app) notFound();

  const appReviews = mockReviews.filter((r) => r.appId === app.id);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* ===== App Overview Card ===== */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Icon & basic info */}
          <div className="flex items-start gap-4 flex-1">
            <span className="text-5xl md:text-6xl shrink-0">{app.icon}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{app.name}</h1>
                <PrivacyBadge level={app.privacyLevel} />
              </div>
              <p className="text-muted-foreground mb-3">{app.tagline}</p>
              <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                <span>🏢 {app.developer}</span>
                <span>📱 {app.platforms.join(" / ")}</span>
                <span>📂 {app.category}</span>
                {app.website && (
                  <a
                    href={app.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    官网 <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              {/* Tags */}
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                {app.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Overall score */}
          <div className="shrink-0 flex flex-row md:flex-col items-center md:items-center gap-2 p-4 bg-muted/50 rounded-xl">
            <span className="text-4xl md:text-5xl font-bold text-primary">{app.scores.overall}</span>
            <div className="text-center">
              <StarRating rating={app.scores.overall} maxRating={10} size="md" />
              <p className="text-xs text-muted-foreground mt-1">
                {app.ratingCount} 人评分 · {app.reviewCount} 篇评测
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold mb-3">📖 简介</h2>
            <p className="text-muted-foreground leading-relaxed">{app.description}</p>
          </section>

          {/* Score dimensions */}
          <section>
            <h2 className="text-lg font-semibold mb-4">📊 评分解构</h2>
            <ScoreBars scores={app.scores} />
          </section>

          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                📝 评测文章 <span className="text-muted-foreground text-base font-normal">({appReviews.length})</span>
              </h2>
              <LinkButton size="sm" className="gap-1" href={`/submit?app=${app.slug}`}>
                <PlusCircle className="h-4 w-4" />
                写评测
              </LinkButton>
            </div>
            <div className="space-y-4">
              {appReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {appReviews.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-2xl">
                <span className="text-4xl">📭</span>
                <p className="text-muted-foreground mt-2">还没有人评测这个App</p>
                <LinkButton variant="outline" size="sm" className="mt-3" href={`/submit?app=${app.slug}`}>
                  成为第一个评测者
                </LinkButton>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Quick facts */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-3">快速信息</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">开发商</dt>
                <dd className="font-medium">{app.developer}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">平台</dt>
                <dd className="font-medium">{app.platforms.join("、")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">分类</dt>
                <dd className="font-medium">{app.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">隐私等级</dt>
                <dd><PrivacyBadge level={app.privacyLevel} size="sm" /></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">收录时间</dt>
                <dd className="font-medium">{new Date(app.createdAt).toLocaleDateString("zh-CN")}</dd>
              </div>
            </dl>
          </div>

          {/* Submit CTA */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 text-center">
            <h3 className="font-semibold mb-2">使用过 {app.name}？</h3>
            <p className="text-sm text-muted-foreground mb-3">分享你的使用体验，帮助其他人做更好的选择</p>
            <LinkButton className="w-full gap-1" href={`/submit?app=${app.slug}`}>
              <PlusCircle className="h-4 w-4" />
              撰写评测
            </LinkButton>
          </div>
        </aside>
      </div>
    </div>
  );
}
