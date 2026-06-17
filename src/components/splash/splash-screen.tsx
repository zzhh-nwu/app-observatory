"use client";

import { useState, useCallback } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const dismiss = useCallback(() => {
    if (fading) return;
    setFading(true);
    setTimeout(() => setVisible(false), 600);
  }, [fading]);

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 0%, #13203d 0%, #0f172a 45%, #1e3a5f 100%)",
      }}
    >
      {/* ===== 背景层（与海报完全一致） ===== */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <StarLayer1 />
        <StarLayer2 />
        <StarLayer3 />
        <NebulaGlow position="top-left" />
        <NebulaGlow position="bottom-right" />
        <RadarScan />
        <TelescopeSilhouette />
        <FloatingParticles />
      </div>

      {/* ===== 顶部毛玻璃条 ===== */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-5"
        style={{
          background: "rgba(15,23,42,0.4)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="text-[13px] font-semibold text-white/50 tracking-wider">APP OBSERVATORY</span>
        <span className="text-[12px] font-medium text-white/30">2026</span>
      </div>

      {/* ===== 海报内容 ===== */}
      <div
        className="relative z-10 w-full max-w-[600px] mx-auto px-5 flex flex-col items-center gap-8 md:gap-10 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: "translateZ(0)", pointerEvents: "none" }}
      >
        {/* 标题 */}
        <div className="flex flex-col items-center text-center gap-3 pt-10">
          <svg
            width="34" height="34" viewBox="0 0 24 24" fill="none"
            stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 8px rgba(96,165,250,0.5))" }}
          >
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
            <line x1="12" y1="12" x2="12" y2="2" /><line x1="12" y1="12" x2="20" y2="12" />
          </svg>
          <h1
            className="text-[62px] md:text-[77px] font-extrabold tracking-wide leading-none"
            style={{
              color: "#ffffff",
              textShadow: "0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.2)",
            }}
          >
            App 观察站
          </h1>
          <p className="text-[19px] md:text-[22px] text-[#cbd5e1] font-normal max-w-[420px] leading-relaxed">
            从「用户价值」与「数据可靠性」出发，评测和追踪热门应用
          </p>
          <span className="text-[13px] text-[#64748b] font-light tracking-[0.25em] uppercase">
            App Observatory · 2026
          </span>
        </div>

        {/* 四卡片 */}
        <div className="w-[95%] md:w-[65%] grid grid-cols-2 gap-3 md:gap-4">
          {[
            { title: "多维度评分", desc: "好用度 · 隐私 · 商业 · 创新" },
            { title: "隐私可信度", desc: "A / B / C 三级社区评级" },
            { title: "社区协作", desc: "多人投稿 · 开源共建" },
            { title: "AI 深度评测", desc: "结构化模板 · 数据驱动" },
          ].map((c) => (
            <div
              key={c.title}
              className="glass-card-pro flex flex-col items-center text-center gap-2 p-5 md:p-6 rounded-xl"
              style={{ transform: "translateZ(0)" }}
            >
              <p className="text-[17px] md:text-[18px] font-semibold text-white tracking-wide">{c.title}</p>
              <p className="text-[13px] text-[#94a3b8] font-medium">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* 流程条 */}
        <div
          className="glass-card-pro w-full p-3.5 rounded-xl"
          style={{ transform: "scale(0.92) translateZ(0)", opacity: 0.6 }}
        >
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[14px] font-semibold text-[#3b82f6] uppercase tracking-wider shrink-0">制作思路</span>
            <span className="w-px h-5 bg-white/8 shrink-0" />
            {["自然语言 →", "Claude Code →", "全栈代码 →", "Vercel 部署"].map((s, i) => (
              <span key={s} className="text-[14px] font-medium text-[#cbd5e1] whitespace-nowrap">{s}</span>
            ))}
          </div>
          <div className="flex sm:hidden justify-center">
            <span className="text-[14px] font-medium text-[#cbd5e1]">
              自然语言 → Claude Code → 全栈代码 → Vercel 部署
            </span>
          </div>
        </div>

        {/* 底部 */}
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-1.5">
            {["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"].map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md text-[#94a3b8]"
                style={{ background: "rgba(148,163,184,0.06)", border: "1px solid rgba(148,163,184,0.1)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 点击提示 ===== */}
      <div
        className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-700 ${
          fading ? "opacity-0 translate-y-2" : "opacity-100"
        }`}
      >
        <p className="text-[16px] font-medium text-white/40 tracking-wider animate-pulse">
          点击任意位置进入网站
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   内联背景组件（与海报页完全一致）
   ================================================================ */

function StarLayer1() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    left: `${(i * 79 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    opacity: 0.08 + ((i * 31) % 100) * 0.0008,
  }));
  return (
    <div className="absolute inset-0" style={{ transform: "translateZ(0)" }}>
      {stars.map((s, i) => (
        <div key={`l1-${i}`} className="absolute rounded-full bg-white"
          style={{ left: s.left, top: s.top, width: "1px", height: "1px", opacity: s.opacity }} />
      ))}
    </div>
  );
}

function StarLayer2() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    left: `${(i * 107 + 29) % 100}%`,
    top: `${(i * 83 + 19) % 100}%`,
    size: i % 3 === 0 ? "2px" : "1.5px",
    delay: `${(i * 0.9) % 4}s`,
    duration: `${2.5 + (i % 3) * 1.2}s`,
  }));
  return (
    <div className="absolute inset-0" style={{ transform: "translateZ(0)" }}>
      {stars.map((s, i) => (
        <div key={`l2-${i}`} className="absolute rounded-full bg-white animate-star-twinkle"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, opacity: 0.35,
            animationDelay: s.delay, animationDuration: s.duration }} />
      ))}
    </div>
  );
}

function StarLayer3() {
  const stars = Array.from({ length: 10 }, (_, i) => ({
    left: `${(i * 151 + 43) % 92}%`,
    top: `${(i * 97 + 23) % 88}%`,
    delay: `${(i * 1.3) % 3}s`,
  }));
  return (
    <div className="absolute inset-0" style={{ transform: "translateZ(0)" }}>
      {stars.map((s, i) => (
        <div key={`l3-${i}`} className="absolute rounded-full animate-star-twinkle"
          style={{ left: s.left, top: s.top, width: "3px", height: "3px",
            background: "rgb(191,219,254)", boxShadow: "0 0 6px rgba(147,197,253,0.5), 0 0 12px rgba(147,197,253,0.2)",
            opacity: 0.5, animationDelay: s.delay, animationDuration: `${3 + i * 0.4}s` }} />
      ))}
    </div>
  );
}

function NebulaGlow({ position }: { position: "top-left" | "bottom-right" }) {
  const isTL = position === "top-left";
  return (
    <div className="absolute rounded-full" style={{
      [isTL ? "top" : "bottom"]: isTL ? "-5%" : "-8%",
      [isTL ? "left" : "right"]: isTL ? "-10%" : "-8%",
      width: "350px", height: "280px",
      background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
      filter: "blur(40px)", opacity: 0.2, transform: "translateZ(0)",
    }} />
  );
}

function RadarScan() {
  return (
    <div className="absolute bottom-16 right-8 w-24 h-24" style={{ opacity: 0.08, transform: "translateZ(0)" }}>
      <svg viewBox="0 0 100 100" className="w-full h-full animate-radar-spin">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#60a5fa" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#60a5fa" strokeWidth="0.3" />
        <line x1="50" y1="50" x2="50" y2="5" stroke="#60a5fa" strokeWidth="0.5" />
        <path d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" fill="url(#radarGrad2)" opacity="0.5" />
        <defs>
          <linearGradient id="radarGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function TelescopeSilhouette() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ opacity: 0.12, transform: "translateZ(0)" }}>
      <svg width="280" height="140" viewBox="0 0 280 140" fill="none">
        <path d="M50 120C50 70 110 40 140 40C170 40 230 70 230 120" stroke="white" strokeWidth="1" fill="none" />
        <rect x="85" y="120" width="110" height="18" rx="2" fill="white" />
        <line x1="140" y1="55" x2="165" y2="20" stroke="white" strokeWidth="1" />
        <line x1="125" y1="120" x2="100" y2="140" stroke="white" strokeWidth="0.8" />
        <line x1="155" y1="120" x2="180" y2="140" stroke="white" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 5 }, (_, i) => ({
    left: `${12 + (i * 43 + 17) % 76}%`,
    delay: `${i * 1.1}s`,
    duration: `${9 + i * 4}s`,
    size: `${2 + (i % 2)}px`,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ transform: "translateZ(0)" }}>
      {particles.map((p, i) => (
        <div key={i} className="absolute rounded-full animate-particle-float"
          style={{ left: p.left, bottom: "-10px", width: p.size, height: p.size,
            background: "rgba(147,197,253,0.45)", boxShadow: `0 0 ${parseInt(p.size) * 4}px rgba(147,197,253,0.35)`,
            animationDelay: p.delay, animationDuration: p.duration }} />
      ))}
    </div>
  );
}
