"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function CallbackPage() {
  return (
    <Suspense fallback={<CallbackLoading />}>
      <CallbackHandler />
    </Suspense>
  );
}

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      router.replace("/auth?error=no_code");
      return;
    }

    const supabase = createClient();
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        router.replace(`/auth?error=${encodeURIComponent(error.message)}`);
      } else {
        router.replace("/");
      }
    });
  }, [router, searchParams]);

  return <CallbackLoading />;
}

function CallbackLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-sm text-[#525252]" style={{ fontFamily: "var(--font-mono)" }}>
        验证中…
      </p>
    </div>
  );
}
