"use client";

import Link from "next/link";
import { ArrowRight, Users, Globe, Percent, Award, Shield, CheckCircle2, Lock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

function AnimatedStat({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ duration: 0.2 }}
      className="p-5 rounded-2xl bg-white border border-[#0e0f0c]/08 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all flex items-center gap-4 group"
    >
      <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all">
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-black text-[#0e0f0c] tracking-tight font-billboard">
          {value}
        </p>
        <p className="text-xs font-bold text-[#6b6964]">{label}</p>
      </div>
    </motion.div>
  );
}

export default function BankRelySection() {
  const stats = [
    { icon: Users, value: "120K+", label: "Verified Private Clients" },
    { icon: Globe, value: "40+", label: "Global Currencies Settled" },
    { icon: Percent, value: "99.99%", label: "System Uptime & Success" },
    { icon: Award, value: "A+ Tier-1", label: "Custodial Vault Rating" },
  ];

  return (
    <section id="about" className="py-20 md:py-24 bg-[#fafaf7] border-b border-[#0e0f0c]/06 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & 2x2 Stats (5 cols) */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-600 mb-3 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Lock size={12} /> Institutional Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e0f0c] tracking-tight leading-[1.05] mb-5">
              A Bank Built on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                Absolute Reliability
              </span>
            </h2>
            <p className="text-base font-semibold text-[#6b6964] leading-relaxed mb-8 max-w-md">
              We merge centuries-old Swiss banking prudence with silicon-speed cryptographic settlement. Your funds remain 100% unencumbered, liquid, and audited daily.
            </p>

            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
              {stats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-[#0e0f0c]/80">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Client" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Client" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Client" />
              </div>
              <span>Trusted by 12,000+ family offices and high-volume institutions worldwide.</span>
            </div>
          </ScrollReveal>

          {/* Right Column: High-Res Architecture Photo with Floating Security Card (7 cols) */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-7 relative">
            {/* Ambient Gold Glow Behind Architecture Photo */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative rounded-[36px] overflow-hidden shadow-2xl aspect-[16/10] border border-[#0e0f0c]/12 group">
              <img
                src="https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1400&q=85"
                alt="Institutional Classical Bank Headquarters"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Top Banner Tag */}
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Vault Reserves Fully Backed 1:1
              </div>
            </div>

            {/* Floating Glass Security Card Overlay */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-xl rounded-[28px] p-5 sm:p-6 shadow-2xl border border-amber-500/30 max-w-[280px] text-left hover:border-amber-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center shadow-inner">
                  <Shield size={24} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={10} /> Active
                </span>
              </div>
              <h4 className="text-sm font-black text-[#0e0f0c] mb-1">
                Your Security Is Our Priority
              </h4>
              <p className="text-xs font-semibold text-[#6b6964] leading-relaxed mb-4">
                Bank-grade multi-layer protection and segregated Tier-1 vaults for all international accounts.
              </p>
              <Link
                href="/login"
                className="text-xs font-black text-amber-600 flex items-center gap-1 hover:text-amber-700 hover:gap-2 transition-all"
              >
                Inspect Vault Protocols <ArrowRight size={13} />
              </Link>
            </motion.div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
