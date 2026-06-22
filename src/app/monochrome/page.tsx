"use client";

import {
  Telescope,
  Star,
  Users,
  ArrowRight,
  Shield,
  TrendingUp,
  Sparkles,
  Quote,
  Minus,
  Plus,
} from "lucide-react";

export default function MonochromePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "var(--font-serif-body), Georgia, serif",
        backgroundColor: "#FFFFFF",
        color: "#000000",
      }}
    >
      {/* ============================================================
           SECTION 1: HERO — 超大标题 + 装饰线
           ============================================================ */}
      <HeroSection />

      <ThickRule />

      {/* ============================================================
           SECTION 2: 功能卡片 — Hover 反转
           ============================================================ */}
      <FeatureCards />

      <ThickRule />

      {/* ============================================================
           SECTION 3: 统计数据 — 黑底白字反转
           ============================================================ */}
      <StatsSection />

      <ThickRule />

      {/* ============================================================
           SECTION 4: 按钮系统
           ============================================================ */}
      <ButtonShowcase />

      <ThickRule />

      {/* ============================================================
           SECTION 5: 编辑式引用 — Pull Quote
           ============================================================ */}
      <PullQuoteSection />

      <ThickRule />

      {/* ============================================================
           SECTION 6: 内容卡片 — 图片 Hover 效果
           ============================================================ */}
      <ContentCards />

      <ThickRule />

      {/* ============================================================
           SECTION 7: 底部 CTA — 反转
           ============================================================ */}
      <CTASection />

      {/* ===== 底部装饰线 ===== */}
      <div className="h-2 bg-black" />
    </div>
  );
}

/* ================================================================
   Hero
   ================================================================ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-6xl px-8 lg:px-12 py-32 md:py-40 lg:py-48">
        {/* 装饰元素：粗线 + 带边框小方块 */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-32 h-2 bg-black" />
          <div className="w-4 h-4 border-2 border-black" />
        </div>

        {/* 主标题 */}
        <h1
          className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tighter"
          style={{
            fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif",
          }}
        >
          App
          <br />
          观 察 站
        </h1>

        {/* 副标题 */}
        <p
          className="mt-10 text-lg md:text-xl text-[#525252] max-w-lg leading-relaxed"
          style={{ fontFamily: "var(--font-serif-body), Georgia, serif" }}
        >
          从「用户价值」与「数据可靠性」出发，
          评测和追踪热门应用。一个社区共建的 App 数据库。
        </p>

        {/* CTA 按钮 */}
        <div className="mt-12 flex items-center gap-6">
          <PrimaryButton href="/apps">
            探索 App 库
            <ArrowRight size={16} strokeWidth={2} className="ml-1 inline" />
          </PrimaryButton>
          <GhostButton href="/submit">开始写评测 →</GhostButton>
        </div>

        {/* 底部元数据 */}
        <div className="mt-20 flex items-center gap-6">
          <MetaLabel icon={<Telescope size={14} strokeWidth={1.5} />} text="社区评测平台" />
          <div className="w-px h-4 bg-[#E5E5E5]" />
          <MetaLabel icon={<Star size={14} strokeWidth={1.5} />} text="2026" />
          <div className="w-px h-4 bg-[#E5E5E5]" />
          <MetaLabel icon={<Shield size={14} strokeWidth={1.5} />} text="开源数据" />
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Feature Cards — 四卡网格 + Hover 颜色反转
   ================================================================ */
function FeatureCards() {
  const features = [
    {
      icon: TrendingUp,
      title: "多维度评分",
      desc: "好用度 · 隐私透明 · 商业模式 · 技术创新 — 四个维度全面评估每款 App",
    },
    {
      icon: Shield,
      title: "隐私可信度",
      desc: "社区共同维护的数据可靠性评级，让隐私透明成为选择标准",
    },
    {
      icon: Users,
      title: "社区协作",
      desc: "多人协作撰写评测，像开源一样共建 App 知识库",
    },
    {
      icon: Sparkles,
      title: "AI 辅助分析",
      desc: "结构化评测模板，数据驱动的内容洞察",
    },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-8 lg:px-12 py-24 md:py-32">
      {/* 纹理 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div>
        {/* 区域标题 */}
        <SectionLabel label="功能亮点" />
        <h2
          className="mt-4 text-4xl md:text-5xl font-bold leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          社区驱动的
          <br />
          App 评测体系
        </h2>

        {/* 卡片网格 — 2x2 */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group border-2 border-black p-8 transition-colors duration-100 hover:bg-black hover:text-white"
            >
              <f.icon size={24} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors duration-100" />
              <h3
                className="mt-5 text-xl font-bold tracking-tight text-black group-hover:text-white transition-colors duration-100"
                style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
              >
                {f.title}
              </h3>
              <p className="mt-3 text-[#525252] leading-relaxed group-hover:text-white/70 transition-colors duration-100">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Stats — 黑底反转 + 竖线纹理
   ================================================================ */
function StatsSection() {
  const stats = [
    { value: "328", label: "已收录 App" },
    { value: "742", label: "社区评测" },
    { value: "2,860", label: "社区成员" },
    { value: "96.5%", label: "好评率" },
  ];

  return (
    <section
      className="relative py-24 md:py-32 px-8 lg:px-12"
      style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
    >
      {/* 竖线纹理 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 1px, #fff 1px, #fff 2px)`,
          backgroundSize: "4px 100%",
          opacity: 0.03,
        }}
      />
      {/* 径向光 */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-full pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at top center, #ffffff, transparent 70%)`,
          opacity: 0.05,
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-5xl md:text-6xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
              >
                {s.value}
              </p>
              <p className="mt-3 text-sm tracking-widest uppercase text-white/40 font-medium"
                style={{ fontFamily: "var(--font-mono-mm), 'JetBrains Mono', monospace" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Button Showcase
   ================================================================ */
function ButtonShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-8 lg:px-12 py-24 md:py-32">
      <SectionLabel label="交互组件" />
      <h2
        className="mt-4 text-4xl md:text-5xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
      >
        按钮与控件
      </h2>

      <div className="mt-14 space-y-10">
        {/* 实心黑按钮 */}
        <div>
          <p className="text-xs tracking-widest uppercase text-[#525252] mb-4"
            style={{ fontFamily: "var(--font-mono-mm), 'JetBrains Mono', monospace" }}
          >
            Primary Button
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <PrimaryButton>提交评测</PrimaryButton>
            <PrimaryButton disabled>禁用状态</PrimaryButton>
          </div>
        </div>

        {/* 描边按钮 */}
        <div>
          <p className="text-xs tracking-widest uppercase text-[#525252] mb-4"
            style={{ fontFamily: "var(--font-mono-mm), 'JetBrains Mono', monospace" }}
          >
            Outline Button
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <OutlineButton>浏览全部</OutlineButton>
            <OutlineButton disabled>禁用状态</OutlineButton>
          </div>
        </div>

        {/* Ghost / 文字链接 */}
        <div>
          <p className="text-xs tracking-widest uppercase text-[#525252] mb-4"
            style={{ fontFamily: "var(--font-mono-mm), 'JetBrains Mono', monospace" }}
          >
            Ghost / Text Link
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <GhostButton>了解更多 →</GhostButton>
          </div>
        </div>

        {/* 输入框 */}
        <div>
          <p className="text-xs tracking-widest uppercase text-[#525252] mb-4"
            style={{ fontFamily: "var(--font-mono-mm), 'JetBrains Mono', monospace" }}
          >
            Text Input
          </p>
          <input
            type="text"
            placeholder="输入 App 名称搜索…"
            className="w-full max-w-md px-4 py-3 text-base border-0 border-b-2 border-black bg-transparent
                       placeholder:text-[#525252] placeholder:italic
                       focus:border-b-4 focus:outline-none transition-all duration-100"
          />
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Pull Quote — 编辑式引用
   ================================================================ */
function PullQuoteSection() {
  return (
    <section className="mx-auto max-w-6xl px-8 lg:px-12 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        {/* 超大引号 */}
        <Quote
          size={64}
          strokeWidth={1}
          className="text-black/10 mb-6"
        />

        <blockquote
          className="text-2xl md:text-3xl italic leading-relaxed"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          &ldquo;这个平台改变了我选择 App 的方式。不再被广告和刷分误导，
          真实的社区评测让我看到了每个应用的本质。&rdquo;
        </blockquote>

        <div className="mt-8 flex items-center gap-4">
          <div className="w-12 h-12 border-2 border-black flex items-center justify-center">
            <span className="text-lg font-bold" style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}>L</span>
          </div>
          <div>
            <p className="font-bold text-sm">李同学</p>
            <p className="text-xs text-[#525252] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-mono-mm), 'JetBrains Mono', monospace" }}
            >
              数字经济专业 · 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Content Cards — 图片 Hover（边框加粗 + 图片缩放）
   ================================================================ */
function ContentCards() {
  const cards = [
    {
      title: "AI 工具深度评测",
      tag: "评测方法",
      date: "2026.06",
      desc: "我们如何评估一款 AI 工具的可靠性、隐私保护和商业可持续性？",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&auto=format",
    },
    {
      title: "隐私评级体系",
      tag: "标准",
      date: "2026.05",
      desc: "App 观察站的 A/B/C 三级隐私评级标准详解",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&auto=format",
    },
    {
      title: "社区协作指南",
      tag: "贡献",
      date: "2026.06",
      desc: "如何参与多人协作评测？从注册到发布你的第一篇深度评测",
      image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&h=600&fit=crop&auto=format",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-8 lg:px-12 py-24 md:py-32">
      <SectionLabel label="最新内容" />
      <h2
        className="mt-4 text-4xl md:text-5xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
      >
        深度文章
      </h2>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((c) => (
          <div key={c.title} className="group cursor-pointer">
            {/* 图片区域 */}
            <div
              className="aspect-[4/3] border-2 border-black transition-all duration-100 group-hover:border-4 overflow-hidden"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 grayscale group-hover:grayscale-0"
                loading="lazy"
              />
            </div>

            {/* 元数据 */}
            <div className="mt-4 flex items-center gap-3">
              <span
                className="text-xs tracking-widest uppercase text-[#525252]"
                style={{ fontFamily: "var(--font-mono-mm), 'JetBrains Mono', monospace" }}
              >
                {c.tag}
              </span>
              <Minus size={12} strokeWidth={1} className="text-[#E5E5E5]" />
              <span
                className="text-xs tracking-widest uppercase text-[#525252]"
                style={{ fontFamily: "var(--font-mono-mm), 'JetBrains Mono', monospace" }}
              >
                {c.date}
              </span>
            </div>

            {/* 标题 */}
            <h3
              className="mt-3 text-xl font-bold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
            >
              {c.title}
            </h3>

            <p className="mt-2 text-sm text-[#525252] leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   Final CTA — 黑底反转
   ================================================================ */
function CTASection() {
  return (
    <section
      className="relative py-24 md:py-32 px-8 lg:px-12 text-center"
      style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
    >
      {/* 纹理 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #ffffff, transparent 70%)`,
          opacity: 0.05,
        }}
      />

      <div className="relative mx-auto max-w-2xl">
        <Plus size={32} strokeWidth={1} className="mx-auto mb-8 text-white/40" />

        <h2
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          准备好分享你的
          <br />
          App 见解了吗？
        </h2>

        <p className="mt-6 text-white/50 text-lg leading-relaxed">
          写一篇评测，帮助更多人做出更好的选择。
        </p>

        <div className="mt-10">
          <button
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white text-sm font-medium
                       tracking-widest uppercase transition-colors duration-100
                       hover:bg-white hover:text-black"
          >
            ✍️ 开始写评测
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   共享小组件
   ================================================================ */

/** 4px 黑色粗线分隔 */
function ThickRule() {
  return <div className="h-2 bg-black w-full" />;
}

/** 区域小标签 */
function SectionLabel({ label }: { label: string }) {
  return (
    <p
      className="text-xs tracking-widest uppercase text-[#525252]"
      style={{ fontFamily: "var(--font-mono-mm), 'JetBrains Mono', monospace" }}
    >
      {label}
    </p>
  );
}

/** 元数据标签（Hero 底部） */
function MetaLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#525252]"
      style={{ fontFamily: "var(--font-mono-mm), 'JetBrains Mono', monospace" }}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

/** 主按钮 — 黑底白字，Hover 反转 */
function PrimaryButton({
  children,
  href,
  disabled,
}: {
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
}) {
  const className = `
    inline-flex items-center gap-2 px-8 py-4 text-sm font-medium
    tracking-widest uppercase transition-colors duration-100
    focus-visible:outline focus-visible:outline-3 focus-visible:outline-black focus-visible:outline-offset-3
    ${disabled
      ? "bg-[#E5E5E5] text-[#A3A3A3] border-2 border-[#E5E5E5] cursor-not-allowed"
      : "bg-black text-white border-2 border-black hover:bg-white hover:text-black"
    }
  `.replace(/\s+/g, " ").trim();

  if (href) {
    return <a href={href} className={className}>{children}</a>;
  }
  return <button className={className} disabled={disabled}>{children}</button>;
}

/** 描边按钮 */
function OutlineButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 px-8 py-4 text-sm font-medium
        tracking-widest uppercase transition-colors duration-100
        focus-visible:outline focus-visible:outline-3 focus-visible:outline-black focus-visible:outline-offset-3
        ${disabled
          ? "border-2 border-[#E5E5E5] text-[#A3A3A3] cursor-not-allowed"
          : "border-2 border-black text-black hover:bg-black hover:text-white"
        }
      `.replace(/\s+/g, " ").trim()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/** 文字链接 */
function GhostButton({ children, href }: { children: React.ReactNode; href?: string }) {
  const className = `
    text-sm font-medium tracking-widest uppercase text-black
    hover:underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-black focus-visible:outline-offset-2
  `.replace(/\s+/g, " ").trim();

  if (href) {
    return <a href={href} className={className}>{children}</a>;
  }
  return <button className={className}>{children}</button>;
}
