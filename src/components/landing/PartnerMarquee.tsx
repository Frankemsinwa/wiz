"use client";

export default function PartnerMarquee() {
  const partners = [
    { name: "Apex Horizon Capital", category: "Venture Fund" },
    { name: "Veloce Global Logistics", category: "Global Enterprise" },
    { name: "Kinetix AI Systems", category: "Fintech Platform" },
    { name: "Nordic Meridian Bank", category: "Custodian Rail" },
    { name: "Sovereign Asset Mgmt", category: "Hedge Fund" },
    { name: "Quantum Pay Corp", category: "Cross-Border ERP" },
  ];

  return (
    <section className="py-12 bg-[#090b10] border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-white/40 font-bold mb-8">
          POWERING CROSS-BORDER LIQUIDITY FOR 120,000+ HIGH-GROWTH ENTERPRISES & INSTITUTIONS
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300 group cursor-default"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-amber-400/40 group-hover:bg-amber-400 transition-colors" />
                <span className="text-sm font-black text-white/80 group-hover:text-white transition-colors tracking-tight">
                  {partner.name.split(" ")[0]}
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 group-hover:text-amber-300/80 transition-colors">
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
