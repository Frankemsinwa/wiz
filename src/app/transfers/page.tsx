"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Info, 
  Loader2, 
  CheckCircle2, 
  Wallet, 
  Building2, 
  CreditCard, 
  Lock, 
  ChevronRight, 
  AlertCircle, 
  Coins, 
  Globe,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";
import GasFeeModal from "@/components/GasFeeModal";

interface Account {
  id: string;
  currency: string;
  balance: number;
}

type Step = "select-type" | "local-form" | "international-channels" | "crypto-form" | "success";

const CRYPTO_RATES: Record<string, number> = {
  BTC: 0.000015, // 1 USD = 0.000015 BTC (~$66.6k)
  ETH: 0.000310, // 1 USD = 0.00031 ETH (~$3.2k)
  USDT: 1.000000, // 1 USD = 1 USDT
  BNB: 0.001700, // 1 USD = 0.0017 BNB (~$588)
};

const CRYPTO_FEES: Record<string, number> = {
  BTC: 0.00005,
  ETH: 0.002,
  USDT: 1.5,
  BNB: 0.001,
};

const CRYPTO_NETWORKS: Record<string, string[]> = {
  BTC: ["BTC Native (Legacy)", "BTC SegWit (Native)", "ERC-20 (Arbitrum)", "BEP-20 (BSC)"],
  ETH: ["ERC-20 (Ethereum)", "Arbitrum One", "Optimism (L2)", "Base Network"],
  USDT: ["TRC-20 (Tron)", "ERC-20 (Ethereum)", "BSC (BEP-20)", "Solana Native"],
  BNB: ["BEP-20 (BNB Smart Chain)", "BEP-2 (BNB Beacon Chain)", "ERC-20"],
};

export default function TransfersPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Navigation & Data loading state
  const [step, setStep] = useState<Step>("select-type");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [transferCode, setTransferCode] = useState("");

  // Common Transfer Fields
  const [sourceAccountId, setSourceAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [reference, setReference] = useState("");

  // Local Transfer Fields
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [transferMethod, setTransferMethod] = useState("Standard"); // Standard, Instant, Express

  // Crypto Transfer Fields
  const [cryptoCurrency, setCryptoCurrency] = useState("BTC");
  const [network, setNetwork] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  // Modals
  const [isGasFeeModalOpen, setIsGasFeeModalOpen] = useState(false);
  const [selectedFeeTx, setSelectedFeeTx] = useState<any>(null);

  // Success states
  const [receiptData, setReceiptData] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Set default network when crypto selection changes
  useEffect(() => {
    if (CRYPTO_NETWORKS[cryptoCurrency]) {
      setNetwork(CRYPTO_NETWORKS[cryptoCurrency][0]);
    }
  }, [cryptoCurrency]);

  // Load User Accounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/accounts");
        const userAccounts = response.data.data.accounts;
        setAccounts(userAccounts);
        if (userAccounts.length > 0) {
          setSourceAccountId(userAccounts[0].id);
        }
      } catch (err) {
        console.error("Failed to load accounts", err);
      } finally {
        setIsFetching(false);
      }
    };
    
    if (isAuthenticated) {
      fetchData();
    } else {
      // Just waiting for AppWrapper to redirect if unauth
      setIsFetching(false);
    }
  }, [isAuthenticated]);

  // Load & Poll Transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/accounts/transactions");
        setTransactions(response.data.data.transactions);
      } catch (err) {
        console.error("Failed to load transactions", err);
      }
    };
    
    if (isAuthenticated) {
      fetchTransactions();
    }

    // Set up polling interval to check transaction updates every 4 seconds
    const interval = setInterval(() => {
      if (isAuthenticated) {
        fetchTransactions();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAuthenticated, step]);

  const sourceAccount = accounts.find(a => a.id === sourceAccountId);
  const currentBalance = sourceAccount ? Number(sourceAccount.balance) : 0;
  const numAmount = parseFloat(amount) || 0;

  // Validation
  const validateAmount = () => {
    if (!amount || numAmount <= 0) {
      return "Please enter a valid transfer amount.";
    }
    if (numAmount > currentBalance) {
      return `Insufficient funds. Your current balance is ${currentBalance.toLocaleString()} ${sourceAccount?.currency}.`;
    }
    return null;
  };

  // Submit Local Transfer
  const handleLocalTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const amtError = validateAmount();
    if (amtError) {
      setValidationError(amtError);
      return;
    }

    if (!beneficiaryName || !beneficiaryAccountNumber || !bankName) {
      setValidationError("Please fill out all beneficiary fields.");
      return;
    }

    if (!pin || pin.length < 4) {
      setValidationError("Please enter your 4-digit transaction PIN.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/accounts/transfer", {
        transferType: "local",
        sourceAccountId,
        amount: numAmount,
        pin,
        beneficiaryName,
        beneficiaryAccountNumber,
        bankName,
        transferMethod,
        reference: reference || "Local Transfer"
      });

      setReceiptData({
        type: "Local Bank Transfer",
        amount: numAmount,
        currency: sourceAccount?.currency || "USD",
        recipientName: beneficiaryName,
        recipientDetail: `${bankName} (${beneficiaryAccountNumber})`,
        method: transferMethod,
        memo: reference || "None",
        date: new Date().toLocaleString(),
        txId: response.data.data.transaction?.id || "N/A"
      });

      // Show initiated state instead of instant success
      setStep("success");
    } catch (err: any) {
      setValidationError(err.response?.data?.message || "Transfer failed. Please check your transaction PIN.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Crypto Transfer
  const handleCryptoTransfer = async () => {
    setValidationError(null);
    setShowPreviewModal(false);

    const amtError = validateAmount();
    if (amtError) {
      setValidationError(amtError);
      return;
    }

    if (!walletAddress || walletAddress.length < 26) {
      setValidationError("Please enter a valid cryptocurrency wallet address.");
      return;
    }

    if (!pin || pin.length < 4) {
      setValidationError("Please enter your 4-digit transaction PIN.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/accounts/transfer", {
        transferType: "crypto",
        sourceAccountId,
        amount: numAmount,
        pin,
        cryptoCurrency,
        network,
        walletAddress,
        reference: reference || ""
      });

      const rate = CRYPTO_RATES[cryptoCurrency] || 1;
      const cryptoSent = numAmount * rate;

      setReceiptData({
        type: `Crypto Transfer (${cryptoCurrency})`,
        amount: numAmount,
        currency: sourceAccount?.currency || "USD",
        recipientName: `Wallet: ${walletAddress.substring(0, 8)}...${walletAddress.substring(walletAddress.length - 8)}`,
        recipientDetail: `Network: ${network}`,
        method: `${cryptoSent.toFixed(6)} ${cryptoCurrency} Sent`,
        memo: reference || "None",
        date: new Date().toLocaleString(),
        txId: response.data.data.transaction?.id || "N/A"
      });

      setStep("success");
    } catch (err: any) {
      setValidationError(err.response?.data?.message || "Transfer failed. Please check your transaction PIN.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching && isAuthenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-bg-page">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-amber-500" size={64} />
          <p className="text-muted font-bold tracking-widest text-sm uppercase">Loading secure portal...</p>
        </div>
      </div>
    );
  }

  // Pre-calculated values for Crypto conversions
  const cryptoRate = CRYPTO_RATES[cryptoCurrency] || 1;
  const estimatedCrypto = numAmount * cryptoRate;
  const cryptoFee = CRYPTO_FEES[cryptoCurrency] || 0;
  const networkFeeFiat = cryptoFee / cryptoRate;

  return (
    <div className="p-4 md:p-12 max-w-4xl mx-auto min-h-screen flex flex-col justify-start">
      
      {/* Back Header */}
      {step !== "success" && (
        <button 
          onClick={() => {
            if (step === "local-form" || step === "international-channels") {
              setStep("select-type");
            } else if (step === "crypto-form") {
              setStep("international-channels");
            } else {
              router.push("/");
            }
          }}
          className="flex items-center gap-2 text-muted font-bold hover:text-near-black mb-8 transition-colors self-start cursor-pointer"
        >
          <ArrowLeft size={20} /> {step === "select-type" ? "Back to Dashboard" : "Back"}
        </button>
      )}

      {/* GLOBAL HEADER */}
      <header className="mb-12 text-center md:text-left">
        <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 block">
          Global Transfers
        </span>
        <h1 className="font-billboard text-5xl md:text-7xl">Send Money</h1>
      </header>

      {/* PENDING TRANSFERS SECTION - AT TOP */}
      {transactions.filter(t => ['AWAITING_FEE', 'PENDING_FEE_PAYMENT', 'AWAITING_CODE'].includes(t.status)).length > 0 && (
        <div className="mb-8 bg-white rounded-[32px] md:rounded-[48px] border border-amber-200 p-6 md:p-10 shadow-sm relative overflow-hidden bg-gradient-to-br from-white to-amber-50">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-amber-900">Pending Actions</h2>
          <div className="space-y-4">
            {transactions.filter(t => ['AWAITING_FEE', 'PENDING_FEE_PAYMENT', 'AWAITING_CODE'].includes(t.status)).map(tx => (
              <div key={tx.id} className="bg-white border border-amber-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
                <div>
                  <p className="font-black text-2xl mb-1 text-near-black">{tx.currency} {Number(tx.amount).toLocaleString()}</p>
                  <p className="text-sm font-bold text-muted mb-3">
                    Status: <span className="text-amber-600 uppercase tracking-wider text-[11px]">{tx.status.replace(/_/g, ' ')}</span>
                  </p>
                  {tx.status === 'PENDING_FEE_PAYMENT' && tx.feeAmount && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-sm text-amber-900 font-black mb-1">
                        Gas Fee Required: ${Number(tx.feeAmount).toLocaleString()} USD
                      </p>
                      <p className="text-xs text-amber-800 font-semibold leading-relaxed">
                        Your transaction requires a network fee to proceed. Click below to view the secure escrow wallet details.
                      </p>
                    </div>
                  )}
                </div>
                <div className="shrink-0 w-full md:w-auto flex flex-col gap-3">
                  {tx.status === 'AWAITING_FEE' && (
                    <span className="px-6 py-3 bg-gray-100 text-gray-500 rounded-xl text-sm font-black border border-gray-200 text-center uppercase tracking-widest text-[11px]">Processing Fee...</span>
                  )}
                  {tx.status === 'PENDING_FEE_PAYMENT' && (
                    <button 
                      onClick={() => {
                        setSelectedFeeTx(tx);
                        setIsGasFeeModalOpen(true);
                      }}
                      className="w-full md:w-auto px-8 py-3.5 bg-amber-500 text-white rounded-xl text-sm font-black hover:bg-amber-600 transition-colors shadow-md text-center"
                    >
                      Pay Gas Fee
                    </button>
                  )}
                  {tx.status === 'AWAITING_CODE' && (
                    <button 
                      onClick={() => setSelectedTx(tx)}
                      className="w-full md:w-auto px-8 py-3.5 bg-near-black text-white rounded-xl text-sm font-black hover:bg-black transition-colors shadow-md text-center"
                    >
                      Enter Transfer Code
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main card */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-[32px] md:rounded-[48px] border border-border p-6 md:p-10 shadow-sm relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SELECT TYPE */}
          {step === "select-type" && (
            <motion.div
              key="select-type"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center md:text-left">
                <h1 className="font-section text-4xl md:text-5xl font-black mb-4">Send money</h1>
                <p className="text-muted font-medium text-lg max-w-lg">
                  Choose your transfer option below to safely and quickly dispatch funds globally or within your local area.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                {/* Local Transfer Card */}
                <button
                  onClick={() => {
                    setValidationError(null);
                    setStep("local-form");
                  }}
                  className="flex flex-col items-start p-8 rounded-[24px] border-2 border-border hover:border-amber-500 bg-bg-page hover:bg-amber-50/10 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Building2 className="text-amber-500" size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-near-black mb-2 flex items-center gap-2">
                    Local Transfer <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </h3>
                  <p className="text-muted font-semibold text-sm leading-relaxed">
                    Send funds instantly to domestic bank accounts. Perfect for local bill payments, ACH wires, or domestic direct deposits.
                  </p>
                </button>

                {/* International Transfer Card */}
                <button
                  onClick={() => {
                    setValidationError(null);
                    setStep("international-channels");
                  }}
                  className="flex flex-col items-start p-8 rounded-[24px] border-2 border-border hover:border-blue-600 bg-bg-page hover:bg-blue-50/20 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="text-blue-600" size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-near-black mb-2 flex items-center gap-2">
                    International Wire <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </h3>
                  <p className="text-muted font-semibold text-sm leading-relaxed">
                    Dispatch currency globally across standard borders, use instant cryptocurrency settlement channels, or secure external portals.
                  </p>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2A: LOCAL TRANSFER FORM */}
          {step === "local-form" && (
            <motion.form
              key="local-form"
              onSubmit={handleLocalTransfer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-50 px-3 py-1.5 rounded-full">Domestic Route</span>
                <h2 className="font-section text-3xl md:text-4xl font-black mt-3">Local bank transfer</h2>
              </div>

              {validationError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                  <AlertCircle size={20} className="shrink-0" />
                  <p className="font-semibold text-sm">{validationError}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Source Selection & Amount */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-near-black font-bold text-sm block">1. Select Source Account</label>
                    <select 
                      value={sourceAccountId}
                      onChange={(e) => {
                        setSourceAccountId(e.target.value);
                        setValidationError(null);
                      }}
                      className="w-full bg-bg-page border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-base cursor-pointer appearance-none"
                    >
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>
                          {acc.currency} Account - Balance: {Number(acc.balance).toLocaleString()} {acc.currency}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-near-black font-bold text-sm block">2. Transfer Amount</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-muted font-bold text-lg">{sourceAccount?.currency || 'USD'}</span>
                      <input 
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setValidationError(null);
                        }}
                        className="w-full bg-bg-page border border-border focus:border-amber-500 rounded-xl py-3 pl-16 pr-4 focus:outline-none font-black text-lg"
                      />
                    </div>
                    {sourceAccount && (
                      <p className="text-xs text-muted font-semibold pl-1">
                        Available Balance: <strong className="text-near-black">{Number(sourceAccount.balance).toLocaleString()} {sourceAccount.currency}</strong>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-near-black font-bold text-sm block">3. Transfer Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "Standard", desc: "Standard", fee: "Free", time: "1-3 days" },
                        { id: "Instant", desc: "Instant", fee: "+$1.50", time: "Seconds" },
                        { id: "Express", desc: "Express", fee: "+$0.50", time: "24 hours" },
                      ].map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setTransferMethod(method.id)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                            transferMethod === method.id 
                              ? "border-amber-500 bg-amber-50/20 text-amber-950 font-bold"
                              : "border-border hover:border-gray-400 bg-transparent text-muted font-semibold"
                          }`}
                        >
                          <span className="text-xs uppercase tracking-wider">{method.desc}</span>
                          <span className="text-sm font-black mt-1">{method.fee}</span>
                          <span className="text-[10px] font-medium opacity-80 mt-0.5">{method.time}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Beneficiary Details */}
                <div className="space-y-4">
                  <h3 className="text-near-black font-bold text-sm">4. Beneficiary Bank Details</h3>
                  
                  <div className="space-y-1">
                    <input 
                      type="text" 
                      placeholder="Beneficiary Account Name" 
                      value={beneficiaryName}
                      onChange={(e) => setBeneficiaryName(e.target.value)}
                      className="w-full bg-bg-page border border-border focus:border-amber-500 rounded-xl py-3 px-4 focus:outline-none font-semibold text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <input 
                      type="text" 
                      placeholder="Account Number" 
                      value={beneficiaryAccountNumber}
                      onChange={(e) => setBeneficiaryAccountNumber(e.target.value)}
                      className="w-full bg-bg-page border border-border focus:border-amber-500 rounded-xl py-3 px-4 focus:outline-none font-semibold text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <input 
                      type="text" 
                      placeholder="Bank Name (e.g. Chase, HSBC, Wells Fargo)" 
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-bg-page border border-border focus:border-amber-500 rounded-xl py-3 px-4 focus:outline-none font-semibold text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <input 
                      type="text" 
                      placeholder="Description / Memo (Optional)" 
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="w-full bg-bg-page border border-border focus:border-amber-500 rounded-xl py-3 px-4 focus:outline-none font-semibold text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-near-black font-bold text-sm block">5. Authenticate Transfer</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 text-muted" size={18} />
                      <input 
                        type="password"
                        maxLength={4}
                        placeholder="Enter 4-Digit PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-bg-page border border-border focus:border-amber-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none font-black text-base tracking-[0.25em]"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Summary and Button */}
              <div className="bg-amber-50/40 p-4 rounded-xl flex items-start gap-3 mt-2 border border-amber-50">
                <Info className="text-amber-950 shrink-0 mt-0.5" size={20} />
                <p className="text-amber-950 font-semibold text-sm leading-relaxed">
                  Funds will be processed immediately. Instant transfers settle inside seconds, while standard bank routing takes up to 2 working days. Check your beneficiary details carefully.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isLoading || !sourceAccountId || numAmount <= 0}
                className="wise-pill wise-pill-primary py-4 text-xl font-black mt-2 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Confirm and Send"}
              </button>
            </motion.form>
          )}

          {/* STEP 2B: INTERNATIONAL WIRE CHANNELS */}
          {step === "international-channels" && (
            <motion.div
              key="international-channels"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-3 py-1.5 rounded-full">Global Settlement</span>
                <h1 className="font-section text-3xl md:text-4xl font-black mt-3">Select global channel</h1>
                <p className="text-muted font-medium text-sm mt-2">
                  Select your preferred vehicle for routing foreign transactions. One active channel available, other major financial integrations arriving shortly.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Active: Cryptocurrency */}
                <button
                  onClick={() => {
                    setValidationError(null);
                    setStep("crypto-form");
                  }}
                  className="flex items-center gap-5 p-6 rounded-2xl border-2 border-blue-600 bg-blue-50/10 hover:bg-blue-50/20 text-left transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
                    <Coins className="text-blue-600 animate-pulse" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-near-black text-lg flex items-center gap-2">
                      Cryptocurrency <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Active</span>
                    </h3>
                    <p className="text-muted font-semibold text-xs leading-normal mt-0.5">
                      Settle globally inside seconds using BTC, ETH, BNB or USDT. Multiple layers supported.
                    </p>
                  </div>
                </button>

                {/* Inactive: PayPal */}
                <div className="flex items-center gap-5 p-6 rounded-2xl border border-border bg-gray-50 opacity-60 text-left relative">
                  <span className="absolute top-4 right-4 text-[9px] font-black uppercase text-gray-500 border border-gray-300 rounded px-1.5 py-0.5">Coming Soon</span>
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <CreditCard className="text-gray-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-500 text-lg">PayPal Transfer</h3>
                    <p className="text-gray-400 font-semibold text-xs leading-normal mt-0.5">
                      Link and cashout directly into foreign verified Paypal personal or corporate accounts.
                    </p>
                  </div>
                </div>

                {/* Inactive: Wise */}
                <div className="flex items-center gap-5 p-6 rounded-2xl border border-border bg-gray-50 opacity-60 text-left relative">
                  <span className="absolute top-4 right-4 text-[9px] font-black uppercase text-gray-500 border border-gray-300 rounded px-1.5 py-0.5">Coming Soon</span>
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <Globe className="text-gray-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-500 text-lg">Wise Direct Sync</h3>
                    <p className="text-gray-400 font-semibold text-xs leading-normal mt-0.5">
                      Access low-fee interbank mid-market exchange rates routed using modern Wise profiles.
                    </p>
                  </div>
                </div>

                {/* Inactive: Wire */}
                <div className="flex items-center gap-5 p-6 rounded-2xl border border-border bg-gray-50 opacity-60 text-left relative">
                  <span className="absolute top-4 right-4 text-[9px] font-black uppercase text-gray-500 border border-gray-300 rounded px-1.5 py-0.5">Coming Soon</span>
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <Building2 className="text-gray-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-500 text-lg">SWIFT Wire Transfer</h3>
                    <p className="text-gray-400 font-semibold text-xs leading-normal mt-0.5">
                      Standard overseas wire routing using international IBAN codes, BIC/SWIFT, and clearing agents.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CRYPTOCURRENCY TRANSFER FORM */}
          {step === "crypto-form" && (
            <motion.div
              key="crypto-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1.5 rounded-full">Active Crypto Settlement</span>
                <h1 className="font-section text-3xl md:text-4xl font-black mt-3">Cryptocurrency dispatch</h1>
              </div>

              {validationError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                  <AlertCircle size={20} className="shrink-0" />
                  <p className="font-semibold text-sm">{validationError}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Form fields column */}
                <div className="space-y-4">
                  
                  <div className="space-y-2">
                    <label className="text-near-black font-bold text-sm block">1. Select Source Account</label>
                    <select 
                      value={sourceAccountId}
                      onChange={(e) => {
                        setSourceAccountId(e.target.value);
                        setValidationError(null);
                      }}
                      className="w-full bg-bg-page border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-base cursor-pointer appearance-none"
                    >
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>
                          {acc.currency} Account - Balance: {Number(acc.balance).toLocaleString()} {acc.currency}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-near-black font-bold text-sm block">2. Select Currency</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["BTC", "ETH", "USDT", "BNB"].map(coin => (
                        <button
                          key={coin}
                          type="button"
                          onClick={() => {
                            setCryptoCurrency(coin);
                            setValidationError(null);
                          }}
                          className={`py-3 rounded-xl border cursor-pointer font-black text-center transition-all ${
                            cryptoCurrency === coin 
                              ? "border-amber-500 bg-amber-500/10 text-amber-800"
                              : "border-border hover:border-gray-400 bg-transparent text-muted"
                          }`}
                        >
                          {coin}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-near-black font-bold text-sm block">3. Select Network</label>
                    <select
                      value={network}
                      onChange={(e) => setNetwork(e.target.value)}
                      className="w-full bg-bg-page border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-base cursor-pointer"
                    >
                      {CRYPTO_NETWORKS[cryptoCurrency]?.map(net => (
                        <option key={net} value={net}>{net}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Address & PIN column */}
                <div className="space-y-4">
                  
                  <div className="space-y-2">
                    <label className="text-near-black font-bold text-sm block">4. Send Amount</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-muted font-bold text-lg">{sourceAccount?.currency || 'USD'}</span>
                      <input 
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setValidationError(null);
                        }}
                        className="w-full bg-bg-page border border-border focus:border-amber-500 rounded-xl py-3 pl-16 pr-4 focus:outline-none font-black text-lg"
                      />
                    </div>
                    {numAmount > 0 && (
                      <p className="text-xs text-amber-600 font-bold bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 mt-1.5 flex items-center justify-between">
                        <span>Est. Output:</span>
                        <strong className="text-amber-800 text-sm tracking-wide">{estimatedCrypto.toFixed(6)} {cryptoCurrency}</strong>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-near-black font-bold text-sm block">5. Recipient Wallet Address</label>
                    <input 
                      type="text" 
                      placeholder={`Enter public ${cryptoCurrency} wallet address`}
                      value={walletAddress}
                      onChange={(e) => {
                        setWalletAddress(e.target.value.replace(/\s+/g, ''));
                        setValidationError(null);
                      }}
                      className="w-full bg-bg-page border border-border focus:border-amber-500 rounded-xl py-3 px-4 focus:outline-none font-semibold text-xs tracking-wide"
                    />
                  </div>

                  <div className="space-y-1">
                    <input 
                      type="text" 
                      placeholder="Memo / Description (Optional)" 
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="w-full bg-bg-page border border-border focus:border-amber-500 rounded-xl py-3 px-4 focus:outline-none font-semibold text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-near-black font-bold text-sm block">6. Secure PIN Authentication</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 text-muted" size={18} />
                      <input 
                        type="password"
                        maxLength={4}
                        placeholder="Enter 4-Digit PIN"
                        value={pin}
                        onChange={(e) => {
                          setPin(e.target.value.replace(/\D/g, ''));
                          setValidationError(null);
                        }}
                        className="w-full bg-bg-page border border-border focus:border-amber-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none font-black text-base tracking-[0.25em]"
                      />
                    </div>
                  </div>

                </div>

              </div>

              {/* Action Button */}
              <button 
                type="button"
                onClick={() => {
                  const amtErr = validateAmount();
                  if (amtErr) {
                    setValidationError(amtErr);
                    return;
                  }
                  if (!walletAddress || walletAddress.length < 26) {
                    setValidationError("Please enter a valid wallet address.");
                    return;
                  }
                  if (!pin || pin.length < 4) {
                    setValidationError("Please enter your 4-digit PIN.");
                    return;
                  }
                  setValidationError(null);
                  setShowPreviewModal(true);
                }}
                disabled={isLoading || !sourceAccountId || numAmount <= 0}
                className="wise-pill wise-pill-primary py-4 text-xl font-black mt-2 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                Continue to Transfer
              </button>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS RECEIPT state */}
          {step === "success" && receiptData && (() => {
            const activeTx = transactions.find(t => t.id === receiptData.txId);
            const currentStatus = activeTx ? activeTx.status : "AWAITING_FEE";
            
            return (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-2 relative">
                  {currentStatus === "COMPLETED" ? (
                    <CheckCircle2 className="text-amber-500" size={54} />
                  ) : currentStatus === "FAILED" || currentStatus === "CANCELLED" ? (
                    <AlertCircle className="text-red-500" size={54} />
                  ) : (
                    <Loader2 className="animate-spin text-amber-500" size={54} />
                  )}
                </div>

                <div>
                  <h1 className="font-section text-3xl md:text-4xl font-black text-near-black">
                    {currentStatus === "COMPLETED" ? "Transfer Sent!" : "Transfer Initiated"}
                  </h1>
                  <p className="text-muted font-bold text-sm tracking-wide mt-1.5 uppercase">
                    Status: <span className={`font-black ${currentStatus === 'COMPLETED' ? 'text-amber-500' : 'text-amber-500'}`}>{currentStatus.replace(/_/g, ' ')}</span>
                  </p>
                </div>

                {/* Progress Stepper */}
                <div className="w-full grid grid-cols-4 gap-2 text-xs font-bold py-2 border-y border-border my-2">
                  <div className="flex flex-col items-center gap-1">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center">✓</span>
                    <span className="text-[10px] text-near-black">1. Initiated</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      ['PENDING_FEE_PAYMENT', 'AWAITING_CODE', 'COMPLETED'].includes(currentStatus) 
                        ? "bg-amber-500 text-white" 
                        : "bg-amber-100 text-amber-600 animate-pulse"
                    }`}>
                      {['PENDING_FEE_PAYMENT', 'AWAITING_CODE', 'COMPLETED'].includes(currentStatus) ? "✓" : "2"}
                    </span>
                    <span className={`text-[10px] ${['PENDING_FEE_PAYMENT', 'AWAITING_CODE', 'COMPLETED'].includes(currentStatus) ? "text-near-black" : "text-muted"}`}>2. Gas Fee</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      ['COMPLETED'].includes(currentStatus) 
                        ? "bg-amber-500 text-white" 
                        : currentStatus === "AWAITING_CODE"
                        ? "bg-amber-100 text-amber-600 animate-pulse"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {['COMPLETED'].includes(currentStatus) ? "✓" : "3"}
                    </span>
                    <span className={`text-[10px] ${['COMPLETED', 'AWAITING_CODE'].includes(currentStatus) ? "text-near-black" : "text-muted"}`}>3. Code Verify</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      currentStatus === "COMPLETED" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-400"
                    }`}>
                      {currentStatus === "COMPLETED" ? "✓" : "4"}
                    </span>
                    <span className={`text-[10px] ${currentStatus === "COMPLETED" ? "text-near-black" : "text-muted"}`}>4. Completed</span>
                  </div>
                </div>

                {/* Status Instructions / Interactive Forms */}
                <div className="w-full text-left">
                  {currentStatus === 'AWAITING_FEE' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
                      <Loader2 className="animate-spin text-amber-500 shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="font-bold text-amber-800 text-sm">Calculating Gas Fee</h4>
                        <p className="text-xs text-amber-700 font-semibold mt-1">
                          Our automatic networks are calculating the necessary gas fee for security clearing. This takes roughly 15-30 seconds. This page will update automatically.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStatus === 'PENDING_FEE_PAYMENT' && activeTx && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-4 text-center flex flex-col items-center">
                      <div>
                        <h4 className="font-black text-amber-800 text-base">Gas Fee Required</h4>
                        <p className="text-xs text-amber-700 font-semibold mt-1">
                          A fee clearance is required to process your transaction. Click below to view the payment details.
                        </p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedFeeTx(activeTx);
                          setIsGasFeeModalOpen(true);
                        }}
                        className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-xl transition-colors shadow-md cursor-pointer"
                      >
                        View & Pay Gas Fee
                      </button>
                    </div>
                  )}

                  {currentStatus === 'AWAITING_CODE' && activeTx && (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-4">
                      <div>
                        <h4 className="font-black text-blue-800 text-base">Security Verification Code</h4>
                        <p className="text-xs text-blue-700 font-semibold mt-1">
                          Please enter the 4-digit security code sent/provided by the administrator to authorize the release of funds.
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <input 
                          type="text"
                          maxLength={4}
                          value={transferCode}
                          onChange={(e) => setTransferCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="0000"
                          className="flex-1 text-center bg-white border border-blue-200 focus:border-blue-500 rounded-xl py-3 text-2xl font-black tracking-[0.4em] focus:outline-none"
                        />
                        <button
                          onClick={async () => {
                            try {
                              setIsLoading(true);
                              await api.post(`/accounts/transfer/${activeTx.id}/verify-code`, { code: transferCode });
                              setTransferCode("");
                            } catch (err: any) {
                              alert(err.response?.data?.message || "Invalid code");
                            } finally {
                              setIsLoading(false);
                            }
                          }}
                          disabled={transferCode.length < 4 || isLoading}
                          className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl transition-colors flex items-center justify-center disabled:opacity-50 cursor-pointer"
                        >
                          {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Verify"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Receipt card */}
                <div className="w-full bg-bg-page border border-border rounded-3xl p-6 md:p-8 text-left space-y-4 my-2 shadow-inner">
                  <div className="flex justify-between border-b border-dashed border-border pb-3">
                    <span className="text-muted font-semibold text-sm">Receipt / Type</span>
                    <strong className="text-near-black font-bold text-sm">{receiptData.type}</strong>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted font-semibold text-sm">Total Deducted</span>
                    <strong className="text-near-black font-black text-2xl">
                      {receiptData.amount.toLocaleString()} {receiptData.currency}
                    </strong>
                  </div>

                  <div className="flex justify-between border-b border-border pb-3 py-1">
                    <span className="text-muted font-semibold text-sm">Target Settle</span>
                    <strong className="text-amber-700 font-bold text-sm bg-amber-100/50 px-3 py-0.5 rounded-full">{receiptData.method}</strong>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-muted font-semibold text-sm">Beneficiary Account</span>
                    <strong className="text-near-black font-semibold text-sm">{receiptData.recipientName}</strong>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-muted font-semibold text-sm">Network / Route</span>
                    <strong className="text-near-black font-semibold text-sm">{receiptData.recipientDetail}</strong>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-muted font-semibold text-sm">Memo</span>
                    <strong className="text-near-black font-medium text-sm italic">"{receiptData.memo}"</strong>
                  </div>

                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-muted font-semibold text-sm">Timestamp</span>
                    <span className="text-near-black font-medium text-xs">{receiptData.date}</span>
                  </div>

                  <div className="flex flex-col gap-1 text-[10px] text-muted font-semibold pt-1">
                    <span>Transaction ID:</span>
                    <code className="bg-white border border-border p-2 rounded-lg text-near-black break-all select-all font-mono font-bold">{receiptData.txId}</code>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => {
                      // Reset State
                      setAmount("");
                      setPin("");
                      setReference("");
                      setBeneficiaryName("");
                      setBeneficiaryAccountNumber("");
                      setBankName("");
                      setWalletAddress("");
                      setStep("select-type");
                    }}
                    className="flex-1 py-4 text-base font-black border-2 border-border hover:border-gray-400 rounded-xl transition-all cursor-pointer bg-white"
                  >
                    Send Another
                  </button>
                  <Link
                    href="/"
                    className="flex-1 py-4 text-base font-black bg-near-black text-white hover:bg-black rounded-xl text-center flex items-center justify-center transition-all cursor-pointer"
                  >
                    Go to Dashboard
                  </Link>
                </div>

              </motion.div>
            );
          })()}

        </AnimatePresence>
      </motion.div>

      {/* CRYPTO PREVIEW MODAL */}
      <AnimatePresence>
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreviewModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white rounded-3xl border border-border p-6 md:p-8 max-w-md w-full shadow-2xl relative z-10 space-y-6"
            >
              <div>
                <h3 className="text-2xl font-black text-near-black">Preview transfer</h3>
                <p className="text-muted font-bold text-xs uppercase tracking-wider mt-1">International cryptocurrency wire</p>
              </div>

              <div className="space-y-3 bg-bg-page border border-border p-5 rounded-2xl text-sm">
                
                <div className="flex justify-between items-center">
                  <span className="text-muted font-semibold">Asset to Send</span>
                  <span className="text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full text-xs">
                    {cryptoCurrency} ({network.split(" ")[0]})
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted font-semibold">Exchange Rate</span>
                  <strong className="text-near-black">1 USD = {cryptoRate.toFixed(6)} {cryptoCurrency}</strong>
                </div>

                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-muted font-semibold">You Send</span>
                  <strong className="text-near-black text-base">{numAmount.toLocaleString()} {sourceAccount?.currency || "USD"}</strong>
                </div>

                <div className="flex justify-between text-amber-800 font-bold">
                  <span>Total Output (Crypto)</span>
                  <span className="text-base font-black">{estimatedCrypto.toFixed(6)} {cryptoCurrency}</span>
                </div>

                <div className="flex justify-between border-t border-dashed border-border pt-3 text-xs text-muted">
                  <span>Network Gas Fee</span>
                  <span>{cryptoFee} {cryptoCurrency} (~${networkFeeFiat.toFixed(2)})</span>
                </div>

                <div className="flex flex-col gap-1 border-t border-border pt-3">
                  <span className="text-muted font-semibold text-xs">Target Wallet Address</span>
                  <code className="bg-white border border-border p-2 rounded-lg text-near-black font-bold font-mono text-[10px] break-all">
                    {walletAddress}
                  </code>
                </div>

              </div>

              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-start gap-3">
                <Info size={20} className="shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold leading-normal">
                  Crypto transactions are irreversible. The estimated gas fee is absorbed to secure instant network block confirmations. Settle time is typically 30-90 seconds.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="flex-1 py-3 text-sm font-black border-2 border-border hover:border-gray-400 rounded-xl cursor-pointer"
                >
                  Edit details
                </button>
                <button
                  onClick={handleCryptoTransfer}
                  disabled={isLoading}
                  className="flex-1 py-3 text-sm font-black bg-near-black text-white hover:bg-black rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Confirm & Send"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* ENTER CODE MODAL */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-3xl border border-border p-6 md:p-8 max-w-sm w-full shadow-2xl relative z-10 space-y-6 text-center"
            >
              <div>
                <h3 className="text-2xl font-black text-near-black">Transfer Code</h3>
                <p className="text-muted text-sm font-semibold mt-1">Enter the 4-digit code provided by the admin to finalize your transfer.</p>
              </div>
              
              <input 
                type="text"
                maxLength={4}
                value={transferCode}
                onChange={(e) => setTransferCode(e.target.value.replace(/\D/g, ''))}
                placeholder="0000"
                className="w-full text-center bg-bg-page border border-border focus:border-amber-500 rounded-xl py-4 text-3xl font-black tracking-[0.5em] focus:outline-none"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => { setSelectedTx(null); setTransferCode(""); }}
                  className="flex-1 py-3 text-sm font-black border-2 border-border hover:border-gray-400 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      await api.post(`/accounts/transfer/${selectedTx.id}/verify-code`, { code: transferCode });
                      setSelectedTx(null);
                      setTransferCode("");
                      setStep("select-type"); // this will trigger the useEffect to refresh
                    } catch (err: any) {
                      alert(err.response?.data?.message || "Invalid code");
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  disabled={transferCode.length < 4 || isLoading}
                  className="flex-1 py-3 text-sm font-black bg-amber-500 text-white hover:bg-amber-600 rounded-xl flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Verify"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <GasFeeModal 
        isOpen={isGasFeeModalOpen} 
        onClose={() => { setIsGasFeeModalOpen(false); setSelectedFeeTx(null); }} 
        tx={selectedFeeTx} 
        onSuccess={() => {
          setIsGasFeeModalOpen(false);
          setSelectedFeeTx(null);
          // Just trigger a state toggle to refetch
          setStep("local-form"); setTimeout(() => setStep("select-type"), 10);
        }} 
      />

    </div>
  );
}
