// /auth 路由使用动态渲染，避免构建时因缺失 Supabase 环境变量而失败
export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
