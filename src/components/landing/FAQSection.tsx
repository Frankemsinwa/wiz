"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Aureus safeguard and protect client deposits?",
      a: "Under global electronic money regulations, 100% of client funds are kept completely segregated from company operating capital. Your funds are deposited with top-tier custodian institutions (such as J.P. Morgan Chase, Barclays, and Deutsche Bank). We do not re-invest, loan, or leverage your capital under any circumstances.",
    },
    {
      q: "How does Aureus deliver true mid-market exchange rates?",
      a: "Unlike traditional high-street banks that inflate exchange rates with 3% to 5% hidden retail spreads, Aureus aggregates liquidity directly from wholesale interbank foreign exchange networks. We execute conversions at the real interbank mid-market rate and charge only a transparent, flat fee as low as 0.35%.",
    },
    {
      q: "How fast do international wire transfers settle?",
      a: "Domestic and regional transfers (such as SEPA Instant in Europe, FedNow/ACH in the United States, and Faster Payments in the United Kingdom) settle in sub-second to a few minutes. Global cross-border transfers routed via SWIFT GPI typically settle same-day or within 24 hours.",
    },
    {
      q: "Can I issue corporate cards for my international team?",
      a: "Yes. Within your dashboard, you can instantly issue unlimited virtual Visa or Mastercard corporate debit cards for employees and vendor subscriptions. You can configure granular monthly limits, disable overseas/online purchases, or freeze cards instantly in one click with 0% foreign transaction fees.",
    },
    {
      q: "What documentation is required to open an account?",
      a: "For businesses, standard corporate formation certificates, proof of operating address, and beneficial ownership identification (KYB/KYC) are required. Our automated verification pipeline reviews and approves most applications within 20 minutes.",
    },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#07090e] border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6">
            Frequently Asked Questions.
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-medium">
            Everything you need to know about opening, safeguarding, and routing money through Aureus.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-[#0c0f18] border border-white/[0.08] overflow-hidden transition-colors hover:border-amber-500/30"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-amber-400" : "text-white/60"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-white/70 leading-relaxed border-t border-white/[0.04]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
