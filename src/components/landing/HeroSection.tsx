"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export default function HeroSection() {
  const { user } = useAuthStore();

  return (
    <section className="px-3 sm:px-6 lg:px-8 pt-2 pb-8 sm:pb-12 bg-[#fafaf7]">
      <div className="max-w-7xl mx-auto">
        {/* Large Rounded Hero Container */}
        <div className="relative rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] bg-gradient-to-br from-[#131410] via-[#0e0f0c] to-[#18150c] text-white overflow-hidden shadow-2xl px-5 sm:px-8 lg:px-12 pt-6 sm:pt-10 lg:pt-12 pb-0 border border-amber-500/20">
          
          {/* Ambient Warm Golden Glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-400/[0.08] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/[0.05] via-transparent to-transparent pointer-events-none" />

          {/* Top Pill Badge */}
          <div className="relative z-10 mb-4 sm:mb-6">
            <span className="inline-block px-3.5 sm:px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30 text-[11px] sm:text-xs font-bold tracking-wide backdrop-blur-md">
              Your Goals. Our Priority.
            </span>
          </div>

          {/* Main 3-Part Hero Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
            
            {/* Left Column: Headline & Action Buttons (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center pb-8 sm:pb-12 lg:pb-14">
              <h1 className="text-3xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-black tracking-tight leading-[1.0] text-white mb-5 sm:mb-6">
                Banking that <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-[0_2px_15px_rgba(212,175,55,0.3)]">
                  moves your life
                </span> <br />
                forward.
              </h1>
              <p className="text-white/75 font-semibold text-sm sm:text-base lg:text-lg max-w-md mb-6 sm:mb-8 leading-relaxed">
                Multi-currency accounts, instant global wire transfers, and crypto funding built for your everyday needs and your biggest goals.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                <Link
                  href="/login"
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-near-black font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Open Account</span>
                  <ArrowRight size={17} />
                </Link>
                <a
                  href="#services"
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base transition-colors border border-white/15 hover:border-amber-400/40 text-center"
                >
                  Explore Services
                </a>
              </div>
            </div>

            {/* Center Column: Big Hero Character anchored to bottom with smooth gradient blend (4 cols) */}
            <div className="lg:col-span-4 flex items-end justify-center self-end w-full relative">
              {/* Backlight halo behind the character */}
              <div className="absolute bottom-0 w-64 sm:w-72 h-64 sm:h-72 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

              {/* Character Image container anchored to container bottom */}
              <div className="relative z-10 w-full flex justify-center items-end">
                <img
                  src="/hero.png"
                  alt="Aureus Customer"
                  className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] xl:max-w-[430px] h-auto object-contain object-bottom block"
                />

                {/* Soft gradient fade mask at bottom edge to guarantee seamless blend with container */}
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-[#0e0f0c] via-[#0e0f0c]/60 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Glassmorphic Dashboard Widget (3 cols) */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end pb-8 sm:pb-12 lg:pb-14 w-full">
              <div className="w-full max-w-sm rounded-[24px] sm:rounded-[28px] bg-white/[0.08] backdrop-blur-xl border border-white/20 hover:border-amber-400/40 p-4 sm:p-5 lg:p-6 shadow-2xl text-white transition-all">
                {/* User Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-3.5">
                  <div>
                    <span className="text-[11px] text-white/60 font-semibold block">Welcome Back</span>
                    <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[130px]">
                      {user?.name || "John Smith"}
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-near-black font-black flex items-center justify-center text-xs shadow-md shadow-amber-500/30">
                    {user ? user.name.substring(0, 2).toUpperCase() : "JS"}
                  </div>
                </div>

                {/* Total Balance */}
                <div className="mb-4">
                  <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block mb-0.5">
                    Total Balance
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-billboard">
                      $24,560.00
                    </span>
                    <span className="text-[11px] font-black text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-full">
                      +12.45%
                    </span>
                  </div>
                </div>

                {/* Currency Sub-Accounts */}
                <div className="space-y-1.5 mb-4 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/05">
                    <div className="flex items-center gap-2">
                      <span>🇺🇸</span>
                      <span className="font-semibold text-white/90">USD Checking</span>
                    </div>
                    <span className="font-mono font-bold text-white">$8,450.00</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/05">
                    <div className="flex items-center gap-2">
                      <span>🇪🇺</span>
                      <span className="font-semibold text-white/90">EUR Savings</span>
                    </div>
                    <span className="font-mono font-bold text-white">€10,230.00</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/05">
                    <div className="flex items-center gap-2">
                      <span>🇬🇧</span>
                      <span className="font-semibold text-white/90">GBP Global</span>
                    </div>
                    <span className="font-mono font-bold text-white">£5,880.00</span>
                  </div>
                </div>

                {/* View Dashboard Button */}
                <Link
                  href="/dashboard"
                  className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all border border-white/10 hover:border-amber-400/30"
                >
                  <span>View Dashboard</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
