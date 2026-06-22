import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "拆解 · 产品海报",
  description: "从用户价值与数据可靠性出发，拆解每一款热门应用。",
};

export default function PosterPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[480px] mx-auto">
        {/* 顶部标签 */}
        <p
          className="text-xs tracking-widest uppercase text-[#525252] text-center mb-16 font-medium"
          style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
        >
          数字经济课程实践项目 · 2026
        </p>

        {/* 装饰 */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <div className="w-16 h-2 bg-black" />
          <div className="w-4 h-4 border-2 border-black" />
          <div className="w-16 h-2 bg-black" />
        </div>

        {/* 主标题 */}
        <h1
          className="text-7xl md:text-9xl font-bold leading-none tracking-tighter text-center"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          拆解
        </h1>

        {/* 副标题 */}
        <p
          className="mt-10 text-lg text-[#525252] text-center leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: "var(--font-serif-body), Georgia, serif" }}
        >
          从「用户价值」与「数据可靠性」出发，
          拆解每一款热门应用。
        </p>

        {/* 四个维度卡片 */}
        <div className="mt-16 grid grid-cols-2 gap-4">
          {[
            { title: "多维度评分", desc: "好用度 · 隐私 · 商业 · 创新" },
            { title: "隐私可信度", desc: "A / B / C 三级社区评级" },
            { title: "社区协作", desc: "多人投稿 · 开源共建" },
            { title: "AI 深度评测", desc: "结构化模板 · 数据驱动" },
          ].map((c) => (
            <div key={c.title} className="border-2 border-black p-5 text-center">
              <p
                className="text-base font-bold tracking-tight"
                style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
              >
                {c.title}
              </p>
              <p className="text-xs text-[#525252] mt-1.5">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* 制作流程 */}
        <div className="mt-6 border-2 border-black p-4 text-center">
          <p
            className="text-xs tracking-widest uppercase text-[#525252] mb-2 font-medium"
            style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
          >
            制作思路
          </p>
          <p className="text-sm text-[#525252]">
            自然语言 → Claude Code → 全栈代码 → Vercel 部署
          </p>
        </div>

        {/* 技术栈 */}
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          {["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"].map((t) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 border border-black text-[#525252]">
              {t}
            </span>
          ))}
        </div>

        {/* 底部 */}
        <div className="mt-16 pt-12 border-t-2 border-black">
          <p
            className="text-xs tracking-widest uppercase text-[#A3A3A3] text-center"
            style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
          >
            拆解 · Deconstruct
          </p>
        </div>
      </div>
    </div>
  );
}
