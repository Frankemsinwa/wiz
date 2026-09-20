"use client";

import Link from "next/link";
import { Wallet, ArrowLeftRight, FileText, CreditCard, CheckCircle2, Shield, ArrowRight } from "lucide-react";

export default function AppFeaturesShowcase() {
  const featureList = [
    {
      icon: Wallet,
      title: "Accounts",
      desc: "Manage your USD, EUR, GBP, and other currency balances seamlessly in one secure place.",
      href: "/dashboard",
    },
    {
      icon: ArrowLeftRight,
      title: "Transfers",
      desc: "Send money instantly via domestic routing, international SWIFT/SEPA, or crypto channels.",
      href: "/transfers",
    },
    {
      icon: FileText,
      title: "Activity & Messages",
      desc: "Live ledger tracking, downloadable receipts, and direct secure messaging with our support desk.",
      href: "/messages",
    },
    {
      icon: CreditCard,
      title: "Card Control",
      desc: "View your physical and digital debit cards, track limits, and manage security in real-time.",
      href: "/cards",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#fafaf7] border-b border-[#0e0f0c]/06">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. Everything You Need, All in One Place */}
        <div>
          <div className="text-center sm:text-left mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 block mb-2">
              Full Application Suite
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e0f0c] tracking-tight">
              Everything You Need, All in One Place
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#6b6964] mt-2 max-w-xl">
              Powerful banking features designed for complete convenience and real-time control.
            </p>
          </div>

          {/* 4 Cards in clean 4-col responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureList.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="p-6 rounded-[28px] bg-white border border-[#0e0f0c]/08 hover:border-amber-500/30 transition-all shadow-sm hover:shadow-md group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-lg font-black text-[#0e0f0c] mb-2">{f.title}</h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#6b6964] leading-relaxed mb-4">
                    {f.desc}
                  </p>
                  <Link
                    href={f.href}
                    className="inline-flex items-center gap-1 text-xs font-black text-amber-600 hover:gap-2 transition-all"
                  >
                    Open Feature <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2 Two-Column Cards: Secure Banking & Seamless Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card A: Secure & Safe Banking You Can Trust */}
          <div id="security" className="p-8 sm:p-10 rounded-[36px] bg-white border border-[#0e0f0c]/08 shadow-sm flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
              <div className="sm:col-span-7">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 block mb-1">
                  Bank-Grade Protection
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0e0f0c] tracking-tight mb-3">
                  Secure & Safe Banking <br />
                  You Can Trust
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#6b6964] leading-relaxed mb-6">
                  Advanced multi-layer security technology to protect your corporate and personal funds.
                </p>

                <ul className="space-y-3 mb-6 text-xs sm:text-sm font-bold text-[#0e0f0c]">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    <span>256-bit SSL & TLS 1.3 encryption</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    <span>24/7 automated fraud monitoring</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    <span>Multi-factor authentication & security codes</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    <span>100% segregated Tier-1 custodial deposits</span>
                  </li>
                </ul>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-600 hover:text-amber-700 hover:gap-2 transition-all"
                >
                  Learn More About Security <ArrowRight size={14} />
                </Link>
              </div>

              {/* Right: Golden Lock Illustration & Vault Photo */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-3xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30 overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80"
                    alt="Vault & Security"
                    className="w-full h-full object-cover rounded-3xl opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white text-amber-600 flex items-center justify-center shadow-2xl border border-amber-500/30">
                      <Shield size={32} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Seamless Payments, Every Time */}
          <div id="payments" className="p-8 sm:p-10 rounded-[36px] bg-white border border-[#0e0f0c]/08 shadow-sm flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
              <div className="sm:col-span-7">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 block mb-1">
                  Speed & Precision
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0e0f0c] tracking-tight mb-3">
                  Seamless Payments, <br />
                  Every Time
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#6b6964] leading-relaxed mb-6">
                  Fast, easy, and secure cross-border wire transfer and crypto deposit rails.
                </p>

                <ul className="space-y-3 mb-6 text-xs sm:text-sm font-bold text-[#0e0f0c]">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    <span>Instant fund transfers across 40+ currencies</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    <span>On-chain crypto deposits (BTC, ETH, USDT)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    <span>Global wires via SWIFT, SEPA & FedNow</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    <span>Live in-app payment tracking</span>
                  </li>
                </ul>

                <Link
                  href="/transfers"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-600 hover:text-amber-700 hover:gap-2 transition-all"
                >
                  Start a Transfer <ArrowRight size={14} />
                </Link>
              </div>

              {/* Right: Modern Smartphone & Aureus Card Visual Mockup */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="relative w-48 py-4 px-3 bg-[#0e0f0c] rounded-[36px] shadow-2xl border-4 border-[#18150c] text-white">
                  {/* Speaker notch */}
                  <div className="w-16 h-1.5 bg-white/20 rounded-full mx-auto mb-3" />
                  
                  {/* Phone Screen */}
                  <div className="rounded-[24px] bg-[#fafaf7] p-4 text-[#0e0f0c] text-center shadow-inner">
                    <div className="w-10 h-10 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <CheckCircle2 size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-[#6b6964] uppercase block">Transfer Sent</span>
                    <p className="text-xl font-black text-[#0e0f0c] mt-0.5">$850.00</p>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-1">Completed Instantly</span>
                  </div>

                  {/* Overlapping Gold/Black Card */}
                  <div className="-mt-3 mx-1 p-3 rounded-xl bg-gradient-to-r from-[#1c1d18] to-[#0e0f0c] text-amber-400 border border-amber-400/40 shadow-xl text-[10px] font-mono font-bold flex justify-between items-center">
                    <span>Aureus Card</span>
                    <span>•••• 4490</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
