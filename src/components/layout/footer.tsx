import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white pb-24 md:pb-8">
      <div className="container mx-auto max-w-6xl px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h4
              className="text-lg font-bold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
            >
              拆解
            </h4>
            <p className="text-sm text-[#525252] leading-relaxed">
              从用户价值与数据可靠性出发，
              <br />
              拆解每一款热门应用。
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase text-[#525252] mb-4 font-medium"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
            >
              浏览
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/apps" className="text-black hover:underline underline-offset-4 transition-all">
                  App 数据库
                </Link>
              </li>
              <li>
                <Link href="/apps?sort=rating" className="text-black hover:underline underline-offset-4 transition-all">
                  最高评分
                </Link>
              </li>
              <li>
                <Link href="/apps?tag=AI工具" className="text-black hover:underline underline-offset-4 transition-all">
                  AI 工具榜
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-black hover:underline underline-offset-4 transition-all">
                  社区成员
                </Link>
              </li>
            </ul>
          </div>

          {/* Contribute */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase text-[#525252] mb-4 font-medium"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
            >
              参与
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/submit" className="text-black hover:underline underline-offset-4 transition-all">
                  写评测
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/zzhh-nwu/app-observatory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline underline-offset-4 transition-all"
                >
                  GitHub 开源
                </a>
              </li>
            </ul>
          </div>

          {/* Meta */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase text-[#525252] mb-4 font-medium"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
            >
              关于
            </h4>
            <p className="text-sm text-[#525252] leading-relaxed">
              数字经济课程作业
              <br />
              智能体编程实践
              <br />
              <span className="text-xs opacity-60">
                &copy; {new Date().getFullYear()} 拆解 · Deconstruct
              </span>
            </p>
          </div>
        </div>

        {/* 底部粗线 */}
        <div className="mt-12 h-2 bg-black w-full" />
      </div>
    </footer>
  );
}
