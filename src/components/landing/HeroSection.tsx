"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, CheckCircle, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function HeroSection() {
  const { user } = useAuthStore();
  const [selectedCurrency, setSelectedCurrency] = useState<"ALL" | "USD" | "EUR" | "GBP" | "BTC">("ALL");

  const balances = {
    ALL: { total: "$24,560.00", change: "+12.45%", tag: "Unified Portfolio" },
    USD: { total: "$8,450.00", change: "+4.2%", tag: "Checking · US Fedwire" },
    EUR: { total: "€10,230.00", change: "+8.1%", tag: "Savings · SEPA Instant" },
    GBP: { total: "£5,880.00", change: "+3.6%", tag: "Global Treasury · Faster Payments" },
    BTC: { total: "0.358 BTC", change: "+14.8%", tag: "Custodial Vault · 100% Segregated" },
  };

  return (
    <section className="px-3 sm:px-6 lg:px-8 pt-2 pb-8 sm:pb-12 bg-[#fafaf7] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Large Rounded Hero Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] bg-gradient-to-br from-[#12130f] via-[#0a0b08] to-[#1a170d] text-white overflow-hidden shadow-2xl px-5 sm:px-8 lg:px-12 pt-6 sm:pt-10 lg:pt-12 pb-0 border border-amber-500/25"
        >
          {/* Ambient Warm Golden Glows with subtle pulse */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.12, 0.22, 0.12],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-400/[0.1] rounded-full blur-[120px] pointer-events-none"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/[0.04] via-transparent to-transparent pointer-events-none" />

          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 mb-4 sm:mb-6 flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-400/10 text-amber-300 border border-amber-400/35 text-[11px] sm:text-xs font-bold tracking-wide backdrop-blur-md shadow-inner">
              <Sparkles size={13} className="text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
              Institutional-Grade Sovereign Banking
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Settlement Engine 2.4
            </span>
          </motion.div>

          {/* Main 3-Part Hero Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
            
            {/* Left Column: Headline & Action Buttons (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-center pb-8 sm:pb-12 lg:pb-14"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-black tracking-tight leading-[1.0] text-white mb-5 sm:mb-6">
                Banking that <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-[0_2px_20px_rgba(212,175,55,0.4)]">
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
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-near-black font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>Open Account</span>
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#services"
                  className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base transition-all border border-white/15 hover:border-amber-400/50 hover:bg-white/[0.12] text-center backdrop-blur-sm"
                >
                  Explore Services
                </a>
              </div>

              {/* Micro Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-6 text-xs text-white/60 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-amber-400" />
                  FDIC & FINMA Insured
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-emerald-400" />
                  0% Transfer Markup
                </span>
              </div>
            </motion.div>

            {/* Center Column: Big Hero Character anchored to bottom with smooth gradient blend (4 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex items-end justify-center self-end w-full relative"
            >
              {/* Backlight halo behind the character */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.35, 0.2],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 w-72 sm:w-80 h-72 sm:h-80 bg-amber-400/25 rounded-full blur-3xl pointer-events-none"
              />

              {/* Character Image container anchored to container bottom */}
              <div className="relative z-10 w-full flex justify-center items-end">
                <motion.img
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  src="/hero.png"
                  alt="Aureus Customer"
                  className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] xl:max-w-[430px] h-auto object-contain object-bottom block drop-shadow-2xl"
                />

                {/* Soft gradient fade mask at bottom edge to guarantee seamless blend with container */}
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-[#0a0b08] via-[#0a0b08]/70 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Right Column: Glassmorphic Interactive Dashboard Widget (3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3 flex justify-center lg:justify-end pb-8 sm:pb-12 lg:pb-14 w-full"
            >
              <div className="w-full max-w-sm rounded-[26px] sm:rounded-[30px] bg-white/[0.07] backdrop-blur-2xl border border-white/20 hover:border-amber-400/50 p-4 sm:p-5 lg:p-6 shadow-2xl text-white transition-all duration-300 relative group hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]">
                
                {/* User Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-3.5">
                  <div>
                    <span className="text-[11px] text-white/60 font-semibold block">Private Client</span>
                    <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[130px]">
                      {user?.name || "John Smith"}
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-near-black font-black flex items-center justify-center text-xs shadow-md shadow-amber-500/30">
                    {user ? user.name.substring(0, 2).toUpperCase() : "JS"}
                  </div>
                </div>

                {/* Interactive Currency Selector Tabs */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.05] border border-white/08 mb-3.5 text-[10px] font-bold">
                  {(["ALL", "USD", "EUR", "GBP", "BTC"] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setSelectedCurrency(curr)}
                      className={`flex-1 py-1 rounded-lg transition-all ${
                        selectedCurrency === curr
                          ? "bg-amber-400 text-near-black shadow font-black scale-105"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>

                {/* Dynamic Balance Display with Animation */}
                <div className="mb-4">
                  <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block mb-0.5">
                    {balances[selectedCurrency].tag}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={selectedCurrency}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="text-2xl sm:text-3xl font-black text-white tracking-tight font-billboard"
                      >
                        {balances[selectedCurrency].total}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-[11px] font-black text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <TrendingUp size={10} />
                      {balances[selectedCurrency].change}
                    </span>
                  </div>
                </div>

                {/* Currency Sub-Accounts Breakdown */}
                <div className="space-y-1.5 mb-4 text-xs">
                  <div
                    onClick={() => setSelectedCurrency("USD")}
                    className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                      selectedCurrency === "USD"
                        ? "bg-amber-500/20 border border-amber-400/40"
                        : "bg-white/[0.04] border border-white/05 hover:bg-white/[0.08]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🇺🇸</span>
                      <span className="font-semibold text-white/90">USD Checking</span>
                    </div>
                    <span className="font-mono font-bold text-white">$8,450.00</span>
                  </div>

                  <div
                    onClick={() => setSelectedCurrency("EUR")}
                    className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                      selectedCurrency === "EUR"
                        ? "bg-amber-500/20 border border-amber-400/40"
                        : "bg-white/[0.04] border border-white/05 hover:bg-white/[0.08]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🇪🇺</span>
                      <span className="font-semibold text-white/90">EUR Savings</span>
                    </div>
                    <span className="font-mono font-bold text-white">€10,230.00</span>
                  </div>

                  <div
                    onClick={() => setSelectedCurrency("GBP")}
                    className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                      selectedCurrency === "GBP"
                        ? "bg-amber-500/20 border border-amber-400/40"
                        : "bg-white/[0.04] border border-white/05 hover:bg-white/[0.08]"
                    }`}
                  >
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
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-400 hover:to-amber-500 hover:text-near-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all border border-amber-400/30 shadow-sm"
                >
                  <span>Launch Live Dashboard</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
