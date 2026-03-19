function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full rounded-[2rem] bg-[#16181c] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden p-1.5">
        <div className="rounded-[1.7rem] bg-[#0e0f11] overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3.5 pb-1">
            <span className="text-[9px] text-white/30 font-medium tabular-nums">9:41</span>
            <div className="w-12 h-3.5 bg-[#16181c] rounded-full" />
            <div className="flex gap-1 items-center">
              <div className="w-2.5 h-1.5 rounded-[2px] bg-white/25" />
              <div className="w-1 h-1 rounded-full bg-white/25" />
            </div>
          </div>
          {/* Screen content */}
          <div className="px-4 pb-5 pt-1">{children}</div>
        </div>
      </div>
      <p className="text-xs text-white/30 font-medium text-center">{label}</p>
    </div>
  );
}

// Screen 1 — Dashboard / Home
function DashboardScreen() {
  const stats = [
    { label: "HRV", value: "52", unit: "ms", badge: "↑ Good", color: "emerald" },
    { label: "Sleep", value: "7.1", unit: "h avg", badge: "On track", color: "indigo" },
    { label: "Steps", value: "8.2k", unit: "today", badge: "↑ 12%", color: "amber" },
  ];
  const sparkPoints = [
    [[0,14],[14,10],[28,13],[42,7],[56,11],[70,5],[84,8],[100,3]],
    [[0,12],[14,8],[28,14],[42,9],[56,6],[70,10],[84,7],[100,5]],
    [[0,10],[14,14],[28,8],[42,12],[56,5],[70,9],[84,6],[100,10]],
  ];
  const colors = ["rgba(52,211,153,0.7)", "rgba(99,102,241,0.7)", "rgba(251,191,36,0.7)"];

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[9px] text-white/30 uppercase tracking-widest">This Week</p>
          <p className="text-xs font-semibold text-white">Your Health at a Glance</p>
        </div>
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <span className="text-emerald-400 text-[9px]">✦</span>
        </div>
      </div>

      <div className="space-y-2">
        {stats.map((s, i) => (
          <div key={s.label} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-2.5 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[8px] text-white/30 uppercase tracking-wide">{s.label}</p>
              <p className="text-sm font-bold text-white leading-tight">
                {s.value} <span className="text-[9px] text-white/30 font-normal">{s.unit}</span>
              </p>
            </div>
            <svg viewBox="0 0 100 20" className="w-14 h-4" preserveAspectRatio="none">
              <polyline
                points={sparkPoints[i].map(([x, y]) => `${x},${y}`).join(" ")}
                fill="none"
                stroke={colors[i]}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-[8px] px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: i === 0 ? "rgba(52,211,153,0.1)" : i === 1 ? "rgba(99,102,241,0.1)" : "rgba(251,191,36,0.1)",
                color: i === 0 ? "rgb(52,211,153)" : i === 1 ? "rgb(129,140,248)" : "rgb(251,191,36)",
              }}
            >
              {s.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div className="mt-3 bg-white/[0.03] border border-white/[0.08] rounded-xl p-2.5">
        <p className="text-[8px] text-white/30 uppercase tracking-wide mb-2">Symptom severity — 7 days</p>
        <div className="flex items-end gap-1 h-10">
          {[60, 35, 80, 40, 75, 30, 45].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm transition-all"
                style={{
                  height: `${h}%`,
                  background: h > 65 ? "rgba(248,113,113,0.6)" : "rgba(52,211,153,0.5)",
                }}
              />
              <span className="text-[6px] text-white/20">
                {["M","T","W","T","F","S","S"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Screen 2 — Insight card
function InsightScreen() {
  const bars = [72, 45, 68, 35, 80, 30, 77, 42];
  const labels = ["<5h", "5h", "6h", "6h", "7h", "7h", "8h", "8h+"];
  return (
    <>
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
        <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-wider">New Pattern · 91% confidence</span>
      </div>

      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-3 relative overflow-hidden mb-2.5">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
        <p className="text-[11px] text-white/80 leading-relaxed font-medium">
          Your energy is{" "}
          <span className="text-red-400 font-bold">34% lower</span> on days after less than 6hrs sleep.
        </p>
        <p className="text-[9px] text-white/35 mt-1.5">
          Based on 47 data points across 11 weeks
        </p>
      </div>

      {/* Chart: sleep hours vs energy */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-2.5">
        <p className="text-[8px] text-white/30 uppercase tracking-wide mb-2">Energy level per night — grouped by sleep duration</p>
        <div className="flex items-end gap-0.5 h-12">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: h > 60 ? "rgba(248,113,113,0.65)" : "rgba(52,211,153,0.55)",
                }}
              />
              <span className="text-[5.5px] text-white/20 leading-none">{labels[i]}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-1.5 rounded-sm bg-red-400/60" />
            <span className="text-[7px] text-white/30">Low energy outcome</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-1.5 rounded-sm bg-emerald-400/55" />
            <span className="text-[7px] text-white/30">High energy outcome</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Screen 3 — Correlation view
function CorrelationScreen() {
  // 30 data points: [sleep quality 0-100, resting HR 50-80]
  const points = [
    [82,56],[45,74],[91,54],[38,78],[75,60],[60,65],[88,55],[42,76],
    [70,62],[55,69],[95,52],[30,80],[78,58],[65,64],[50,71],[85,57],
    [40,77],[72,61],[58,68],[90,53],[48,73],[80,59],[35,79],[68,63],
    [62,66],[77,59],[44,75],[86,56],[52,70],[73,61],
  ];

  const toX = (v: number) => (v / 100) * 80 + 10;
  const toY = (v: number) => 90 - ((v - 50) / 30) * 70;

  // Trend line: y = 80 - 0.25x (inverse: better sleep → lower resting HR)
  const x1 = 10, y1 = toY(80 - 0.25 * 10);
  const x2 = 90, y2 = toY(80 - 0.25 * 90);

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[8px] text-white/30 uppercase tracking-widest">Correlation</p>
          <p className="text-[11px] font-semibold text-white leading-tight">Sleep Quality vs Resting HR</p>
          <p className="text-[8px] text-white/30">Last 30 days</p>
        </div>
        <span className="text-[8px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">−0.82 r</span>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-2.5">
        <svg viewBox="0 0 100 100" className="w-full h-28">
          {/* Grid */}
          {[25, 50, 75].map(x => (
            <line key={x} x1={x} y1="10" x2={x} y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          ))}
          {[30, 55, 80].map(y => (
            <line key={y} x1="10" y1={y} x2="90" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          ))}
          {/* Trend line */}
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(52,211,153,0.35)" strokeWidth="1" strokeDasharray="2,2" />
          {/* Data points */}
          {points.map(([sq, hr], i) => (
            <circle
              key={i}
              cx={toX(sq)}
              cy={toY(hr)}
              r="1.8"
              fill="rgba(52,211,153,0.55)"
              stroke="rgba(52,211,153,0.3)"
              strokeWidth="0.5"
            />
          ))}
          {/* Axis labels */}
          <text x="50" y="97" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="4">Sleep quality →</text>
          <text x="4" y="55" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="4" transform="rotate(-90,4,55)">Resting HR →</text>
        </svg>
        <p className="text-[8px] text-white/30 text-center mt-1">
          Strong inverse correlation — better sleep, lower resting heart rate.
        </p>
      </div>
    </>
  );
}

// Screen 4 — Weekly report
function WeeklyReportScreen() {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[8px] text-white/30 uppercase tracking-widest">Weekly Report</p>
          <p className="text-[11px] font-semibold text-white">Mar 10 – Mar 16</p>
        </div>
        <span className="text-[8px] text-white/30 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full">Share →</span>
      </div>

      <div className="space-y-2">
        <div className="bg-emerald-500/8 border border-emerald-400/20 rounded-xl p-2.5">
          <p className="text-[8px] text-emerald-400 uppercase tracking-wide mb-0.5">Best day</p>
          <p className="text-[10px] text-white font-medium">Thursday — HRV 61ms · 8h sleep · Low symptoms</p>
        </div>
        <div className="bg-red-500/8 border border-red-400/15 rounded-xl p-2.5">
          <p className="text-[8px] text-red-400 uppercase tracking-wide mb-0.5">Hardest day</p>
          <p className="text-[10px] text-white font-medium">Monday — 5.2h sleep · Fatigue score 8/10</p>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-2.5">
          <p className="text-[8px] text-white/30 uppercase tracking-wide mb-1">Top insight this week</p>
          <p className="text-[10px] text-white/75 leading-relaxed">
            Sleep under 6h preceded{" "}
            <span className="text-red-400 font-semibold">4 of 5</span> high-symptom days.
          </p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-2 flex items-center justify-between">
          <p className="text-[8px] text-white/30">Avg HRV this week</p>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-white">54ms</span>
            <span className="text-[7px] text-emerald-400">↑ vs last week</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AppScreens() {
  const screens = [
    { component: <DashboardScreen />, label: "Dashboard — your week at a glance" },
    { component: <InsightScreen />,   label: "Pattern discovery — AI-surfaced insights" },
    { component: <CorrelationScreen />, label: "Correlation view — 30-day trend analysis" },
    { component: <WeeklyReportScreen />, label: "Weekly report — shareable summary" },
  ];

  return (
    <section className="px-6 py-24 bg-[#0e0f11]">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs text-white/30 font-semibold uppercase tracking-widest mb-3">
          Inside the app
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-3">
          See exactly what you&apos;ll get.
        </h2>
        <p className="text-center text-white/40 text-base mb-14 max-w-md mx-auto">
          Real screens from the app — dashboard, pattern alerts, correlations, and a weekly report you could show your doctor.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {screens.map(({ component, label }) => (
            <PhoneFrame key={label} label={label}>
              {component}
            </PhoneFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
