"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, PlusCircle, Users, User } from "lucide-react";
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t-2 border-black bg-white safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-0 px-2 py-1 transition-colors duration-100",
                isActive ? "text-black" : "text-[#A3A3A3] hover:text-black"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
              <span className="text-[10px] font-medium tracking-widest uppercase leading-tight">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
