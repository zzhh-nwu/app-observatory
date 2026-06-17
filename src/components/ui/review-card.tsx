import Link from "next/link";
import { Review } from "@/lib/types";
import { StarRating } from "./star-rating";
import { ThumbsUp, MessageCircle, Users } from "lucide-react";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Link
      href={`/reviews/${review.slug}`}
      className="block p-5 rounded-xl bg-card border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
    >
      {/* App tag */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
          {review.appName}
        </span>
        {review.isCollaborative && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            协作
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-2 mb-2">
        {review.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {review.summary}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{review.author.avatar}</span>
          <span className="text-sm text-muted-foreground">{review.author.displayName}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString("zh-CN")}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <StarRating rating={review.scores.overall} maxRating={10} size="sm" />
            <span className="font-bold text-foreground">{review.scores.overall}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            {review.helpfulCount}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {review.commentCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
