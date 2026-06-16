import { SiteBackground } from "@/components/SiteBackground";
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
      <SiteBackground />
      {/* Content sits above the fixed background layer. Navbar is sticky
          (in normal flow), so the ticker sits flush right after it. */}
      <div className="relative z-10">
        <Navbar />
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
