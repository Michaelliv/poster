export default function Poster() {
  return (
    <div
      className="w-[1200px] p-16 relative overflow-hidden"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(900px 600px at 10% 0%, rgba(217,119,87,0.35), transparent 60%), radial-gradient(800px 500px at 100% 100%, rgba(139,92,246,0.28), transparent 60%), #0a0a0f",
        color: "white",
      }}
    >
      <div className="flex items-center justify-between mb-14">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-[18px] font-bold"
            style={{
              background: "linear-gradient(135deg,#d97757,#c9623f)",
              boxShadow: "0 10px 30px -10px rgba(217,119,87,0.6)",
            }}
          >
            A
          </div>
          <div>
            <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50">
              Personal News · Vol. I
            </div>
            <div className="text-[15px] text-white/70">April 2026</div>
          </div>
        </div>
        <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[14px] text-white/80 tabular-nums">
          Start date · Monday, 4 May 2026
        </div>
      </div>

      <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/60 mb-6">
        I'm thrilled to share
      </div>

      <h1
        className="text-[84px] leading-[0.95] font-semibold tracking-tight mb-10"
        style={{ letterSpacing: "-0.02em" }}
      >
        Joining Anthropic as{" "}
        <span
          style={{
            fontFamily: "'Source Serif 4', serif",
            fontStyle: "italic",
            backgroundImage: "linear-gradient(180deg,#fef3c7,#f472b6,#a855f7)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          founding designer.
        </span>
      </h1>

      <div
        className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 mb-10"
        style={{
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 30px 60px -30px rgba(0,0,0,0.7)",
        }}
      >
        <div
          className="text-[26px] leading-[1.35] text-white/90"
          style={{ fontFamily: "'Source Serif 4', serif", fontStyle: "italic" }}
        >
          "Design is how the world will meet the most capable models ever
          built. I get to shape that first handshake — and I can't wait to
          start."
        </div>
        <div className="mt-5 flex items-center gap-3 text-[15px] text-white/60">
          <div className="w-8 h-[2px] bg-white/30" />
          <span className="font-semibold text-white/80">Ava Chen</span>
          <span>·</span>
          <span>Founding Designer, Anthropic</span>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex gap-10">
          <div>
            <div className="text-[14px] font-bold uppercase tracking-[0.25em] text-white/40 mb-2">
              Team
            </div>
            <div className="text-[18px] text-white/90">Product · Claude</div>
          </div>
          <div>
            <div className="text-[14px] font-bold uppercase tracking-[0.25em] text-white/40 mb-2">
              Based in
            </div>
            <div className="text-[18px] text-white/90">San Francisco</div>
          </div>
          <div>
            <div className="text-[14px] font-bold uppercase tracking-[0.25em] text-white/40 mb-2">
              Mission
            </div>
            <div className="text-[18px] text-white/90">Safe, useful AI</div>
          </div>
        </div>
        <div className="text-[14px] text-white/40 tabular-nums">
          #newchapter · 04 / 2026
        </div>
      </div>
    </div>
  );
}
