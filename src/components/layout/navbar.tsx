"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "发现" },
  { href: "/apps", label: "App 库" },
  { href: "/community", label: "社区" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-white">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="text-xl font-bold tracking-tighter"
            style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
          >
            拆解
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-widest uppercase transition-colors duration-100",
                pathname === link.href
                  ? "text-black border-b-2 border-black pb-1 -mb-1"
                  : "text-[#525252] hover:text-black"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="p-2 text-[#525252] hover:text-black transition-colors duration-100"
            aria-label="搜索"
          >
            <Search size={18} strokeWidth={1.5} />
          </Link>

          <Link
            href="/submit"
            className="hidden sm:inline-flex items-center gap-1.5 bg-black text-white px-4 py-1.5 text-xs font-medium
                       tracking-widest uppercase transition-colors duration-100 hover:bg-white hover:text-black border-2 border-black"
          >
            <Plus size={14} strokeWidth={2} />
            写评测
          </Link>

          <Link
            href="/auth"
            className="p-2 text-[#525252] hover:text-black transition-colors duration-100"
            aria-label="我的"
          >
            <User size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
