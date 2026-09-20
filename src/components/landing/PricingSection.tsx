"use client";

import Link from "next/link";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";

export default function PricingSection() {
  const tiers = [
    {
      name: "Starter & Personal",
      price: "$0",
      period: "Forever Free",
      description: "For digital nomads, founders, and professionals requiring multi-currency spending without hidden spreads.",
      features: [
        "Local IBANs in USD, EUR, and GBP",
        "Hold and swap 40+ currencies at mid-market rates",
        "2 Free virtual debit cards",
        "Sub-second SEPA Instant & FedNow transfers",
        "Standard mobile & web banking",
      ],
      cta: "Open Free Account",
      popular: false,
      href: "/login",
    },
    {
      name: "Growth Business",
      price: "$29",
      period: "per month, billed annually",
      description: "For scaling international enterprises managing cross-border suppliers, global payroll, and teams.",
      features: [
        "Everything in Starter, plus:",
        "Unlimited virtual employee corporate cards",
        "Batch CSV wire payouts (up to 1,000 wires/batch)",
        "Automated accounting sync with Xero & QuickBooks",
        "Granular multi-user approval workflows",
        "Priority 24/7 dedicated support desk",
      ],
      cta: "Start 30-Day Free Trial",
      popular: true,
      href: "/login",
    },
    {
      name: "Institutional Treasury",
      price: "Custom",
      period: "Tailored liquidity limits",
      description: "For hedge funds, multi-nationals, and high-volume platforms requiring dedicated FX dealers and custom APIs.",
      features: [
        "Everything in Growth, plus:",
        "Dedicated institutional FX dealer desk",
        "Custom high-frequency REST & GraphQL API limits",
        "Direct integration with NetSuite & SAP ERPs",
        "Multi-sig hardware vault governance",
        "Bespoke yield optimization on idle balances",
      ],
      cta: "Speak with Institutional Sales",
      popular: false,
      href: "/login",
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#090b12] border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Predictable Costs. Zero Hidden Spreads.
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-medium">
            No surprise maintenance fees, no complex tier markups, and no artificial holding minimums.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-[32px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative shadow-2xl ${
                tier.popular
                  ? "bg-[#0f121e] border-2 border-amber-400/80 shadow-[0_0_50px_rgba(212,175,55,0.15)] lg:-translate-y-2"
                  : "bg-[#0c0f18] border border-white/[0.08] hover:border-white/[0.2]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black text-xs uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Sparkles size={12} /> Most Popular
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-white">{tier.name}</h3>
                  <p className="text-xs text-white/50 mt-1 min-h-[32px]">{tier.description}</p>
                </div>

                <div className="mb-8 pb-6 border-b border-white/[0.08]">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-xs font-semibold text-white/50 block mt-1">
                    {tier.period}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={13} strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={tier.href}
                className={`w-full py-4 rounded-full font-bold text-sm text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                  tier.popular
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-[1.02]"
                    : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1]"
                }`}
              >
                <span>{tier.cta}</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
