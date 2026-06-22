import Link from "next/link";
import { mockUsers } from "@/lib/mock-data";
import { Badge } from "@/lib/types";
import { ArrowRight } from "lucide-react";

const badgeConfig: Record<Badge, { emoji: string }> = {
  "评测新星": { emoji: "⭐" },
  "资深评测官": { emoji: "🏅" },
  "数据侦探": { emoji: "🔍" },
  "隐私卫士": { emoji: "🛡️" },
  "社区先锋": { emoji: "🚀" },
  "AI行家": { emoji: "🤖" },
};

export default function CommunityPage() {
  const users = Object.values(mockUsers);
  users.sort((a, b) => b.stats.helpfulVotes - a.stats.helpfulVotes);

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-12 py-10">
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs tracking-widest uppercase text-[#525252] mb-3 font-medium"
          style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
        >
          社区
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          贡献者
        </h1>
        <p className="mt-2 text-[#525252]">
          感谢每一位贡献评测的社区成员，让 App 评测更加可信。
        </p>
      </div>

      {/* Leaderboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user, index) => (
          <Link
            key={user.username}
            href={`/profile/${user.username}`}
            className="block p-5 border border-black hover:bg-black hover:text-white transition-colors duration-100 group"
          >
            <div className="flex items-start gap-4">
              {/* Rank */}
              <div className="shrink-0 w-8 h-8 border border-black group-hover:border-white flex items-center justify-center text-sm font-bold transition-colors duration-100">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{user.avatar}</span>
                  <div>
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-xs text-[#525252] group-hover:text-white/70 transition-colors duration-100">
                      @{user.username}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#525252] mt-2 line-clamp-2 group-hover:text-white/70 transition-colors duration-100">
                  {user.bio}
                </p>

                <div className="flex items-center gap-4 mt-3 text-xs text-[#525252] group-hover:text-white/70 transition-colors duration-100">
                  <span>📝 {user.stats.reviews}篇评测</span>
                  <span>👍 {user.stats.helpfulVotes}次有用</span>
                </div>

                {user.stats.badges.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                    {user.stats.badges.map((badge) => {
                      const config = badgeConfig[badge];
                      return (
                        <span
                          key={badge}
                          className="text-xs px-2 py-0.5 border border-black font-medium group-hover:border-white transition-colors duration-100"
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

      <div className="h-2 bg-black w-full mt-10" />

      {/* CTA */}
      <div className="mt-10 p-8 text-center bg-black text-white">
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          还没有加入社区？
        </h2>
        <p className="mt-2 text-white/60 text-sm">注册成为成员，分享你的评测，赢取贡献者勋章。</p>
        <div className="mt-6">
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 text-sm font-medium
                       tracking-widest uppercase transition-colors duration-100 hover:bg-white hover:text-black"
          >
            立即加入
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
