import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-12 py-12">
      <div className="mb-12">
        <p
          className="text-xs tracking-widest uppercase text-[#525252] mb-3 font-medium"
          style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
        >
          关于
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          拆解
        </h1>
        <p className="mt-3 text-lg text-[#525252] leading-relaxed">
          从用户价值与数据可靠性出发，拆解每一款热门应用。
        </p>
      </div>

      <div className="prose-app space-y-10">
        <section>
          <h2>使命</h2>
          <p>
            拆解是一个以「数字经济视角」为核心的 App 评测社区。我们相信，评价一款 App 不应只看它好不好用，
            更要关注它的数据隐私实践、商业模式的可持续性，以及技术创新带来的社会价值。
          </p>
          <p>
            在 AI 应用爆发的 2026 年，用户面临着前所未有的选择困难。我们希望通过社区的力量，建立一个透明、可信、
            有深度的 App 评测数据库。
          </p>
        </section>

        <section>
          <h2>评测维度</h2>
          <ul>
            <li><strong>产品好用度</strong> — 交互设计、用户体验、功能完整性</li>
            <li><strong>数据隐私与透明度</strong> — 数据收集范围、隐私政策清晰度</li>
            <li><strong>商业模式可持续性</strong> — 盈利模式、定价合理性</li>
            <li><strong>技术创新性</strong> — 技术方案的前沿性、差异化程度</li>
          </ul>
        </section>

        <section>
          <h2>社区协作</h2>
          <p>
            拆解是一个开源协作项目。所有评测内容由社区成员贡献，代码在 GitHub 上公开。
            欢迎任何形式的参与：写评测、提交 App 词条、改进网站功能。
          </p>
        </section>

        <section>
          <h2>课程信息</h2>
          <p>
            本项目是「数字经济」硕士课程的实践作业，也是「智能体编程」方法论的实践案例。
            网站全部代码通过 AI 辅助生成，展示了自然语言驱动开发的完整流程。
          </p>
          <p
            className="text-xs tracking-widest uppercase text-[#525252] mt-4"
            style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
          >
            &copy; {new Date().getFullYear()} 拆解 · Deconstruct
          </p>
        </section>
      </div>

      <div className="mt-12 h-2 bg-black w-full" />

      <div className="mt-10 text-center">
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 bg-black text-white border-2 border-black px-8 py-4 text-sm font-medium
                     tracking-widest uppercase transition-colors duration-100 hover:bg-white hover:text-black"
        >
          加入我们，开始评测
          <ArrowRight size={15} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
