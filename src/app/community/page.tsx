import Link from "next/link";
import { mockUsers } from "@/lib/mock-data";
import { Badge } from "@/lib/types";

const badgeConfig: Record<Badge, { emoji: string; color: string }> = {
  "评测新星": { emoji: "⭐", color: "bg-interact/10 text-interact" },
  "资深评测官": { emoji: "🏅", color: "bg-primary/10 text-primary" },
  "数据侦探": { emoji: "🔍", color: "bg-brand-green/10 text-brand-green" },
  "隐私卫士": { emoji: "🛡️", color: "bg-brand-green/10 text-brand-green" },
  "社区先锋": { emoji: "🚀", color: "bg-warning/10 text-warning" },
  "AI行家": { emoji: "🤖", color: "bg-primary/10 text-primary" },
};

export default function CommunityPage() {
  const users = Object.values(mockUsers);
  // Sort by helpful votes descending
  users.sort((a, b) => b.stats.helpfulVotes - a.stats.helpfulVotes);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">👥 社区成员</h1>
        <p className="text-muted-foreground">
          感谢每一位贡献评测的社区成员，他们让App数据库更加可信和丰富
        </p>
      </div>

      {/* Leaderboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user, index) => (
          <Link
            key={user.username}
            href={`/profile/${user.username}`}
            className="block p-5 rounded-xl bg-card border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
          >
            <div className="flex items-start gap-4">
              {/* Rank */}
              <div className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{user.avatar}</span>
                  <div>
                    <p className="font-semibold group-hover:text-primary transition-colors">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-muted-foreground">@{user.username}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{user.bio}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>📝 {user.stats.reviews}篇评测</span>
                  <span>👍 {user.stats.helpfulVotes}次有用</span>
                </div>

                {/* Badges */}
                {user.stats.badges.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                    {user.stats.badges.map((badge) => {
                      const config = badgeConfig[badge];
                      return (
                        <span
                          key={badge}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}
                        >
                          {config.emoji} {badge}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Invite CTA */}
      <div className="mt-10 rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold mb-2">还没有加入社区？</h2>
        <p className="text-muted-foreground mb-4">
          注册成为 App 观察站的成员，分享你的评测，赢取贡献者勋章
        </p>
        <Link
          href="/auth"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          立即加入
        </Link>
      </div>
    </div>
  );
}
