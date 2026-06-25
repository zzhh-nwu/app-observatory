import { notFound } from "next/navigation";
import Link from "next/link";
import { Settings, Award } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { ReviewCard } from "@/components/ui/review-card";
import { mockUsers, mockReviews } from "@/lib/mock-data";
import { Badge } from "@/lib/types";

const badgeConfig: Record<Badge, { emoji: string; label: string; color: string }> = {
  "评测新星": { emoji: "⭐", label: "评测新星", color: "bg-interact/10 text-interact" },
  "资深评测官": { emoji: "🏅", label: "资深评测官", color: "bg-primary/10 text-primary" },
  "数据侦探": { emoji: "🔍", label: "数据侦探", color: "bg-brand-green/10 text-brand-green" },
  "隐私卫士": { emoji: "🛡️", label: "隐私卫士", color: "bg-brand-green/10 text-brand-green" },
  "社区先锋": { emoji: "🚀", label: "社区先锋", color: "bg-warning/10 text-warning" },
  "AI行家": { emoji: "🤖", label: "AI行家", color: "bg-primary/10 text-primary" },
};

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = mockUsers[username];
  if (!user) notFound();

  const userReviews = mockReviews.filter((r) => r.author.username === username);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Profile header */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <span className="text-6xl shrink-0">{user.avatar}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              <span className="text-sm text-muted-foreground">@{user.username}</span>
            </div>
            <p className="text-muted-foreground mt-2">{user.bio}</p>
            <p className="text-xs text-muted-foreground mt-2">
              🗓 {new Date(user.joinedAt).toLocaleDateString("zh-CN")} 加入
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.reviews}</p>
                <p className="text-xs text-muted-foreground">评测</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.helpfulVotes}</p>
                <p className="text-xs text-muted-foreground">有用</p>
              </div>
            </div>

            {/* Badges */}
            {user.stats.badges.length > 0 && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Award className="h-4 w-4 text-interact" />
                {user.stats.badges.map((badge) => {
                  const config = badgeConfig[badge];
                  return (
                    <span
                      key={badge}
                      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}
                    >
                      {config.emoji} {config.label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 h-7 px-2.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-muted transition-colors shrink-0"
          >
            <Settings className="h-4 w-4" />
            编辑资料
          </button>
        </div>
      </div>

      {/* User reviews */}
      <section>
        <h2 className="text-xl font-bold mb-5">
          📝 {user.displayName}的评测
          <span className="text-muted-foreground text-base font-normal ml-2">
            ({userReviews.length}篇)
          </span>
        </h2>

        {userReviews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {userReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-2xl">
            <span className="text-5xl">📭</span>
            <p className="text-muted-foreground mt-3">还没有发布评测</p>
            <LinkButton variant="outline" size="sm" className="mt-4" href="/submit">
              写第一篇评测
            </LinkButton>
          </div>
        )}
      </section>
    </div>
  );
}
