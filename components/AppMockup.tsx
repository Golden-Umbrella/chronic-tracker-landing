export default function AppMockup() {
  return (
    <div className="relative w-full max-w-[280px] mx-auto select-none" aria-hidden="true">
      {/* Glow behind phone */}
      <div className="absolute inset-0 blur-3xl rounded-full bg-emerald-500/10 scale-110 pointer-events-none" />

      {/* Phone shell */}
      <div className="relative rounded-[2.5rem] bg-[#16181c] border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden p-1.5">
        {/* Screen */}
        <div className="rounded-[2.1rem] bg-[#0e0f11] overflow-hidden">

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-4 pb-1">
            <span className="text-[10px] text-white/40 font-medium">9:41</span>
            <div className="w-16 h-4 bg-[#16181c] rounded-full" /> {/* notch */}
            <div className="flex gap-1 items-center">
              <div className="w-3 h-2 rounded-sm bg-white/30" />
              <div className="w-1 h-1 rounded-full bg-white/30" />
            </div>
          </div>

          {/* App content */}
          <div className="px-4 pb-6 pt-2 space-y-3">

            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-[9px] text-white/30 uppercase tracking-widest">Today</p>
                <p className="text-xs font-semibold text-white">Your Patterns</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-[10px]">✦</span>
              </div>
            </div>

            {/* Pattern card */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
                <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-wider">Pattern · 87% confidence</span>
              </div>
              <p className="text-[10px] text-white/75 leading-relaxed">
                On nights you slept under 6h, symptom severity was{" "}
                <span className="text-red-400 font-semibold">40% higher</span> the next day.
              </p>
              <div className="mt-2.5 flex gap-1">
                {/* Mini bar chart */}
                {[40, 65, 35, 85, 30, 90, 45].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end h-8">
                    <div
                      className="w-full rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: h > 70
                          ? "rgba(248,113,113,0.7)"
                          : "rgba(52,211,153,0.5)",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[7px] text-white/20">Mon</span>
                <span className="text-[7px] text-white/20">Sun</span>
              </div>
            </div>

            {/* HRV insight */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[9px] text-white/40 uppercase tracking-wide">Avg HRV</p>
                  <p className="text-base font-bold text-white">54 <span className="text-[10px] text-white/30 font-normal">ms</span></p>
                </div>
                <span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">↑ Good</span>
              </div>
              {/* HRV sparkline */}
              <svg viewBox="0 0 100 24" className="w-full h-5" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="app-mockup-hrv-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(52,211,153,0.15)" />
                    <stop offset="100%" stopColor="rgba(52,211,153,0)" />
                  </linearGradient>
                </defs>
                <polyline
                  points="0,18 14,12 28,16 42,8 56,14 70,6 84,10 100,4"
                  fill="none"
                  stroke="rgba(52,211,153,0.6)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="0,18 14,12 28,16 42,8 56,14 70,6 84,10 100,4 100,24 0,24"
                  fill="url(#app-mockup-hrv-gradient)"
                  stroke="none"
                />
              </svg>
            </div>

            {/* Sleep row */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">🌙</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] text-white/30 uppercase tracking-wide">Last night</p>
                <p className="text-xs font-semibold text-white">7h 22m</p>
              </div>
              <span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full flex-shrink-0">On target</span>
            </div>

          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="absolute -bottom-6 left-4 right-4 h-8 bg-emerald-500/5 blur-xl rounded-full" />
    </div>
  );
}
