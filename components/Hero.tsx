"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkline } from "@/components/Sparkline";

const Beams = dynamic(
  () => import("@/components/ui/Beams").then((m) => ({ default: m.Beams })),
  { ssr: false },
);

// ── MoneyPrinter live data types ──────────────────────────────────────────────
interface BotTrade {
  symbol: string;
  side: "LONG" | "SHORT";
  ret: string;   // e.g. "+8.4%"
  status: "CLOSED";
}

interface BotStats {
  winRate: string;   // e.g. "68%"
  avgHold: string;   // e.g. "2.4d"
  mtdReturn: string; // e.g. "+14.2%"
  sparkline: number[];
  trades: BotTrade[];
}

// ── Static fallback (shown while loading or on error) ─────────────────────────
const FALLBACK: BotStats = {
  winRate: "68%",
  avgHold: "2.4d",
  mtdReturn: "+14.2%",
  sparkline: [100, 104, 101, 108, 106, 112, 110, 118, 115, 122, 119, 128],
  trades: [
    { symbol: "AAPL",       side: "LONG",  ret: "+8.4%",  status: "CLOSED" },
    { symbol: "SPY PUTS",   side: "SHORT", ret: "+22.1%", status: "CLOSED" },
    { symbol: "/ES",        side: "LONG",  ret: "+5.7%",  status: "CLOSED" },
    { symbol: "NVDA",       side: "LONG",  ret: "+11.3%", status: "CLOSED" },
    { symbol: "TSLA CALLS", side: "LONG",  ret: "+18.9%", status: "CLOSED" },
  ],
};

// ── Data fetcher — update BOT_API_URL once the endpoint is confirmed ──────────
const BOT_API_URL = "https://money-printer-smoky.vercel.app/api/trades";

async function fetchBotStats(): Promise<BotStats> {
  const res = await fetch(BOT_API_URL, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`${res.status}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any = await res.json();

  // Normalize closed profitable trades (update this mapping once API shape is known)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closed: BotTrade[] = (Array.isArray(raw.trades) ? raw.trades : Array.isArray(raw) ? raw : [])
    .filter((t: any) => t.status === "CLOSED" || t.state === "closed")
    .filter((t: any) => {
      const r = parseFloat(String(t.return ?? t.ret ?? t.pnl ?? "0").replace(/[^-\d.]/g, ""));
      return r > 0;
    })
    .slice(-5)
    .reverse()
    .map((t: any) => ({
      symbol: t.symbol ?? t.ticker ?? "—",
      side:   (t.side ?? t.direction ?? "LONG").toUpperCase() as "LONG" | "SHORT",
      ret:    t.return ?? t.ret ?? t.pnl ?? "—",
      status: "CLOSED" as const,
    }));

  const winRate  = raw.winRate  ?? raw.win_rate  ?? FALLBACK.winRate;
  const avgHold  = raw.avgHold  ?? raw.avg_hold  ?? FALLBACK.avgHold;
  const mtdReturn = raw.mtdReturn ?? raw.mtd_return ?? raw.monthReturn ?? FALLBACK.mtdReturn;
  const sparkline = Array.isArray(raw.sparkline) ? raw.sparkline : FALLBACK.sparkline;

  return {
    winRate:  typeof winRate  === "number" ? `${winRate}%`  : String(winRate),
    avgHold:  typeof avgHold  === "number" ? `${avgHold}d`  : String(avgHold),
    mtdReturn: typeof mtdReturn === "number" ? `+${mtdReturn}%` : String(mtdReturn),
    sparkline,
    trades: closed.length ? closed : FALLBACK.trades,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────
export function Hero() {
  const prefersReduced = useReducedMotion();
  const [botData, setBotData] = useState<BotStats>(FALLBACK);

  useEffect(() => {
    fetchBotStats()
      .then(setBotData)
      .catch(() => { /* keep fallback */ });
  }, []);

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
              Cardinal is a swing-trading bot for stocks. You connect a brokerage account
              and it handles the entries, exits, and risk automatically. You can see every
              trade it makes, so you always know exactly what it is doing with your account.
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

          {/* Right: MoneyPrinter Bot Card */}
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
                <span className="font-bold text-white text-lg tracking-tight">MoneyPrinter</span>
                <span className="flex items-center gap-1.5 bg-cardinal-red/20 border border-cardinal-red/60 text-cardinal-red text-xs font-mono px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-cardinal-red animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="mb-4 rounded-xl overflow-hidden" style={{ background: "rgba(178,34,34,0.06)" }}>
                <Sparkline data={botData.sparkline} width={340} height={80} lineColor="#B22222" fillColor="rgba(178,34,34,0.2)" className="w-full" />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Win Rate",   value: botData.winRate,   green: true  },
                  { label: "Avg Hold",   value: botData.avgHold,   green: false },
                  { label: "MTD Return", value: botData.mtdReturn, green: true  },
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
                {botData.trades.map((trade, i) => (
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
