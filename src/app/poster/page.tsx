import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "拆解 · 实验海报",
  description: "对象从同源线性运动场中显形。",
};

/* ================================================================
   情绪色
   ================================================================ */
const RED = "#b22234";       // 核心线
const RED_MID = "#c44a5a";   // 中场
const RED_LOW = "#d9848e";   // 远场
const RED_FAINT = "#ebc4c8"; // 最远
const INK = "#1a1a1a";       // 文字
const GRAY = "#777";         // 辅助文字
const PAPER = "#faf8f5";     // 纸色

/* ================================================================
   线场生成器
   ================================================================ */
type Line = { x1: number; y1: number; x2: number; y2: number; op: number; sw: number; color: string };

/** 在给定中心周围生成抖动线 */
function jitterLines(
  cx: number, cy: number, count: number,
  spreadX: number, spreadY: number,
  baseOp: number, baseSw: number,
  color: string,
  seed: number
): Line[] {
  const lines: Line[] = [];
  const pseudo = (i: number) => ((i * 7919 + seed * 104729) % 10007) / 10007;

  for (let i = 0; i < count; i++) {
    const a = pseudo(i * 3);
    const b = pseudo(i * 3 + 1);
    const angle = a * Math.PI * 2;
    const len = 8 + b * spreadX * 0.6 + pseudo(i * 3 + 2) * spreadX * 0.4;

    const x1 = cx + Math.cos(angle) * (2 + b * spreadX * 0.15);
    const y1 = cy + Math.sin(angle) * (2 + b * spreadY * 0.15);
    const x2 = x1 + Math.cos(angle + (pseudo(i * 5) - 0.5) * 0.6) * len;
    const y2 = y1 + Math.sin(angle + (pseudo(i * 5) - 0.5) * 0.6) * len * (spreadY / spreadX);

    const op = baseOp * (0.4 + pseudo(i * 7) * 0.6);
    const sw = baseSw * (0.5 + pseudo(i * 11) * 1.0);

    lines.push({ x1, y1, x2, y2, op, sw, color });
  }
  return lines;
}

/** 在两点之间生成回环描线（模拟手反复描摹） */
function loopTrace(
  x1: number, y1: number, x2: number, y2: number,
  count: number, baseOp: number, baseSw: number, color: string, seed: number
): Line[] {
  const lines: Line[] = [];
  const pseudo = (i: number) => ((i * 6301 + seed * 40009) % 8191) / 8191;

  for (let i = 0; i < count; i++) {
    const jx = (pseudo(i * 2) - 0.5) * 3.5;
    const jy = (pseudo(i * 2 + 1) - 0.5) * 3.5;
    lines.push({
      x1: x1 + jx, y1: y1 + jy,
      x2: x2 + (pseudo(i * 3) - 0.5) * 4,
      y2: y2 + (pseudo(i * 3 + 1) - 0.5) * 4,
      op: baseOp * (0.5 + pseudo(i * 5) * 0.5),
      sw: baseSw * (0.6 + pseudo(i * 7) * 0.8),
      color,
    });
  }
  return lines;
}

/** 构建完整线场 */
function buildLineField(): Line[] {
  const W = 680;
  const H = 952;
  const cx = W * 0.48;
  const cy = H * 0.42;
  let all: Line[] = [];

  // ---- 核心：立方体边缘反复描摹 ----
  // 前面
  const faceFront: [number, number][] = [
    [cx - 65, cy - 45], [cx + 35, cy - 65], [cx + 35, cy + 55], [cx - 65, cy + 75], [cx - 65, cy - 45],
  ];
  for (let e = 0; e < faceFront.length - 1; e++) {
    all = all.concat(loopTrace(faceFront[e][0], faceFront[e][1], faceFront[e + 1][0], faceFront[e + 1][1], 14, 0.85, 1.4, RED, e * 10));
  }

  // 顶面（略微偏移——正在剥离）
  const topOffsetX = 12;
  const topOffsetY = -15;
  const faceTop: [number, number][] = [
    [cx - 65 + topOffsetX, cy - 45 + topOffsetY],
    [cx + 35 + topOffsetX, cy - 65 + topOffsetY],
    [cx + 65 + topOffsetX, cy - 35 + topOffsetY],
    [cx - 35 + topOffsetX, cy - 15 + topOffsetY],
    [cx - 65 + topOffsetX, cy - 45 + topOffsetY],
  ];
  for (let e = 0; e < faceTop.length - 1; e++) {
    all = all.concat(loopTrace(faceTop[e][0], faceTop[e][1], faceTop[e + 1][0], faceTop[e + 1][1], 11, 0.7, 1.1, RED_MID, e * 20));
  }

  // 右面（轻微偏移）
  const rightOffsetX = 8;
  const rightOffsetY = 5;
  const faceRight: [number, number][] = [
    [cx + 35 + rightOffsetX, cy - 65 + rightOffsetY],
    [cx + 65 + rightOffsetX, cy - 35 + rightOffsetY],
    [cx + 65 + rightOffsetX, cy + 85 + rightOffsetY],
    [cx + 35 + rightOffsetX, cy + 55 + rightOffsetY],
    [cx + 35 + rightOffsetX, cy - 65 + rightOffsetY],
  ];
  for (let e = 0; e < faceRight.length - 1; e++) {
    all = all.concat(loopTrace(faceRight[e][0], faceRight[e][1], faceRight[e + 1][0], faceRight[e + 1][1], 11, 0.65, 1.1, RED_MID, e * 30));
  }

  // ---- 中场：围绕主体的密集绕线 ----
  for (let ring = 0; ring < 3; ring++) {
    const spread = 90 + ring * 50;
    const count = 50 - ring * 12;
    all = all.concat(jitterLines(cx + 10, cy + 5, count, spread, spread * 0.75, 0.55 - ring * 0.12, 0.9 - ring * 0.2, RED_MID, ring * 100));
  }

  // ---- 远场：向外扩散的稀疏线 ----
  for (let ring = 0; ring < 4; ring++) {
    const spread = 220 + ring * 120;
    const count = 35 - ring * 6;
    all = all.concat(jitterLines(cx + 5, cy, count, spread, spread * 0.7, 0.3 - ring * 0.05, 0.5 - ring * 0.08, RED_LOW, ring * 200 + 500));
  }

  // ---- 边界突破：长斜线跨越全场 ----
  const pseudo = (i: number) => ((i * 5039 + 271) % 6299) / 6299;
  for (let i = 0; i < 12; i++) {
    const sx = pseudo(i * 3) * W;
    const sy = pseudo(i * 3 + 1) * H;
    const ex = sx + (pseudo(i * 3 + 2) - 0.5) * W * 1.4;
    const ey = sy + (pseudo(i * 4) - 0.5) * H * 1.4;
    all.push({ x1: sx, y1: sy, x2: ex, y2: ey, op: 0.12, sw: 0.4, color: RED_FAINT });
  }

  // ---- 尖角折返：几个锐角Z形 ----
  for (let i = 0; i < 5; i++) {
    const ax = pseudo(i * 5 + 10) * W;
    const ay = pseudo(i * 5 + 11) * H;
    const bx = ax + (pseudo(i * 5 + 12) - 0.5) * 180;
    const by = ay + (pseudo(i * 5 + 13) - 0.5) * 160;
    const cx = bx + (pseudo(i * 5 + 14) - 0.5) * 140;
    const cy = by + (pseudo(i * 5 + 15) - 0.5) * 130;
    all.push({ x1: ax, y1: ay, x2: bx, y2: by, op: 0.15, sw: 0.5, color: RED_FAINT });
    all.push({ x1: bx, y1: by, x2: cx, y2: cy, op: 0.13, sw: 0.45, color: RED_FAINT });
  }

  return all;
}

/* ================================================================
   页面
   ================================================================ */
export default function PosterPage() {
  const lines = buildLineField();
  const W = 680;
  const H = 952;

  return (
    <div className="min-h-screen flex items-center justify-center p-3 md:p-6"
         style={{ background: "#1a1a1a" }}>

      {/* 海报画布 */}
      <div className="relative" style={{ width: W, height: H, maxWidth: "100vw", maxHeight: "98vh", aspectRatio: `${W}/${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg"
             style={{ width: "100%", height: "100%", background: PAPER }}>

          {/* ---- 纸纹 ---- */}
          <defs>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" mode="multiply" result="grain" />
            </filter>
            <mask id="grain-mask">
              <rect width={W} height={H} fill="url(#grain-pattern)" opacity="0.04" />
            </mask>
          </defs>

          {/* 纸纹覆盖 */}
          <rect width={W} height={H} fill={PAPER} />
          <rect width={W} height={H} fill="#000" opacity="0.018"
                style={{
                  mask: "url(#grain-mask)",
                  filter: "url(#grain)",
                }} />

          {/* ============================================================
               线场层
               ============================================================ */}
          {lines.map((l, i) => (
            <line key={i}
                  x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                  stroke={l.color} strokeWidth={l.sw} opacity={l.op}
                  strokeLinecap="round" />
          ))}

          {/* ============================================================
               文字系统：克制边缘注释
               ============================================================ */}

          {/* 顶部标题 */}
          <text x={40} y={58} fontFamily="'JetBrains Mono', monospace" fontSize={11}
                fill={INK} fontWeight={500} letterSpacing="0.35em">
            拆解
          </text>
          <text x={40} y={74} fontFamily="'JetBrains Mono', monospace" fontSize={8}
                fill={GRAY} letterSpacing="0.2em">
            DECONSTRUCT · EXPERIMENTAL POSTER
          </text>
          <line x1={40} y1={82} x2={195} y2={82} stroke={INK} strokeWidth={0.6} opacity={0.3} />

          {/* 右上状态标记 */}
          <text x={W - 40} y={58} fontFamily="'JetBrains Mono', monospace" fontSize={8}
                fill={RED} letterSpacing="0.2em" textAnchor="end" opacity={0.7}>
            VOL.01
          </text>
          <text x={W - 40} y={72} fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill={GRAY} letterSpacing="0.15em" textAnchor="end">
            2026.06.23
          </text>

          {/* 左侧竖排标尺 */}
          {[20, 40, 60, 80, 100].map((v, i) => (
            <g key={`scale-${i}`}>
              <line x1={18} y1={H * 0.25 + i * 38} x2={28} y2={H * 0.25 + i * 38}
                    stroke={GRAY} strokeWidth={0.5} opacity={0.25} />
              <text x={16} y={H * 0.25 + i * 38 + 3}
                    fontFamily="'JetBrains Mono', monospace" fontSize={6}
                    fill={GRAY} opacity={0.3} textAnchor="end">{v}</text>
            </g>
          ))}

          {/* 左下短句 */}
          <text x={40} y={H - 48} fontFamily="'Noto Serif SC', 'STSong', serif"
                fontSize={12} fill={INK} fontWeight={400} letterSpacing="0.08em">
            将完整之物分解为零件，理解其构造。
          </text>
          <line x1={40} y1={H - 38} x2={280} y2={H - 38} stroke={INK} strokeWidth={0.5} opacity={0.2} />

          {/* 底部说明 */}
          <text x={40} y={H - 24} fontFamily="'JetBrains Mono', monospace"
                fontSize={7} fill={GRAY} letterSpacing="0.12em">
            数字经济课程实践项目 · 智能体编程方法论
          </text>

          {/* 右下诊断式标注 */}
          <text x={W - 40} y={H - 60} fontFamily="'JetBrains Mono', monospace"
                fontSize={9} fill={INK} letterSpacing="0.15em" textAnchor="end" fontWeight={500}>
            DIAGNOSIS
          </text>
          <text x={W - 40} y={H - 44} fontFamily="'JetBrains Mono', monospace"
                fontSize={7} fill={GRAY} letterSpacing="0.1em" textAnchor="end">
            核心对象由高密度轨迹压缩成形
          </text>
          <text x={W - 40} y={H - 32} fontFamily="'JetBrains Mono', monospace"
                fontSize={7} fill={GRAY} letterSpacing="0.1em" textAnchor="end">
            背景为同源线性场向外衰减
          </text>

          {/* 右侧情绪色强调标记 */}
          <line x1={W - 16} y1={H * 0.32} x2={W - 16} y2={H * 0.52}
                stroke={RED} strokeWidth={0.8} opacity={0.35} />
          <circle cx={W - 16} cy={H * 0.32} r={2.5} fill="none" stroke={RED} strokeWidth={0.8} opacity={0.4} />

          {/* 主体周围的旋转标注 */}
          <text x={W * 0.67} y={H * 0.78}
                fontFamily="'JetBrains Mono', monospace" fontSize={7}
                fill={RED} letterSpacing="0.25em" opacity={0.5}
                transform={`rotate(-90, ${W * 0.67}, ${H * 0.78})`}>
            EXPLODED VIEW · AXONOMETRIC
          </text>

        </svg>
      </div>
    </div>
  );
}
