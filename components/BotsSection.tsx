import { bots } from "@/lib/bots";
import { BotCard } from "@/components/BotCard";

export function BotsSection() {
  return (
    <section id="bots" className="bg-ivory-warm py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs tracking-widest uppercase text-cardinal-red text-center mb-4">
          Our Bots
        </p>
        <h2
          className="text-navy font-bold text-center"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Our roster. Tested. Transparent.
        </h2>
        <p className="text-navy/70 text-lg max-w-2xl mx-auto text-center mt-4 mb-16 leading-relaxed">
          Every bot shows you real performance data — including losing months.
          We don&apos;t hide the drawdowns.
        </p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {bots.map((bot, i) => (
            <BotCard key={bot.id} bot={bot} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
