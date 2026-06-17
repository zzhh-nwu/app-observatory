import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ThumbsUp, MessageCircle, Share2, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { ScoreBars } from "@/components/ui/score-bar";
import { mockReviews } from "@/lib/mock-data";

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = mockReviews.find((r) => r.slug === slug);
  if (!review) notFound();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Back link */}
      <Link
        href={`/apps/${review.appId === "2" ? "deepseek" : review.appId === "1" ? "doubao" : "notion"}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回 {review.appName}
      </Link>

      {/* Review Header */}
      <article>
        <header className="mb-8">
          {/* App tag */}
          <div className="flex items-center gap-2 mb-3">
            <Link
              href={`/apps/${review.appId === "2" ? "deepseek" : review.appId === "1" ? "doubao" : "notion"}`}
              className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium hover:bg-primary/20 transition-colors"
            >
              {review.appName}
            </Link>
            {review.isCollaborative && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                协作撰写
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            {review.title}
          </h1>

          {/* Author meta */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xl">{review.author.avatar}</span>
            <div>
              <p className="text-sm font-medium">{review.author.displayName}</p>
              <p className="text-xs text-muted-foreground">
                发布于 {new Date(review.createdAt).toLocaleDateString("zh-CN")}
                {review.updatedAt !== review.createdAt &&
                  ` · 更新于 ${new Date(review.updatedAt).toLocaleDateString("zh-CN")}`}
              </p>
            </div>
          </div>

          {/* Collaborators */}
          {review.collaborators && review.collaborators.length > 0 && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>协作者：</span>
              {review.collaborators.map((c) => (
                <span key={c.username} className="inline-flex items-center gap-1">
                  {c.avatar} {c.displayName}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Score card */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {/* Overall */}
          <div className="bg-card border border-border rounded-2xl p-5 text-center">
            <p className="text-sm text-muted-foreground mb-2">综合评分</p>
            <span className="text-5xl font-bold text-primary">{review.scores.overall}</span>
            <span className="text-muted-foreground">/10</span>
            <div className="flex justify-center mt-2">
              <StarRating rating={review.scores.overall} maxRating={10} size="md" />
            </div>
          </div>

          {/* Pros */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-score-green mb-2">✅ 优点</h3>
            <ul className="space-y-1">
              {review.pros.map((pro, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-score-green shrink-0 mt-0.5">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-warning mb-2">⚠️ 缺点</h3>
            <ul className="space-y-1">
              {review.cons.map((con, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-warning shrink-0 mt-0.5">−</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-8">
          <h3 className="text-sm font-semibold mb-4">📊 分项评分</h3>
          <ScoreBars scores={review.scores} />
        </div>

        {/* Trust note */}
        {review.trustNote && (
          <div className="bg-brand-green/5 border border-brand-green/10 rounded-2xl p-5 mb-8">
            <h3 className="text-sm font-semibold text-brand-green mb-2">🛡️ 数据可靠性备注</h3>
            <p className="text-sm text-muted-foreground">{review.trustNote}</p>
          </div>
        )}

        {/* Best for */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-8">
          <h3 className="text-sm font-semibold mb-2">🎯 适合谁？</h3>
          <p className="text-muted-foreground">{review.bestFor}</p>
        </div>

        {/* Article body */}
        <div className="prose-app bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {review.content}
          </ReactMarkdown>
        </div>

        {/* Interaction bar */}
        <div className="flex items-center justify-between py-4 border-t border-border">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ThumbsUp className="h-4 w-4" />
              有用 ({review.helpfulCount})
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <MessageCircle className="h-4 w-4" />
              评论 ({review.commentCount})
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Share2 className="h-4 w-4" />
            分享
          </Button>
        </div>
      </article>
    </div>
  );
}

// Generate static params for mock reviews
export function generateStaticParams() {
  return mockReviews.map((review) => ({
    slug: review.slug,
  }));
}
