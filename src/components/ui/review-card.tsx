import Link from "next/link";
import { Review } from "@/lib/types";
import { StarRating } from "./star-rating";
import { ThumbsUp, MessageCircle, Users } from "lucide-react";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Link
      href={`/reviews/${review.slug}`}
      className="block p-5 border border-black hover:bg-black hover:text-white transition-colors duration-100 group"
    >
      {/* App tag */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs bg-black text-white px-2 py-0.5 font-medium group-hover:bg-white group-hover:text-black transition-colors duration-100"
          style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
        >
          {review.appName}
        </span>
        {review.isCollaborative && (
          <span className="inline-flex items-center gap-1 text-xs text-[#525252] group-hover:text-white/70 transition-colors duration-100">
            <Users size={12} strokeWidth={1.5} />
            协作
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="font-bold text-base line-clamp-2 mb-2"
        style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
      >
        {review.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-[#525252] line-clamp-2 mb-3 group-hover:text-white/70 transition-colors duration-100">
        {review.summary}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{review.author.avatar}</span>
          <span className="text-sm text-[#525252] group-hover:text-white/70 transition-colors duration-100">
            {review.author.displayName}
          </span>
          <span className="text-xs text-[#525252] group-hover:text-white/70 transition-colors duration-100">
            {new Date(review.createdAt).toLocaleDateString("zh-CN")}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#525252] group-hover:text-white/70 transition-colors duration-100">
          <span className="inline-flex items-center gap-1">
            <StarRating rating={review.scores.overall} maxRating={10} size="sm" />
            <span className="font-bold text-black group-hover:text-white transition-colors duration-100">{review.scores.overall}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <ThumbsUp size={12} strokeWidth={1.5} />
            {review.helpfulCount}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle size={12} strokeWidth={1.5} />
            {review.commentCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
