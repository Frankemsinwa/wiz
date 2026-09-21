"use client";

import Link from "next/link";
import { ArrowRight, Wallet, ArrowLeftRight, CreditCard, Landmark, TrendingUp, Sparkles } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function ServicesCardsSection() {
  const services = [
    {
      icon: Wallet,
      title: "Multi-Currency Accounts",
      desc: "Manage USD, EUR, GBP, and JPY in one unified account with individual local IBANs and routing codes.",
      href: "/dashboard",
      badge: "Real-Time FX",
    },
    {
      icon: ArrowLeftRight,
      title: "Global Transfers",
      desc: "Send capital domestically or overseas via SWIFT, SEPA, and instant domestic clearing rails.",
      href: "/transfers",
      badge: "Sub-Second",
    },
    {
      icon: CreditCard,
      title: "Debit & Virtual Cards",
      desc: "Instant digital cards and physical obsidian metal cards with 0% foreign transaction fees anywhere on Earth.",
      href: "/cards",
      badge: "Obsidian Metal",
    },
    {
      icon: Landmark,
      title: "Crypto Deposit Rails",
      desc: "Deposit BTC, ETH, USDT, and BNB directly with fast on-chain QR verification and instant fiat conversion.",
      href: "/receive",
      badge: "Instant Liquidity",
    },
    {
      icon: TrendingUp,
      title: "Live Activity & Analytics",
      desc: "Real-time ledger tracking, instant transaction receipts, exportable tax reports, and 100% fee transparency.",
      href: "/dashboard",
      badge: "Real-Time Ledger",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-24 bg-[#fafaf7] border-b border-[#0e0f0c]/06 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <ScrollReveal direction="up" delay={0.1} className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-600 mb-2">
              <Sparkles size={13} /> Tailored Financial Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e0f0c] tracking-tight">
              Bank Smarter, Live Better
            </h2>
            <p className="text-base font-semibold text-[#6b6964] mt-2 max-w-xl">
              Every specialized capability engineered to give you absolute control over global capital.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-3.5 rounded-full bg-white border border-[#0e0f0c]/15 text-[#0e0f0c] font-bold text-sm hover:border-amber-500 hover:text-amber-600 hover:shadow-md transition-all shrink-0 flex items-center gap-2 group"
          >
            <span>Explore All Capabilities</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>

        {/* Full-Width 5-Card Grid with Stagger Animation */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="h-full p-7 rounded-[30px] bg-white border border-[#0e0f0c]/08 hover:border-amber-500/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                  
                  {/* Subtle Top Gold Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                        <Icon size={24} strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0e0f0c]/05 text-[#0e0f0c]/70 group-hover:bg-amber-500/15 group-hover:text-amber-700 transition-colors">
                        {item.badge}
                      </span>
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
                    className="inline-flex items-center gap-1.5 text-xs font-black text-amber-600 group-hover:text-amber-700 group-hover:gap-2.5 transition-all pt-4 border-t border-[#0e0f0c]/05"
                  >
                    <span>Launch Feature</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
