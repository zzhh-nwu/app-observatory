"use client";

import { useState, Suspense } from "react";
import { AppCard } from "@/components/ui/app-card";
import { mockApps } from "@/lib/mock-data";
import { AppCategory } from "@/lib/types";

const categories: { label: string; value: AppCategory | "全部" }[] = [
  { label: "全部", value: "全部" },
  { label: "AI工具", value: "AI工具" },
  { label: "社交通讯", value: "社交通讯" },
  { label: "效率工具", value: "效率工具" },
  { label: "内容创作", value: "内容创作" },
  { label: "学习教育", value: "学习教育" },
  { label: "金融理财", value: "金融理财" },
  { label: "健康生活", value: "健康生活" },
  { label: "游戏娱乐", value: "游戏娱乐" },
  { label: "开发者工具", value: "开发者工具" },
  { label: "更多其它", value: "全部" },
];

type SortKey = "rating" | "reviews" | "newest" | "privacy";

const sorts: { label: string; key: SortKey }[] = [
  { label: "综合评分", key: "rating" },
  { label: "最多评测", key: "reviews" },
  { label: "最新收录", key: "newest" },
  { label: "隐私最佳", key: "privacy" },
];

export default function AppsPage() {
  return (
    <Suspense fallback={<AppGridSkeleton />}>
      <AppsContent />
    </Suspense>
  );
}

function AppsContent() {
  const [activeCat, setActiveCat] = useState<AppCategory | "全部">("全部");
  const [activeSort, setActiveSort] = useState<SortKey>("rating");

  let filtered = activeCat === "全部"
    ? [...mockApps]
    : mockApps.filter((a) => a.category === activeCat);

  filtered.sort((a, b) => {
    switch (activeSort) {
      case "rating": return b.scores.overall - a.scores.overall;
      case "reviews": return b.reviewCount - a.reviewCount;
      case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "privacy": return b.scores.privacy - a.scores.privacy;
      default: return 0;
    }
  });

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-12 py-10">
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-[#525252] mb-3 font-medium"
          style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
        >数据库</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >App 库</h1>
        <p className="mt-2 text-[#525252]">浏览社区收录的所有 App，按分类和标签筛选。</p>
      </div>

      {/* 分类筛选 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCat(cat.value)}
            className={`shrink-0 px-4 py-1.5 text-xs font-medium border border-black transition-colors duration-100 whitespace-nowrap
              ${activeCat === cat.value
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 排序 */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs tracking-widest uppercase text-[#525252] font-medium"
          style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
        >排序</span>
        {sorts.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSort(s.key)}
            className={`text-sm px-3 py-1.5 border border-black transition-colors duration-100
              ${activeSort === s.key
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* 结果计数 */}
      <p className="text-xs text-[#525252] mb-4">共 {filtered.length} 款 App</p>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
          >暂无收录</h3>
          <p className="text-[#525252]">成为第一个提交 App 的人。</p>
        </div>
      )}
    </div>
  );
}

function AppGridSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-12 py-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 border border-black">
            <div className="flex gap-3">
              <div className="skeleton w-12 h-12" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-5 w-24" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
