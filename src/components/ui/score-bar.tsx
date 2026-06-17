import { AppScore } from "@/lib/types";

const dimensionLabels: { key: keyof AppScore; label: string; color: string }[] = [
  { key: "usability", label: "好用度", color: "bg-primary" },
  { key: "privacy", label: "隐私与透明", color: "bg-brand-green" },
  { key: "businessModel", label: "商业模式", color: "bg-interact" },
  { key: "innovation", label: "技术创新", color: "bg-warning" },
];

export function ScoreBars({ scores }: { scores: AppScore }) {
  return (
    <div className="space-y-2">
      {dimensionLabels.map(({ key, label, color }) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground w-20 shrink-0">{label}</span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${color}`}
              style={{ width: `${(scores[key] / 10) * 100}%` }}
            />
          </div>
          <span className="text-sm font-mono font-semibold w-8 text-right">{scores[key]}</span>
        </div>
      ))}
    </div>
  );
}
