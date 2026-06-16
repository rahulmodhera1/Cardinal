import { Navbar } from "@/components/Navbar";
import { TickerTape } from "@/components/TickerTape";
import { Hero } from "@/components/Hero";
import { WhyCardinal } from "@/components/WhyCardinal";
import { HowItWorks } from "@/components/HowItWorks";
import { BotsSection } from "@/components/BotsSection";
import { PricingSection } from "@/components/PricingSection";
import { PerformanceSection } from "@/components/PerformanceSection";
import { FAQ } from "@/components/FAQ";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Push content below fixed navbar (h-20 = 80px) + a small gap so the
          ticker doesn't touch the banner */}
      <div className="pt-24">
        <TickerTape />
        <main>
          <Hero />
          <WhyCardinal />
          <HowItWorks />
          <BotsSection />
          <PricingSection />
          <PerformanceSection />
          <FAQ />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </>
  );
}
