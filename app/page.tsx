"use client";

import { useState } from "react";

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
    <main className="min-h-screen bg-[#faf9f7] text-[#1a1a1a]">

      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-xl w-full">
          <p className="text-[#2e7d32] text-sm font-semibold tracking-widest uppercase mb-6">
            Chronic Tracker
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Stop guessing<br className="hidden sm:block" /> why you feel bad.
          </h1>
          <p className="text-lg sm:text-xl text-[#555] leading-relaxed mb-10">
            Connect your Apple Watch. We find your triggers automatically.
          </p>
          <a
            href="#waitlist"
            className="inline-block bg-[#2e7d32] hover:bg-[#256427] text-white font-semibold text-base px-8 py-4 rounded-full transition-colors"
          >
            Join the Waitlist →
          </a>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-12">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              { step: "1", title: "Sync Apple Watch", desc: "Connect your wearable. We pull sleep, HRV, activity, and more — automatically." },
              { step: "2", title: "Log 60 seconds a day", desc: "Rate how you feel and note what you ate. That's it. No lengthy journals." },
              { step: "3", title: "Get your patterns", desc: "We surface the correlations that matter — so you finally know what's driving your symptoms." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#e8f5e9] text-[#2e7d32] font-bold text-lg flex items-center justify-center mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Example insight ── */}
      <section className="px-6 py-20 bg-[#faf9f7]">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            What an insight looks like
          </h2>
          <div className="bg-white border border-[#e0e0e0] rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#2e7d32]" />
              <span className="text-xs font-semibold text-[#2e7d32] uppercase tracking-wider">Pattern detected — 87% confidence</span>
            </div>
            <p className="text-[#1a1a1a] text-base sm:text-lg leading-relaxed italic">
              "You consistently feel worse 2 days after eating gluten AND when sleep is under 6h — 87% of the time. Your best days follow nights with 7.5–8.5 hours of sleep and HRV above 55ms."
            </p>
          </div>
          <p className="text-center text-[#888] text-sm mt-5">
            These are the patterns your doctor doesn't have time to find.
          </p>
        </div>
      </section>

      {/* ── Conditions ── */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-6 text-[#444]">
            Built for people managing:
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Fibromyalgia", "IBS", "PCOS", "Migraines", "Lupus", "ME/CFS"].map((c) => (
              <span
                key={c}
                className="bg-[#f5f5f3] text-[#444] text-sm font-medium px-4 py-2 rounded-full border border-[#e5e5e5]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy ── */}
      <section className="px-6 py-12 bg-[#faf9f7]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#666] text-sm leading-relaxed">
            🔒 Your health data never leaves your device without your permission. We will never sell it.
          </p>
        </div>
      </section>

      {/* ── Waitlist form ── */}
      <section id="waitlist" className="px-6 py-20 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
            Join the waitlist
          </h2>
          <p className="text-center text-[#666] text-sm mb-10">
            We're onboarding a small first group. Get early access.
          </p>

          {status === "success" ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2">You're on the list.</h3>
              <p className="text-[#666] text-sm">
                We'll reach out soon. Check your inbox — confirmation is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Name <span className="text-[#e53935]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-[#ddd] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#2e7d32]/30 focus:border-[#2e7d32] bg-[#faf9f7] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Email <span className="text-[#e53935]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-[#ddd] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#2e7d32]/30 focus:border-[#2e7d32] bg-[#faf9f7] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  What condition are you managing?{" "}
                  <span className="text-[#999] font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="e.g. Fibromyalgia, PCOS, ME/CFS…"
                  className="w-full border border-[#ddd] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#2e7d32]/30 focus:border-[#2e7d32] bg-[#faf9f7] transition"
                />
              </div>

              {status === "error" && (
                <p className="text-[#e53935] text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#2e7d32] hover:bg-[#256427] disabled:opacity-60 text-white font-semibold text-base py-3.5 rounded-full transition-colors"
              >
                {status === "loading" ? "Joining…" : "Join the Waitlist →"}
              </button>

              <p className="text-center text-xs text-[#999] pt-1">
                No spam. No selling your data. Just a message when we're ready.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-8 text-center text-xs text-[#bbb] bg-[#faf9f7]">
        © {new Date().getFullYear()} Chronic Tracker · Your health data never leaves your device without your permission.
      </footer>
    </main>
  );
}
