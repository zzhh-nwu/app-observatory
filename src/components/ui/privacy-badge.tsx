import { cn } from "@/lib/utils";
import { PrivacyLevel } from "@/lib/types";
import { Shield, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";

const config: Record<PrivacyLevel, { icon: typeof Shield; style: string; label: string }> = {
  "A级·公开可审计": {
    icon: ShieldCheck,
    style: "bg-black text-white border-black",
    label: "A级",
  },
  "B级·部分公开": {
    icon: Shield,
    style: "bg-white text-black border-black",
    label: "B级",
  },
  "C级·信息不透明": {
    icon: ShieldAlert,
    style: "bg-white text-[#525252] border-[#D4D4D4]",
    label: "C级",
  },
  "待评估": {
    icon: ShieldQuestion,
    style: "bg-[#F5F5F5] text-[#A3A3A3] border-[#E5E5E5]",
    label: "待评",
  },
};

interface PrivacyBadgeProps {
  level: PrivacyLevel;
  size?: "sm" | "md";
}

export function PrivacyBadge({ level, size = "md" }: PrivacyBadgeProps) {
  const { icon: Icon, style, label } = config[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border font-medium",
        style,
        size === "sm" ? "px-1.5 py-0 text-[10px]" : "px-2 py-0.5 text-xs"
      )}
      title={level}
    >
      <Icon className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} strokeWidth={1.5} />
      {label}
    </span>
  );
}
