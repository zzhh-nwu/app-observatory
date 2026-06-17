"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Send, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockApps } from "@/lib/mock-data";

export default function SubmitPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="skeleton h-8 w-48 mx-auto mb-4" />
        <div className="skeleton h-4 w-64 mx-auto" />
      </div>
    }>
      <SubmitForm />
    </Suspense>
  );
}

function SubmitForm() {
  const searchParams = useSearchParams();
  const preselectedApp = searchParams.get("app") || "";
  const type = searchParams.get("type") || "review"; // "review" | "app"

  const [title, setTitle] = useState("");
  const [selectedApp, setSelectedApp] = useState(preselectedApp);
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [scores, setScores] = useState({
    usability: 7,
    privacy: 7,
    businessModel: 7,
    innovation: 7,
  });

  const selectedAppData = mockApps.find((a) => a.slug === selectedApp);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">✍️ 撰写评测</h1>
        <p className="text-muted-foreground">
          分享你的深度使用体验，帮助社区做出更好的选择
        </p>
      </div>

      {/* Template hint */}
      <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6 flex items-start gap-3">
        <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium mb-1">评测模板已就绪</p>
          <p className="text-xs text-muted-foreground">
            点击下方「填充模板」按钮，自动生成评测大纲（概述、优点、缺点、使用场景等），你只需填充具体内容即可。
          </p>
        </div>
        <Button variant="outline" size="sm" className="shrink-0 ml-auto" onClick={() => {
          setContent(`## 评测背景\n\n（介绍一下你为什么评测这款App，使用了多长时间等）\n\n## 核心体验\n\n（描述你的主要使用感受）\n\n## 优点\n\n- \n- \n- \n\n## 缺点\n\n- \n- \n- \n\n## 适合谁？\n\n（描述这款App最推荐给哪类用户）\n\n## 数据可靠性分析\n\n（如果涉及隐私或数据问题，请在此说明）\n`);
        }}>
          填充模板
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-5">
          {/* App selector */}
          <div>
            <label className="block text-sm font-medium mb-2">选择App</label>
            <select
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">请选择要评测的App…</option>
              {mockApps.map((app) => (
                <option key={app.slug} value={app.slug}>
                  {app.icon} {app.name}
                </option>
              ))}
            </select>
            {!selectedApp && (
              <p className="text-xs text-muted-foreground mt-1">
                找不到？<Link href="/submit?type=app" className="text-primary hover:underline">先去提交新App</Link>
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">评测标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="如：豆包深度评测：国产AI助手的隐私模型真的过关吗？"
              className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-2">评测摘要</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="用一两句话概括你的评测观点，将显示在列表卡片中…"
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          {/* Content editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">评测正文（支持 Markdown）</label>
              <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                <button
                  onClick={() => setTab("write")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    tab === "write" ? "bg-card shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  编辑
                </button>
                <button
                  onClick={() => setTab("preview")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    tab === "preview" ? "bg-card shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <Eye className="h-3 w-3 inline mr-1" />
                  预览
                </button>
              </div>
            </div>

            {tab === "write" ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="在这里撰写评测正文…&#10;&#10;可以使用 Markdown 语法排版：&#10;## 二级标题&#10;### 三级标题&#10;**加粗** *斜体*&#10;- 列表项&#10;> 引用"
                rows={16}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
              />
            ) : (
              <div className="prose-app min-h-[400px] px-6 py-4 rounded-xl border border-border bg-card text-sm">
                {content ? (
                  <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br/>") }} />
                ) : (
                  <p className="text-muted-foreground italic">预览区域，开始编写后此处显示效果…</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Scoring */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-sm mb-4">📊 评分</h3>
            <div className="space-y-3">
              {[
                { key: "usability", label: "好用度" },
                { key: "privacy", label: "隐私与透明" },
                { key: "businessModel", label: "商业模式" },
                { key: "innovation", label: "技术创新" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono font-semibold">
                      {scores[key as keyof typeof scores]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={scores[key as keyof typeof scores]}
                    onChange={(e) =>
                      setScores((s) => ({ ...s, [key]: parseFloat(e.target.value) }))
                    }
                    className="w-full h-1.5 rounded-full appearance-none bg-muted accent-primary cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">综合评分</p>
              <p className="text-3xl font-bold text-primary">
                {(
                  (scores.usability + scores.privacy + scores.businessModel + scores.innovation) /
                  4
                ).toFixed(1)}
              </p>
            </div>
          </div>

          {/* Pro / Con */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-sm mb-3">快速标注</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">优点（逗号分隔）</label>
                <input
                  type="text"
                  placeholder="交互流畅, 生态整合好…"
                  className="w-full h-10 px-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">缺点（逗号分隔）</label>
                <input
                  type="text"
                  placeholder="隐私政策复杂, 功能深度不足…"
                  className="w-full h-10 px-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">适合谁？</label>
                <input
                  type="text"
                  placeholder="日常AI辅助用户…"
                  className="w-full h-10 px-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button className="w-full gap-2" size="lg">
            <Send className="h-4 w-4" />
            提交评测
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            提交后会进入审核，通过后即刻发布 🎉
          </p>
        </aside>
      </div>
    </div>
  );
}
