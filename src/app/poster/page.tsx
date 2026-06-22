import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "拆解 · 概念海报",
  description: "为了理解，先毁灭完整。",
};

export default function PosterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-3 md:p-6"
         style={{ background: "#1a1a1a" }}>

      {/* ================================================================
           海报画布
           ================================================================ */}
      <div className="relative w-full max-w-[680px] aspect-[1/1.4] overflow-hidden"
           style={{
             background: "#C41E3A",
             boxShadow: "0 8px 80px rgba(0,0,0,0.45)",
           }}>

        {/* ---- 丝网印刷噪点 ---- */}
        <div className="absolute inset-0 pointer-events-none"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
               opacity: 0.06,
               mixBlendMode: "multiply",
             }}
        />

        {/* ================================================================
             主视觉层 1：巨大白色文字
             ================================================================ */}
        <div className="absolute inset-0 flex items-center justify-center"
             style={{ paddingTop: "5%" }}>
          <div className="relative">
            {/* 「拆」— 完整 */}
            <span style={{
              fontFamily: "'Noto Serif SC', 'STSong', 'SimSun', serif",
              fontSize: "clamp(8rem, 16vw, 14rem)",
              fontWeight: 900,
              color: "#F5F0E8",
              lineHeight: 1,
              letterSpacing: "0.04em",
            }}>
              拆
            </span>
            {/* 「解」— 正在拆散 */}
            <span style={{
              fontFamily: "'Noto Serif SC', 'STSong', 'SimSun', serif",
              fontSize: "clamp(8rem, 16vw, 14rem)",
              fontWeight: 900,
              color: "#F5F0E8",
              lineHeight: 1,
              letterSpacing: "0.2em",
              position: "relative",
            }}>
              解
            </span>

            {/* 碎片：从「解」字剥离的几何片 */}
            <Fragments />
          </div>
        </div>

        {/* ================================================================
             主视觉层 2：爆炸几何体
             ================================================================ */}
        <ExplodedGeometry />

        {/* ================================================================
             主视觉层 3：辅助文字
             ================================================================ */}
        {/* 顶部左 */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10">
          <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-medium"
             style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(245,240,232,0.45)" }}>
            DECONSTRUCT · 2026
          </p>
        </div>

        {/* 底部左 */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <p className="text-[10px] md:text-[11px] tracking-[0.25em] leading-relaxed font-medium"
             style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(245,240,232,0.5)" }}>
            TO UNDERSTAND,
            <br />
            DESTROY THE WHOLE.
          </p>
        </div>

        {/* 底部右 */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-right">
          <p className="text-[10px] md:text-[11px] leading-relaxed"
             style={{ fontFamily: "'Noto Serif SC', 'STSong', serif", color: "rgba(245,240,232,0.45)", maxWidth: 160 }}>
            为了理解，
            <br />
            先毁灭完整。
          </p>
          <div className="mt-3 flex items-center justify-end gap-2">
            <div style={{ width: 14, height: 1, background: "rgba(245,240,232,0.3)" }} />
            <span className="text-[8px] tracking-[0.2em]"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(245,240,232,0.3)" }}>
              VOL.01
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================================================================
   碎片：从「解」字剥离
   ================================================================ */
function Fragments() {
  const shards = [
    { x: 82, y: 12, w: 28, h: 5, rot: -15, opacity: 0.55 },
    { x: 88, y: 5, w: 18, h: 4, rot: 22, opacity: 0.45 },
    { x: 86, y: 18, w: 14, h: 3, rot: 8, opacity: 0.5 },
    { x: 76, y: 2, w: 10, h: 3, rot: -30, opacity: 0.35 },
    { x: 90, y: 24, w: 20, h: 4, rot: -5, opacity: 0.4 },
  ];

  return (
    <div className="absolute pointer-events-none" style={{ top: 0, right: "-4%", width: "35%", height: "50%" }}>
      {shards.map((s, i) => (
        <div key={i} className="absolute"
             style={{
               left: `${s.x}%`,
               top: `${s.y}%`,
               width: `${s.w}px`,
               height: `${s.h}px`,
               background: "#F5F0E8",
               opacity: s.opacity,
               transform: `rotate(${s.rot}deg)`,
             }}
        />
      ))}
      {/* 更远的小碎片 */}
      <div className="absolute" style={{ left: "92%", top: "10%", width: 6, height: 6, background: "#F5F0E8", opacity: 0.2, transform: "rotate(45deg)" }} />
      <div className="absolute" style={{ left: "95%", top: "2%", width: 4, height: 4, background: "#F5F0E8", opacity: 0.15, transform: "rotate(60deg)" }} />
    </div>
  );
}

/* ================================================================
   爆炸几何体 — 右下角
   ================================================================ */
function ExplodedGeometry() {
  return (
    <div className="absolute pointer-events-none" style={{ right: "10%", bottom: "18%" }}>
      <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        {/* 虚线：原位的痕迹 */}
        <g stroke="rgba(245,240,232,0.2)" strokeWidth="0.6" strokeDasharray="2 3" fill="none">
          <line x1="32" y1="32" x2="20" y2="20" />
          <line x1="32" y1="32" x2="48" y2="22" />
          <line x1="32" y1="32" x2="44" y2="46" />
        </g>

        {/* 碎片 A — 左上飘 */}
        <g transform="translate(14, 14)">
          <polygon points="0,0 12,0 12,12 0,12" fill="none" stroke="#F5F0E8" strokeWidth="1.2" opacity="0.6" />
          <line x1="0" y1="6" x2="12" y2="6" stroke="#F5F0E8" strokeWidth="0.4" opacity="0.3" />
        </g>

        {/* 碎片 B — 右上飘 */}
        <g transform="translate(42, 16)">
          <polygon points="0,0 14,0 14,14 0,14" fill="none" stroke="#F5F0E8" strokeWidth="1.2" opacity="0.6" />
          <line x1="7" y1="0" x2="7" y2="14" stroke="#F5F0E8" strokeWidth="0.4" opacity="0.3" />
        </g>

        {/* 碎片 C — 下方飘 */}
        <g transform="translate(38, 40)">
          <polygon points="0,0 14,0 14,14 0,14" fill="none" stroke="#F5F0E8" strokeWidth="1.2" opacity="0.6" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="#F5F0E8" strokeWidth="0.4" opacity="0.3" />
        </g>

        {/* 中心原点 — 爆炸的起点 */}
        <circle cx="32" cy="32" r="2.8" fill="none" stroke="#F5F0E8" strokeWidth="1.5" opacity="0.7" />
        <circle cx="32" cy="32" r="0.8" fill="#F5F0E8" opacity="0.5" />
      </svg>

      <p className="text-[8px] tracking-[0.25em] mt-1 text-center"
         style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(245,240,232,0.25)" }}>
        FIG.1 — EXPLODED
      </p>
    </div>
  );
}
