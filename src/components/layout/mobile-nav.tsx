"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Users, PlusCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileLinks = [
  { href: "/", label: "发现", icon: Home },
  { href: "/apps", label: "App库", icon: LayoutGrid },
  { href: "/submit", label: "写评测", icon: PlusCircle },
  { href: "/community", label: "社区", icon: Users },
  { href: "/auth", label: "我的", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-0 px-2 py-1 rounded-lg transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium leading-tight">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
