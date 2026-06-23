import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "拆解 · 产品海报",
  description: "多维度拆解每一款App：好用度、隐私、商业模式、创新",
};

/* ================================================================
   App 拆解 · 概念海报

   主题：一张手机被"拆开"——内部结构以技术蓝图方式暴露。
   四个评分维度从机身拉出测量标尺。
   热门 App 图标像被分析的标本围绕四周。
   ================================================================ */

const W = 720;
const H = 1020;
const CX = W / 2;
const CY = H * 0.38;

// 被评测的 App 样本
const apps = [
  { icon: "🧠", name: "ChatGPT", x: 130, y: 170 },
  { icon: "🎭", name: "Claude", x: 580, y: 150 },
  { icon: "🐋", name: "DeepSeek", x: 100, y: 420 },
  { icon: "💎", name: "Gemini", x: 610, y: 380 },
  { icon: "🫘", name: "豆包", x: 155, y: 650 },
  { icon: "🤖", name: "Copilot", x: 580, y: 620 },
  { icon: "🔎", name: "Perplexity", x: 120, y: 860 },
  { icon: "📝", name: "Notion", x: 600, y: 850 },
];

// 四个评测维度
const dimensions = [
  { label: "好用度", value: 8.5, color: "#FFD700", yOff: -185, xOff: 0 },
  { label: "隐私", value: 7.2, color: "#4ECDC4", yOff: -80, xOff: 195 },
  { label: "商业模式", value: 7.8, color: "#FF6B6B", yOff: 80, xOff: 195 },
  { label: "创新", value: 8.9, color: "#A78BFA", yOff: 185, xOff: 0 },
];

export default function PosterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-2 md:p-4"
         style={{ background: "#0a0a0a" }}>
      <div className="relative" style={{ width: W, height: H, maxWidth: "100vw", maxHeight: "98vh" }}>
        <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg"
             style={{ width: "100%", height: "100%", background: "#0f0f14" }}>

          {/* ---- 背景纹理 ---- */}
          <defs>
            <pattern id="grid" width={40} height={40} patternUnits="userSpaceOnUse">
              <line x1={40} y1={0} x2={40} y2={40} stroke="#ffffff" strokeWidth={0.3} opacity={0.04} />
              <line x1={0} y1={40} x2={40} y2={40} stroke="#ffffff" strokeWidth={0.3} opacity={0.04} />
            </pattern>
            <radialGradient id="glow" cx="50%" cy="38%" r="45%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.04} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </radialGradient>
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>

          <rect width={W} height={H} fill="url(#grid)" />
          <rect width={W} height={H} fill="url(#glow)" />
          <rect width={W} height={H} fill="#0f0f14" opacity={0.03}
                style={{ filter: "url(#noise)" }} />

          {/* ================================================================
               中央手机——技术蓝图式拆解
               ================================================================ */}

          {/* 手机外框（虚线结构线） */}
          <rect x={CX - 68} y={CY - 130} width={136} height={260} rx={14}
                fill="none" stroke="#ffffff" strokeWidth={1.2} strokeDasharray="6 3" opacity={0.3} />

          {/* 手机实体 */}
          <rect x={CX - 60} y={CY - 120} width={120} height={240} rx={14}
                fill="#1a1a25" stroke="#ffffff" strokeWidth={1.5} opacity={0.9} />

          {/* 屏幕区域 */}
          <rect x={CX - 46} y={CY - 100} width={92} height={140} rx={3}
                fill="#0d0d15" stroke="#ffffff" strokeWidth={0.6} opacity={0.7} />

          {/* 屏幕上的拆解可视化 */}
          {/* 四个横向条——App 的四个维度 */}
          {dimensions.map((d, i) => (
            <g key={d.label}>
              {/* 标签 */}
              <text x={CX - 38} y={CY - 72 + i * 28}
                    fontFamily="'JetBrains Mono', monospace" fontSize={7}
                    fill="#ffffff" opacity={0.5} letterSpacing="0.1em">
                {d.label}
              </text>
              {/* 进度条底色 */}
              <rect x={CX + 14} y={CY - 78 + i * 28}
                    width={64} height={8} rx={1}
                    fill="#ffffff" opacity={0.08} />
              {/* 进度条 */}
              <rect x={CX + 14} y={CY - 78 + i * 28}
                    width={64 * (d.value / 10)} height={8} rx={1}
                    fill={d.color} opacity={0.7} />
              {/* 分数 */}
              <text x={CX + 82} y={CY - 72 + i * 28}
                    fontFamily="'JetBrains Mono', monospace" fontSize={7}
                    fill={d.color} opacity={0.7} textAnchor="end">
                {d.value}
              </text>
            </g>
          ))}

          {/* 屏幕内的综合评分 */}
          <text x={CX} y={CY + 12}
                fontFamily="'JetBrains Mono', monospace" fontSize={24}
                fill="#ffffff" fontWeight={700} textAnchor="middle" letterSpacing="0.05em">
            8.3
          </text>
          <text x={CX} y={CY + 26}
                fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill="#ffffff" opacity={0.35} textAnchor="middle" letterSpacing="0.15em">
            OVERALL / 10
          </text>

          {/* 手机底部 Home 指示条 */}
          <rect x={CX - 20} y={CY + 108} width={40} height={3} rx={1.5}
                fill="#ffffff" opacity={0.2} />

          {/* ================================================================
               四个维度从手机四角向外拉出测量线
               ================================================================ */}
          {dimensions.map((d, i) => {
            const angles = [-Math.PI / 2, Math.PI / 3, Math.PI / 6, Math.PI / 2.5];
            const a = angles[i];
            const r = 150 + i * 15;
            const tx = CX + Math.cos(a) * r;
            const ty = CY + Math.sin(a) * r - 30;
            const sx = CX + Math.cos(a) * 100;
            const sy = CY + Math.sin(a) * 100 - 30;
            return (
              <g key={`ext-${i}`}>
                {/* 测量线 */}
                <line x1={sx} y1={sy} x2={tx} y2={ty}
                      stroke={d.color} strokeWidth={0.8} opacity={0.4}
                      strokeDasharray="3 4" />
                {/* 端点圆 */}
                <circle cx={tx} cy={ty} r={18} fill="none"
                        stroke={d.color} strokeWidth={1} opacity={0.3} />
                <circle cx={tx} cy={ty} r={4} fill={d.color} opacity={0.5} />
                {/* 标签 */}
                <text x={tx} y={ty - 22}
                      fontFamily="'JetBrains Mono', monospace" fontSize={8}
                      fill={d.color} opacity={0.6} textAnchor="middle" letterSpacing="0.15em">
                  {d.label}
                </text>
                <text x={tx} y={ty + 32}
                      fontFamily="'JetBrains Mono', monospace" fontSize={10}
                      fill={d.color} opacity={0.7} textAnchor="middle" fontWeight={600}>
                  {d.value}
                </text>
              </g>
            );
          })}

          {/* ================================================================
               App 图标——被分析的标本
               ================================================================ */}
          {apps.map((app, i) => (
            <g key={app.name}>
              {/* 标签框 */}
              <rect x={app.x - 32} y={app.y - 14} width={64} height={28} rx={3}
                    fill="#1a1a25" stroke="#ffffff" strokeWidth={0.5} opacity={0.5} />
              {/* 图标 */}
              <text x={app.x + 6} y={app.y + 6}
                    fontSize={16} textAnchor="middle" dominantBaseline="middle">
                {app.icon}
              </text>
              {/* 名称 */}
              <text x={app.x - 18} y={app.y + 7}
                    fontFamily="'JetBrains Mono', monospace" fontSize={7}
                    fill="#ffffff" opacity={0.45} letterSpacing="0.08em">
                {app.name}
              </text>
              {/* 连接线到手机 */}
              <line x1={app.x} y1={app.y - 14}
                    x2={CX + (app.x < CX ? -60 : 60)}
                    y2={CY + (app.y < CY + 50 ? -120 : 120) * (app.y < CY + 120 ? 1 : 1)}
                    stroke="#ffffff" strokeWidth={0.3} opacity={0.12} />
            </g>
          ))}

          {/* ================================================================
               主标题
               ================================================================ */}
          {/* 顶部标题 */}
          <text x={CX} y={60}
                fontFamily="'Noto Serif SC', 'STSong', serif" fontSize={52}
                fill="#ffffff" fontWeight={900} textAnchor="middle" letterSpacing="0.18em">
            拆 解
          </text>
          <line x1={CX - 100} y1={76} x2={CX + 100} y2={76}
                stroke="#ffffff" strokeWidth={0.8} opacity={0.15} />

          {/* 副标题 */}
          <text x={CX} y={98}
                fontFamily="'JetBrains Mono', monospace" fontSize={9}
                fill="#ffffff" opacity={0.35} textAnchor="middle" letterSpacing="0.3em">
            多维度 · App 评测社区
          </text>

          {/* ================================================================
               底部信息
               ================================================================ */}
          <line x1={40} y1={H - 88} x2={W - 40} y2={H - 88}
                stroke="#ffffff" strokeWidth={0.6} opacity={0.1} />

          <text x={40} y={H - 60}
                fontFamily="'JetBrains Mono', monospace" fontSize={8}
                fill="#ffffff" opacity={0.4} letterSpacing="0.2em">
            DECONSTRUCT · APP OBSERVATORY
          </text>
          <text x={40} y={H - 44}
                fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill="#ffffff" opacity={0.25} letterSpacing="0.12em">
            从用户价值与数据可靠性出发，评测每一款热门应用
          </text>

          <text x={W - 40} y={H - 60}
                fontFamily="'JetBrains Mono', monospace" fontSize={8}
                fill="#ffffff" opacity={0.35} textAnchor="end" letterSpacing="0.2em">
            数字经济课程实践项目
          </text>
          <text x={W - 40} y={H - 44}
                fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill="#ffffff" opacity={0.2} textAnchor="end" letterSpacing="0.1em">
            智能体编程 · 2026
          </text>

          {/* 底部隐私等级标注 */}
          <rect x={40} y={H - 28} width={86} height={18} rx={2}
                fill="none" stroke="#4ECDC4" strokeWidth={0.7} opacity={0.4} />
          <text x={83} y={H - 15}
                fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill="#4ECDC4" opacity={0.5} textAnchor="middle" letterSpacing="0.1em">
            A→C 隐私评级
          </text>

          <rect x={135} y={H - 28} width={86} height={18} rx={2}
                fill="none" stroke="#FFD700" strokeWidth={0.7} opacity={0.4} />
          <text x={178} y={H - 15}
                fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill="#FFD700" opacity={0.5} textAnchor="middle" letterSpacing="0.1em">
            四维评分体系
          </text>

          <rect x={230} y={H - 28} width={86} height={18} rx={2}
                fill="none" stroke="#ffffff" strokeWidth={0.7} opacity={0.3} />
          <text x={273} y={H - 15}
                fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill="#ffffff" opacity={0.4} textAnchor="middle" letterSpacing="0.1em">
            社区协作开源
          </text>

        </svg>
      </div>
    </div>
  );
}
