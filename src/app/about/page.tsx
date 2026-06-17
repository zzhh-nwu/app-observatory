import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-10">
        <span className="text-5xl">🔭</span>
        <h1 className="text-3xl font-bold mt-4 mb-3">关于 App 观察站</h1>
        <p className="text-muted-foreground text-lg">
          从用户价值与数据可靠性出发，评测和追踪热门应用
        </p>
      </div>

      <div className="prose-app space-y-8">
        <section>
          <h2>我们的使命</h2>
          <p>
            App 观察站是一个以「数字经济视角」为核心的App评测社区。我们相信，评价一款App不应只看它好不好用，
            更要关注它的数据隐私实践、商业模式的可持续性，以及技术创新带来的社会价值。
          </p>
          <p>
            在AI应用爆发的2026年，用户面临着前所未有的选择困难。我们希望通过社区的力量，建立一个透明、可信、
            有深度的App评测数据库，让每个人都能做出更好的数字产品选择。
          </p>
        </section>

        <section>
          <h2>评测维度</h2>
          <ul>
            <li><strong>产品好用度</strong> — 交互设计、用户体验、功能完整性</li>
            <li><strong>数据隐私与透明度</strong> — 数据收集范围、隐私政策清晰度、第三方审计情况</li>
            <li><strong>商业模式可持续性</strong> — 盈利模式、定价合理性、长期发展潜力</li>
            <li><strong>技术创新性</strong> — 技术方案的前沿性、与竞品的差异化程度</li>
          </ul>
        </section>

        <section>
          <h2>社区协作</h2>
          <p>
            App 观察站是一个开源协作项目。所有评测内容由社区成员贡献，代码在 GitHub 上公开。
            我们欢迎任何形式的参与：写评测、提交App词条、改进网站功能，或者只是分享你的使用体验。
          </p>
        </section>

        <section>
          <h2>课程信息</h2>
          <p>
            本项目是「数字经济」硕士课程的实践作业，也是「智能体编程」方法论的实践案例。
            网站的全部代码通过 AI 辅助生成，展示了自然语言驱动开发的完整流程。
          </p>
          <p className="text-sm text-muted-foreground">
            © 2026 App Observatory · 数字经济课程作业
          </p>
        </section>

        <div className="text-center pt-6">
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            ✍️ 加入我们，开始评测
          </Link>
        </div>
      </div>
    </div>
  );
}
