import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App 观察站 · 产品海报",
  description: "从用户价值与数据可靠性出发，评测和追踪热门应用",
};

export default function PosterPage() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 0%, #13203d 0%, #0f172a 45%, #1e3a5f 100%)",
      }}
    >
      {/* ===== 背景层 ===== */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <StarLayer1 />
        <StarLayer2 />
        <StarLayer3 parallax />
        <NebulaGlow position="top-left" />
        <NebulaGlow position="bottom-right" />
        <RadarScan />
        <TelescopeSilhouette />
        <FloatingParticles />
      </div>

      {/* ===== 顶部毛玻璃导航条 ===== */}
      <TopBar />

      {/* ===== 主内容区 ===== */}
      <article
        className="relative z-10 w-full max-w-[600px] mx-auto px-5 pt-12 pb-10 md:pt-16 md:pb-14 flex flex-col items-center gap-9 md:gap-11"
        style={{ transform: "translateZ(0)" }}
      >
        <HeaderSection />
        <FeatureGrid />
        <ProcessBar />
        <BottomBar />
      </article>
    </div>
  );
}

/* ================================================================
   顶部毛玻璃导航条
   ================================================================ */

function TopBar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-5 transition-all duration-500"
      style={{
        background: "rgba(15,23,42,0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        transform: "translateZ(0)",
      }}
    >
      <span className="text-[11px] font-semibold text-white/50 tracking-wider">
        APP OBSERVATORY
      </span>
      <span className="text-[10px] font-medium text-white/30">2026</span>
    </header>
  );
}

/* ================================================================
   背景组件
   ================================================================ */

function StarLayer1() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    left: `${(i * 79 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    opacity: 0.08 + ((i * 31) % 100) * 0.0008,
  }));
  return (
    <div className="absolute inset-0" style={{ transform: "translateZ(0)" }}>
      {stars.map((s, i) => (
        <div
          key={`l1-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: "1px",
            height: "1px",
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

function StarLayer2() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    left: `${(i * 107 + 29) % 100}%`,
    top: `${(i * 83 + 19) % 100}%`,
    size: i % 3 === 0 ? "2px" : "1.5px",
    delay: `${(i * 0.9) % 4}s`,
    duration: `${2.5 + (i % 3) * 1.2}s`,
  }));
  return (
    <div className="absolute inset-0" style={{ transform: "translateZ(0)" }}>
      {stars.map((s, i) => (
        <div
          key={`l2-${i}`}
          className="absolute rounded-full bg-white animate-star-twinkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: 0.35,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}

function StarLayer3({ parallax }: { parallax?: boolean }) {
  const stars = Array.from({ length: 12 }, (_, i) => ({
    left: `${(i * 151 + 43) % 92}%`,
    top: `${(i * 97 + 23) % 88}%`,
    delay: `${(i * 1.3) % 3}s`,
  }));
  return (
    <div
      className="absolute inset-0"
      style={{ transform: parallax ? "translateZ(-10px) scale(1.5)" : "translateZ(0)" }}
    >
      {stars.map((s, i) => (
        <div
          key={`l3-${i}`}
          className="absolute rounded-full animate-star-twinkle"
          style={{
            left: s.left,
            top: s.top,
            width: "3px",
            height: "3px",
            background: "rgb(191,219,254)",
            boxShadow: "0 0 6px rgba(147,197,253,0.5), 0 0 12px rgba(147,197,253,0.2)",
            opacity: 0.5,
            animationDelay: s.delay,
            animationDuration: `${3 + i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

function NebulaGlow({ position }: { position: "top-left" | "bottom-right" }) {
  const isTL = position === "top-left";
  return (
    <div
      className="absolute rounded-full"
      style={{
        [isTL ? "top" : "bottom"]: isTL ? "-5%" : "-8%",
        [isTL ? "left" : "right"]: isTL ? "-10%" : "-8%",
        width: "350px",
        height: "280px",
        background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
        filter: "blur(40px)",
        opacity: 0.2,
        transform: "translateZ(0)",
      }}
    />
  );
}

function RadarScan() {
  return (
    <div
      className="absolute bottom-16 right-8 w-24 h-24 pointer-events-none"
      style={{ opacity: 0.08, transform: "translateZ(0)" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full animate-radar-spin">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#60a5fa" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#60a5fa" strokeWidth="0.3" />
        <line x1="50" y1="50" x2="50" y2="5" stroke="#60a5fa" strokeWidth="0.5" />
        <path
          d="M50 50 L50 5 A45 45 0 0 1 95 50 Z"
          fill="url(#radarGrad)"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
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
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2"
      style={{ opacity: 0.12, transform: "translateZ(0)" }}
    >
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
  const particles = Array.from({ length: 6 }, (_, i) => ({
    left: `${12 + (i * 43 + 17) % 76}%`,
    delay: `${i * 1.1}s`,
    duration: `${9 + i * 4}s`,
    size: `${2 + (i % 2)}px`,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ transform: "translateZ(0)" }}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-particle-float"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: "rgba(147,197,253,0.45)",
            boxShadow: `0 0 ${parseInt(p.size) * 4}px rgba(147,197,253,0.35)`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ================================================================
   内容组件
   ================================================================ */

function HeaderSection() {
  return (
    <header
      className="flex flex-col items-center text-center gap-3 animate-fade-in-up"
      style={{ animationDelay: "0ms", transform: "translateZ(0)" }}
    >
      <RadarIcon />
      <h1
        className="text-[60px] md:text-[74px] font-extrabold tracking-wide leading-none"
        style={{
          color: "#ffffff",
          textShadow: "0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.2), 0 0 120px rgba(59,130,246,0.08)",
        }}
      >
        App 观察站
      </h1>
      <p className="text-[17px] md:text-[19px] text-[#cbd5e1] font-normal max-w-[360px] leading-relaxed">
        从「用户价值」与「数据可靠性」出发
        <br />
        评测和追踪热门应用
      </p>
      <span className="text-[11px] text-[#64748b] font-light tracking-[0.25em] uppercase">
        App Observatory · 2026
      </span>
    </header>
  );
}

function FeatureGrid() {
  const cards = [
    { icon: <ChartIcon />, title: "多维度评分", desc: "好用度 · 隐私 · 商业 · 创新", delay: 100 },
    { icon: <ShieldIcon />, title: "隐私可信度", desc: "A / B / C 三级社区评级", delay: 200 },
    { icon: <UsersIcon />, title: "社区协作", desc: "多人投稿 · 开源共建", delay: 300 },
    { icon: <BotIcon />, title: "AI 深度评测", desc: "结构化模板 · 数据驱动", delay: 400 },
  ];

  return (
    <section className="w-[95%] md:w-[65%] grid grid-cols-2 gap-3 md:gap-4">
      {cards.map((c) => (
        <div
          key={c.title}
          className="glass-card-pro flex flex-col items-center text-center gap-2.5 p-6 md:p-7 rounded-xl cursor-default animate-fade-in-up"
          style={{ animationDelay: `${c.delay}ms`, transform: "translateZ(0)" }}
        >
          <div className="mb-1">{c.icon}</div>
          <h3 className="text-[15px] md:text-[16px] font-semibold text-white tracking-wide">
            {c.title}
          </h3>
          <p className="text-[11px] md:text-[12px] text-[#94a3b8] font-medium leading-relaxed">
            {c.desc}
          </p>
        </div>
      ))}
    </section>
  );
}

function ProcessBar() {
  const steps = ["自然语言描述需求", "Claude Code 智能体", "全栈代码生成", "Vercel 部署"];
  return (
    <section
      className="glass-card-pro w-full p-3.5 md:p-4 rounded-xl animate-fade-in-up"
      style={{
        animationDelay: "500ms",
        transform: "scale(0.92) translateZ(0)",
        opacity: 0.6,
      }}
    >
      <div className="hidden sm:flex items-center gap-1.5 md:gap-2">
        <span className="text-[10px] font-semibold text-[#3b82f6] tracking-wider uppercase shrink-0">制作思路</span>
        <span className="w-px h-4 bg-white/8 shrink-0" />
        {steps.map((s, i) => (
          <span key={s} className="flex items-center gap-1.5 md:gap-2">
            <span className="text-[10px] md:text-[11px] font-medium text-[#cbd5e1] whitespace-nowrap">{s}</span>
            {i < steps.length - 1 && (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M6 4L10 8L6 12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        ))}
      </div>
      <div className="flex sm:hidden flex-col gap-1.5">
        <span className="text-[10px] font-semibold text-[#3b82f6] tracking-wider uppercase">制作思路</span>
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: i === 0 ? "#3b82f6" : "rgba(148,163,184,0.45)" }} />
            <span className="text-[11px] font-medium text-[#cbd5e1]">{s}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomBar() {
  const techs = ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"];
  return (
    <footer
      className="w-full flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 sm:gap-0 animate-fade-in-up"
      style={{ animationDelay: "600ms", transform: "translateZ(0)" }}
    >
      {/* 左：作业说明 */}
      <p className="text-[11px] md:text-[12px] text-[#94a3b8] font-medium text-center sm:text-left sm:w-[30%]">
        数字经济硕士课程作业
        <br />
        GitHub 开源 · 免费长期部署
      </p>

      {/* 中：技术栈标签 */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:w-[35%]">
        {techs.map((t) => (
          <span
            key={t}
            className="text-[9px] md:text-[10px] font-medium px-2 py-0.5 rounded-md text-[#94a3b8]"
            style={{ background: "rgba(148,163,184,0.06)", border: "1px solid rgba(148,163,184,0.1)" }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* 右：二维码 */}
      <div className="flex flex-col items-center gap-1 sm:w-[25%] sm:items-end">
        <div
          className="glass-card-pro w-[64px] h-[64px] rounded-lg flex items-center justify-center"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <span className="text-[9px] text-[#94a3b8] font-medium">扫码访问</span>
      </div>
    </footer>
  );
}

/* ================================================================
   图标
   ================================================================ */

const iconGlow = { filter: "drop-shadow(0 0 10px rgba(96,165,250,0.5)) drop-shadow(0 0 20px rgba(96,165,250,0.2))" } as const;

function RadarIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ filter: "drop-shadow(0 0 8px rgba(96,165,250,0.5)) drop-shadow(0 0 16px rgba(96,165,250,0.2))" }}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="12" x2="12" y2="2" />
      <line x1="12" y1="12" x2="20" y2="12" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconGlow}>
      <rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="7" width="4" height="14" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconGlow}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconGlow}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function BotIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconGlow}>
      <rect x="3" y="4" width="18" height="16" rx="2" /><line x1="8" y1="10" x2="8" y2="10" strokeWidth="3" strokeLinecap="round" /><line x1="16" y1="10" x2="16" y2="10" strokeWidth="3" strokeLinecap="round" /><path d="M8 15h8" />
    </svg>
  );
}
