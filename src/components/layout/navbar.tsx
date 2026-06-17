"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, PlusCircle, User } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "发现" },
  { href: "/apps", label: "App库" },
  { href: "/community", label: "社区" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🔭</span>
          <span className="text-lg font-bold text-foreground hidden sm:inline">
            App 观察站
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LinkButton variant="ghost" size="icon" className="hidden sm:inline-flex" href="/search">
            <Search className="h-5 w-5" />
            <span className="sr-only">搜索</span>
          </LinkButton>

          <LinkButton size="sm" className="hidden sm:inline-flex gap-1.5" href="/submit">
            <PlusCircle className="h-4 w-4" />
            写评测
          </LinkButton>

          <LinkButton variant="ghost" size="icon" href="/auth">
            <User className="h-5 w-5" />
            <span className="sr-only">我的</span>
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
