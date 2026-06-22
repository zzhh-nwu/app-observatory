import Link from "next/link";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
};

const variantStyles = {
  default:
    "bg-black text-white border-2 border-black hover:bg-white hover:text-black",
  outline:
    "border-2 border-black bg-white text-black hover:bg-black hover:text-white",
  ghost:
    "text-black hover:underline underline-offset-4",
};

const sizeStyles = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-9 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-8 text-sm",
  icon: "size-9",
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
        "inline-flex shrink-0 items-center justify-center font-medium tracking-widest uppercase whitespace-nowrap transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
