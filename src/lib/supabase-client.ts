import { createBrowserClient } from "@supabase/ssr";

// 客户端组件使用的 Supabase 实例
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!url || !key) {
    // 构建时不抛错，运行时 console.warn
    if (typeof window !== "undefined") {
      console.warn("Supabase 未配置：请设置 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY 环境变量");
    }
    // 返回一个不会崩溃的 mock client
    return createBrowserClient(
      url || "https://placeholder.supabase.co",
      key || "placeholder-key"
    );
  }

  return createBrowserClient(url, key);
}
