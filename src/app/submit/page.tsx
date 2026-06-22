"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Send, Eye, FileText, ArrowRight, AppWindow } from "lucide-react";
import { mockApps } from "@/lib/mock-data";

export default function SubmitPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
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
  const initialType = searchParams.get("type") || "review";

  const [mode, setMode] = useState<"review" | "app">(initialType === "app" ? "app" : "review");
  const [submitted, setSubmitted] = useState(false);

  // ---- 评测表单 ----
  const [title, setTitle] = useState("");
  const [selectedApp, setSelectedApp] = useState(preselectedApp);
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [scores, setScores] = useState({ usability: 7, privacy: 7, businessModel: 7, innovation: 7 });
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [bestFor, setBestFor] = useState("");

  // ---- 提交 App 表单 ----
  const [appName, setAppName] = useState("");
  const [appDeveloper, setAppDeveloper] = useState("");
  const [appCategory, setAppCategory] = useState("AI工具");
  const [appDesc, setAppDesc] = useState("");
  const [appPlatforms, setAppPlatforms] = useState("iOS, Android, Web");
  const [appWebsite, setAppWebsite] = useState("");
  const [appIcon, setAppIcon] = useState("📱");

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) { alert("请先选择要评测的 App"); return; }
    if (!title.trim()) { alert("请填写评测标题"); return; }
    if (!content.trim()) { alert("请填写评测正文"); return; }
    setSubmitted(true);
  };

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName.trim()) { alert("请填写 App 名称"); return; }
    if (!appDeveloper.trim()) { alert("请填写开发商"); return; }
    if (!appDesc.trim()) { alert("请填写 App 简介"); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="text-6xl font-bold"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >—</p>
        <h2 className="text-3xl font-bold mt-6 tracking-tight"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          {mode === "review" ? "评测已提交" : "App 已提交"}
        </h2>
        <p className="text-[#525252] mt-3">
          {mode === "review"
            ? "感谢你的贡献！评测正在审核中，通过后即刻发布。"
            : `感谢你提交「${appName}」！管理员审核通过后会上架到 App 库。`}
        </p>
        <div className="mt-8">
          <Link href="/apps" className="text-sm font-medium tracking-widest uppercase text-black underline underline-offset-4">
            返回 App 库 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-12 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-[#525252] mb-3 font-medium"
          style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
        >提交</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          {mode === "review" ? "撰写评测" : "提交新 App"}
        </h1>
        <p className="mt-2 text-[#525252]">
          {mode === "review" ? "分享你的深度使用体验，帮助社区做出更好的选择。" : "向社区数据库中添加尚未收录的 App。"}
        </p>
      </div>

      {/* 模式切换 */}
      <div className="flex border-2 border-black mb-8">
        <button
          onClick={() => setMode("review")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors duration-100
            ${mode === "review" ? "bg-black text-white" : "text-[#525252] hover:text-black"}`}
        >
          <FileText size={14} strokeWidth={1.5} />
          写评测
        </button>
        <button
          onClick={() => setMode("app")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors duration-100
            ${mode === "app" ? "bg-black text-white" : "text-[#525252] hover:text-black"}`}
        >
          <AppWindow size={14} strokeWidth={1.5} />
          提交新 App
        </button>
      </div>

      {/* ================================
           评测表单
           ================================ */}
      {mode === "review" && (
        <form onSubmit={handleReviewSubmit} className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            {/* App 选择 */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
                style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
              >选择 App</label>
              <select
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
                className="w-full h-12 px-4 border-2 border-black bg-white text-sm focus:outline-none transition-all duration-100"
              >
                <option value="">请选择要评测的 App…</option>
                {mockApps.map((app) => (
                  <option key={app.slug} value={app.slug}>{app.icon} {app.name}</option>
                ))}
              </select>
              {!selectedApp && (
                <p className="text-xs text-[#525252] mt-1">
                  找不到？
                  <button type="button" onClick={() => setMode("app")} className="text-black underline underline-offset-4 ml-1">
                    先去提交新 App
                  </button>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
                style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
              >评测标题</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="如：ChatGPT 2026年中深度评测…"
                className="w-full h-12 px-4 border-2 border-black bg-white text-sm placeholder:text-[#A3A3A3] placeholder:italic
                           focus:border-4 focus:outline-none transition-all duration-100" />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
                style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
              >评测摘要</label>
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)}
                placeholder="用一两句话概括你的评测观点…" rows={2}
                className="w-full px-4 py-3 border-2 border-black bg-white text-sm placeholder:text-[#A3A3A3] placeholder:italic
                           focus:border-4 focus:outline-none transition-all duration-100 resize-none" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs tracking-widest uppercase text-[#525252] font-medium"
                  style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
                >正文（Markdown）</label>
                <div className="flex items-center gap-1 border-2 border-black">
                  <button type="button" onClick={() => setTab("write")}
                    className={`px-3 py-1 text-xs font-medium transition-colors duration-100 ${tab === "write" ? "bg-black text-white" : "text-[#525252]"}`}
                  >编辑</button>
                  <button type="button" onClick={() => setTab("preview")}
                    className={`px-3 py-1 text-xs font-medium transition-colors duration-100 ${tab === "preview" ? "bg-black text-white" : "text-[#525252]"}`}
                  ><Eye size={12} strokeWidth={1.5} className="inline mr-1" />预览</button>
                </div>
              </div>
              {tab === "write" ? (
                <textarea value={content} onChange={(e) => setContent(e.target.value)}
                  placeholder="在这里撰写评测正文…&#10;&#10;支持 Markdown：# 标题 ## 二级标题 **加粗** - 列表"
                  rows={16}
                  className="w-full px-4 py-3 border-2 border-black bg-white text-sm font-mono
                             focus:border-4 focus:outline-none transition-all duration-100 resize-y" />
              ) : (
                <div className="prose-app min-h-[400px] px-6 py-4 border-2 border-black bg-white text-sm">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br/>") }} />
                  ) : (
                    <p className="text-[#A3A3A3] italic">预览区域，开始编写后此处显示效果…</p>
                  )}
                </div>
              )}
            </div>

            {/* 模板按钮 */}
            <button type="button"
              onClick={() => setContent(
                "## 评测背景\n\n（介绍一下你为什么评测这款App，使用了多长时间）\n\n## 核心体验\n\n（描述主要使用感受）\n\n## 优点\n\n- \n- \n- \n\n## 缺点\n\n- \n- \n- \n\n## 适合谁？\n\n（推荐给哪类用户）\n\n## 数据可靠性分析\n\n（涉及隐私或数据问题请在此说明）\n"
              )}
              className="border-2 border-black px-5 py-2 text-xs font-medium tracking-widest uppercase
                         hover:bg-black hover:text-white transition-colors duration-100 inline-flex items-center gap-2"
            >
              <FileText size={14} strokeWidth={1.5} />
              填充评测模板
            </button>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="border-2 border-black p-5">
              <h3 className="font-bold text-sm mb-4"
                style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
              >评分</h3>
              <div className="space-y-4">
                {([
                  { key: "usability" as const, label: "好用度" },
                  { key: "privacy" as const, label: "隐私与透明" },
                  { key: "businessModel" as const, label: "商业模式" },
                  { key: "innovation" as const, label: "技术创新" },
                ]).map(({ key, label }) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#525252]">{label}</span>
                      <span className="font-bold" style={{ fontFamily: "var(--font-mono)" }}>{scores[key]}</span>
                    </div>
                    <input type="range" min="0" max="10" step="0.5" value={scores[key]}
                      onChange={(e) => setScores((s) => ({ ...s, [key]: parseFloat(e.target.value) }))}
                      className="w-full h-1.5 appearance-none bg-[#E5E5E5] cursor-pointer
                                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                                 [&::-webkit-slider-thumb]:bg-black" />
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t-2 border-black text-center">
                <p className="text-xs tracking-widest uppercase text-[#525252] mb-1 font-medium"
                  style={{ fontFamily: "var(--font-mono)" }}>综合评分</p>
                <p className="text-3xl font-bold"
                  style={{ fontFamily: "var(--font-serif-display)" }}
                >{((scores.usability + scores.privacy + scores.businessModel + scores.innovation) / 4).toFixed(1)}</p>
              </div>
            </div>

            <div className="border-2 border-black p-5">
              <h3 className="font-bold text-sm mb-3"
                style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
              >快速标注</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#525252] mb-1 block">优点（逗号分隔）</label>
                  <input type="text" value={pros} onChange={(e) => setPros(e.target.value)}
                    placeholder="交互流畅, 生态整合好…"
                    className="w-full h-10 px-3 border-2 border-black text-sm placeholder:text-[#A3A3A3] focus:border-4 focus:outline-none transition-all duration-100" />
                </div>
                <div>
                  <label className="text-xs text-[#525252] mb-1 block">缺点（逗号分隔）</label>
                  <input type="text" value={cons} onChange={(e) => setCons(e.target.value)}
                    placeholder="隐私政策复杂, 功能深度不足…"
                    className="w-full h-10 px-3 border-2 border-black text-sm placeholder:text-[#A3A3A3] focus:border-4 focus:outline-none transition-all duration-100" />
                </div>
                <div>
                  <label className="text-xs text-[#525252] mb-1 block">适合谁？</label>
                  <input type="text" value={bestFor} onChange={(e) => setBestFor(e.target.value)}
                    placeholder="日常AI辅助用户…"
                    className="w-full h-10 px-3 border-2 border-black text-sm placeholder:text-[#A3A3A3] focus:border-4 focus:outline-none transition-all duration-100" />
                </div>
              </div>
            </div>

            <button type="submit"
              className="w-full bg-black text-white border-2 border-black px-6 py-4 text-sm font-medium
                         tracking-widest uppercase transition-colors duration-100
                         hover:bg-white hover:text-black inline-flex items-center justify-center gap-2 cursor-pointer">
              <Send size={14} strokeWidth={2} />提交评测
            </button>
          </aside>
        </form>
      )}

      {/* ================================
           提交新 App 表单
           ================================ */}
      {mode === "app" && (
        <form onSubmit={handleAppSubmit} className="max-w-2xl space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >App 名称 *</label>
              <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)}
                placeholder="如：ChatGPT"
                className="w-full h-12 px-4 border-2 border-black text-sm placeholder:text-[#A3A3A3] focus:border-4 focus:outline-none transition-all duration-100" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >开发商 *</label>
              <input type="text" value={appDeveloper} onChange={(e) => setAppDeveloper(e.target.value)}
                placeholder="如：OpenAI"
                className="w-full h-12 px-4 border-2 border-black text-sm placeholder:text-[#A3A3A3] focus:border-4 focus:outline-none transition-all duration-100" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >分类</label>
              <select value={appCategory} onChange={(e) => setAppCategory(e.target.value)}
                className="w-full h-12 px-4 border-2 border-black bg-white text-sm focus:outline-none transition-all duration-100"
              >
                {["AI工具","社交通讯","效率工具","内容创作","学习教育","金融理财","健康生活","游戏娱乐","开发者工具","其它"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >平台</label>
              <input type="text" value={appPlatforms} onChange={(e) => setAppPlatforms(e.target.value)}
                placeholder="iOS, Android, Web"
                className="w-full h-12 px-4 border-2 border-black text-sm placeholder:text-[#A3A3A3] focus:border-4 focus:outline-none transition-all duration-100" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >图标 Emoji</label>
              <input type="text" value={appIcon} onChange={(e) => setAppIcon(e.target.value)}
                className="w-full h-12 px-4 border-2 border-black text-2xl focus:border-4 focus:outline-none transition-all duration-100 text-center" />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >官网链接</label>
            <input type="url" value={appWebsite} onChange={(e) => setAppWebsite(e.target.value)}
              placeholder="https://..."
              className="w-full h-12 px-4 border-2 border-black text-sm placeholder:text-[#A3A3A3] focus:border-4 focus:outline-none transition-all duration-100" />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >App 简介 *</label>
            <textarea value={appDesc} onChange={(e) => setAppDesc(e.target.value)}
              placeholder="描述这款 App 的功能和特点…" rows={4}
              className="w-full px-4 py-3 border-2 border-black text-sm placeholder:text-[#A3A3A3] focus:border-4 focus:outline-none transition-all duration-100 resize-y" />
          </div>

          <div className="pt-4">
            <button type="submit"
              className="w-full bg-black text-white border-2 border-black px-6 py-4 text-sm font-medium
                         tracking-widest uppercase transition-colors duration-100
                         hover:bg-white hover:text-black inline-flex items-center justify-center gap-2 cursor-pointer">
              <Send size={14} strokeWidth={2} />提交新 App
            </button>
          </div>

          <p className="text-xs text-[#525252] text-center">
            <button type="button" onClick={() => setMode("review")} className="text-black underline underline-offset-4">
              返回评测提交
            </button>
            <span className="mx-2">|</span>
            提交后管理员审核通过即上架
          </p>
        </form>
      )}
    </div>
  );
}
