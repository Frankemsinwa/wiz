import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MarketRatesTicker from "@/components/landing/MarketRatesTicker";
import FeaturesStrip from "@/components/landing/FeaturesStrip";
import BankRelySection from "@/components/landing/BankRelySection";
import ServicesCardsSection from "@/components/landing/ServicesCardsSection";
import GlobalTreasurySimulator from "@/components/landing/GlobalTreasurySimulator";
import AppFeaturesShowcase from "@/components/landing/AppFeaturesShowcase";
import AccountAndNewsletterCTA from "@/components/landing/AccountAndNewsletterCTA";
import Footer from "@/components/landing/Footer";
import ScrollProgressHUD from "@/components/landing/ScrollProgressHUD";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0e0f0c] font-sans selection:bg-amber-400 selection:text-near-black relative">
      {/* Dynamic Top Scroll Progress Indicator & Back to Top HUD */}
      <ScrollProgressHUD />

      {/* 1. Light-Themed Modern Navbar */}
      <Navbar />

      {/* 2. Hero Section: Obsidian & Aureus Gold Container with live dashboard card & character */}
      <HeroSection />

      {/* 3. Live Institutional Financial Rates Ribbon */}
      <MarketRatesTicker />

      {/* 4. 4-Pill Feature Strip with Staggered Scroll Reveal */}
      <FeaturesStrip />

      {/* 5. A Bank You Can Rely On (Full-width section with stats & classical architecture image) */}
      <BankRelySection />

      {/* 6. Bank Smarter, Live Better (Full-width 5 cards with generous padding) */}
      <ServicesCardsSection />

      {/* 7. Interactive Sovereign Treasury & Zero-Markup FX Simulator */}
      <GlobalTreasurySimulator />

      {/* 8. Everything You Need, All in One Place + Security Standards + Seamless Payments */}
      <AppFeaturesShowcase />

      {/* 9. Bottom Conversion: 5-Minute Account Banner + Newsletter Box */}
      <AccountAndNewsletterCTA />

      {/* 10. Clean Light Modern Footer */}
      <Footer />
    </div>
  );
}
