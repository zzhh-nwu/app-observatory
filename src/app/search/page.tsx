"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { ReviewCard } from "@/components/ui/review-card";
import { mockApps, mockReviews } from "@/lib/mock-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredApps = query
    ? mockApps.filter(
        (app) =>
          app.name.toLowerCase().includes(query.toLowerCase()) ||
          app.tagline.toLowerCase().includes(query.toLowerCase()) ||
          app.developer.toLowerCase().includes(query.toLowerCase()) ||
          app.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const filteredReviews = query
    ? mockReviews.filter(
        (review) =>
          review.title.toLowerCase().includes(query.toLowerCase()) ||
          review.summary.toLowerCase().includes(query.toLowerCase()) ||
          review.appName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasResults = filteredApps.length > 0 || filteredReviews.length > 0;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Search input */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索 App 名称、评测标题、作者…"
          autoFocus
          className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-card text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {!query && (
        <div className="text-center py-16">
          <span className="text-5xl">🔍</span>
          <p className="text-muted-foreground mt-3">输入关键词开始搜索</p>
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            {["AI", "隐私", "开源", "效率", "社交"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1.5 rounded-full bg-muted text-sm hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && !hasResults && (
        <div className="text-center py-16">
          <span className="text-5xl">🤷</span>
          <p className="text-muted-foreground mt-3">
            没有找到与「{query}」相关的结果
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            试试其他关键词，或者去提交新的App
          </p>
        </div>
      )}

      {query && hasResults && (
        <div className="space-y-8">
          {filteredApps.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-4">
                📱 App 结果
                <span className="text-muted-foreground text-sm font-normal ml-2">
                  ({filteredApps.length})
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredApps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          )}

          {filteredReviews.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-4">
                📝 评测结果
                <span className="text-muted-foreground text-sm font-normal ml-2">
                  ({filteredReviews.length})
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
