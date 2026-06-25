import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { StarRating } from "@/components/ui/star-rating";
import { PrivacyBadge } from "@/components/ui/privacy-badge";
import { ScoreBars } from "@/components/ui/score-bar";
import { ReviewCard } from "@/components/ui/review-card";
import { mockApps, mockReviews } from "@/lib/mock-data";

export function generateStaticParams() {
  return mockApps.map((app) => ({ slug: app.slug }));
}

interface AppDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AppDetailPage({ params }: AppDetailPageProps) {
  const { slug } = await params;
  const app = mockApps.find((a) => a.slug === slug);
  if (!app) notFound();

  const appReviews = mockReviews.filter((r) => r.appId === app.id);

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-12 py-10">
      {/* App Overview */}
      <div className="border-2 border-black p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-start gap-4 flex-1">
            <span className="text-5xl md:text-6xl shrink-0">{app.icon}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1
                  className="text-2xl md:text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
                >
                  {app.name}
                </h1>
                <PrivacyBadge level={app.privacyLevel} />
              </div>
              <p className="text-[#525252] mb-3">{app.tagline}</p>
              <div className="flex items-center gap-4 flex-wrap text-sm text-[#525252]">
                <span>🏢 {app.developer}</span>
                <span>📱 {app.platforms.join(" / ")}</span>
                <span>📂 {app.category}</span>
                {app.website && (
                  <a
                    href={app.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-black underline underline-offset-4 hover:no-underline"
                  >
                    官网 <ExternalLink size={12} strokeWidth={1.5} />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                {app.tags.map((tag) => (
                  <span key={tag} className="text-xs border border-black px-2 py-0.5 text-[#525252]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Overall score */}
          <div className="shrink-0 flex flex-row md:flex-col items-center gap-3 p-5 border-2 border-black bg-[#FAFAFA]">
            <span
              className="text-5xl font-bold"
              style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
            >
              {app.scores.overall}
            </span>
            <div className="text-center">
              <StarRating rating={app.scores.overall} maxRating={10} size="md" />
              <p className="text-xs text-[#525252] mt-1">
                {app.ratingCount} 人评分 · {app.reviewCount} 篇评测
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <p
              className="text-xs tracking-widest uppercase text-[#525252] mb-3 font-medium"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
            >
              简介
            </p>
            <p className="text-[#525252] leading-relaxed">{app.description}</p>
          </section>

          {/* Score bars */}
          <section>
            <p
              className="text-xs tracking-widest uppercase text-[#525252] mb-4 font-medium"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
            >
              评分解构
            </p>
            <ScoreBars scores={app.scores} />
          </section>

          <div className="h-2 bg-black w-full" />

          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
              >
                评测文章
                <span className="text-[#525252] text-base font-normal ml-2">({appReviews.length})</span>
              </h2>
              <LinkButton size="sm" href={`/submit?app=${app.slug}`}>
                <Plus size={14} strokeWidth={2} />
                写评测
              </LinkButton>
            </div>
            <div className="space-y-4">
              {appReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {appReviews.length === 0 && (
              <div className="text-center py-16 border-2 border-black">
                <p
                  className="text-2xl font-bold text-[#D4D4D4]"
                  style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
                >
                  —
                </p>
                <p className="text-[#525252] mt-2">还没有人评测这个 App</p>
                <Link
                  href={`/submit?app=${app.slug}`}
                  className="inline-block mt-4 border-2 border-black px-6 py-2 text-xs font-medium tracking-widest uppercase
                             hover:bg-black hover:text-white transition-colors duration-100"
                >
                  成为第一个评测者
                </Link>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="border-2 border-black p-5">
            <h3
              className="font-bold text-sm mb-4"
              style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
            >
              快速信息
            </h3>
            <dl className="space-y-2.5 text-sm">
              {[
                ["开发商", app.developer],
                ["平台", app.platforms.join("、")],
                ["分类", app.category],
                ["收录时间", new Date(app.createdAt).toLocaleDateString("zh-CN")],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-[#525252]">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-[#E5E5E5]">
                <dt className="text-[#525252]">隐私等级</dt>
                <dd><PrivacyBadge level={app.privacyLevel} size="sm" /></dd>
              </div>
            </dl>
          </div>

          <div className="bg-black text-white p-6 text-center">
            <h3
              className="font-bold mb-2 tracking-tight"
              style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
            >
              使用过 {app.name}？
            </h3>
            <p className="text-sm text-white/60 mb-4">分享你的体验，帮助其他人做更好的选择。</p>
            <Link
              href={`/submit?app=${app.slug}`}
              className="inline-flex items-center gap-1.5 border-2 border-white text-white px-6 py-3 text-xs font-medium
                         tracking-widest uppercase transition-colors duration-100 hover:bg-white hover:text-black"
            >
              <Plus size={14} strokeWidth={2} />
              撰写评测
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
