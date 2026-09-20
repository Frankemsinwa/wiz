"use client";

import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Elena Rostova",
      role: "Chief Financial Officer",
      company: "Veloce Global Logistics",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      quote:
        "Aureus slashed our cross-border FX losses by $180,000 in Q1 alone. Being able to receive EUR from European partners and immediately settle USD payroll without hidden intermediary bank spreads completely transformed our treasury efficiency.",
      impact: "$180,000 Saved in Q1",
    },
    {
      name: "Marcus Sterling",
      role: "Managing Partner",
      company: "Apex Horizon Ventures",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
      quote:
        "Setting up local banking rails in Europe, the UK, and North America used to take our international portfolio companies 6 to 8 weeks with commercial banks. With Aureus, founders open multi-currency IBANs in under 20 minutes.",
      impact: "20-Min Multi-Currency Onboarding",
    },
    {
      name: "Amara Chen",
      role: "VP of Global Treasury",
      company: "Kinetix AI Systems",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
      quote:
        "The developer API is genuinely best-in-class. Our accounting team automated vendor payouts across 28 countries through their webhook engine. Wires that took 4 business days now confirm in 4 seconds over SEPA Instant.",
      impact: "4-Second Cross-Border Settlement",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#07090e] border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            Executive Endorsements
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Trusted by Leaders of Global Capital.
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-medium">
            Hear from CFOs and treasury directors who moved their operational banking to Aureus.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-[32px] bg-[#0c0f18] border border-white/[0.08] hover:border-amber-500/30 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    {item.impact}
                  </span>
                </div>

                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-13 h-13 rounded-full object-cover border-2 border-amber-500/30 shadow-md"
                />
                <div>
                  <h4 className="font-bold text-white text-base">{item.name}</h4>
                  <p className="text-xs text-white/50">{item.role}</p>
                  <p className="text-xs font-semibold text-amber-400">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
