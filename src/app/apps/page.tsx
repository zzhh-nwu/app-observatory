import { Suspense } from "react";
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
];

export default function AppsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">App 数据库</h1>
        <p className="text-muted-foreground">
          浏览社区收录的所有App，按分类和标签筛选
        </p>
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap
              ${cat.value === "全部"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort options */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-muted-foreground">排序：</span>
        {["综合评分", "最多评测", "最新收录", "隐私最佳"].map((sort) => (
          <button
            key={sort}
            className="text-sm px-3 py-1.5 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
          >
            {sort}
          </button>
        ))}
      </div>

      {/* App grid */}
      <Suspense fallback={<AppGridSkeleton />}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </Suspense>

      {/* Empty state placeholder */}
      {mockApps.length === 0 && (
        <div className="text-center py-20">
          <span className="text-6xl">📭</span>
          <h3 className="text-xl font-semibold mt-4 mb-2">还没有App被收录</h3>
          <p className="text-muted-foreground">成为第一个提交App的人吧！</p>
        </div>
      )}
    </div>
  );
}

function AppGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 rounded-xl border border-border">
          <div className="flex gap-3">
            <div className="skeleton w-12 h-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-5 w-24" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
