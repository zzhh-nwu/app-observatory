import Link from "next/link";
import { AppEntry } from "@/lib/types";
import { StarRating } from "./star-rating";
import { PrivacyBadge } from "./privacy-badge";

interface AppCardProps {
  app: AppEntry;
  variant?: "default" | "compact" | "featured";
}

export function AppCard({ app, variant = "default" }: AppCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/apps/${app.slug}`}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
      >
        <span className="text-2xl shrink-0">{app.icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">{app.name}</span>
            <PrivacyBadge level={app.privacyLevel} size="sm" />
          </div>
          <p className="text-xs text-muted-foreground truncate">{app.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-sm font-bold text-primary">{app.scores.overall}</span>
          <span className="text-xs text-muted-foreground">/10</span>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/apps/${app.slug}`}
        className="block p-5 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
      >
        <div className="flex items-start gap-4">
          <span className="text-4xl shrink-0">{app.icon}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-lg">{app.name}</h3>
              <PrivacyBadge level={app.privacyLevel} />
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                #{app.reviewCount}篇评测
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{app.tagline}</p>
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={app.scores.overall} maxRating={10} />
              <span className="text-lg font-bold text-primary">{app.scores.overall}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // default
  return (
    <Link
      href={`/apps/${app.slug}`}
      className="block p-4 rounded-xl bg-card border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl shrink-0">{app.icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold group-hover:text-primary transition-colors">{app.name}</h3>
            <PrivacyBadge level={app.privacyLevel} size="sm" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{app.tagline}</p>
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={app.scores.overall} maxRating={10} size="sm" />
            <span className="text-sm font-bold text-foreground">{app.scores.overall}</span>
            <span className="text-xs text-muted-foreground">· {app.reviewCount}篇评测</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
