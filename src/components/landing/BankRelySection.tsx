"use client";

import Link from "next/link";
import { ArrowRight, Users, Globe, Percent, Award, Shield } from "lucide-react";

export default function BankRelySection() {
  const stats = [
    { icon: Users, value: "120K+", label: "Happy Customers" },
    { icon: Globe, value: "40+", label: "Global Currencies" },
    { icon: Percent, value: "99.9%", label: "Transfer Success" },
    { icon: Award, value: "A+", label: "Rated by Experts" },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#fafaf7] border-b border-[#0e0f0c]/06">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading & 2x2 Stats (5 cols) */}
          <div className="lg:col-span-5">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 block mb-3">
              Trusted by Millions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e0f0c] tracking-tight leading-[1.05] mb-5">
              A Bank You Can <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                Rely On
              </span>
            </h2>
            <p className="text-base font-semibold text-[#6b6964] leading-relaxed mb-10 max-w-md">
              We're committed to your financial freedom with secure, borderless multi-currency banking and reliable sub-second settlement.
            </p>

            {/* 2x2 Stats Grid with generous breathing space */}
            <div className="grid grid-cols-2 gap-5 sm:gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="p-4 rounded-2xl bg-white border border-[#0e0f0c]/06 shadow-sm flex items-center gap-3.5"
                  >
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                      <Icon size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black text-[#0e0f0c] tracking-tight">
                        {stat.value}
                      </p>
                      <p className="text-xs font-bold text-[#6b6964]">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Res Architecture Photo with Floating Security Card (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[16/10] border border-[#0e0f0c]/10 group">
              <img
                src="https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1200&q=80"
                alt="Institutional Classical Bank Headquarters"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Glass Security Card Overlay */}
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white/95 backdrop-blur-md rounded-[24px] p-5 sm:p-6 shadow-2xl border border-amber-500/30 max-w-[260px] text-left">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-3 shadow-inner">
                <Shield size={22} strokeWidth={2.5} />
              </div>
              <h4 className="text-sm font-black text-[#0e0f0c] mb-1">
                Your Security Is Our Priority
              </h4>
              <p className="text-xs font-semibold text-[#6b6964] leading-relaxed mb-4">
                Bank-grade multi-layer protection and segregated Tier-1 vaults for all accounts.
              </p>
              <Link
                href="/login"
                className="text-xs font-black text-amber-600 flex items-center gap-1 hover:text-amber-700 hover:gap-2 transition-all"
              >
                Learn More <ArrowRight size={13} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
