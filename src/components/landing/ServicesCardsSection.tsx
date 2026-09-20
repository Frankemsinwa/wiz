"use client";

import Link from "next/link";
import { ArrowRight, Wallet, ArrowLeftRight, CreditCard, Landmark, TrendingUp } from "lucide-react";

export default function ServicesCardsSection() {
  const services = [
    {
      icon: Wallet,
      title: "Multi-Currency Accounts",
      desc: "Manage USD, EUR, GBP, and JPY in one unified account with individual local IBANs.",
      href: "/dashboard",
    },
    {
      icon: ArrowLeftRight,
      title: "Global Transfers",
      desc: "Send money domestically or overseas via SWIFT, SEPA, and instant domestic rails.",
      href: "/transfers",
    },
    {
      icon: CreditCard,
      title: "Debit & Virtual Cards",
      desc: "Instant digital cards and physical obsidian metal cards with 0% foreign transaction fee.",
      href: "/cards",
    },
    {
      icon: Landmark,
      title: "Crypto Deposit Rails",
      desc: "Deposit BTC, ETH, USDT, and BNB directly with fast on-chain QR verification.",
      href: "/receive",
    },
    {
      icon: TrendingUp,
      title: "Live Activity & Analytics",
      desc: "Real-time ledger tracking, instant transaction receipts, and 100% fee transparency.",
      href: "/dashboard",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-[#fafaf7] border-b border-[#0e0f0c]/06">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e0f0c] tracking-tight">
              Bank Smarter, Live Better
            </h2>
            <p className="text-base font-semibold text-[#6b6964] mt-2">
              All the tools available directly within your Aureus dashboard.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-full bg-white border border-[#0e0f0c]/15 text-[#0e0f0c] font-bold text-sm hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm shrink-0"
          >
            View All Services
          </Link>
        </div>

        {/* Full-Width 5-Card Grid with ample breathing room (min-width per card, wraps gracefully) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-7 rounded-[28px] bg-white border border-[#0e0f0c]/08 hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-black text-[#0e0f0c] mb-3 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#6b6964] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-amber-600 group-hover:text-amber-700 group-hover:gap-2.5 transition-all pt-3 border-t border-[#0e0f0c]/05"
                >
                  Learn More <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
