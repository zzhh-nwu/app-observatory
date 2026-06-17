// ========== 核心数据类型 ==========

export type Platform = "iOS" | "Android" | "Web" | "macOS" | "Windows";

export type AppCategory =
  | "AI工具"
  | "社交通讯"
  | "效率工具"
  | "内容创作"
  | "学习教育"
  | "金融理财"
  | "健康生活"
  | "游戏娱乐"
  | "开发者工具"
  | "其他";

export type PrivacyLevel = "A级·公开可审计" | "B级·部分公开" | "C级·信息不透明" | "待评估";

export interface AppScore {
  usability: number;        // 好用度 0-10
  privacy: number;          // 隐私与透明 0-10
  businessModel: number;    // 商业模式可持续性 0-10
  innovation: number;       // 技术创新性 0-10
  overall: number;          // 综合评分 0-10
}

export interface AppEntry {
  id: string;
  slug: string;
  name: string;
  icon: string;            // emoji 或 URL
  tagline: string;         // 一句话介绍
  description: string;
  category: AppCategory;
  developer: string;
  platforms: Platform[];
  website: string;
  privacyLevel: PrivacyLevel;
  scores: AppScore;
  reviewCount: number;
  ratingCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  slug: string;
  appId: string;
  appName: string;
  title: string;
  summary: string;         // 评测摘要
  content: string;         // Markdown 正文
  author: UserBrief;
  scores: AppScore;
  pros: string[];
  cons: string[];
  bestFor: string;         // 适合谁
  trustNote?: string;      // 数据可靠性备注
  helpfulCount: number;
  commentCount: number;
  isCollaborative: boolean;
  collaborators?: UserBrief[];
  createdAt: string;
  updatedAt: string;
}

export interface UserBrief {
  username: string;
  displayName: string;
  avatar: string;
}

export interface UserProfile {
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  joinedAt: string;
  stats: {
    reviews: number;
    helpfulVotes: number;
    badges: Badge[];
  };
}

export type Badge =
  | "评测新星"
  | "资深评测官"
  | "数据侦探"
  | "隐私卫士"
  | "社区先锋"
  | "AI行家";

export interface Ranking {
  id: string;
  title: string;
  description: string;
  apps: AppEntry[];
  type: "weekly" | "monthly" | "category" | "editorPick";
}
