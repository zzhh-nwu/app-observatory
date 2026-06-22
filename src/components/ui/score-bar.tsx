import { AppScore } from "@/lib/types";

const dimensionLabels: { key: keyof AppScore; label: string }[] = [
  { key: "usability", label: "好用度" },
  { key: "privacy", label: "隐私与透明" },
  { key: "businessModel", label: "商业模式" },
  { key: "innovation", label: "技术创新" },
];

export function ScoreBars({ scores }: { scores: AppScore }) {
  return (
    <div className="space-y-3">
      {dimensionLabels.map(({ key, label }) => {
        const pct = (scores[key] / 10) * 100;
        return (
          <div key={key} className="flex items-center gap-3">
            <span
              className="text-sm text-[#525252] w-24 shrink-0"
              style={{ fontFamily: "var(--font-serif-body), Georgia, serif" }}
            >
              {label}
            </span>
            <div className="flex-1 h-3 bg-[#F5F5F5] border border-black overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span
              className="text-sm font-bold w-8 text-right tabular-nums"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
            >
              {scores[key]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
