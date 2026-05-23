"use client";

import { motion } from "framer-motion";
import { ChevronDown, TrendingDown, TrendingUp } from "lucide-react";

const categories = [
  { name: "Shopping", amount: "1,240.00", percentage: 45, color: "bg-wise-green" },
  { name: "Travel", amount: "850.20", percentage: 30, color: "bg-near-black" },
  { name: "Food & Drink", amount: "420.50", percentage: 15, color: "bg-muted" },
  { name: "Utilities", amount: "210.00", percentage: 10, color: "bg-border" },
];

export default function AnalyticsPage() {
  return (
    <div className="relative min-h-[80vh]">
      {/* Background Content (Blurred) */}
      <div className="p-4 md:p-12 max-w-5xl mx-auto blur-[8px] opacity-40 pointer-events-none select-none">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-16 gap-4">
          <h1 className="font-section text-4xl md:text-6xl">Insights</h1>
          <button className="flex items-center gap-2 font-bold bg-white border border-border px-6 py-3 rounded-full w-full md:w-auto justify-center">
            May 2026 <ChevronDown size={20} />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="wise-card">
            <div className="flex items-center gap-2 text-muted font-bold mb-2">
              <TrendingDown size={20} className="text-negative" /> Total Spending
            </div>
            <div className="text-4xl font-black">2,720.70 <span className="text-xl text-muted">GBP</span></div>
          </div>

          <div className="wise-card">
            <div className="flex items-center gap-2 text-muted font-bold mb-2">
              <TrendingUp size={20} className="text-positive" /> Total Saved
            </div>
            <div className="text-4xl font-black">1,450.00 <span className="text-xl text-muted">GBP</span></div>
          </div>
        </div>

        {/* Spending by Category */}
        <section>
          <h2 className="font-section text-3xl mb-8">Spending by category</h2>
          <div className="flex flex-col gap-8">
            {categories.map((cat, i) => (
              <div key={cat.name} className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-bold text-xl">{cat.name}</h3>
                    <p className="text-muted font-semibold">{cat.percentage}% of total spend</p>
                  </div>
                </div>
                <div className="h-4 w-full bg-black/5 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-white/10 backdrop-blur-[2px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-xl w-full text-center space-y-8"
        >
          <div className="relative inline-block">
            {/* Animated Data Wave */}
            <div className="relative w-72 h-48 mx-auto mb-12 flex items-center justify-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: [20, 60, 20],
                    backgroundColor: i % 2 === 0 ? "#9FE870" : "#163300"
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.2 
                  }}
                  className="w-4 rounded-full"
                />
              ))}
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-near-black text-white px-6 py-3 rounded-2xl shadow-xl border border-white/10 transform rotate-12 font-black tracking-tight">
              COMING SOON
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-section text-5xl md:text-7xl tracking-tighter leading-none">Smart data <br/><span className="text-wise-green">smarter you.</span></h2>
            <p className="text-xl text-muted font-bold max-w-md mx-auto leading-relaxed">
              We're crunching the numbers to give you insights that actually matter. Better decisions start here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="wise-pill wise-pill-primary px-10 py-4 text-xl w-full sm:w-auto">
              Get Early Access
            </button>
            <button className="px-8 py-4 font-black text-muted hover:text-near-black transition-colors">
              Explore Demo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
