import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function StarRating({ rating, maxRating = 5, size = "md", showValue = false }: StarRatingProps) {
  const normalizedRating = (rating / (maxRating === 10 ? 10 : maxRating)) * 5;
  const fullStars = Math.floor(normalizedRating);
  const fractionalStar = normalizedRating - fullStars;

  const sizeMap = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-5 w-5" };

  return (
    <span className="inline-flex items-center gap-0.5" title={`${rating}/${maxRating}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="relative inline-block">
          {/* 背景空心星 */}
          <Star
            className={cn(sizeMap[size], "text-muted-foreground/30 fill-muted-foreground/10")}
          />
          {/* 实心覆盖层 */}
          {i < fullStars && (
            <Star
              className={cn(sizeMap[size], "star-filled absolute inset-0 fill-current")}
            />
          )}
          {i === fullStars && fractionalStar > 0 && (
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fractionalStar * 100}%` }}
            >
              <Star className={cn(sizeMap[size], "star-filled fill-current")} />
            </span>
          )}
        </span>
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-muted-foreground">
          {rating}
        </span>
      )}
    </span>
  );
}
