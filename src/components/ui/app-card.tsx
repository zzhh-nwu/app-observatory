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
        className="flex items-center gap-3 p-3 border border-black hover:bg-black hover:text-white transition-colors duration-100 group"
      >
        <span className="text-2xl shrink-0">{app.icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">{app.name}</span>
            <PrivacyBadge level={app.privacyLevel} size="sm" />
          </div>
          <p className="text-xs text-[#525252] group-hover:text-white/70 truncate transition-colors duration-100">{app.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-sm font-bold">{app.scores.overall}</span>
          <span className="text-xs text-[#525252] group-hover:text-white/70 transition-colors duration-100">/10</span>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/apps/${app.slug}`}
        className="block p-6 border-2 border-black hover:bg-black hover:text-white transition-colors duration-100 group"
      >
        <div className="flex items-start gap-4">
          <span className="text-4xl shrink-0">{app.icon}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className="font-bold text-lg"
                style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
              >
                {app.name}
              </h3>
              <PrivacyBadge level={app.privacyLevel} />
              <span className="text-xs border border-black px-2 py-0.5 font-medium group-hover:border-white transition-colors duration-100">
                #{app.reviewCount}篇评测
              </span>
            </div>
            <p className="text-sm text-[#525252] mt-1 line-clamp-2 group-hover:text-white/70 transition-colors duration-100">
              {app.tagline}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={app.scores.overall} maxRating={10} />
              <span className="text-lg font-bold">{app.scores.overall}</span>
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
      className="block p-4 border border-black hover:bg-black hover:text-white transition-colors duration-100 group"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl shrink-0">{app.icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold">{app.name}</h3>
            <PrivacyBadge level={app.privacyLevel} size="sm" />
          </div>
          <p className="text-xs text-[#525252] mt-0.5 line-clamp-1 group-hover:text-white/70 transition-colors duration-100">
            {app.tagline}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={app.scores.overall} maxRating={10} size="sm" />
            <span className="text-sm font-bold">{app.scores.overall}</span>
            <span className="text-xs text-[#525252] group-hover:text-white/70 transition-colors duration-100">
              · {app.reviewCount}篇评测
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
