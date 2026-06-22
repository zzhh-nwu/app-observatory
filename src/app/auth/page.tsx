"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase-client";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name, username: name },
          },
        });
        if (signUpError) throw signUpError;

        // 如果 Supabase 自动创建了 session（关闭了邮箱验证），直接登录
        if (data.session) {
          router.push("/");
          router.refresh();
          return;
        }

        // 否则邮箱验证开启，尝试立即登录（某些配置下仍可成功）
        const { error: autoLoginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (!autoLoginError) {
          router.push("/");
          router.refresh();
          return;
        }

        // 两种方式都失败，提示用户
        setError("注册成功！如果收不到验证邮件，请在 Supabase 后台关闭 Email Confirmations。");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        router.push("/");
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "操作失败";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "github" | "google") => {
    setLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <div className="text-center mb-10">
        <p
          className="text-xs tracking-widest uppercase text-[#525252] mb-3 font-medium"
          style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
        >
          账户
        </p>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          {mode === "login" ? "欢迎回来" : "加入拆解"}
        </h1>
        <p className="text-[#525252] text-sm mt-2">
          {mode === "login" ? "登录你的账号，继续评测之旅。" : "注册成为社区成员，开始分享你的 App 见解。"}
        </p>
      </div>

      {/* Tab */}
      <div className="flex border-2 border-black mb-6">
        <button
          onClick={() => { setMode("login"); setError(""); }}
          className={`flex-1 py-3 text-sm font-medium transition-colors duration-100 ${
            mode === "login" ? "bg-black text-white" : "text-[#525252] hover:text-black"
          }`}
        >
          登录
        </button>
        <button
          onClick={() => { setMode("register"); setError(""); }}
          className={`flex-1 py-3 text-sm font-medium transition-colors duration-100 ${
            mode === "register" ? "bg-black text-white" : "text-[#525252] hover:text-black"
          }`}
        >
          注册
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          className={`flex items-start gap-2 p-3 border-2 mb-5 text-sm ${
            error.includes("邮件")
              ? "border-black bg-black text-white"
              : "border-black text-black bg-white"
          }`}
        >
          <AlertCircle size={16} strokeWidth={1.5} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label
              className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
            >
              昵称
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="你的显示名称"
              required
              className="w-full h-12 px-4 border-2 border-black bg-white text-sm
                         placeholder:text-[#A3A3A3]
                         focus:border-4 focus:outline-none transition-all duration-100"
            />
          </div>
        )}

        <div>
          <label
            className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
            style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
          >
            邮箱
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full h-12 px-4 border-2 border-black bg-white text-sm
                       placeholder:text-[#A3A3A3]
                       focus:border-4 focus:outline-none transition-all duration-100"
          />
        </div>

        <div>
          <label
            className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
            style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
          >
            密码
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="至少8位字符"
            required
            minLength={8}
            className="w-full h-12 px-4 border-2 border-black bg-white text-sm
                       placeholder:text-[#A3A3A3]
                       focus:border-4 focus:outline-none transition-all duration-100"
          />
        </div>

        <button
          className="w-full bg-black text-white border-2 border-black px-6 py-4 text-sm font-medium
                     tracking-widest uppercase transition-colors duration-100
                     hover:bg-white hover:text-black inline-flex items-center justify-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "处理中…" : mode === "login" ? "登录" : "注册"}
          <ArrowRight size={14} strokeWidth={2} />
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D4D4D4]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-4 text-[#A3A3A3] tracking-widest uppercase font-medium">或</span>
        </div>
      </div>

      {/* OAuth */}
      <button
        onClick={() => handleOAuth("github")}
        disabled={loading}
        className="w-full border-2 border-black bg-white text-black px-6 py-4 text-sm font-medium
                   tracking-widest uppercase transition-colors duration-100
                   hover:bg-black hover:text-white inline-flex items-center justify-center gap-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        使用 GitHub 登录
      </button>

      <p className="text-xs text-[#A3A3A3] text-center mt-8">
        登录即表示同意我们的服务条款和隐私政策
      </p>
    </div>
  );
}
