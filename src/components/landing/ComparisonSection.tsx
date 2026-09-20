"use client";

import { useState } from "react";
import { Check, X, ArrowRight, TrendingUp } from "lucide-react";

export default function ComparisonSection() {
  const [transferVolume, setTransferVolume] = useState<number>(50000);

  // Fee calculation formulas
  // Traditional bank: 3.5% hidden FX markup + $45 wire fee + $50 monthly maintenance
  const traditionalCost = transferVolume * 0.035 + 45 + 50;
  // Other fintechs: 1.5% markup + $15 wire fee
  const fintechCost = transferVolume * 0.015 + 15;
  // Aureus: 0.35% flat transparent mid-market fee, $0 maintenance, $0 wire fee
  const aureusCost = transferVolume * 0.0035;

  const totalSaved = traditionalCost - aureusCost;

  return (
    <section id="comparison" className="py-24 md:py-32 bg-[#07090e] border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            Radical Transparency
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            The True Cost of Traditional Banking.
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-medium">
            High-street commercial banks bury 3% to 5% markups in the exchange rate. Aureus provides mid-market interbank access with zero markups.
          </p>
        </div>

        {/* Dynamic Savings Calculator Slider */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-10 rounded-[32px] bg-[#0d101a] border border-amber-500/20 shadow-[0_0_50px_rgba(212,175,55,0.08)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Simulate Your Cross-Border Volume
              </span>
              <p className="text-3xl sm:text-4xl font-black text-white mt-1">
                ${transferVolume.toLocaleString()}{" "}
                <span className="text-sm font-mono text-white/40">USD / month</span>
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Annual Projected Savings
              </span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                +${(totalSaved * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr
              </p>
            </div>
          </div>

          <input
            type="range"
            min={5000}
            max={250000}
            step={5000}
            value={transferVolume}
            onChange={(e) => setTransferVolume(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-2.5 bg-white/10 rounded-lg mb-8"
          />

          {/* 3-Column Cost Comparison Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-xs font-mono text-white/50 uppercase">Traditional Banks</span>
              <p className="text-2xl font-black text-red-400 mt-2">
                ${traditionalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-[11px] text-white/40 mt-1">3.5% FX Spread + wire fees + monthly charges</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-xs font-mono text-white/50 uppercase">Other FinTechs</span>
              <p className="text-2xl font-black text-amber-300 mt-2">
                ${fintechCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-[11px] text-white/40 mt-1">Tiered subscription markup + hidden fees</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Aureus Platform</span>
              <p className="text-2xl font-black text-emerald-400 mt-2">
                ${aureusCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-[11px] text-amber-300/80 mt-1">0.35% flat fee • 0.0% spread • $0 monthly</p>
            </div>
          </div>
        </div>

        {/* Comparison Feature Table */}
        <div className="max-w-4xl mx-auto rounded-[32px] bg-[#0d101a] border border-white/[0.08] overflow-hidden">
          <div className="grid grid-cols-12 p-6 bg-[#131724] border-b border-white/[0.08] text-xs font-bold uppercase tracking-wider text-white/60">
            <div className="col-span-5">Feature & Capability</div>
            <div className="col-span-3 text-center">Traditional Bank</div>
            <div className="col-span-4 text-center text-amber-400 font-black">Aureus Banking</div>
          </div>

          <div className="divide-y divide-white/[0.06] text-sm">
            <div className="grid grid-cols-12 p-5 items-center">
              <div className="col-span-5 font-semibold text-white">FX Spread Markup</div>
              <div className="col-span-3 text-center text-red-400 font-mono">3.0% – 5.0%</div>
              <div className="col-span-4 text-center text-emerald-400 font-bold font-mono">0.0% (Mid-Market)</div>
            </div>

            <div className="grid grid-cols-12 p-5 items-center">
              <div className="col-span-5 font-semibold text-white">International Wire Speed</div>
              <div className="col-span-3 text-center text-white/50">3 – 5 Business Days</div>
              <div className="col-span-4 text-center text-emerald-400 font-bold">Sub-Second (Instant)</div>
            </div>

            <div className="grid grid-cols-12 p-5 items-center">
              <div className="col-span-5 font-semibold text-white">Local Foreign Currency IBANs</div>
              <div className="col-span-3 text-center text-white/50">Requires Overseas Entity</div>
              <div className="col-span-4 text-center text-emerald-400 font-bold">40+ Instantly Active</div>
            </div>

            <div className="grid grid-cols-12 p-5 items-center">
              <div className="col-span-5 font-semibold text-white">Corporate Card FX Fee</div>
              <div className="col-span-3 text-center text-red-400 font-mono">3% Foreign Fee</div>
              <div className="col-span-4 text-center text-emerald-400 font-bold font-mono">0.0% Everywhere</div>
            </div>

            <div className="grid grid-cols-12 p-5 items-center">
              <div className="col-span-5 font-semibold text-white">Developer REST / GraphQL API</div>
              <div className="col-span-3 text-center text-white/40">None / Legacy Batch</div>
              <div className="col-span-4 text-center text-emerald-400 font-bold">Modern Real-Time API</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
