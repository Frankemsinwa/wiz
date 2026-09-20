"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Zap,
  CreditCard,
  ShieldCheck,
  Code2,
  ArrowUpRight,
  Layers,
  Lock,
  ArrowLeftRight,
} from "lucide-react";

export default function BentoFeatures() {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#07090e] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            Next-Gen Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Engineered for Serious Financial Scale.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 font-medium">
            Everything modern CFOs and cross-border companies require to move capital without bureaucratic friction or hidden intermediary markups.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Multi-Currency Local Accounts (Span 2 Cols) */}
          <div className="lg:col-span-2 rounded-[32px] bg-[#0c0f18] border border-white/[0.08] hover:border-amber-500/30 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <Globe size={24} />
              </div>
              <span className="text-xs font-mono font-semibold uppercase text-amber-400 tracking-wider">
                Multi-Currency Infrastructure
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-4 tracking-tight">
                Dedicated Local IBANs in 40+ Jurisdictions.
              </h3>
              <p className="text-white/60 text-base leading-relaxed max-w-xl">
                Collect payments from clients in the US, UK, Europe, Australia, and Asia as if you have a local branch in each territory. Hold over 40 currencies simultaneously with zero foreign entity overhead.
              </p>
            </div>

            {/* Interactive Visual Preview */}
            <div className="mt-8 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <span>🇺🇸</span>
                  <span className="text-xs font-bold text-white">USD ACH / Wire</span>
                </div>
                <p className="text-[11px] font-mono text-amber-400 font-semibold">Routing: 021000021</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <span>🇪🇺</span>
                  <span className="text-xs font-bold text-white">EUR SEPA</span>
                </div>
                <p className="text-[11px] font-mono text-amber-400 font-semibold">IBAN: DE89 3704...</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <span>🇬🇧</span>
                  <span className="text-xs font-bold text-white">GBP Faster Pay</span>
                </div>
                <p className="text-[11px] font-mono text-amber-400 font-semibold">Sort: 04-00-04</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <span>🇯🇵</span>
                  <span className="text-xs font-bold text-white">JPY Zengin</span>
                </div>
                <p className="text-[11px] font-mono text-amber-400 font-semibold">Branch: 001</p>
              </div>
            </div>
          </div>

          {/* Card 2: Sub-Second Settlement Engine (1 Col) */}
          <div className="rounded-[32px] bg-[#0c0f18] border border-white/[0.08] hover:border-amber-500/30 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group shadow-lg relative">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <span className="text-xs font-mono font-semibold uppercase text-emerald-400 tracking-wider">
                High-Speed Liquidity
              </span>
              <h3 className="text-2xl font-black text-white mt-2 mb-4 tracking-tight">
                Sub-Second Wire Settlement.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Direct API rails into SWIFT GPI, FedNow, and SEPA Instant. Cut cross-border transit times from 3–5 business days to instant settlement.
              </p>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 flex items-center justify-between">
              <span className="text-xs font-mono text-white/70">Avg. Settlement Time</span>
              <span className="text-sm font-mono font-black text-emerald-400">0.82 Seconds</span>
            </div>
          </div>

          {/* Card 3: Intelligent Corporate Cards (1 Col) */}
          <div className="rounded-[32px] bg-[#0c0f18] border border-white/[0.08] hover:border-amber-500/30 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group shadow-lg relative">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <CreditCard size={24} />
              </div>
              <span className="text-xs font-mono font-semibold uppercase text-amber-400 tracking-wider">
                Spend Management
              </span>
              <h3 className="text-2xl font-black text-white mt-2 mb-4 tracking-tight">
                Instant Virtual & Metal Cards.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Generate single-use virtual cards for vendor subscriptions or heavy physical obsidian metal cards for executive travel with 0% foreign transaction fees.
              </p>
            </div>

            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-white/[0.03]">
                <span className="text-white/60">Cloud Hosting (AWS)</span>
                <span className="font-mono font-bold text-amber-400">Limit: $15,000/mo</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-white/[0.03]">
                <span className="text-white/60">Executive Travel</span>
                <span className="font-mono font-bold text-emerald-400">FX Fee: 0.0%</span>
              </div>
            </div>
          </div>

          {/* Card 4: Multi-Sig Cryptographic Vaults (1 Col) */}
          <div className="rounded-[32px] bg-[#0c0f18] border border-white/[0.08] hover:border-amber-500/30 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group shadow-lg relative">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <span className="text-xs font-mono font-semibold uppercase text-purple-400 tracking-wider">
                Institutional Security
              </span>
              <h3 className="text-2xl font-black text-white mt-2 mb-4 tracking-tight">
                Hardware-Isolated Multi-Sig Vaults.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Protect corporate treasuries with granular authorization policies, quorum approval thresholds, and 256-bit HSM keys.
              </p>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-purple-500/[0.06] border border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-purple-400" />
                <span className="text-xs font-mono text-white/70">Required Quorum</span>
              </div>
              <span className="text-xs font-mono font-bold text-purple-400">2 of 3 Approvals</span>
            </div>
          </div>

          {/* Card 5: Developer API & Automated Accounting (Span 2 Cols or 1 Col) */}
          <div className="lg:col-span-1 rounded-[32px] bg-[#0c0f18] border border-white/[0.08] hover:border-amber-500/30 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group shadow-lg relative">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <Code2 size={24} />
              </div>
              <span className="text-xs font-mono font-semibold uppercase text-blue-400 tracking-wider">
                Developer Core
              </span>
              <h3 className="text-2xl font-black text-white mt-2 mb-4 tracking-tight">
                REST & GraphQL Banking API.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Automate contractor payroll, trigger batch wire transfers, and synchronize ledgers in real-time with NetSuite, Xero, and QuickBooks.
              </p>
            </div>

            <div className="mt-8 p-3 rounded-2xl bg-[#07090e] border border-white/[0.08] font-mono text-[11px] text-white/70">
              <span className="text-amber-400 font-bold">POST</span> /v1/payouts/instant <br />
              <span className="text-emerald-400 font-semibold">200 OK</span> • 42ms response
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
