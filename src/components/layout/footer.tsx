import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 pb-20 md:pb-6">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-sm mb-3">App 观察站</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">关于我们</Link></li>
              <li><Link href="/apps" className="hover:text-foreground transition-colors">App数据库</Link></li>
              <li><Link href="/community" className="hover:text-foreground transition-colors">社区成员</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">参与贡献</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/submit" className="hover:text-foreground transition-colors">写评测</Link></li>
              <li><Link href="/submit?type=app" className="hover:text-foreground transition-colors">提交新App</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub 开源</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">榜单</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/apps?sort=rating" className="hover:text-foreground transition-colors">最高评分</Link></li>
              <li><Link href="/apps?tag=AI工具" className="hover:text-foreground transition-colors">AI工具榜</Link></li>
              <li><Link href="/apps?sort=privacy" className="hover:text-foreground transition-colors">隐私最佳</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">课程信息</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              数字经济课程作业<br />
              智能体编程实践项目<br />
              <span className="text-xs opacity-60">© 2026 App Observatory</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
