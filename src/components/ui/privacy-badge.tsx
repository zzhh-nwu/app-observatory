import { cn } from "@/lib/utils";
import { PrivacyLevel } from "@/lib/types";
import { Shield, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";

const config: Record<PrivacyLevel, { icon: typeof Shield; color: string; label: string }> = {
  "A级·公开可审计": { icon: ShieldCheck, color: "bg-brand-green/10 text-brand-green border-brand-green/20", label: "A级" },
  "B级·部分公开": { icon: Shield, color: "bg-interact/10 text-interact border-interact/20", label: "B级" },
  "C级·信息不透明": { icon: ShieldAlert, color: "bg-warning/10 text-warning border-warning/20", label: "C级" },
  "待评估": { icon: ShieldQuestion, color: "bg-muted text-muted-foreground border-border", label: "待评" },
};

interface PrivacyBadgeProps {
  level: PrivacyLevel;
  size?: "sm" | "md";
}

export function PrivacyBadge({ level, size = "md" }: PrivacyBadgeProps) {
  const { icon: Icon, color, label } = config[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        color,
        size === "sm" ? "px-1.5 py-0 text-[10px]" : "px-2 py-0.5 text-xs"
      )}
      title={level}
    >
      <Icon className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      {label}
    </span>
  );
}
