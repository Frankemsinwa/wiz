"use client";

import { Wallet, ShieldCheck, Clock, Zap } from "lucide-react";

export default function FeaturesStrip() {
  const features = [
    {
      icon: Wallet,
      title: "Zero Hidden Fees",
      desc: "Transparent multi-currency pricing with zero surprise markups.",
    },
    {
      icon: ShieldCheck,
      title: "Fast & Secure",
      desc: "Bank with confidence using military-grade 256-bit encryption.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      desc: "We're here for you anytime with direct in-app messaging.",
    },
    {
      icon: Zap,
      title: "Smart Tools",
      desc: "Instant international wires, QR crypto deposits, and virtual cards.",
    },
  ];

  return (
    <section className="py-12 bg-[#fafaf7] border-b border-[#0e0f0c]/06">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-start p-6 rounded-3xl bg-white border border-[#0e0f0c]/06 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={22} strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-black text-[#0e0f0c] mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-[#6b6964] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
