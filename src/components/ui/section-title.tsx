import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionTitleProps {
  title: string;
  description?: string;
  moreLink?: string;
  moreLabel?: string;
}

export function SectionTitle({ title, description, moreLink, moreLabel }: SectionTitleProps) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {moreLink && (
        <Link
          href={moreLink}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline shrink-0"
        >
          {moreLabel || "查看全部"}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
