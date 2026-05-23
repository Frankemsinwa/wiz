"use client";

import { motion } from "framer-motion";
import { Plus, Search, User, MoreHorizontal } from "lucide-react";

const recipients = [
  { name: "Satoshi Nakamoto", account: "USD •••• 1234", flag: "🇺🇸" },
  { name: "Vitalik Buterin", account: "EUR •••• 5678", flag: "🇪🇺" },
  { name: "Ada Lovelace", account: "GBP •••• 9012", flag: "🇬🇧" },
  { name: "Alan Turing", account: "GBP •••• 3456", flag: "🇬🇧" },
];

export default function RecipientsPage() {
  return (
    <div className="relative min-h-[80vh]">
      {/* Background Content (Blurred) */}
      <div className="p-12 max-w-5xl mx-auto blur-[8px] opacity-40 pointer-events-none select-none">
        <div className="flex items-center justify-between mb-16">
          <h1 className="font-section text-6xl">Recipients</h1>
          <button className="wise-pill wise-pill-primary px-8 py-3 flex items-center gap-2 text-lg">
            <Plus size={20} strokeWidth={3} /> Add recipient
          </button>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted" size={24} />
          <input 
            type="text" 
            placeholder="Name, email, phone number..." 
            className="w-full bg-white border border-border rounded-[24px] py-6 pl-16 pr-8 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-wise-green transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipients.map((person, i) => (
            <div
              key={person.name}
              className="wise-card flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-bg-mint flex items-center justify-center text-dark-green relative overflow-hidden">
                  <User size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{person.name}</h3>
                  <p className="text-muted font-semibold">{person.account}</p>
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
            {/* Animated User Group */}
            <div className="relative w-72 h-48 mx-auto mb-12">
              <motion.div
                animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-near-black flex items-center justify-center text-wise-green shadow-2xl z-20"
              >
                <User size={40} />
              </motion.div>
              <motion.div
                animate={{ x: [0, -10, 0], y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-wise-green flex items-center justify-center text-dark-green shadow-2xl z-20"
              >
                <User size={40} />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-1 bg-gradient-to-r from-near-black via-wise-green to-near-black rounded-full z-10"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-near-black text-white px-6 py-3 rounded-2xl shadow-xl border border-white/10 transform rotate-12 font-black tracking-tight">
              COMING SOON
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-section text-5xl md:text-7xl tracking-tighter leading-none">Connecting you <br/><span className="text-wise-green">globally.</span></h2>
            <p className="text-xl text-muted font-bold max-w-md mx-auto leading-relaxed">
              We're building a smarter way to manage your global network. Sending money is about to get personal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="wise-pill wise-pill-primary px-10 py-4 text-xl w-full sm:w-auto">
              Join Waitlist
            </button>
            <button className="px-8 py-4 font-black text-muted hover:text-near-black transition-colors">
              How it works
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
