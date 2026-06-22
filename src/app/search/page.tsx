"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { ReviewCard } from "@/components/ui/review-card";
import { mockApps, mockReviews } from "@/lib/mock-data";

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="skeleton h-14 w-full max-w-md mx-auto" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);

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
    <div className="mx-auto max-w-4xl px-6 lg:px-12 py-10">
      <div className="relative mb-10">
        <Search size={20} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索 App 名称、评测标题…"
          autoFocus
          className="w-full h-14 pl-12 pr-4 border-2 border-black bg-white text-base
                     placeholder:text-[#A3A3A3] placeholder:italic
                     focus:border-4 focus:outline-none transition-all duration-100"
        />
      </div>

      {!query && (
        <div className="text-center py-20">
          <p className="text-6xl font-bold text-[#D4D4D4]"
            style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
          >
            ?
          </p>
          <p className="text-[#525252] mt-4 text-lg">输入关键词开始搜索</p>
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
            {["AI", "隐私", "开源", "效率", "社交"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-1.5 border border-black text-sm hover:bg-black hover:text-white transition-colors duration-100"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && !hasResults && (
        <div className="text-center py-20">
          <p className="text-6xl font-bold text-[#D4D4D4]"
            style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
          >
            —
          </p>
          <p className="text-[#525252] mt-4">没有找到与「{query}」相关的结果</p>
          <p className="text-xs text-[#A3A3A3] mt-1">试试其他关键词。</p>
        </div>
      )}

      {query && hasResults && (
        <div className="space-y-10">
          {filteredApps.length > 0 && (
            <section>
              <h2
                className="text-xl font-bold mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
              >
                App 结果
                <span className="text-[#525252] text-sm font-normal ml-2">
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
              <h2
                className="text-xl font-bold mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
              >
                评测结果
                <span className="text-[#525252] text-sm font-normal ml-2">
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
