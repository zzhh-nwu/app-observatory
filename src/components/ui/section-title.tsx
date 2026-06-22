import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionTitleProps {
  title: string;
  description?: string;
  moreLink?: string;
  moreLabel?: string;
}

export function SectionTitle({ title, description, moreLink, moreLabel }: SectionTitleProps) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <p
          className="text-xs tracking-widest uppercase text-[#525252] mb-2 font-medium"
          style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
        >
          {title}
        </p>
        {description && (
          <p className="text-sm text-[#525252] mt-1">{description}</p>
        )}
      </div>
      {moreLink && (
        <Link
          href={moreLink}
          className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-black hover:underline underline-offset-4 shrink-0 font-medium"
        >
          {moreLabel || "全部"}
          <ArrowRight size={14} strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}
