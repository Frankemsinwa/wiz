"use client";

import Link from "next/link";
import { Wallet, ArrowLeftRight, FileText, CreditCard, CheckCircle2, Shield, ArrowRight, Lock, Sparkles, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function AppFeaturesShowcase() {
  const featureList = [
    {
      icon: Wallet,
      title: "Multi-Currency Accounts",
      desc: "Manage USD, EUR, GBP, and 30+ other international balances seamlessly with local settlement coordinates.",
      href: "/dashboard",
      badge: "40+ Currencies",
    },
    {
      icon: ArrowLeftRight,
      title: "Global Transfers",
      desc: "Send capital instantly via domestic ACH/FedNow, European SEPA Instant, or worldwide SWIFT network.",
      href: "/transfers",
      badge: "Instant Rails",
    },
    {
      icon: FileText,
      title: "Activity & Messages",
      desc: "Real-time ledger notifications, exportable accountant-ready receipts, and 24/7 private concierge chat.",
      href: "/messages",
      badge: "Real-Time Ledger",
    },
    {
      icon: CreditCard,
      title: "Card Management",
      desc: "Instant virtual disposable cards and laser-engraved obsidian metal debit cards with customizable limits.",
      href: "/cards",
      badge: "0% FX Fee",
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-[#fafaf7] border-b border-[#0e0f0c]/06 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. Everything You Need, All in One Place */}
        <div>
          <ScrollReveal direction="up" delay={0.1} className="text-center sm:text-left mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-600 mb-2">
              <Sparkles size={13} /> Integrated Financial Operating System
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e0f0c] tracking-tight">
              Everything You Need, All in One Place
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#6b6964] mt-2 max-w-xl">
              Powerful banking capabilities engineered for complete convenience and real-time sovereign control.
            </p>
          </ScrollReveal>

          {/* 4 Cards in clean 4-col responsive grid */}
          <StaggerContainer
            staggerDelay={0.09}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featureList.map((f) => {
              const Icon = f.icon;
              return (
                <StaggerItem key={f.title}>
                  <div className="h-full p-7 rounded-[30px] bg-white border border-[#0e0f0c]/08 hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden">
                    
                    {/* Top hover amber line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                          <Icon size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0e0f0c]/05 text-[#0e0f0c]/70 group-hover:bg-amber-500/15 group-hover:text-amber-700 transition-colors">
                          {f.badge}
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-[#0e0f0c] mb-2">{f.title}</h4>
                      <p className="text-xs sm:text-sm font-semibold text-[#6b6964] leading-relaxed mb-6">
                        {f.desc}
                      </p>
                    </div>

                    <Link
                      href={f.href}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-amber-600 hover:text-amber-700 hover:gap-2.5 transition-all pt-3 border-t border-[#0e0f0c]/05"
                    >
                      <span>Open Capability</span> <ArrowRight size={13} />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* 2 Two-Column Spotlight Cards: Secure Banking & Seamless Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card A: Secure & Safe Banking You Can Trust */}
          <ScrollReveal direction="left" delay={0.15}>
            <div id="security" className="h-full p-8 sm:p-10 rounded-[36px] bg-white border border-[#0e0f0c]/08 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between scroll-mt-24">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
                <div className="sm:col-span-7">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-amber-600 block mb-1">
                    <Lock size={12} /> Institutional Vault Standards
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0e0f0c] tracking-tight mb-3">
                    Secure & Safe Banking <br />
                    You Can Trust
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#6b6964] leading-relaxed mb-6">
                    Advanced cryptographic security architecture designed to safeguard high-net-worth treasury reserves.
                  </p>

                  <ul className="space-y-3 mb-6 text-xs sm:text-sm font-bold text-[#0e0f0c]">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                      <span>256-bit SSL & TLS 1.3 military encryption</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                      <span>24/7 automated anomaly & fraud screening</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                      <span>Hardware security keys & biometric authentication</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                      <span>100% segregated Tier-1 custodial vaults</span>
                    </li>
                  </ul>

                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-600 hover:text-amber-700 hover:gap-2 transition-all"
                  >
                    <span>Read Full Security Whitepaper</span> <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Right: Golden Lock Illustration & Vault Photo with subtle hover glow */}
                <div className="sm:col-span-5 flex justify-center">
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-[32px] bg-amber-500/10 flex items-center justify-center border border-amber-500/30 overflow-hidden shadow-lg group">
                    <img
                      src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80"
                      alt="Vault & Security"
                      className="w-full h-full object-cover rounded-[32px] opacity-80 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-16 h-16 rounded-2xl bg-white text-amber-600 flex items-center justify-center shadow-2xl border border-amber-500/30"
                      >
                        <Shield size={32} strokeWidth={2.5} />
                      </motion.div>
                      <span className="text-[10px] font-mono font-bold text-amber-300 mt-2">
                        SECURE · ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card B: Seamless Payments, Every Time */}
          <ScrollReveal direction="right" delay={0.2}>
            <div id="payments" className="h-full p-8 sm:p-10 rounded-[36px] bg-white border border-[#0e0f0c]/08 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between scroll-mt-24">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
                <div className="sm:col-span-7">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-amber-600 block mb-1">
                    <Sparkles size={12} /> Frictionless Liquidity
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0e0f0c] tracking-tight mb-3">
                    Seamless Payments, <br />
                    Every Time
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#6b6964] leading-relaxed mb-6">
                    Fast, easy, and secure cross-border wire transfer and crypto deposit rails across 40+ currencies.
                  </p>

                  <ul className="space-y-3 mb-6 text-xs sm:text-sm font-bold text-[#0e0f0c]">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                      <span>Instant fund transfers across 40+ fiat currencies</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                      <span>On-chain crypto deposits (BTC, ETH, USDT, SOL)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                      <span>Global wires via SWIFT, SEPA & FedNow</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                      <span>Automated receipts and audit-ready bookkeeping</span>
                    </li>
                  </ul>

                  <Link
                    href="/transfers"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-600 hover:text-amber-700 hover:gap-2 transition-all"
                  >
                    <span>Execute Global Transfer</span> <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Right: Modern Smartphone & Aureus Card Visual Mockup with Floating Animation */}
                <div className="sm:col-span-5 flex justify-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-48 py-4 px-3 bg-[#0a0b08] rounded-[36px] shadow-2xl border-4 border-[#18150c] text-white"
                  >
                    {/* Speaker notch */}
                    <div className="w-16 h-1.5 bg-white/20 rounded-full mx-auto mb-3" />
                    
                    {/* Phone Screen */}
                    <div className="rounded-[24px] bg-[#fafaf7] p-4 text-[#0e0f0c] text-center shadow-inner">
                      <div className="w-11 h-11 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto mb-2 shadow-sm">
                        <CheckCircle2 size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-[#6b6964] uppercase block">Transfer Sent</span>
                      <p className="text-xl font-black text-[#0e0f0c] mt-0.5">$850.00</p>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-1">Completed Instantly</span>
                    </div>

                    {/* Overlapping Gold/Black Card with Micro Tilt */}
                    <motion.div
                      animate={{ rotate: [-1, 1, -1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="-mt-3 mx-1 p-3 rounded-xl bg-gradient-to-r from-[#1c1d18] via-[#0e0f0c] to-[#18150c] text-amber-400 border border-amber-400/40 shadow-xl text-[10px] font-mono font-bold flex justify-between items-center"
                    >
                      <span className="tracking-wider">AUREUS OBSIDIAN</span>
                      <span>•••• 4490</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
