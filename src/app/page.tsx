import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesStrip from "@/components/landing/FeaturesStrip";
import BankRelySection from "@/components/landing/BankRelySection";
import ServicesCardsSection from "@/components/landing/ServicesCardsSection";
import AppFeaturesShowcase from "@/components/landing/AppFeaturesShowcase";
import AccountAndNewsletterCTA from "@/components/landing/AccountAndNewsletterCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0e0f0c] font-sans selection:bg-amber-400 selection:text-near-black">
      {/* 1. Light-Themed Modern Navbar */}
      <Navbar />

      {/* 2. Hero Section: Obsidian & Aureus Gold Container with public/hero.png & live dashboard card */}
      <HeroSection />

      {/* 3. 4-Pill Feature Strip (Zero Hidden Fees, Fast & Secure, 24/7 Support, Smart Tools) */}
      <FeaturesStrip />

      {/* 4. A Bank You Can Rely On (Full-width section with stats & classical architecture image) */}
      <BankRelySection />

      {/* 5. Bank Smarter, Live Better (Full-width 5 cards with generous padding, NOT squished!) */}
      <ServicesCardsSection />

      {/* 6. Everything You Need, All in One Place + Security Standards + Seamless Payments */}
      <AppFeaturesShowcase />

      {/* 7. Bottom Conversion: 5-Minute Account Banner + Newsletter Box */}
      <AccountAndNewsletterCTA />

      {/* 8. Clean Light Modern Footer */}
      <Footer />
    </div>
  );
}
