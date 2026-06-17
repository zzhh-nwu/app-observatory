-- ================================================================
-- App 观察站 · Supabase 数据库 Schema（可重复执行）
-- ================================================================

-- 先清理旧策略（避免重复创建报错）
DROP POLICY IF EXISTS "profiles_read" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "apps_read" ON public.apps;
DROP POLICY IF EXISTS "apps_insert" ON public.apps;
DROP POLICY IF EXISTS "apps_update" ON public.apps;
DROP POLICY IF EXISTS "reviews_read" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert" ON public.reviews;
DROP POLICY IF EXISTS "reviews_update" ON public.reviews;
DROP POLICY IF EXISTS "reviews_delete" ON public.reviews;
DROP POLICY IF EXISTS "comments_read" ON public.comments;
DROP POLICY IF EXISTS "comments_insert" ON public.comments;

-- 删掉旧触发器
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 1. 用户资料表
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  display_name text NOT NULL DEFAULT '新用户',
  avatar text DEFAULT '👤',
  bio text DEFAULT '',
  stats jsonb DEFAULT '{"reviews": 0, "helpfulVotes": 0, "badges": []}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- 2. App 表
CREATE TABLE IF NOT EXISTS public.apps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  icon text DEFAULT '📱',
  tagline text DEFAULT '',
  description text DEFAULT '',
  category text DEFAULT '其他',
  developer text DEFAULT '',
  platforms text[] DEFAULT '{}',
  website text DEFAULT '',
  privacy_level text DEFAULT '待评估',
  scores jsonb DEFAULT '{"usability": 0, "privacy": 0, "businessModel": 0, "innovation": 0, "overall": 0}'::jsonb,
  review_count int DEFAULT 0,
  rating_count int DEFAULT 0,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. 评测表
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  app_id uuid REFERENCES public.apps(id) ON DELETE CASCADE NOT NULL,
  app_name text NOT NULL,
  title text NOT NULL,
  summary text DEFAULT '',
  content text DEFAULT '',
  author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  scores jsonb DEFAULT '{"usability": 0, "privacy": 0, "businessModel": 0, "innovation": 0, "overall": 0}'::jsonb,
  pros text[] DEFAULT '{}',
  cons text[] DEFAULT '{}',
  best_for text DEFAULT '',
  trust_note text DEFAULT '',
  helpful_count int DEFAULT 0,
  comment_count int DEFAULT 0,
  is_collaborative boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. 评论表
CREATE TABLE IF NOT EXISTS public.comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id uuid REFERENCES public.reviews(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ================================================================
-- 索引（IF NOT EXISTS 兼容）
-- ================================================================
CREATE INDEX IF NOT EXISTS idx_apps_slug ON public.apps(slug);
CREATE INDEX IF NOT EXISTS idx_apps_category ON public.apps(category);
CREATE INDEX IF NOT EXISTS idx_reviews_app_id ON public.reviews(app_id);
CREATE INDEX IF NOT EXISTS idx_reviews_author_id ON public.reviews(author_id);
CREATE INDEX IF NOT EXISTS idx_reviews_slug ON public.reviews(slug);
CREATE INDEX IF NOT EXISTS idx_comments_review_id ON public.comments(review_id);

-- ================================================================
-- 触发器：新用户注册自动创建 profile
-- ================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', '新用户'),
    '👤'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================================================
-- RLS 安全策略
-- ================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "apps_read" ON public.apps FOR SELECT USING (true);
CREATE POLICY "apps_insert" ON public.apps FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "apps_update" ON public.apps FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "reviews_read" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "reviews_update" ON public.reviews FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "reviews_delete" ON public.reviews FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "comments_read" ON public.comments FOR SELECT USING (true);
CREATE POLICY "comments_insert" ON public.comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
