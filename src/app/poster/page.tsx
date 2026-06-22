import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "拆解 · 概念海报",
  description: "将完整之物分解为零件，理解其构造。",
};

export default function PosterPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center p-4 md:p-8">
      {/* ============================================================
           海报主体 — A2 比例 (≈1:1.414)
           ============================================================ */}
      <div className="relative w-full max-w-[720px] aspect-[1/1.4] bg-[#f8f5f0] overflow-hidden"
           style={{ boxShadow: "0 4px 60px rgba(0,0,0,0.12)" }}>

        {/* 纸张纹理 */}
        <SVGFilter />
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {/* ================================================================
             主视觉层 1：拆分字骨
             ================================================================ */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative"
               style={{ transform: "translateY(-3%)" }}>
            {/* 字间距离拉大 — 模拟拆解 */}
            <h1 className="flex items-baseline justify-center"
                style={{
                  fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'SimSun', 'STSong', Georgia, serif",
                  fontSize: "clamp(9rem, 18vw, 15rem)",
                  fontWeight: 900,
                  letterSpacing: "0.35em",
                  color: "#1a1a1a",
                  lineHeight: 1,
                }}>
              <span style={{ display: "inline-block" }}>拆</span>
              <span style={{ display: "inline-block", marginLeft: "0.1em" }}>解</span>
            </h1>
          </div>
        </div>

        {/* ================================================================
             视觉层 2：爆炸图 + 技术标注
             ================================================================ */}
        {/* 十字定位线 */}
        <Crosshair x="82%" y="18%" />
        <Crosshair x="18%" y="78%" />

        {/* 红线：分析的目光 */}
        <div className="absolute" style={{ left: "14%", top: "22%", width: "3px", height: "48px", background: "#c41e3a", opacity: 0.7 }} />
        <div className="absolute" style={{ left: "14%", top: "22%", width: "28px", height: "3px", background: "#c41e3a", opacity: 0.7 }} />

        {/* 爆炸立方体 — 右上角 */}
        <ExplodedCube />

        {/* 技术标注线 */}
        <AnnotLine x1={62} y1={21} x2={68} y2={21} label="观察" />
        <AnnotLine x1={18} y1={82} x2={26} y2={82} label="分析" />
        <AnnotLine x1={78} y1={64} x2={85} y2={64} label="重构" />

        {/* 量角 / 尺度标记 */}
        <DimensionMark x={74} y={40} />

        {/* ================================================================
             视觉层 3：辅助文字
             ================================================================ */}
        {/* 底部左下 */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
          <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase"
             style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", color: "#666" }}>
            拆解 · Deconstruct
          </p>
          <p className="text-[10px] md:text-xs mt-2 tracking-[0.2em]"
             style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", color: "#999" }}>
            数字经济课程实践项目 · 2026
          </p>
        </div>

        {/* 底部右下 */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-right">
          <p className="text-[11px] md:text-xs font-medium tracking-wider leading-relaxed"
             style={{ fontFamily: "'Noto Serif SC', Georgia, serif", color: "#555", maxWidth: "200px" }}>
            将完整之物分解为零件，
            <br />
            理解其构造。
          </p>
        </div>

        {/* 顶部右上标签 */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12">
          <p className="text-[10px] tracking-[0.25em] uppercase"
             style={{ fontFamily: "'JetBrains Mono', monospace", color: "#c41e3a", fontWeight: 500 }}>
            Vol. 01
          </p>
        </div>

      </div>
    </div>
  );
}

/* ================================================================
   内联组件
   ================================================================ */

/** 十字定位线 */
function Crosshair({ x, y }: { x: string; y: string }) {
  const size = 16;
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, transform: "translate(-50%,-50%)" }}>
      {/* 竖线 */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ width: "1px", height: size, background: "#ccc" }} />
      {/* 横线 */}
      <div className="absolute top-1/2 -translate-y-1/2" style={{ height: "1px", width: size, background: "#ccc" }} />
      {/* 中心圆 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
           style={{ width: 4, height: 4, border: "1px solid #bbb" }} />
    </div>
  );
}

/** 标注线 */
function AnnotLine({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
  const isRight = x2 > x1;
  return (
    <div className="absolute pointer-events-none flex items-center"
         style={{ left: `${x1}%`, top: `${y1}%` }}>
      {/* 线 */}
      <div style={{
        width: `${Math.abs(x2 - x1) * 0.7}vw`,
        maxWidth: 60,
        height: "1px",
        background: "#bbb",
        marginRight: isRight ? 4 : 0,
        marginLeft: !isRight ? 4 : 0,
      }} />
      {/* 端点 */}
      <div style={{ width: 3, height: 3, background: "#bbb", borderRadius: "50%" }} />
      {/* 标签 */}
      <span className="text-[10px] tracking-[0.15em] ml-2"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#999" }}>
        {label}
      </span>
    </div>
  );
}

/** 量角/尺度标记 */
function DimensionMark({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%` }}>
      {[0, 2, 4, 6, 8].map((i) => (
        <div key={i} className="flex items-center gap-1 mb-0.5">
          <div style={{ width: 6, height: 1, background: "#ccc" }} />
          <span className="text-[8px]" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#bbb" }}>{i}</span>
        </div>
      ))}
    </div>
  );
}

/** 爆炸立方体 SVG */
function ExplodedCube() {
  return (
    <div className="absolute pointer-events-none" style={{ right: "10%", top: "14%" }}>
      <svg width="140" height="130" viewBox="0 0 140 130" xmlns="http://www.w3.org/2000/svg">
        {/* 爆炸线：用虚线连接零件 */}
        <g stroke="#bbb" strokeWidth="0.6" strokeDasharray="3 2" fill="none" opacity="0.5">
          <line x1="55" y1="50" x2="55" y2="85" />
          <line x1="55" y1="50" x2="20" y2="70" />
          <line x1="55" y1="50" x2="90" y2="70" />
          <line x1="55" y1="50" x2="55" y2="20" />
        </g>

        {/* 顶面 — 上移 */}
        <g transform="translate(0, -8)">
          <polygon points="55,18 90,38 55,58 20,38" fill="none" stroke="#1a1a1a" strokeWidth="1.2" />
          <circle cx="55" cy="38" r="1.5" fill="#c41e3a" opacity="0.6" />
        </g>

        {/* 前面 — 下移 */}
        <g transform="translate(0, 12)">
          <polygon points="55,58 55,95 20,75 20,38" fill="none" stroke="#1a1a1a" strokeWidth="1.2" />
          <circle cx="38" cy="56" r="1.5" fill="#1a1a1a" opacity="0.4" />
        </g>

        {/* 右面 — 右移 */}
        <g transform="translate(10, 4)">
          <polygon points="55,58 90,78 90,38 55,18" fill="none" stroke="#1a1a1a" strokeWidth="1.2" />
          <circle cx="72" cy="48" r="1.5" fill="#1a1a1a" opacity="0.4" />
        </g>

        {/* 中心原点 */}
        <circle cx="55" cy="42" r="2.5" fill="#1a1a1a" />
      </svg>
      {/* 标签 */}
      <p className="text-center text-[9px] tracking-[0.2em] mt-1"
         style={{ fontFamily: "'JetBrains Mono', monospace", color: "#999" }}>
        EXPLODED VIEW
      </p>
    </div>
  );
}

/** SVG 纹理滤镜（隐藏DOM元素） */
function SVGFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </defs>
    </svg>
  );
}
