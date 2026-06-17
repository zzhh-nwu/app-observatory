import Link from "next/link";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
};

const variantStyles = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  outline: "border border-border bg-background hover:bg-muted hover:text-foreground",
  ghost: "hover:bg-muted hover:text-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
};

const sizeStyles = {
  sm: "h-7 gap-1 rounded-lg px-2.5 text-xs",
  md: "h-8 gap-1.5 px-2.5 text-sm",
  lg: "h-10 gap-2 px-4 text-base rounded-xl",
  icon: "size-8",
};

export function LinkButton({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-colors rounded-lg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
