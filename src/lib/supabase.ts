import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 数据库表结构（参考，实际建表在 Supabase Dashboard 中执行）
//
// CREATE TABLE apps (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   slug text UNIQUE NOT NULL,
//   name text NOT NULL,
//   icon text DEFAULT '📱',
//   tagline text,
//   description text,
//   category text,
//   developer text,
//   platforms text[],
//   website text,
//   privacy_level text,
//   scores jsonb,
//   review_count int DEFAULT 0,
//   rating_count int DEFAULT 0,
//   tags text[],
//   created_at timestamptz DEFAULT now(),
//   updated_at timestamptz DEFAULT now()
// );
//
// CREATE TABLE reviews (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   slug text UNIQUE NOT NULL,
//   app_id uuid REFERENCES apps(id),
//   app_name text NOT NULL,
//   title text NOT NULL,
//   summary text,
//   content text,
//   author_id uuid REFERENCES auth.users(id),
//   scores jsonb,
//   pros text[],
//   cons text[],
//   best_for text,
//   trust_note text,
//   helpful_count int DEFAULT 0,
//   comment_count int DEFAULT 0,
//   is_collaborative boolean DEFAULT false,
//   created_at timestamptz DEFAULT now(),
//   updated_at timestamptz DEFAULT now()
// );
//
// CREATE TABLE profiles (
//   id uuid REFERENCES auth.users(id) PRIMARY KEY,
//   username text UNIQUE NOT NULL,
//   display_name text,
//   avatar text DEFAULT '👤',
//   bio text,
//   stats jsonb,
//   created_at timestamptz DEFAULT now()
// );
