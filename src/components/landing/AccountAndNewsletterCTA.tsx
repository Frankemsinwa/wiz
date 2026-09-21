"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function AccountAndNewsletterCTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#fafaf7] border-t border-[#0e0f0c]/06 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* 1. Open Your Account in Just 5 Minutes */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="rounded-[32px] sm:rounded-[44px] lg:rounded-[52px] bg-gradient-to-br from-[#141510] via-[#0a0b08] to-[#1c190f] text-white p-7 sm:p-12 lg:p-16 overflow-hidden relative shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 border border-amber-500/25 group">
            
            {/* Ambient Gold Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.12, 0.25, 0.12],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none"
            />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-400/[0.08] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-xl relative z-10 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30 text-xs font-bold tracking-wide backdrop-blur-md mb-4 shadow-sm">
                <Sparkles size={12} /> Instant Digital Verification
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Open Your Account in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                  Just 5 Minutes
                </span>
              </h2>
              <p className="text-sm sm:text-base font-semibold text-white/70 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
                Experience borderless multi-currency banking with a fully digital, institutional-grade onboarding process.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-near-black font-black text-base transition-all shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 group/btn"
              >
                <span>Open Private Account</span>
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Visual: Realistic Mobile App + Aureus Obsidian Gold Card Stack */}
            <div className="relative flex items-center justify-center z-10 mt-6 md:mt-0">
              {/* Phone Mockup with subtle floating movement */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 sm:w-56 lg:w-64 rounded-[34px] sm:rounded-[38px] bg-[#0e0f0c] p-3 sm:p-4 shadow-2xl border-2 border-white/10"
              >
                <div className="rounded-[24px] bg-[#fafaf7] p-3.5 sm:p-4 text-[#0e0f0c]">
                  <div className="flex items-center gap-2 mb-3">
                    <img src="/logo.png" alt="Aureus" className="h-5 w-auto" />
                    <span className="text-xs font-black">Aureus</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#0e0f0c]/08 mb-3 shadow-sm">
                    <span className="text-[10px] text-[#6b6964] block font-bold">Total Liquid Balance</span>
                    <span className="text-base sm:text-lg font-black text-[#0e0f0c]">$24,560.00</span>
                  </div>
                  <div className="h-2 w-full bg-amber-500 rounded-full mb-1.5" />
                  <div className="h-2 w-2/3 bg-black/10 rounded-full" />
                </div>
              </motion.div>

              {/* Overlapping Floating Obsidian Card with 3D feel */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -right-2 sm:-right-8 w-44 sm:w-52 lg:w-60 aspect-[1.586] rounded-2xl bg-gradient-to-br from-[#1c1d18] via-[#0e0f0c] to-[#12130e] p-3.5 sm:p-4 text-amber-400 shadow-2xl border border-amber-400/40 flex flex-col justify-between backdrop-blur-md hover:border-amber-400 transition-all"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-black uppercase tracking-wider text-white">AUREUS</span>
                  <span className="text-[10px] font-mono font-bold text-amber-400">Metal Debit</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-white/50 block">ALEXANDER VANCE</span>
                  <span className="text-xs font-mono font-bold tracking-widest text-white">•••• 4490</span>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* 2. Stay Updated with Aureus Bank (Newsletter strip) */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="p-6 sm:p-9 lg:p-10 rounded-[30px] sm:rounded-[38px] bg-white border border-[#0e0f0c]/08 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                <Mail size={24} />
              </div>
              <div className="min-w-0">
                <h4 className="text-base sm:text-lg lg:text-xl font-black text-[#0e0f0c] tracking-tight">
                  Stay Updated with Aureus Intelligence
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-[#6b6964]">
                  Weekly institutional forex briefs, regulatory updates, and platform features.
                </p>
              </div>
            </div>

            {/* Fully Responsive Subscribe Form */}
            <div className="w-full md:w-auto md:min-w-[380px] lg:min-w-[420px]">
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-2 p-3.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold justify-center"
                  >
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <span>Subscribed! Welcome to Aureus Intelligence.</span>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your corporate or personal email"
                      className="w-full px-5 py-3.5 rounded-full bg-[#fafaf7] border border-[#0e0f0c]/12 text-sm text-[#0e0f0c] placeholder-[#6b6964] focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-near-black font-black text-sm transition-all shadow-md shadow-amber-500/20 shrink-0 cursor-pointer text-center hover:scale-105 active:scale-95"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
