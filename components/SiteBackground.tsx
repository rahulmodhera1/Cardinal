// Fixed, full-page ambient background: red radial glows + faint grid,
// plus slow-drifting soft orbs for subtle motion.
// Sits behind all content (-z-10); transparent sections reveal it.

const orbs = [
  { left: "10%", top: "18%", size: 340, color: "rgba(194,32,32,0.42)", blur: 46, anim: "drift-a", dur: 18, delay: 0   },
  { left: "74%", top: "14%", size: 300, color: "rgba(210,40,40,0.34)", blur: 50, anim: "drift-b", dur: 22, delay: 1.5 },
  { left: "56%", top: "52%", size: 420, color: "rgba(150,28,28,0.36)", blur: 58, anim: "drift-c", dur: 24, delay: 0.8 },
  { left: "16%", top: "70%", size: 320, color: "rgba(194,32,32,0.34)", blur: 46, anim: "drift-b", dur: 20, delay: 2.5 },
  { left: "46%", top: "32%", size: 260, color: "rgba(210,40,40,0.28)", blur: 42, anim: "drift-a", dur: 21, delay: 1   },
];

export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Red radial glow ambiance */}
      <div
        className="bg-ambient absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 12% 6%,  rgba(178,34,34,0.20), transparent 70%)," +
            "radial-gradient(45% 40% at 88% 28%, rgba(204,34,34,0.13), transparent 72%)," +
            "radial-gradient(50% 45% at 18% 62%, rgba(139,26,26,0.14), transparent 72%)," +
            "radial-gradient(60% 50% at 82% 92%, rgba(178,34,34,0.16), transparent 70%)",
          animation: "ambient-pulse 9s ease-in-out infinite",
        }}
      />

      {/* Faint grid texture, masked to fade at the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(178,34,34,0.045) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(178,34,34,0.045) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          WebkitMaskImage:
            "radial-gradient(ellipse 130% 90% at 50% 35%, #000 35%, transparent 85%)",
          maskImage:
            "radial-gradient(ellipse 130% 90% at 50% 35%, #000 35%, transparent 85%)",
        }}
      />

      {/* Slow-drifting soft orbs */}
      {orbs.map((o, i) => (
        <span
          key={`orb-${i}`}
          className="bg-orb absolute rounded-full"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
            filter: `blur(${o.blur}px)`,
            animation: `${o.anim} ${o.dur}s ease-in-out ${o.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
