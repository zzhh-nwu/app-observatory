"use client";

import { useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const dismiss = useCallback(() => {
    if (fading) return;
    setFading(true);
    setTimeout(() => setVisible(false), 400);
  }, [fading]);

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center cursor-pointer bg-white
                  transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
    >
      {/* 顶部黑条 */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-black" />

      <div className="text-center px-6" onClick={(e) => e.stopPropagation()} style={{ pointerEvents: "none" }}>
        {/* 装饰 */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-20 h-1.5 bg-black" />
          <div className="w-3 h-3 border-2 border-black" />
          <div className="w-20 h-1.5 bg-black" />
        </div>

        {/* 主标题 */}
        <h1
          className="text-7xl md:text-[10rem] lg:text-[12rem] font-bold leading-none tracking-tighter"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          拆解
        </h1>

        {/* 副标题 */}
        <p
          className="mt-8 text-lg md:text-xl text-[#525252] max-w-xs mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-serif-body), Georgia, serif" }}
        >
          从「用户价值」与「数据可靠性」出发，
          拆解每一款热门应用。
        </p>

        {/* 元数据 */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <span
            className="text-xs tracking-widest uppercase text-[#A3A3A3] font-medium"
            style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
          >
            2026
          </span>
          <div className="w-px h-3 bg-[#D4D4D4]" />
          <span
            className="text-xs tracking-widest uppercase text-[#A3A3A3] font-medium"
            style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
          >
            数字经济 · 社区评测平台
          </span>
        </div>
      </div>

      {/* 底部提示 */}
      <div
        className={`absolute bottom-12 left-0 right-0 text-center transition-all duration-500 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        <p
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#A3A3A3] font-medium"
          style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
        >
          点击任意位置进入
          <ArrowRight size={14} strokeWidth={1.5} />
        </p>
      </div>
    </div>
  );
}
