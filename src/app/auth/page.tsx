"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, AlertCircle, Hash } from "lucide-react";
import { createClient } from "@/lib/supabase-client";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 第 1 步：发验证码
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("请输入邮箱地址"); return; }
    setLoading(true);

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    setLoading(false);
    if (otpError) {
      setError(otpError.message);
    } else {
      setStep("code");
    }
  };

  // 第 2 步：验证码登录
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!code.trim()) { setError("请输入验证码"); return; }
    setLoading(true);

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    setLoading(false);
    if (verifyError) {
      setError(verifyError.message);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  // GitHub OAuth（保留，可覆盖邮箱验证码/密码登录的不足）
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
          {step === "email" ? "登录 / 注册" : "验证邮箱"}
        </p>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-serif-display), 'Playfair Display', Georgia, serif" }}
        >
          {step === "email" ? "加入拆解" : "输入验证码"}
        </h1>
        <p className="text-[#525252] text-sm mt-2">
          {step === "email"
            ? "输入邮箱，收到 6 位验证码后即可登录（新用户自动注册）。"
            : `验证码已发送至 ${email}`}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 p-3 border-2 border-black text-black bg-white mb-5 text-sm">
          <AlertCircle size={16} strokeWidth={1.5} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* 第 1 步：输入邮箱 */}
      {step === "email" && (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <label
              className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
            >
              邮箱地址
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoFocus
              className="w-full h-12 px-4 border-2 border-black bg-white text-sm
                         placeholder:text-[#A3A3A3]
                         focus:border-4 focus:outline-none transition-all duration-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white border-2 border-black px-6 py-4 text-sm font-medium
                       tracking-widest uppercase transition-colors duration-100
                       hover:bg-white hover:text-black inline-flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "发送中…" : "发送验证码"}
            <Mail size={14} strokeWidth={2} />
          </button>

          {error && (
            <p className="text-xs text-[#525252] text-center">
              没收到？检查垃圾箱，或确认 QQ 邮箱已开通 SMTP 服务。
            </p>
          )}
        </form>
      )}

      {/* 第 2 步：输入验证码 */}
      {step === "code" && (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label
              className="block text-xs tracking-widest uppercase text-[#525252] font-medium mb-2"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
            >
              6 位验证码
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              required
              autoFocus
              maxLength={6}
              inputMode="numeric"
              className="w-full h-16 px-4 border-2 border-black bg-white text-3xl font-bold tracking-[0.5em] text-center
                         placeholder:text-[#D4D4D4]
                         focus:border-4 focus:outline-none transition-all duration-100"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-black text-white border-2 border-black px-6 py-4 text-sm font-medium
                       tracking-widest uppercase transition-colors duration-100
                       hover:bg-white hover:text-black inline-flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "验证中…" : "确认登录"}
            <Hash size={14} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={() => { setStep("email"); setError(""); setCode(""); }}
            className="w-full text-sm text-[#525252] underline underline-offset-4 hover:text-black"
          >
            返回修改邮箱
          </button>
        </form>
      )}

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D4D4D4]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-4 text-[#A3A3A3] tracking-widest uppercase font-medium">或</span>
        </div>
      </div>

      {/* GitHub OAuth */}
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
        新用户首次登录即自动注册 · 验证码 10 分钟内有效
      </p>
    </div>
  );
}
