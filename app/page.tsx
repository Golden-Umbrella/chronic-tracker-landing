"use client";

import { useState } from "react";
import AppMockup from "@/components/AppMockup";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, condition }),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      const body = await res.json().catch(() => ({}));
      setErrorMsg(body.error || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#0e0f11] text-white">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(52,211,153,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 text-xs font-medium text-emerald-400 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Waitlist open
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
              Your symptoms have<br />
              <span className="text-emerald-400">patterns.</span> We find them.
            </h1>

            <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              AI analyzes your Apple Health data and shows exactly what&apos;s causing your flares.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-3">
              <a
                href="#waitlist"
                className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-full transition-all hover:shadow-[0_0_32px_rgba(52,211,153,0.35)] active:scale-95"
              >
                Get Early Access
              </a>
              <p className="text-sm text-white/40">
                🎁 First 10 to join: free personal pattern report from your Apple Health data.
              </p>
            </div>
          </div>

          {/* Right — app mockup */}
          <div className="flex-shrink-0 w-full max-w-[260px] lg:max-w-[280px]">
            <AppMockup />
          </div>

        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <span className="text-lg">↓</span>
        </div>
      </section>

      {/* ── Example Insight ── */}
      <section className="px-6 py-24 bg-[#0e0f11]">
        <div className="max-w-xl mx-auto">
          <p className="text-center text-xs text-white/30 font-semibold uppercase tracking-widest mb-4">
            What an insight looks like
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">
            Finally — a pattern that explains it.
          </h2>

          {/* Insight card */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Pattern detected · 87% confidence
              </span>
            </div>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed italic">
              &quot;You consistently feel worse 2 days after eating gluten AND when sleep is under 6h — 87% of the time. Your best days follow nights with 7.5–8.5 hours of sleep and HRV above 55ms.&quot;
            </p>
            <div className="mt-6 flex gap-4 text-xs text-white/30 border-t border-white/5 pt-5">
              <span>↑ 23 data points analysed</span>
              <span>·</span>
              <span>↑ 14 weeks of history</span>
              <span>·</span>
              <span>↑ Apple Watch + food log</span>
            </div>
          </div>
          <p className="text-center text-white/30 text-sm mt-5">
            These are the patterns your doctor doesn&apos;t have time to find.
          </p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-white/30 font-semibold uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-14 text-white">
            From your wrist to clarity in three steps.
          </h2>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Sync Apple Watch",
                desc: "Connect your wearable in one tap. We pull sleep, HRV, activity, and heart rate — automatically.",
              },
              {
                step: "02",
                title: "Log 60 seconds a day",
                desc: "Rate how you feel and note what you ate. No lengthy journals. That's the whole thing.",
              },
              {
                step: "03",
                title: "Get your patterns",
                desc: "Our AI surfaces the correlations that matter — so you finally know what's driving your symptoms.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="text-3xl font-bold text-emerald-400/30 mb-3 font-mono">{step}</div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for ── */}
      <section className="px-6 py-16 bg-[#0e0f11]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-white/40 text-sm mb-6 font-medium">Built for people managing:</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {["Fibromyalgia", "IBS", "PCOS", "Migraines", "Lupus", "ME/CFS"].map((c) => (
              <span
                key={c}
                className="bg-white/5 border border-white/10 text-white/60 text-sm font-medium px-4 py-2 rounded-full hover:border-emerald-400/30 hover:text-white/80 transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy ── */}
      <section className="px-6 py-10 bg-[#0e0f11]">
        <div className="max-w-xl mx-auto">
          <div className="bg-white/[0.03] border border-white/8 rounded-xl px-6 py-4 text-center text-white/35 text-sm">
            🔒 Your health data never leaves your device without your permission. We will never sell it.
          </div>
        </div>
      </section>

      {/* ── Waitlist form ── */}
      <section id="waitlist" className="px-6 py-24 bg-white/[0.02]">
        <div className="max-w-md mx-auto">
          <p className="text-center text-xs text-white/30 font-semibold uppercase tracking-widest mb-3">
            Get early access
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
            Join the waitlist.
          </h2>
          <p className="text-center text-white/40 text-sm mb-3">
            We&apos;re onboarding a small first group.
          </p>
          <p className="text-center text-emerald-400 text-sm font-medium mb-10">
            🎁 First 10 members get a free personal pattern report — 2 weeks of your Apple Health data, analysed.
          </p>

          {status === "success" ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-5">🌿</div>
              <h3 className="text-xl font-semibold text-white mb-3">You&apos;re on the list.</h3>
              <p className="text-white/40 text-sm max-w-xs mx-auto">
                We&apos;ll reach out soon. Check your inbox — confirmation is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 focus:border-emerald-400/50 focus:ring-0 rounded-lg px-4 py-3 text-white placeholder-white/20 text-base outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  Email <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-emerald-400/50 focus:ring-0 rounded-lg px-4 py-3 text-white placeholder-white/20 text-base outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  What condition are you managing?{" "}
                  <span className="text-white/25 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="e.g. Fibromyalgia, PCOS, ME/CFS…"
                  className="w-full bg-white/5 border border-white/10 focus:border-emerald-400/50 focus:ring-0 rounded-lg px-4 py-3 text-white placeholder-white/20 text-base outline-none transition"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold text-base py-4 rounded-full transition-all hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] active:scale-[0.99]"
              >
                {status === "loading" ? "Joining…" : "Get Early Access"}
              </button>

              <p className="text-center text-xs text-white/25 pt-1">
                No spam. No selling your data. Just a message when we&apos;re ready.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-8 text-center text-xs text-white/15 bg-[#0e0f11] border-t border-white/5">
        © {new Date().getFullYear()} Chronic Tracker · Your health data never leaves your device without your permission.
      </footer>
    </main>
  );
}
