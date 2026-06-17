import { AppEntry, Review, UserProfile, Ranking } from "./types";

export const mockUsers: Record<string, UserProfile> = {
  alice: {
    username: "alice",
    displayName: "Alice·数字观察",
    avatar: "👩‍💻",
    bio: "数字经济在读研究生，关注AI产品的隐私与数据伦理。",
    joinedAt: "2026-03-15",
    stats: { reviews: 12, helpfulVotes: 238, badges: ["资深评测官", "隐私卫士"] },
  },
  bob: {
    username: "bob",
    displayName: "Bob·产品猎人",
    avatar: "🕵️",
    bio: "5年产品经理，热爱挖掘好用App。擅长从商业模式角度分析产品。",
    joinedAt: "2026-04-02",
    stats: { reviews: 8, helpfulVotes: 156, badges: ["评测新星", "AI行家"] },
  },
  carol: {
    username: "carol",
    displayName: "Carol·UX探索者",
    avatar: "🎨",
    bio: "交互设计师，关注App的可用性与用户体验细节。",
    joinedAt: "2026-05-10",
    stats: { reviews: 5, helpfulVotes: 89, badges: ["评测新星"] },
  },
  david: {
    username: "david",
    displayName: "David·数据侦探",
    avatar: "🔍",
    bio: "数据工程师，专门深挖App背后的数据逻辑和隐私政策。",
    joinedAt: "2026-02-28",
    stats: { reviews: 15, helpfulVotes: 421, badges: ["资深评测官", "数据侦探", "社区先锋"] },
  },
};

export const mockApps: AppEntry[] = [
  {
    id: "1",
    slug: "doubao",
    name: "豆包",
    icon: "🫘",
    tagline: "字节跳动旗下的AI智能助手，全能型国产AI对话工具",
    description: "豆包是字节跳动推出的AI对话助手，支持多模态交互，集成在抖音等字节系产品中。作为国产AI助手的代表，豆包在中文理解、多轮对话和实际应用场景方面表现突出，但其数据收集范围也引发了隐私关注。",
    category: "AI工具",
    developer: "字节跳动",
    platforms: ["iOS", "Android", "Web"],
    website: "https://www.doubao.com",
    privacyLevel: "B级·部分公开",
    scores: { usability: 8.5, privacy: 6.0, businessModel: 7.5, innovation: 8.0, overall: 7.6 },
    reviewCount: 24,
    ratingCount: 186,
    tags: ["AI助手", "多模态", "免费", "国产"],
    createdAt: "2026-01-15",
    updatedAt: "2026-06-10",
  },
  {
    id: "2",
    slug: "deepseek",
    name: "DeepSeek",
    icon: "🐋",
    tagline: "开源AI模型的标杆，推理能力强悍的国产大模型",
    description: "DeepSeek以开源和强大推理能力闻名，其V3和R1系列模型在全球AI社区引发巨大反响。作为国产开源模型的旗帜，DeepSeek在技术透明度和开放性上为行业树立了新标准。",
    category: "AI工具",
    developer: "深度求索",
    platforms: ["iOS", "Android", "Web"],
    website: "https://chat.deepseek.com",
    privacyLevel: "A级·公开可审计",
    scores: { usability: 8.0, privacy: 8.5, businessModel: 6.5, innovation: 9.5, overall: 8.3 },
    reviewCount: 31,
    ratingCount: 245,
    tags: ["AI助手", "开源", "推理", "国产"],
    createdAt: "2026-01-20",
    updatedAt: "2026-06-12",
  },
  {
    id: "3",
    slug: "kimi",
    name: "Kimi",
    icon: "🌙",
    tagline: "月之暗面出品，超长上下文AI助手",
    description: "Kimi以超长上下文处理能力著称，可以一次处理数十万字的文档。在长文阅读、论文分析和合同审阅等场景表现优异，成为知识工作者的得力工具。",
    category: "AI工具",
    developer: "月之暗面",
    platforms: ["iOS", "Android", "Web"],
    website: "https://kimi.moonshot.cn",
    privacyLevel: "B级·部分公开",
    scores: { usability: 8.2, privacy: 6.5, businessModel: 7.0, innovation: 8.5, overall: 7.7 },
    reviewCount: 18,
    ratingCount: 132,
    tags: ["AI助手", "长文本", "知识工作", "国产"],
    createdAt: "2026-02-01",
    updatedAt: "2026-06-08",
  },
  {
    id: "4",
    slug: "jimeng",
    name: "即梦",
    icon: "🎬",
    tagline: "字节跳动AI视频生成工具，文字秒变视频",
    description: "即梦是字节跳动推出的AI视频创作平台，支持文生视频、图生视频等功能。在短视频创作盛行的当下，即梦大幅降低了视频内容创作的门槛。",
    category: "内容创作",
    developer: "字节跳动",
    platforms: ["iOS", "Android", "Web"],
    website: "https://jimeng.jianying.com",
    privacyLevel: "B级·部分公开",
    scores: { usability: 7.8, privacy: 5.5, businessModel: 7.0, innovation: 8.8, overall: 7.3 },
    reviewCount: 15,
    ratingCount: 98,
    tags: ["AI视频", "内容创作", "短视频", "国产"],
    createdAt: "2026-03-01",
    updatedAt: "2026-06-05",
  },
  {
    id: "5",
    slug: "notion",
    name: "Notion",
    icon: "📝",
    tagline: "全能型笔记与协作工具，知识管理的瑞士军刀",
    description: "Notion将笔记、数据库、项目管理、Wiki等功能融为一体，配合强大的AI功能，已成为全球最受欢迎的 productivity 工具之一。其灵活的模块化设计让每个用户都能打造属于自己的工作空间。",
    category: "效率工具",
    developer: "Notion Labs",
    platforms: ["iOS", "Android", "Web", "macOS", "Windows"],
    website: "https://www.notion.so",
    privacyLevel: "B级·部分公开",
    scores: { usability: 9.0, privacy: 7.0, businessModel: 8.5, innovation: 9.0, overall: 8.5 },
    reviewCount: 28,
    ratingCount: 310,
    tags: ["笔记", "协作", "项目管理", "AI"],
    createdAt: "2026-01-10",
    updatedAt: "2026-06-15",
  },
  {
    id: "6",
    slug: "wechat",
    name: "微信",
    icon: "💬",
    tagline: "中国超级App，从即时通讯到数字生活基础设施",
    description: "微信早已超越聊天工具的定义，成为集支付、小程序、视频号、企业微信于一体的数字生活平台。作为中国数字经济的基础设施，微信的商业模式、数据生态和隐私实践值得深入分析。",
    category: "社交通讯",
    developer: "腾讯",
    platforms: ["iOS", "Android", "macOS", "Windows"],
    website: "https://weixin.qq.com",
    privacyLevel: "C级·信息不透明",
    scores: { usability: 8.5, privacy: 4.5, businessModel: 9.0, innovation: 7.5, overall: 7.2 },
    reviewCount: 20,
    ratingCount: 267,
    tags: ["社交", "支付", "小程序", "生态系统"],
    createdAt: "2026-01-05",
    updatedAt: "2026-06-14",
  },
];

export const mockReviews: Review[] = [
  {
    id: "r1",
    slug: "deepseek-privacy-analysis",
    appId: "2",
    appName: "DeepSeek",
    title: "DeepSeek：开源模型的数据隐私模型真的过关吗？",
    summary: "作为国产开源大模型的代表，DeepSeek在技术透明度和数据隐私方面的表现如何？本文从开源程度、数据处理政策、用户控制权三个维度进行深度评测。",
    content: `## 评测背景

DeepSeek在2025-2026年间以开源模型的身份迅速崛起，其V3和R1系列模型在全球AI评测中多次进入前列。然而，"开源"并不自动等同于"隐私友好"。本文将从数字经济的数据治理视角出发，对DeepSeek进行全方位评测。

## 优点

- **模型权重开源**：DeepSeek是少数公开完整模型权重的国产大模型，第三方可以独立进行安全审计
- **技术白皮书详实**：训练方法、数据来源、模型架构均有详细文档
- **本地部署可行**：提供开源版本供个人和企业在本地部署，数据不离开自己的服务器
- **推理能力一流**：尤其在逻辑推理和代码生成方面表现出色

## 缺点

- **云端服务的隐私政策仍有提升空间**：虽然本地版开源，但官方App的数据处理条款仍需仔细阅读
- **商业模式不清晰**：长期免费可持续性存疑，未来可能引入商业化功能
- **用户数据控制权有限**：对话历史等数据的管理选项还比较简单

## 适合谁？

- 对AI透明度和可审计性有要求的研究者和开发者
- 希望在本地部署AI、掌控数据的企业用户
- 需要强推理能力的知识工作者

## 数据可靠性分析

DeepSeek在数据透明度方面处于国产AI工具的第一梯队。其开源策略为第三方安全审计提供了可能，这是目前大多数国产AI产品无法做到的。建议用户优先使用本地部署版本以获得最大的数据控制权。

**可信度评分：8.5/10**`,
    author: mockUsers.david,
    scores: { usability: 8.0, privacy: 8.5, businessModel: 6.5, innovation: 9.5, overall: 8.3 },
    pros: ["模型开源可审计", "本地部署数据安全", "推理能力强悍", "技术文档详细"],
    cons: ["云端隐私政策待完善", "商业模式不清晰", "用户数据控制选项少"],
    bestFor: "关注AI透明度的研究者、需要本地部署的企业用户",
    trustNote: "开源权重是数据可靠性的最强保障，但需注意官方托管服务的隐私条款与开源版本不同。",
    helpfulCount: 89,
    commentCount: 23,
    isCollaborative: false,
    createdAt: "2026-05-20",
    updatedAt: "2026-06-10",
  },
  {
    id: "r2",
    slug: "doubao-ux-review",
    appId: "1",
    appName: "豆包",
    title: "豆包体验评测：国产AI助手的「全能」是优势还是陷阱？",
    summary: "豆包作为字节跳动的旗舰AI产品，在多模态交互和生态整合方面有天然优势。但「什么都能做」的定位是否导致它在专业深度上有所妥协？",
    content: `## 评测背景

豆包是字节跳动在AI大模型赛道的重要布局。与DeepSeek侧重技术开源不同，豆包走的是「全能型AI助手」路线：聊天、写作、翻译、生图，什么都能做。本评测聚焦于用户体验和产品设计。

## 优点

- **交互体验流畅**：App界面设计精良，响应速度快，上手门槛极低
- **生态整合深**：与抖音、今日头条等内容生态无缝衔接
- **多模态能力强**：文字、图片、语音交互一体化
- **中文理解优秀**：对中文语境的理解和处理能力一流

## 缺点

- **隐私政策复杂**：作为字节系产品，数据收集范围较广，普通用户难以完全理解
- **功能广度 > 深度**：什么都做但每个单项可能不如专业工具
- **订阅模式变化**：免费→付费的过渡策略让部分早期用户感到困惑

## 适合谁？

- 需要日常AI辅助的普通用户
- 已深入使用字节生态的用户
- 需要多模态交互的创作者

## 数据可靠性分析

豆包的隐私政策是其主要短板。作为广告收入驱动的公司产品，用户数据可能被用于模型训练和广告定向。建议用户在使用时注意关闭非必要的权限和数据共享选项。`,
    author: mockUsers.carol,
    scores: { usability: 8.5, privacy: 6.0, businessModel: 7.5, innovation: 8.0, overall: 7.6 },
    pros: ["交互流畅", "生态整合好", "多模态能力强", "中文理解优秀"],
    cons: ["隐私政策复杂", "功能广而不深", "收费策略变动"],
    bestFor: "日常AI辅助用户、字节生态深度用户",
    trustNote: "字节系产品的隐私实践需要重点关注，建议定期检查权限设置。",
    helpfulCount: 56,
    commentCount: 18,
    isCollaborative: true,
    collaborators: [mockUsers.bob],
    createdAt: "2026-05-15",
    updatedAt: "2026-06-08",
  },
  {
    id: "r3",
    slug: "notion-productivity-analysis",
    appId: "5",
    appName: "Notion",
    title: "Notion商业模式评测：SaaS独角兽如何靠「免费增值」征服全球？",
    summary: "Notion从一个小众笔记工具成长为估值百亿的SaaS巨头，其产品策略和商业模式值得深入分析。本文从数字经济视角拆解Notion的成功逻辑。",
    content: `## 评测背景

Notion是一款现象级的生产力工具。它的成功不仅是产品设计的胜利，更是商业模式创新的典范。本文聚焦于Notion如何通过「免费增值+社区驱动」的策略实现增长飞轮。

## 优点

- **模块化设计极致灵活**：Block结构让用户自由组合，实现无限可能
- **社区生态繁荣**：全球用户自发创建模板、教程，形成强大网络效应
- **免费层足够慷慨**：个人用户几乎可以免费使用全部核心功能
- **AI集成自然**：Notion AI的融入没有破坏原有体验

## 缺点

- **中文支持不完善**：部分界面翻译生硬，中文搜索效果一般
- **离线体验差**：网络不好时使用受限
- **数据存储在美国**：对中国用户存在数据合规风险
- **企业版价格偏高**：对于小型团队来说成本不低

## 适合谁？

- 需要灵活知识管理系统的个人和团队
- 追求一体化工作空间的知识工作者
- 愿意参与社区共建的模板创作者

## 商业模式分析

Notion的免费增值模式通过「个人免费→团队付费」的路径实现转化。其社区驱动的模板生态大幅降低了用户获取成本，而网络效应使得用户迁移成本逐渐升高。这种模式在PLG（Product-Led Growth）领域堪称教科书级案例。`,
    author: mockUsers.bob,
    scores: { usability: 9.0, privacy: 7.0, businessModel: 8.5, innovation: 9.0, overall: 8.5 },
    pros: ["模块化设计灵活", "社区生态繁荣", "免费层慷慨", "AI集成自然"],
    cons: ["中文支持不完善", "离线体验差", "数据存储海外", "企业版价格高"],
    bestFor: "知识工作者、需要灵活管理系统的团队",
    trustNote: "数据存储在海外服务器，需要关注数据合规问题。",
    helpfulCount: 72,
    commentCount: 31,
    isCollaborative: false,
    createdAt: "2026-05-01",
    updatedAt: "2026-06-12",
  },
];

export const mockRankings: Ranking[] = [
  {
    id: "weekly-hot",
    title: "本周热门评测",
    description: "过去7天最受关注的App评测",
    type: "weekly",
    apps: [mockApps[1], mockApps[0], mockApps[2], mockApps[4], mockApps[3]],
  },
  {
    id: "ai-top",
    title: "AI工具 Top10",
    description: "2026年最值得关注的AI应用",
    type: "category",
    apps: [mockApps[1], mockApps[0], mockApps[2], mockApps[3]],
  },
  {
    id: "privacy-best",
    title: "隐私最佳",
    description: "数据透明度最高的App",
    type: "editorPick",
    apps: [mockApps[1], mockApps[4], mockApps[2], mockApps[0]],
  },
];

// 当前登录用户 Mock（开发用）
export const mockCurrentUser: UserProfile = mockUsers.alice;
