"use client";

import { Wallet, ShieldCheck, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function FeaturesStrip() {
  const features = [
    {
      icon: Wallet,
      title: "Zero Hidden Fees",
      desc: "Transparent multi-currency pricing with zero surprise markups on every trade and wire.",
      highlight: "Guaranteed mid-market rate",
    },
    {
      icon: ShieldCheck,
      title: "Institutional Security",
      desc: "Bank with total confidence using military-grade 256-bit encryption & multi-sig vaulting.",
      highlight: "Segregated Tier-1 custody",
    },
    {
      icon: Clock,
      title: "24/7 Private Concierge",
      desc: "Instant priority support via in-app secure chat and dedicated relationship managers.",
      highlight: "Sub-minute response time",
    },
    {
      icon: Zap,
      title: "Smart Capital Tools",
      desc: "Instant international wires, QR crypto deposits, and virtual cards provisioned in seconds.",
      highlight: "SEPA / FedNow / SWIFT",
    },
  ];

  return (
    <section id="features" className="py-16 bg-[#fafaf7] border-b border-[#0e0f0c]/06 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1} className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600 block mb-2">
            Engineered For Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0e0f0c] tracking-tight">
            The Sovereign Standard in Digital Banking
          </h2>
        </ScrollReveal>

        {/* Staggered 4-Column Grid */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="h-full flex flex-col justify-between p-7 rounded-[30px] bg-white border border-[#0e0f0c]/08 shadow-sm hover:shadow-xl hover:border-amber-500/40 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden">
                  
                  {/* Subtle Top Gold Highlight on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-500/20 group-hover:text-amber-700 transition-all duration-300 shadow-sm">
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-black text-[#0e0f0c] mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#6b6964] leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#0e0f0c]/05">
                    <span className="text-[11px] font-black text-amber-600 uppercase tracking-wider block">
                      ✓ {item.highlight}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
