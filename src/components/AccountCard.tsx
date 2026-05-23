"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface AccountCardProps {
  currency: string;
  amount: string;
  symbol: string;
  label: string;
  flag?: string;
}

export default function AccountCard({ currency, amount, symbol, label, flag }: AccountCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -4 }}
      className="wise-card flex flex-col gap-8 cursor-pointer min-w-[280px]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-border">
            {flag ? (
              <span className="text-xl">{flag}</span>
            ) : (
              <div className="w-full h-full bg-near-black" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">{currency}</span>
            <span className="font-semibold">{label}</span>
          </div>
        </div>
        <button className="w-8 h-8 rounded-full bg-bg-mint flex items-center justify-center text-dark-green transition-transform hover:scale-110">
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-muted mb-1">Balance</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl md:text-4xl font-black tracking-tight">{amount}</span>
          <span className="text-lg md:text-xl font-bold text-muted">{symbol}</span>
        </div>
      </div>
    </motion.div>
  );
}
