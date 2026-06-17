"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name, username: name },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (signUpError) throw signUpError;
        // 注册成功提示
        setError("注册邮件已发送，请检查邮箱完成验证。");
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
    <div className="container mx-auto max-w-md px-4 py-12">
      <div className="text-center mb-8">
        <span className="text-4xl">🔭</span>
        <h1 className="text-2xl font-bold mt-3 mb-2">
          {mode === "login" ? "欢迎回来" : "加入 App 观察站"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {mode === "login" ? "登录你的账号，继续评测之旅" : "注册成为社区成员，开始分享你的App见解"}
        </p>
      </div>

      {/* Tab */}
      <div className="flex bg-muted rounded-xl p-1 mb-6">
        <button
          onClick={() => { setMode("login"); setError(""); }}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            mode === "login" ? "bg-card shadow-sm" : "text-muted-foreground"
          }`}
        >
          登录
        </button>
        <button
          onClick={() => { setMode("register"); setError(""); }}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            mode === "register" ? "bg-card shadow-sm" : "text-muted-foreground"
          }`}
        >
          注册
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className={`flex items-start gap-2 p-3 rounded-lg mb-4 text-sm ${
          error.includes("邮件") ? "bg-brand-green/10 text-brand-green" : "bg-destructive/10 text-destructive"
        }`}>
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="block text-sm font-medium mb-1.5">昵称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="你的显示名称"
              required
              className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1.5">邮箱</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="至少8位字符"
            required
            minLength={8}
            className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <Button className="w-full gap-2" size="lg" type="submit" disabled={loading}>
          {loading ? "处理中…" : mode === "login" ? "登录" : "注册"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {/* OAuth */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground">或</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full gap-2"
          size="lg"
          onClick={() => handleOAuth("github")}
          disabled={loading}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          使用 GitHub 登录
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-6">
        登录即表示同意我们的服务条款和隐私政策
      </p>
    </div>
  );
}
