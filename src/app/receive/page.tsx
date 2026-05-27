"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowDownLeft, 
  Copy, 
  Check, 
  Globe, 
  Info, 
  Loader2,
  ChevronRight,
  QrCode,
  ArrowRight,
  Bitcoin,
  Hash,
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";

interface Account {
  id: string;
  currency: string;
  balance: number;
}

type Step = "select-method" | "enter-amount" | "deposit-details" | "submitting";

export default function ReceivePage() {
  const { user } = useAuthStore();
  const [step, setStep] = useState<Step>("select-method");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Constants
  const BTC_ADDRESS = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"; // Placeholder BTC address
  const BTC_NETWORK = "Bitcoin (Mainnet)";

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/accounts");
        const userAccounts = response.data.data.accounts;
        setAccounts(userAccounts);
        // Default to USD or first account for calculation
        const usdAcc = userAccounts.find((a: Account) => a.currency === "USD") || userAccounts[0];
        setSelectedAccount(usdAcc);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitHash = async () => {
    if (!txHash) {
      setError("Please enter your transaction hash/ID");
      return;
    }
    setStep("submitting");
    try {
      // Assuming user has at least one account; defaulting to the first one for deposit
      if (accounts.length === 0) throw new Error("No account found");
      
      await api.post('/accounts/deposit', {
        accountId: selectedAccount?.id || accounts[0].id,
        amount: parseFloat(amount),
        currency: 'USD',
        reference: `BTC Deposit TX: ${txHash}`
      });
      
      setStep("select-method"); 
      setAmount("");
      setTxHash("");
      alert("Transaction proof submitted! Our team will verify it shortly.");
    } catch (err) {
      console.error(err);
      setError("Failed to submit transaction proof. Please try again.");
      setStep("deposit-details");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-wise-green" size={48} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto min-h-[80vh] flex flex-col">
      <AnimatePresence mode="wait">
        {/* STEP 1: SELECT METHOD */}
        {step === "select-method" && (
          <motion.div
            key="select-method"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-12">
              <h1 className="font-section text-4xl md:text-6xl mb-4">Deposit funds</h1>
              <p className="text-xl text-muted font-semibold">Choose how you'd like to add money to your account.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => setStep("enter-amount")}
                className="wise-card bg-white p-8 flex items-center justify-between group hover:border-wise-green transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
                    <Bitcoin size={40} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-black text-2xl">Bitcoin (BTC)</h3>
                    <p className="text-muted font-bold">Fast, global, and decentralized.</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-wise-green group-hover:text-dark-green transition-all">
                  <ArrowRight size={24} />
                </div>
              </button>

              <div className="wise-card bg-black/5 p-8 flex items-center justify-between opacity-50 grayscale cursor-not-allowed">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-muted">
                    <Globe size={40} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-black text-2xl">Bank Transfer</h3>
                    <p className="text-muted font-bold">Coming soon for your region.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: ENTER AMOUNT */}
        {step === "enter-amount" && (
          <motion.div
            key="enter-amount"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col max-w-2xl mx-auto w-full"
          >
            <button onClick={() => setStep("select-method")} className="text-muted font-bold flex items-center gap-2 mb-8 hover:text-near-black transition-colors">
              <ArrowDownLeft className="rotate-45" size={20} /> Back
            </button>

            <h2 className="font-section text-4xl mb-12">How much do you want to deposit?</h2>
            
            <div className="bg-white rounded-3xl border border-border p-8 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-muted uppercase tracking-widest">Amount in USD</label>
                <div className="flex items-center gap-4">
                  <span className="text-4xl md:text-6xl font-black text-muted">$</span>
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full text-4xl md:text-6xl font-black focus:outline-none placeholder:text-black/5"
                    autoFocus
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={!amount || parseFloat(amount) <= 0}
              onClick={() => setStep("deposit-details")}
              className="wise-pill wise-pill-primary py-6 text-2xl w-full disabled:opacity-50 disabled:grayscale transition-all"
            >
              Continue to deposit
            </button>
          </motion.div>
        )}

        {/* STEP 3: DEPOSIT DETAILS */}
        {step === "deposit-details" && (
          <motion.div
            key="deposit-details"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col gap-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-section text-4xl">Deposit Bitcoin</h1>
                <p className="text-muted font-bold flex items-center gap-2">
                  <ShieldCheck size={18} className="text-positive" /> Secure generated address
                </p>
              </div>
              <div className="bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl font-black text-xl flex items-center gap-3 border border-orange-100">
                <Bitcoin size={24} /> ${parseFloat(amount).toLocaleString()} USD
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Address Card */}
              <div className="lg:col-span-3 space-y-6">
                <div className="wise-card bg-white p-8 space-y-8">
                  <div>
                    <label className="text-sm font-bold text-muted uppercase tracking-widest mb-3 block">Bitcoin Address</label>
                    <div className="flex items-center gap-4 p-4 bg-bg-page rounded-2xl border border-border group relative">
                      <p className="font-mono text-lg break-all font-bold flex-1 select-all">{BTC_ADDRESS}</p>
                      <button 
                        onClick={handleCopy}
                        className="p-3 bg-white shadow-sm border border-border rounded-xl hover:bg-wise-green transition-all"
                      >
                        {copied ? <Check size={20} className="text-dark-green" /> : <Copy size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
                    <div>
                      <label className="text-sm font-bold text-muted uppercase tracking-widest mb-1 block">Network</label>
                      <p className="font-black text-xl">{BTC_NETWORK}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-muted uppercase tracking-widest mb-1 block">Min. Deposit</label>
                      <p className="font-black text-xl">0.0001 BTC</p>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-2xl flex gap-4 border border-orange-100">
                    <AlertCircle className="text-orange-500 shrink-0" size={24} />
                    <p className="text-sm font-bold text-orange-800 leading-relaxed">
                      Only send BTC to this address. Sending any other coin will result in permanent loss. Funds will be credited after 3 network confirmations.
                    </p>
                  </div>
                </div>

                {/* Proof of Transaction */}
                <div className="wise-card bg-white p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Hash className="text-wise-green" size={24} />
                    <h3 className="font-bold text-xl">Proof of transaction</h3>
                  </div>
                  <p className="text-muted font-bold mb-4">Paste your transaction hash (TXID) below to speed up the verification process.</p>
                  <div className="flex flex-col gap-4">
                    <input 
                      type="text"
                      placeholder="e.g. 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"
                      value={txHash}
                      onChange={(e) => {
                        setTxHash(e.target.value);
                        setError(null);
                      }}
                      className={`w-full bg-bg-page border ${error ? 'border-negative' : 'border-border'} rounded-2xl py-4 px-6 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-wise-green transition-all`}
                    />
                    {error && <p className="text-negative text-sm font-bold flex items-center gap-1"><AlertCircle size={14} /> {error}</p>}
                    <button 
                      onClick={handleSubmitHash}
                      className="wise-pill wise-pill-secondary py-4 text-lg"
                    >
                      Submit Transaction Hash
                    </button>
                  </div>
                </div>
              </div>

              {/* QR Code Side */}
              <div className="lg:col-span-2 space-y-6">
                <div className="wise-card bg-near-black text-white p-10 flex flex-col items-center text-center">
                  <div className="bg-white p-4 rounded-[32px] mb-8 shadow-[0_0_40px_rgba(159,232,112,0.3)]">
                    <QRCodeSVG 
                      value={BTC_ADDRESS} 
                      size={180}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <h3 className="font-bold text-2xl mb-4 tracking-tight">Scan QR to pay</h3>
                  <p className="text-white/60 font-medium mb-8 leading-relaxed">Use any Bitcoin wallet (Coinbase, Trust, Exodus) to complete your deposit.</p>
                  <button className="flex items-center gap-2 text-wise-green font-black hover:underline">
                    View on Blockchain <ExternalLink size={18} />
                  </button>
                </div>

                <div className="wise-card bg-white p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-bg-mint flex items-center justify-center text-positive">
                    <Loader2 className="animate-spin" size={20} />
                  </div>
                  <p className="text-sm font-bold text-muted">Waiting for network broadcast...</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* LOADING STATE FOR SUBMISSION */}
        {step === "submitting" && (
          <motion.div
            key="submitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center gap-8"
          >
            <div className="relative">
              <Loader2 className="animate-spin text-wise-green" size={80} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Bitcoin size={32} className="text-near-black" />
              </div>
            </div>
            <div>
              <h2 className="font-section text-4xl mb-4">Verifying Proof</h2>
              <p className="text-xl text-muted font-bold">Please wait while we log your transaction hash.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
