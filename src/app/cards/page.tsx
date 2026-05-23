"use client";

import { motion } from "framer-motion";
import { Plus, CreditCard, Lock, Eye, Settings } from "lucide-react";

const cards = [
  { id: 1, type: "Digital", last4: "8821", color: "bg-near-black", textColor: "text-wise-green" },
  { id: 2, type: "Physical", last4: "4490", color: "bg-wise-green", textColor: "text-dark-green" },
];

export default function CardsPage() {
  return (
    <div className="relative min-h-[80vh]">
      {/* Background Content (Blurred) */}
      <div className="p-4 md:p-12 max-w-5xl mx-auto blur-[8px] opacity-40 pointer-events-none select-none">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-16 gap-4">
          <h1 className="font-section text-4xl md:text-6xl">Your cards</h1>
          <button className="wise-pill wise-pill-primary px-8 py-3 flex items-center gap-2 text-lg w-full md:w-auto">
            <Plus size={20} strokeWidth={3} /> Get a new card
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {cards.map((card, i) => (
            <div key={card.id} className="flex flex-col gap-8">
              <div className={`aspect-[1.586/1] w-full rounded-[32px] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden ${card.color} ${card.textColor}`}>
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xl uppercase tracking-widest">{card.type}</span>
                  <CreditCard size={32} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-2xl font-black tracking-[0.2em]">•••• •••• •••• {card.last4}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-white/10 backdrop-blur-[2px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-xl w-full text-center space-y-8"
        >
          <div className="relative inline-block">
            {/* Animated card mockup */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="aspect-[1.586/1] w-72 md:w-96 mx-auto rounded-3xl bg-near-black p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-wise-green relative overflow-hidden mb-12"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-wise-green/10 flex items-center justify-center">
                  <CreditCard size={24} />
                </div>
                <div className="bg-wise-green text-dark-green px-4 py-1 rounded-full font-black text-xs uppercase tracking-tighter">
                  New Era
                </div>
              </div>
              
              <div className="text-left">
                <div className="h-4 w-48 bg-white/10 rounded-full mb-3" />
                <div className="h-4 w-32 bg-white/5 rounded-full" />
              </div>

              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-wise-green/20 blur-[60px]" />
            </motion.div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-near-black text-white px-6 py-3 rounded-2xl shadow-xl border border-white/10 transform rotate-12 font-black tracking-tight">
              COMING SOON
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-section text-5xl md:text-7xl tracking-tighter leading-none">The wait is <br/><span className="text-wise-green">almost over.</span></h2>
            <p className="text-xl text-muted font-bold max-w-md mx-auto leading-relaxed">
              We're perfecting our cards to give you the most seamless spending experience yet. 
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="wise-pill wise-pill-primary px-10 py-4 text-xl w-full sm:w-auto">
              Get Notified
            </button>
            <button className="px-8 py-4 font-black text-muted hover:text-near-black transition-colors">
              Learn more
            </button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
