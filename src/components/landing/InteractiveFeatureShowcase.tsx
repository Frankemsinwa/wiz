"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  CreditCard,
  Code2,
  Lock,
  Unlock,
  Sliders,
  Check,
  Copy,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function InteractiveFeatureShowcase() {
  const [activeTab, setActiveTab] = useState<"treasury" | "cards" | "api">("treasury");

  // Treasury State
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "EUR" | "GBP" | "JPY">("USD");

  // Card Controls State
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [onlineSpendAllowed, setOnlineSpendAllowed] = useState(true);
  const [dailyLimit, setDailyLimit] = useState(15000);

  // API State
  const [copied, setCopied] = useState(false);

  const treasuryData = {
    USD: { balance: "$2,450,800.50", iban: "US44 AUREUS 0210 0002 1883", speed: "Instant FedNow", status: "Primary Treasury" },
    EUR: { balance: "€1,820,400.00", iban: "DE89 3704 0044 0532 0130 00", speed: "SEPA Instant", status: "EU Operating" },
    GBP: { balance: "£940,250.75", iban: "GB29 AURS 0400 0412 3456 78", speed: "Faster Payments", status: "UK Payroll" },
    JPY: { balance: "¥184,200,000", iban: "JP82 0001 0200 1234 5678", speed: "Zengin Real-Time", status: "APAC Operations" },
  };

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="treasury" className="py-24 md:py-32 bg-[#090b12] border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            Interactive Product Suite
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Test-Drive the Aureus Terminal.
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-medium">
            Explore live controls for multi-currency routing, real-time corporate card security, and our programmatic developer API.
          </p>

          {/* Tab Selector Buttons */}
          <div className="inline-flex p-1.5 rounded-full bg-[#131622] border border-white/[0.08] mt-8 gap-1">
            <button
              onClick={() => setActiveTab("treasury")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "treasury"
                  ? "bg-amber-400 text-amber-950 shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Globe size={16} /> Global Treasury
            </button>
            <button
              onClick={() => setActiveTab("cards")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "cards"
                  ? "bg-amber-400 text-amber-950 shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <CreditCard size={16} /> Card Spend Controls
            </button>
            <button
              onClick={() => setActiveTab("api")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "api"
                  ? "bg-amber-400 text-amber-950 shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Code2 size={16} /> Developer API
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* TAB 1: Global Treasury */}
            {activeTab === "treasury" && (
              <motion.div
                key="treasury"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-[32px] bg-[#10131d] border border-white/[0.1] p-6 sm:p-10 shadow-2xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">Multi-Currency Operating Wallets</h3>
                    <p className="text-sm text-white/50">Select a currency to inspect segregated custodian bank rails</p>
                  </div>
                  {/* Currency Picker Pills */}
                  <div className="flex items-center gap-2">
                    {(["USD", "EUR", "GBP", "JPY"] as const).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setSelectedCurrency(curr)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          selectedCurrency === curr
                            ? "bg-amber-400 text-amber-950 font-black shadow-md"
                            : "bg-white/[0.04] text-white/70 hover:text-white"
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Current Wallet Details */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0c13] border border-white/[0.08] mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                    <div>
                      <span className="text-xs uppercase font-mono tracking-wider text-amber-400">
                        {treasuryData[selectedCurrency].status}
                      </span>
                      <p className="text-3xl sm:text-4xl font-black text-white mt-1">
                        {treasuryData[selectedCurrency].balance}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                        {treasuryData[selectedCurrency].speed}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                    <div>
                      <p className="text-xs font-mono text-white/40 mb-1">Local Clearing Coordinates</p>
                      <p className="text-sm font-mono font-bold text-white/90">{treasuryData[selectedCurrency].iban}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-white/40 mb-1">Partner Custodian Bank</p>
                      <p className="text-sm font-mono font-bold text-white/90">J.P. Morgan Chase & Co. / Barclays UK</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-2">
                  <span>✦ 100% safeguarded under electronic money regulations. Never lent or leveraged.</span>
                  <span className="text-amber-400 font-bold">Mid-Market FX Swap: 0.0% spread</span>
                </div>
              </motion.div>
            )}

            {/* TAB 2: Card Spend Controls */}
            {activeTab === "cards" && (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-[32px] bg-[#10131d] border border-white/[0.1] p-6 sm:p-10 shadow-2xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">Instant Card Policy Enforcement</h3>
                    <p className="text-sm text-white/50">Simulate real-time programmatic freeze and limit controls</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    isCardFrozen
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}>
                    {isCardFrozen ? "Status: Frozen" : "Status: Active & Protected"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Card Freeze Control */}
                  <div className="p-6 rounded-2xl bg-[#0a0c13] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white mb-1">Instant Card Freeze</p>
                      <p className="text-xs text-white/50">Immediately block all authorization attempts</p>
                    </div>
                    <button
                      onClick={() => setIsCardFrozen(!isCardFrozen)}
                      className={`p-3 rounded-2xl transition-all cursor-pointer ${
                        isCardFrozen
                          ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                          : "bg-white/[0.06] text-white/80 hover:bg-white/[0.1]"
                      }`}
                    >
                      {isCardFrozen ? <Lock size={20} /> : <Unlock size={20} />}
                    </button>
                  </div>

                  {/* Online Spend Toggle */}
                  <div className="p-6 rounded-2xl bg-[#0a0c13] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white mb-1">E-Commerce Transactions</p>
                      <p className="text-xs text-white/50">Allow online and digital SaaS payments</p>
                    </div>
                    <button
                      onClick={() => setOnlineSpendAllowed(!onlineSpendAllowed)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        onlineSpendAllowed ? "bg-amber-400" : "bg-white/[0.1]"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-near-black absolute top-0.5 transition-transform ${
                          onlineSpendAllowed ? "right-0.5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Daily Spending Limit Slider */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0c13] border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-bold text-white/60 uppercase">Real-Time Daily Limit</span>
                      <p className="text-2xl font-black text-amber-400 mt-0.5">
                        ${dailyLimit.toLocaleString()} <span className="text-xs text-white/40 font-mono">USD / day</span>
                      </p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                      Auto-declines over budget
                    </span>
                  </div>

                  <input
                    type="range"
                    min={1000}
                    max={50000}
                    step={1000}
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-white/40 mt-2">
                    <span>$1,000</span>
                    <span>$25,000</span>
                    <span>$50,000</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: Developer API */}
            {activeTab === "api" && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-[32px] bg-[#10131d] border border-white/[0.1] p-6 sm:p-8 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">
                      POST
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-white/80">
                      https://api.aureus.com/v1/payouts/instant
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-white/80 transition-colors"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy Payload"}
                  </button>
                </div>

                {/* Code Block */}
                <div className="p-6 rounded-2xl bg-[#06080d] border border-white/[0.06] font-mono text-xs leading-relaxed text-white/90 overflow-x-auto">
                  <pre>{`{
  "beneficiary": {
    "name": "Kinetix Global Logistics Inc",
    "iban": "DE89370400440532013000",
    "country": "DE"
  },
  "settlement": {
    "source_currency": "USD",
    "target_currency": "EUR",
    "amount": 250000.00,
    "quote_id": "fx_midmarket_902bf81",
    "channel": "SEPA_INSTANT"
  },
  "execution_speed": "SUB_SECOND",
  "metadata": {
    "invoice_ref": "INV-2026-9041",
    "ledger_sync": true
  }
}`}</pre>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                  <span>✦ Response time SLA: &lt;50ms</span>
                  <span className="text-emerald-400 font-bold">Official SDKs in TypeScript, Python, Go</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
