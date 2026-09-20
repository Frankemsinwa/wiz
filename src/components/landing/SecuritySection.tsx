"use client";

import { ShieldCheck, Lock, Landmark, CheckCircle, FileCheck, KeyRound } from "lucide-react";

export default function SecuritySection() {
  const securityPillars = [
    {
      icon: Landmark,
      title: "Tier-1 Safeguarded Accounts",
      description: "100% of client balances are held in legally segregated accounts with regulated tier-1 custodian partner institutions like J.P. Morgan Chase and Barclays. Your funds are never re-hypothecated, loaned, or invested.",
    },
    {
      icon: ShieldCheck,
      title: "SOC 2 Type II & ISO 27001",
      description: "Independently audited by top-tier cybersecurity firms. Continuous automated compliance monitoring across all operational databases, authentication clusters, and developer environments.",
    },
    {
      icon: KeyRound,
      title: "Hardware-Isolated HSMs & 256-bit AES",
      description: "Payment credentials, transaction signing keys, and private treasury tokens are protected inside dedicated FIPS 140-2 Level 3 Hardware Security Modules (HSMs).",
    },
    {
      icon: FileCheck,
      title: "Regulatory Compliance & MSB Registration",
      description: "Registered as a Money Services Business (MSB) with FinCEN and partnered with licensed financial institutions across North America, Europe, the United Kingdom, and Singapore.",
    },
  ];

  return (
    <section id="security" className="py-24 md:py-32 bg-[#090b12] border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            Institutional Trust
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Institutional Custody & Capital Protection.
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-medium">
            Banking is built on uncompromising trust. Aureus separates your corporate treasury from platform operations with multi-jurisdictional safeguarding.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {securityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 sm:p-10 rounded-[32px] bg-[#0d101a] border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Compliance Badges Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-2.5">
            <CheckCircle size={18} className="text-emerald-400" />
            <span className="text-sm font-bold text-white">PCI-DSS Level 1 Compliant</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle size={18} className="text-emerald-400" />
            <span className="text-sm font-bold text-white">FinCEN Registered MSB</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle size={18} className="text-emerald-400" />
            <span className="text-sm font-bold text-white">Zero Capital Leverage</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle size={18} className="text-emerald-400" />
            <span className="text-sm font-bold text-white">256-Bit TLS 1.3 Transport</span>
          </div>
        </div>
      </div>
    </section>
  );
}
