"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, Globe2 } from "lucide-react";

export default function MarketRatesTicker() {
  const tickerItems = [
    { label: "USD / EUR", rate: "0.9241", change: "+0.32%", positive: true },
    { label: "GBP / USD", rate: "1.2894", change: "+0.15%", positive: true },
    { label: "BTC / USD", rate: "$68,450.00", change: "+3.42%", positive: true },
    { label: "ETH / USD", rate: "$3,520.80", change: "+2.15%", positive: true },
    { label: "GOLD SPOT (XAU)", rate: "$2,385.60/oz", change: "+1.12%", positive: true },
    { label: "USD / JPY", rate: "154.20", change: "-0.08%", positive: false },
    { label: "SWIFT / SEPA SPEED", rate: "0.8s Instant", change: "Live Rails", icon: Zap },
    { label: "GLOBAL VAULT RESERVES", rate: "100% Segregated", change: "Tier-1", icon: ShieldCheck },
    { label: "MULTI-CURRENCY POOLS", rate: "40+ Active", change: "Zero Markup", icon: Globe2 },
  ];

  // Duplicate for seamless infinite loop
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full bg-[#0a0b08] border-y border-amber-500/20 py-3 overflow-hidden text-white/90 text-xs select-none">
      {/* Edge gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0a0b08] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0a0b08] to-transparent z-10 pointer-events-none" />

      {/* Floating subtle ambient gold glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-12 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
        animate={{
          x: [0, -1600],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 32,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon || TrendingUp;
          return (
            <div
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/08 hover:border-amber-400/40 hover:bg-white/[0.08] transition-all cursor-default"
            >
              <span className="text-[11px] font-bold text-white/60 tracking-wider uppercase">
                {item.label}
              </span>
              <span className="font-mono font-extrabold text-white text-xs">
                {item.rate}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.2 rounded ${
                  item.positive !== false
                    ? "text-amber-400 bg-amber-500/15"
                    : "text-rose-400 bg-rose-500/15"
                }`}
              >
                {item.icon ? <Icon size={10} /> : null}
                {item.change}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
