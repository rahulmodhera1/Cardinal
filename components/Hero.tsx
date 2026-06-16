"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkline } from "@/components/Sparkline";

const Beams = dynamic(
  () => import("@/components/ui/Beams").then((m) => ({ default: m.Beams })),
  { ssr: false },
);

const heroSparkline = [100, 104, 101, 108, 106, 112, 110, 118, 115, 122, 119, 128];

const trades = [
  { symbol: "AAPL",       side: "LONG",  ret: "+8.4%",  status: "CLOSED" },
  { symbol: "SPY PUTS",   side: "SHORT", ret: "+22.1%", status: "CLOSED" },
  { symbol: "/ES",        side: "LONG",  ret: "+5.7%",  status: "CLOSED" },
  { symbol: "NVDA",       side: "LONG",  ret: "+11.3%", status: "CLOSED" },
  { symbol: "TSLA CALLS", side: "LONG",  ret: "+18.9%", status: "CLOSED" },
];

// Diagonal speed-streak lines that fire on bird entry
const streaks = [
  { top: 12, width: 320, opacity: 0.55, delay: 0.42 },
  { top: 18, width: 480, opacity: 0.40, delay: 0.46 },
  { top: 25, width: 260, opacity: 0.30, delay: 0.50 },
  { top: 32, width: 560, opacity: 0.45, delay: 0.44 },
  { top: 38, width: 200, opacity: 0.25, delay: 0.54 },
  { top: 44, width: 400, opacity: 0.35, delay: 0.48 },
  { top: 50, width: 300, opacity: 0.28, delay: 0.56 },
];

export function Hero() {
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReduced ? 0 : 0.75,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section className="relative min-h-screen bg-black flex items-center pt-10 pb-16 overflow-hidden">

      {/* ── 3D beams background ── */}
      {!prefersReduced && (
        <div className="absolute inset-0 z-0">
          <Beams
            beamWidth={2.5}
            beamHeight={20}
            beamNumber={14}
            lightColor="#CC1111"
            speed={2}
            noiseIntensity={1.6}
            scale={0.18}
            rotation={40}
          />
        </div>
      )}

      {/* ── Vignette overlays ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 65% 45%, transparent 20%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.88) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #000)" }}
      />

      {/* ══════════════════════════════════════════════
          CARDINAL BIRD — cinematic flight animation
      ══════════════════════════════════════════════ */}
      {!prefersReduced && (
        <div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden"
          style={{ zIndex: 1 }}
        >
          {/* Speed streaks — burst in just before the bird arrives */}
          {streaks.map((s, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${s.top}%`,
                right: 0,
                height: "1px",
                width: `${s.width}px`,
                background: `linear-gradient(to left, transparent, rgba(178,34,34,${s.opacity}), transparent)`,
                transformOrigin: "right center",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 0.8, 0] }}
              transition={{ duration: 0.9, delay: s.delay, ease: "easeOut" }}
            />
          ))}

          {/* Bird container — sweeps in from upper-right at a banking angle */}
          <motion.div
            style={{
              position: "absolute",
              /* Sit in upper-right quadrant, overlapping right column */
              right: "-2%",
              top: "-2%",
              width: "clamp(480px, 58vw, 860px)",
              /* Screen blend: dark halo pixels dissolve into black bg */
              mixBlendMode: "screen",
              /* Fade out the text portion at bottom of the logo PNG */
              maskImage: "linear-gradient(to bottom, black 46%, transparent 64%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 46%, transparent 64%)",
            }}
            /* Entry: bank in from far upper-right */
            initial={{ x: "55vw", y: "-30vh", rotate: 18, scale: 0.55, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Wing-beat flight loop
                scaleY pumps up/down to simulate wings; y bobs in sync;
                rotate tilts body as if adjusting in air */}
            <motion.div
              animate={{
                y:      [0, -22, -6, -28, -8, -18,  0],
                rotate: [0,  -4,  1,  -3,  2,  -2,  0],
                scaleY: [1, 1.06, 0.95, 1.07, 0.96, 1.04, 1],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
                delay: 2.2, // starts after entry completes
              }}
            >
              {/* Breathing cardinal-red glow — synced slightly faster than wing beat */}
              <motion.div
                animate={{
                  filter: [
                    "drop-shadow(0 0 18px rgba(178,34,34,0.45)) drop-shadow(0 0 45px rgba(178,34,34,0.18))",
                    "drop-shadow(0 0 52px rgba(210,20,20,0.88)) drop-shadow(0 0 110px rgba(178,34,34,0.48))",
                    "drop-shadow(0 0 18px rgba(178,34,34,0.45)) drop-shadow(0 0 45px rgba(178,34,34,0.18))",
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/logo.png"
                  alt=""
                  width={1408}
                  height={768}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* ── Page content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div>
            <motion.p
              {...fadeUp(0)}
              className="font-mono text-xs tracking-[0.25em] uppercase text-cardinal-red mb-6"
            >
              Professional Trading Solutions
            </motion.p>

            <div className="space-y-1 mb-8">
              <motion.h1
                {...fadeUp(0.06)}
                className="font-bold leading-[1.08]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)", letterSpacing: "-0.03em" }}
              >
                <span className="text-white">Swing Trading.</span>
              </motion.h1>
              <motion.h1
                {...fadeUp(0.18)}
                className="font-bold leading-[1.08]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)", letterSpacing: "-0.03em" }}
              >
                <span className="text-white">Automated. </span>
                <span className="text-shimmer-red">Tested.</span>
              </motion.h1>
              <motion.h1
                {...fadeUp(0.3)}
                className="font-bold leading-[1.08]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)", letterSpacing: "-0.03em" }}
              >
                <span className="text-white">Built to Perform.</span>
              </motion.h1>
            </div>

            <motion.p
              {...fadeUp(0.44)}
              className="text-muted text-lg leading-relaxed max-w-xl"
            >
              Cardinal gives you access to a suite of swing trading bots designed for
              stocks, options, and futures — vetted through real market conditions
              before you ever pay a dollar.
            </motion.p>

            <motion.div {...fadeUp(0.56)} className="flex flex-wrap gap-4 mt-10">
              <a href="#pricing" className="btn-glow bg-cardinal-red hover:bg-cardinal-red-dark text-white font-bold px-8 py-3.5 rounded-full">
                Explore Plans
              </a>
              <a href="#performance" className="border border-white/20 text-white hover:border-cardinal-red/70 px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-cardinal-red/10 backdrop-blur-sm">
                See Performance
              </a>
            </motion.div>

            <motion.p
              {...fadeUp(0.65)}
              className="font-mono text-sm text-muted mt-6 flex flex-wrap gap-5"
            >
              <span>✓ Cancel anytime</span>
              <span>✓ No lock-in</span>
              <span>✓ Live track record</span>
            </motion.p>
          </div>

          {/* Right: Live Bot Card */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : 64 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.85, delay: 0.3, type: "spring", stiffness: 70, damping: 18 }}
          >
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(178,34,34,0.8), transparent)" }}
              />
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-white text-lg tracking-tight">Cardinal Alpha-1</span>
                <span className="flex items-center gap-1.5 bg-cardinal-red/20 border border-cardinal-red/60 text-cardinal-red text-xs font-mono px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-cardinal-red animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="mb-4 rounded-xl overflow-hidden" style={{ background: "rgba(178,34,34,0.06)" }}>
                <Sparkline data={heroSparkline} width={340} height={80} lineColor="#B22222" fillColor="rgba(178,34,34,0.2)" className="w-full" />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Win Rate",   value: "68%",    green: true },
                  { label: "Avg Hold",   value: "2.4d",   green: false },
                  { label: "MTD Return", value: "+14.2%", green: true },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`font-mono text-xl font-bold ${stat.green ? "text-gain-light" : "text-white"}`}>{stat.value}</div>
                    <div className="font-mono text-xs text-muted mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 my-4" />
              <div className="space-y-2.5">
                <p className="font-mono text-xs text-muted uppercase tracking-widest mb-3">Last 5 Trades</p>
                {trades.map((trade, i) => (
                  <div key={i} className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-semibold w-24 truncate">{trade.symbol}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-mono ${trade.side === "LONG" ? "bg-gain/20 text-gain-light" : "bg-loss/20 text-loss"}`}>
                      {trade.side}
                    </span>
                    <span className="text-gain-light font-bold">{trade.ret}</span>
                    <span className="text-muted">✓ {trade.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
