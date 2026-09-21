"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Sparkles, TrendingUp, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function GlobalTreasurySimulator() {
  const [activeTab, setActiveTab] = useState<"fx" | "yield">("fx");
  const [amount, setAmount] = useState<number>(10000);
  const [fromCurrency, setFromCurrency] = useState<"USD" | "EUR" | "GBP">("USD");
  const [toCurrency, setToCurrency] = useState<"EUR" | "GBP" | "USD">("EUR");

  // FX rates
  const rates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.924, GBP: 0.775, USD: 1 },
    EUR: { USD: 1.082, GBP: 0.839, EUR: 1 },
    GBP: { USD: 1.29, EUR: 1.192, GBP: 1 },
  };

  const currentRate = rates[fromCurrency]?.[toCurrency] || 0.924;
  const aureusReceived = (amount * currentRate).toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  // Traditional bank has ~3.4% markup + $40 fee
  const traditionalReceived = (
    Math.max(0, amount - 40) *
    (currentRate * 0.966)
  ).toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const savings = (
    amount * currentRate -
    Math.max(0, amount - 40) * (currentRate * 0.966)
  ).toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  // Yield calculation
  const apyRate = 0.0525; // 5.25%
  const annualYield = (amount * apyRate).toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  const dailyYield = ((amount * apyRate) / 365).toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <section id="simulator" className="py-20 md:py-24 bg-[#0a0b08] text-white relative overflow-hidden border-b border-amber-500/20 scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-400/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1} className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/15 px-3.5 py-1.5 rounded-full border border-amber-400/30 mb-3">
            <Calculator size={13} /> Interactive Treasury Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Calculate Your Sovereign Advantage
          </h2>
          <p className="text-sm sm:text-base font-semibold text-white/70 mt-3">
            Compare zero-markup global transfers or calculate automated high-yield returns on idle corporate reserves.
          </p>
        </ScrollReveal>

        {/* Simulator Box */}
        <ScrollReveal direction="up" delay={0.2} className="max-w-4xl mx-auto">
          <div className="rounded-[32px] sm:rounded-[40px] bg-white/[0.05] backdrop-blur-2xl border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex p-1.5 rounded-full bg-white/[0.08] border border-white/15">
                <button
                  onClick={() => setActiveTab("fx")}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all ${
                    activeTab === "fx"
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-near-black shadow-lg"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Zero-Markup FX Comparison
                </button>
                <button
                  onClick={() => setActiveTab("yield")}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all ${
                    activeTab === "yield"
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-near-black shadow-lg"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  5.25% APY Treasury Yield
                </button>
              </div>
            </div>

            {/* Slider & Input Row */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <label className="text-xs font-black uppercase tracking-wider text-white/60">
                  Select Transaction / Capital Amount
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="w-36 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono font-bold text-right text-base focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="1000"
                max="250000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-white/50 mt-2">
                <span>$1,000</span>
                <span>$50,000</span>
                <span>$100,000</span>
                <span>$250,000</span>
              </div>
            </div>

            {/* Dynamic Comparison Grid */}
            {activeTab === "fx" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Aureus Column */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-500/20 to-amber-500/05 border border-amber-400/40 relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Sparkles size={13} /> Aureus Sovereign Rail
                    </span>
                    <span className="text-[11px] font-bold bg-amber-400 text-near-black px-2 py-0.5 rounded-full">
                      Zero Markup
                    </span>
                  </div>
                  <span className="text-xs text-white/60 block font-semibold">Recipient Receives</span>
                  <p className="text-3xl sm:text-4xl font-black text-white font-billboard mt-1">
                    {toCurrency === "EUR" ? "€" : toCurrency === "GBP" ? "£" : "$"}{aureusReceived}
                  </p>
                  <ul className="mt-4 space-y-2 text-xs font-semibold text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-amber-400" />
                      <span>Guaranteed Real-Time Interbank Exchange Rate</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-amber-400" />
                      <span>Instant sub-second settlement (SEPA / FedNow)</span>
                    </li>
                  </ul>
                </div>

                {/* Traditional Bank Column */}
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                        Traditional Retail Bank
                      </span>
                      <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                        3.4% Spread + Fees
                      </span>
                    </div>
                    <span className="text-xs text-white/50 block font-semibold">Recipient Receives</span>
                    <p className="text-2xl sm:text-3xl font-black text-white/60 font-billboard mt-1 line-through decoration-rose-500/60">
                      {toCurrency === "EUR" ? "€" : toCurrency === "GBP" ? "£" : "$"}{traditionalReceived}
                    </p>
                    <p className="text-xs text-rose-300 font-semibold mt-2">
                      Hidden foreign exchange markup + $40 out-of-network wire fee.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-white/60">Your Savings with Aureus:</span>
                    <span className="font-mono font-black text-amber-300 text-sm">
                      +${savings}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Yield Calculation Tab */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-500/20 to-amber-500/05 border border-amber-400/40">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-2">
                    <TrendingUp size={14} /> Annual Projected Yield
                  </span>
                  <p className="text-3xl sm:text-4xl font-black text-white font-billboard">
                    +${annualYield}
                  </p>
                  <span className="text-xs text-amber-300/80 font-semibold block mt-1">
                    Based on 5.25% APY Daily Compound Yield
                  </span>
                  <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-white/60 block">Daily Payout</span>
                      <span className="font-mono font-black text-white text-sm">+${dailyYield}/day</span>
                    </div>
                    <div>
                      <span className="text-white/60 block">Lockup Period</span>
                      <span className="font-black text-emerald-400 text-sm">None (Instant Liquid)</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-black text-white mb-2">
                      Treasury Security Standards
                    </h4>
                    <p className="text-xs text-white/70 leading-relaxed mb-4">
                      All treasury reserves are parked exclusively in short-dated U.S. and European sovereign bills with automated interest distribution every 24 hours.
                    </p>
                    <ul className="space-y-2 text-xs text-white/80 font-semibold">
                      <li className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-amber-400" />
                        <span>100% Segregated Tier-1 Custody</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap size={14} className="text-amber-400" />
                        <span>Withdraw or convert anytime with 0 penalties</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Link
                    href="/login"
                    className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-near-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <span>Start Earning 5.25% APY</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom Disclaimer */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-2">
              <span>* Live rates based on real-time mid-market feed. No hidden fees or transfer charges.</span>
              <Link href="/login" className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                Open Private Account <ArrowRight size={11} />
              </Link>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
