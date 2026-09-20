"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <section className="py-24 md:py-32 bg-[#07090e] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-600/20 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-[40px] bg-gradient-to-b from-[#121624] to-[#0a0c13] border-2 border-amber-400/40 p-8 sm:p-14 lg:p-18 shadow-[0_0_80px_rgba(212,175,55,0.2)] text-center relative overflow-hidden">
          {/* Subtle Top Shimmer Line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Get Started in Under 20 Minutes
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-3xl mx-auto leading-tight">
            Ready to Upgrade Your Global Financial Infrastructure?
          </h2>

          <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Join 120,000+ businesses and global founders moving capital across 40+ currencies at real mid-market rates.
          </p>

          {/* Quick Registration Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your corporate email"
              className="flex-1 px-5 py-4 rounded-full bg-white/[0.06] border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-amber-950 font-black text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Open Account</span>
              <ArrowUpRight size={16} />
            </button>
          </form>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Zero Maintenance Fees
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              100% Segregated Custody
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              SOC 2 Type II Certified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
