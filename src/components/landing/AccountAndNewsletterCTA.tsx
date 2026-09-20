"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountAndNewsletterCTA() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#fafaf7] border-t border-[#0e0f0c]/06 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* 1. Open Your Account in Just 5 Minutes (Deep Obsidian Container with Rich Aureus Gold Lighting) */}
        <div className="rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] bg-gradient-to-br from-[#12130f] via-[#0e0f0c] to-[#18150c] text-white p-6 sm:p-10 lg:p-16 overflow-hidden relative shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 border border-amber-500/20">
          
          {/* Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl relative z-10 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30 text-xs font-bold tracking-wide backdrop-blur-md mb-4">
              <Sparkles size={12} /> Instant Setup
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Open Your Account in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Just 5 Minutes
              </span>
            </h2>
            <p className="text-sm sm:text-base font-semibold text-white/70 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              Experience borderless multi-currency banking with a fully digital, high-speed onboarding process.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-near-black font-black text-base transition-all shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95"
            >
              <span>Open Account Now</span>
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Right Visual: Realistic Mobile App + Aureus Obsidian Gold Card Stack */}
          <div className="relative flex items-center justify-center relative z-10 mt-4 md:mt-0">
            {/* Phone Mockup */}
            <div className="w-48 sm:w-56 lg:w-60 rounded-[32px] sm:rounded-[36px] bg-[#0e0f0c] p-3 sm:p-3.5 shadow-2xl border-2 border-white/10">
              <div className="rounded-[22px] sm:rounded-[24px] bg-[#fafaf7] p-3.5 sm:p-4 text-[#0e0f0c]">
                <div className="flex items-center gap-2 mb-3">
                  <img src="/logo.png" alt="Aureus" className="h-5 w-auto" />
                  <span className="text-xs font-black">Aureus</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#0e0f0c]/08 mb-3 shadow-sm">
                  <span className="text-[10px] text-[#6b6964] block font-bold">Total Balance</span>
                  <span className="text-sm sm:text-base font-black text-[#0e0f0c]">$24,560.00</span>
                </div>
                <div className="h-2 w-full bg-amber-500 rounded-full mb-1.5" />
                <div className="h-2 w-2/3 bg-black/10 rounded-full" />
              </div>
            </div>

            {/* Overlapping Gold/Obsidian Card Mockup */}
            <div className="absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-6 lg:-right-8 w-40 sm:w-48 lg:w-56 aspect-[1.586] rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1c1d18] to-[#0e0f0c] p-3 sm:p-4 text-amber-400 shadow-2xl border border-amber-400/40 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white">Aureus</span>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-amber-400">Debit</span>
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono text-white/50 block">ALEXANDER VANCE</span>
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-white">•••• 4490</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Stay Updated with Aureus Bank (Newsletter strip - 100% responsive, zero overflow) */}
        <div className="p-5 sm:p-8 lg:p-10 rounded-[28px] sm:rounded-[36px] bg-white border border-[#0e0f0c]/08 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Mail size={24} />
            </div>
            <div className="min-w-0">
              <h4 className="text-base sm:text-lg lg:text-xl font-black text-[#0e0f0c] tracking-tight">
                Stay Updated with Aureus Bank
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-[#6b6964]">
                Financial tips, foreign exchange insights, and product updates.
              </p>
            </div>
          </div>

          {/* Fully Responsive Subscribe Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row w-full md:w-auto md:min-w-[380px] lg:min-w-[420px] items-stretch sm:items-center gap-2.5"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-full bg-[#fafaf7] border border-[#0e0f0c]/12 text-sm text-[#0e0f0c] placeholder-[#6b6964] focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-near-black font-black text-sm transition-all shadow-md shadow-amber-500/20 shrink-0 cursor-pointer text-center"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
