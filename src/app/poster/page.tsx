import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "拆解 · 产品海报",
  description: "多维度拆解每一款App：好用度、隐私、商业模式、创新",
};

/* ================================================================
   线场实验 × 网站主题 融合海报

   白纸底。所有视觉元素由同一套绯红线系统"写"出。
   手机、评分条、App 图标、标注线 —— 全部是手写式描线，
   从中心向外密度递减。编辑式文字压在边缘。
   ================================================================ */

const W = 720;
const H = 1020;
const CX = W / 2;
const CY = H * 0.40;

// ---- 情绪色系统 ----
const RED = "#b22234";
const RED_M = "#c44a5a";
const RED_L = "#d9848e";
const RED_F = "#ebc4c8";
const INK = "#1a1a1a";
const GRAY = "#666";
const PAPER = "#faf8f5";

// ---- 伪随机 ----
function rng(i: number) { return ((i * 7919 + 271) % 10007) / 10007; }

// ---- 手机参数 ----
const PW = 130; const PH = 260; const PR = 16;
const PX = CX - PW / 2; const PY = CY - PH / 2;

// ---- App 标本 ----
const apps = [
  { icon: "🧠", name: "ChatGPT", lx: 130, ly: 195 },
  { icon: "🎭", name: "Claude", lx: 565, ly: 185 },
  { icon: "🐋", name: "DeepSeek", lx: 105, ly: 430 },
  { icon: "💎", name: "Gemini", lx: 590, ly: 410 },
  { icon: "🫘", name: "豆包", lx: 145, ly: 655 },
  { icon: "🤖", name: "Copilot", lx: 570, ly: 645 },
  { icon: "🔎", name: "Perplexity", lx: 115, ly: 870 },
  { icon: "📝", name: "Notion", lx: 585, ly: 860 },
];

// ---- 四个维度 ----
const dims = [
  { label: "好用度", val: 8.5, color: RED },
  { label: "隐私", val: 7.2, color: RED_M },
  { label: "商业模式", val: 7.8, color: RED_M },
  { label: "创新", val: 8.9, color: RED },
];

/* ================================================================
   线场生成
   ================================================================ */
interface L { x1: number; y1: number; x2: number; y2: number; op: number; sw: number; c: string }

/** 反复描摹同一段线（模拟手写抖动） */
function trace(x1: number, y1: number, x2: number, y2: number, n: number, op: number, sw: number, c: string, seed: number): L[] {
  const out: L[] = [];
  for (let i = 0; i < n; i++) {
    const j = (rng(seed + i * 3) - 0.5) * 3;
    const k = (rng(seed + i * 3 + 1) - 0.5) * 3;
    out.push({ x1: x1 + j, y1: y1 + k, x2: x2 + (rng(seed + i * 5) - 0.5) * 3.5, y2: y2 + (rng(seed + i * 5 + 1) - 0.5) * 3.5, op: op * (0.45 + rng(seed + i * 7) * 0.55), sw: sw * (0.55 + rng(seed + i * 11) * 0.9), c });
  }
  return out;
}

/** 矩形轮廓描摹 */
function traceRect(x: number, y: number, w: number, h: number, n: number, op: number, sw: number, c: string, seed: number): L[] {
  let out: L[] = [];
  out = out.concat(trace(x, y, x + w, y, n, op, sw, c, seed));
  out = out.concat(trace(x + w, y, x + w, y + h, n, op, sw, c, seed + 100));
  out = out.concat(trace(x + w, y + h, x, y + h, n, op, sw, c, seed + 200));
  out = out.concat(trace(x, y + h, x, y, n, op, sw, c, seed + 300));
  return out;
}

/** 中场扩散线 */
function field(cx: number, cy: number, spreadR: number, count: number, op: number, sw: number, c: string, seed: number): L[] {
  const out: L[] = [];
  for (let i = 0; i < count; i++) {
    const a = rng(seed + i * 17) * Math.PI * 2;
    const r = 15 + rng(seed + i * 19) * spreadR;
    const len = 15 + rng(seed + i * 23) * spreadR * 0.5;
    const x1 = cx + Math.cos(a) * r;
    const y1 = cy + Math.sin(a) * r * 0.72;
    const da = (rng(seed + i * 29) - 0.5) * 0.7;
    out.push({
      x1, y1,
      x2: x1 + Math.cos(a + da) * len,
      y2: y1 + Math.sin(a + da) * len * 0.72,
      op: op * (0.3 + rng(seed + i * 31) * 0.7),
      sw: sw * (0.4 + rng(seed + i * 37) * 1.2),
      c,
    });
  }
  return out;
}

/** 跨场长斜线 */
function longLines(count: number, op: number, sw: number, c: string, seed: number): L[] {
  const out: L[] = [];
  for (let i = 0; i < count; i++) {
    const sx = rng(seed + i * 41) * W;
    const sy = rng(seed + i * 43) * H;
    out.push({
      x1: sx, y1: sy,
      x2: sx + (rng(seed + i * 47) - 0.5) * W * 1.3,
      y2: sy + (rng(seed + i * 53) - 0.5) * H * 1.3,
      op, sw, c,
    });
  }
  return out;
}

function buildLines(): L[] {
  let all: L[] = [];

  // ---- 核心：手机轮廓反复描摹 ----
  all = all.concat(traceRect(PX, PY, PW, PH, 18, 0.82, 1.5, RED, 1));
  // 屏幕区域
  all = all.concat(traceRect(PX + 18, PY + 28, PW - 36, 138, 8, 0.55, 0.9, RED_M, 500));

  // ---- 屏幕内的评分条 ----
  for (let i = 0; i < dims.length; i++) {
    const by = PY + 50 + i * 34;
    const bw = 76;
    const bx = CX - bw / 2;
    // 标签线
    all = all.concat(trace(bx - 48, by + 4, bx - 4, by + 4, 3, 0.35, 0.5, RED_L, 1000 + i * 40));
    // 进度条底色
    all = all.concat(traceRect(bx, by, bw, 12, 3, 0.2, 0.4, RED_F, 1100 + i * 40));
    // 进度条填充
    const fw = bw * (dims[i].val / 10);
    all = all.concat(traceRect(bx, by, fw, 12, 5, 0.5, 0.8, dims[i].color, 1200 + i * 40));
  }

  // ---- 综合评分数字区域 ----
  for (let r = 0; r < 3; r++) {
    const ry = PY + 195;
    all = all.concat(trace(CX - 18, ry, CX + 18, ry, 4, 0.4, 0.6, RED, 2000 + r));
  }

  // ---- App 标本框 ----
  apps.forEach((app, i) => {
    all = all.concat(traceRect(app.lx - 34, app.ly - 16, 68, 32, 3, 0.25, 0.4, RED_L, 3000 + i * 50));
    // 连接线到手机
    const tx = app.lx < CX ? PX : PX + PW;
    const ty = app.ly < CY ? PY : PY + PH;
    all = all.concat(trace(app.lx, app.ly, tx, ty, 1, 0.1, 0.25, RED_F, 3500 + i));
  });

  // ---- 四维度测量线（从手机四角向外） ----
  const corners: [number, number][] = [
    [CX, PY - 15],          // 上
    [PX + PW + 10, PY + 40],  // 右
    [PX + PW + 10, PY + PH - 40], // 右下
    [CX, PY + PH + 15],     // 下
  ];
  dims.forEach((d, i) => {
    const [sx, sy] = corners[i];
    const tx = sx + (i === 1 || i === 2 ? 100 : 0);
    const ty = sy + (i === 0 ? -110 : i === 1 ? 60 : i === 2 ? 100 : 110);
    all = all.concat(trace(sx, sy, tx, ty, 5, 0.35, 0.7, d.color, 4000 + i * 10));
    // 端点圆
    for (let r = 0; r < 6; r++) {
      const a = (r / 6) * Math.PI * 2;
      all.push({ x1: tx, y1: ty, x2: tx + Math.cos(a) * 14, y2: ty + Math.sin(a) * 14, op: 0.32, sw: 0.5, c: d.color });
    }
  });

  // ---- 中场扩散线 ----
  all = all.concat(field(CX, CY, 200, 70, 0.38, 0.7, RED_M, 5000));
  all = all.concat(field(CX, CY, 280, 55, 0.25, 0.55, RED_L, 5100));

  // ---- 远场扩散线 ----
  all = all.concat(field(CX, CY, 400, 45, 0.16, 0.4, RED_L, 5200));
  all = all.concat(field(CX, CY, 520, 30, 0.09, 0.3, RED_F, 5300));

  // ---- 跨场长斜线（边界突破） ----
  all = all.concat(longLines(16, 0.07, 0.35, RED_F, 6000));

  // ---- 尖角折返 ----
  for (let i = 0; i < 6; i++) {
    const ax = rng(7000 + i * 3) * W;
    const ay = rng(7000 + i * 3 + 1) * H;
    const bx = ax + (rng(7000 + i * 3 + 2) - 0.5) * 200;
    const by = ay + (rng(7000 + i * 3 + 3) - 0.5) * 180;
    const cx = bx + (rng(7000 + i * 3 + 4) - 0.5) * 170;
    const cy = by + (rng(7000 + i * 3 + 5) - 0.5) * 150;
    all.push({ x1: ax, y1: ay, x2: bx, y2: by, op: 0.11, sw: 0.4, c: RED_F });
    all.push({ x1: bx, y1: by, x2: cx, y2: cy, op: 0.09, sw: 0.35, c: RED_F });
  }

  return all;
}

/* ================================================================
   React
   ================================================================ */
export default function PosterPage() {
  const lines = buildLines();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6" style={{ background: "#1a1a1a" }}>
      <div className="relative" style={{ width: W, height: H, maxWidth: "100vw", maxHeight: "98vh" }}>
        <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg"
             style={{ width: "100%", height: "100%", background: PAPER }}>

          {/* 纸纹 */}
          <defs>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" mode="multiply" />
            </filter>
          </defs>
          <rect width={W} height={H} fill={PAPER} />
          <rect width={W} height={H} fill="#000" opacity={0.016} style={{ filter: "url(#grain)" }} />

          {/* ========== 线场 ========== */}
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                  stroke={l.c} strokeWidth={l.sw} opacity={l.op} strokeLinecap="round" />
          ))}

          {/* ========== 文字：App 标本标签 ========== */}
          {apps.map((app, i) => (
            <g key={`t-${i}`}>
              <text x={app.lx} y={app.ly - 1}
                    fontSize={14} textAnchor="middle" dominantBaseline="middle">{app.icon}</text>
              <text x={app.lx} y={app.ly + 15}
                    fontFamily="'JetBrains Mono', monospace" fontSize={7}
                    fill={INK} opacity={0.5} textAnchor="middle" letterSpacing="0.08em">
                {app.name}
              </text>
            </g>
          ))}

          {/* ========== 文字：屏幕内评分标签 ========== */}
          {dims.map((d, i) => (
            <g key={`dl-${i}`}>
              <text x={CX - 62} y={PY + 53 + i * 34 + 4}
                    fontFamily="'JetBrains Mono', monospace" fontSize={7}
                    fill={INK} opacity={0.5} letterSpacing="0.08em">
                {d.label}
              </text>
              <text x={CX + 62} y={PY + 53 + i * 34 + 4}
                    fontFamily="'JetBrains Mono', monospace" fontSize={7}
                    fill={d.color} opacity={0.55} textAnchor="end" fontWeight={600}>
                {d.val}
              </text>
            </g>
          ))}

          {/* ========== 文字：屏幕内综合评分 ========== */}
          <text x={CX} y={PY + 205}
                fontFamily="'JetBrains Mono', monospace" fontSize={18}
                fill={INK} fontWeight={700} textAnchor="middle" opacity={0.7}>
            8.3
          </text>
          <text x={CX} y={PY + 218}
                fontFamily="'JetBrains Mono', monospace" fontSize={6}
                fill={GRAY} textAnchor="middle" letterSpacing="0.15em" opacity={0.45}>
            OVERALL / 10
          </text>

          {/* ========== 文字：四维端点标签 ========== */}
          {dims.map((d, i) => {
            const corners: [number, number][] = [[CX, PY - 130], [PX + PW + 120, PY + 30], [PX + PW + 120, PY + PH - 30], [CX, PY + PH + 130]];
            const [tx, ty] = corners[i];
            return (
              <g key={`ex-${i}`}>
                <text x={tx} y={ty - 16}
                      fontFamily="'JetBrains Mono', monospace" fontSize={7}
                      fill={d.color} opacity={0.5} textAnchor="middle" letterSpacing="0.12em">
                  {d.label}
                </text>
                <text x={tx} y={ty + 24}
                      fontFamily="'JetBrains Mono', monospace" fontSize={9}
                      fill={d.color} opacity={0.55} textAnchor="middle" fontWeight={600}>
                  {d.val}
                </text>
              </g>
            );
          })}

          {/* ========== 文字：编辑式边缘注释 ========== */}
          {/* 顶部标题 */}
          <text x={40} y={56} fontFamily="'JetBrains Mono', monospace" fontSize={11}
                fill={INK} fontWeight={500} letterSpacing="0.3em">拆解</text>
          <text x={40} y={70} fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill={GRAY} letterSpacing="0.15em">DECONSTRUCT · APP OBSERVATORY</text>
          <line x1={40} y1={78} x2={210} y2={78} stroke={INK} strokeWidth={0.5} opacity={0.2} />

          {/* 右上 */}
          <text x={W - 40} y={56} fontFamily="'JetBrains Mono', monospace" fontSize={8}
                fill={RED} letterSpacing="0.18em" textAnchor="end" opacity={0.55}>VOL.01</text>
          <text x={W - 40} y={70} fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill={GRAY} letterSpacing="0.1em" textAnchor="end">2026.06.23</text>

          {/* 左下 */}
          <text x={40} y={H - 55} fontFamily="'Noto Serif SC', 'STSong', serif"
                fontSize={12} fill={INK} fontWeight={400} letterSpacing="0.06em">
            将完整之物分解为零件，理解其构造。
          </text>
          <text x={40} y={H - 36} fontFamily="'JetBrains Mono', monospace"
                fontSize={7} fill={GRAY} letterSpacing="0.1em">
            数字经济课程实践项目 · 智能体编程 · 2026
          </text>

          {/* 右下诊断 */}
          <text x={W - 40} y={H - 60} fontFamily="'JetBrains Mono', monospace"
                fontSize={8} fill={INK} letterSpacing="0.12em" textAnchor="end" fontWeight={500}>
            APP DIAGNOSIS
          </text>
          <text x={W - 40} y={H - 44} fontFamily="'JetBrains Mono', monospace"
                fontSize={7} fill={GRAY} letterSpacing="0.08em" textAnchor="end">
            四维评分 · 隐私评级 · 社区协作
          </text>

          {/* 底部标签 */}
          <rect x={40} y={H - 18} width={80} height={14} fill="none"
                stroke={RED} strokeWidth={0.6} opacity={0.3} />
          <text x={80} y={H - 7} fontFamily="'JetBrains Mono', monospace" fontSize={6}
                fill={RED} opacity={0.4} textAnchor="middle" letterSpacing="0.08em">A→C 隐私评级</text>

          <rect x={130} y={H - 18} width={80} height={14} fill="none"
                stroke={RED_M} strokeWidth={0.6} opacity={0.3} />
          <text x={170} y={H - 7} fontFamily="'JetBrains Mono', monospace" fontSize={6}
                fill={RED_M} opacity={0.4} textAnchor="middle" letterSpacing="0.08em">四维评分体系</text>

          <rect x={220} y={H - 18} width={80} height={14} fill="none"
                stroke={INK} strokeWidth={0.6} opacity={0.25} />
          <text x={260} y={H - 7} fontFamily="'JetBrains Mono', monospace" fontSize={6}
                fill={GRAY} opacity={0.4} textAnchor="middle" letterSpacing="0.08em">社区协作开源</text>

          {/* 右侧情绪色标记 */}
          <line x1={W - 16} y1={H * 0.28} x2={W - 16} y2={H * 0.52}
                stroke={RED} strokeWidth={0.7} opacity={0.25} />
          <circle cx={W - 16} cy={H * 0.28} r={2.2} fill="none" stroke={RED} strokeWidth={0.7} opacity={0.3} />

          {/* 旋转标注 */}
          <text x={W * 0.72} y={H * 0.76}
                fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill={RED} letterSpacing="0.2em" opacity={0.35}
                transform={`rotate(-90, ${W * 0.72}, ${H * 0.76})`}>
            EXPLODED VIEW
          </text>
        </svg>
      </div>
    </div>
  );
}
