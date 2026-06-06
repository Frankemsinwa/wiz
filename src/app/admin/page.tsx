"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/store";
import { 
  Plus, Search, Shield, Activity, Loader2, 
  Clock, DollarSign, Wallet, Key, CheckCircle2, 
  AlertCircle, Copy, ChevronDown, ChevronUp, Hash, MessageSquare
} from "lucide-react";
import CreateAccountModal from "@/components/CreateAccountModal";
import AdminChatPanel from "@/components/AdminChatPanel";
import api from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  accountNumber?: string;
  balance?: number;
  currency?: string;
}

interface PendingTransfer {
  id: string;
  amount: number;
  currency: string;
  feeAmount: number | null;
  feeWalletAddress: string | null;
  feeWalletNetwork: string | null;
  feeWalletCurrency: string | null;
  feePaidAt: string | null;
  transferCode: string | null;
  status: string;
  reference: string | null;
  createdAt: string;
  user: { name: string; email: string };
  account: { currency: string };
  recipient: { name: string; accountNumber: string; bankName: string } | null;
}

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Pending transfers state
  const [pendingTransfers, setPendingTransfers] = useState<PendingTransfer[]>([]);
  const [expandedTxId, setExpandedTxId] = useState<string | null>(null);
  const [feeInputs, setFeeInputs] = useState<Record<string, { amount: string; wallet: string; network: string; currency: string }>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState<{id: string, name: string} | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/admin/users");
      const usersData = response.data.data.users.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        accountNumber: u.accounts?.[0]?.id || 'N/A',
        balance: u.accounts?.[0]?.balance ? Number(u.accounts[0].balance) : 0,
        currency: u.accounts?.[0]?.currency || 'USD'
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingTransfers = async () => {
    try {
      const response = await api.get("/admin/pending-transfers");
      setPendingTransfers(response.data.data.transactions);
    } catch (error) {
      console.error("Failed to fetch pending transfers:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPendingTransfers();
  }, []);

  // Poll pending transfers every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchPendingTransfers, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateBalance = async (id: string, amount: number) => {
    try {
      await api.post(`/admin/users/${id}/balance`, { amount });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update balance:", error);
      alert("Failed to update balance");
    }
  };

  const handleSetFee = async (txId: string) => {
    const input = feeInputs[txId];
    if (!input?.amount || parseFloat(input.amount) <= 0) {
      alert("Please enter a valid fee amount.");
      return;
    }
    if (!input?.currency) {
      alert("Please select a crypto currency.");
      return;
    }
    if (!input?.wallet) {
      alert("Please enter a wallet address.");
      return;
    }
    setActionLoading(txId);
    try {
      await api.post(`/admin/transactions/${txId}/set-fee`, {
        feeAmount: parseFloat(input.amount),
        walletAddress: input.wallet,
        walletNetwork: input.network || "Bitcoin Network (BTC)",
        walletCurrency: input.currency
      });
      await fetchPendingTransfers();
    } catch (error) {
      alert("Failed to set fee.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleGenerateCode = async (txId: string) => {
    setActionLoading(txId);
    try {
      await api.post(`/admin/transactions/${txId}/generate-code`);
      await fetchPendingTransfers();
    } catch (error) {
      alert("Failed to generate code.");
    } finally {
      setActionLoading(null);
    }
  };

  const updateFeeInput = (txId: string, field: string, value: string) => {
    setFeeInputs(prev => ({
      ...prev,
      [txId]: { ...prev[txId], [field]: value }
    }));
  };

  const workers = users.filter(u => u.role === "WORKER");
  
  const filteredWorkers = workers.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (w.accountNumber && w.accountNumber.includes(searchQuery))
  );

  const totalFunds = workers.reduce((sum, w) => sum + (w.balance || 0), 0);

  const handleAdjustBalance = (id: string, currentBalance: number) => {
    const amountStr = prompt(`Enter amount to add (positive) or deduct (negative) for this account.\nCurrent balance: ${currentBalance}`);
    if (amountStr) {
      const amount = parseFloat(amountStr);
      if (!isNaN(amount)) {
        updateBalance(id, amount);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AWAITING_FEE': return { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' };
      case 'PENDING_FEE_PAYMENT': return { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' };
      case 'AWAITING_CODE': return { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' };
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-bg-page">
        <Loader2 className="animate-spin text-wise-green" size={48} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-12 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-6">
        <div>
          <span className="text-negative font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 flex items-center gap-2">
            <Shield size={16} /> Admin Command Center
          </span>
          <h1 className="font-billboard text-4xl md:text-7xl">Master Ledger</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="wise-pill wise-pill-primary w-full md:w-auto px-6 md:px-8 py-3.5 md:py-4 text-base md:text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(159,232,112,0.3)] hover:shadow-[0_0_30px_rgba(159,232,112,0.5)]"
        >
          <Plus size={20} className="md:w-6 md:h-6" /> New Sub-Account
        </button>
      </header>

      {/* Global Stats */}
      <section className="mb-10 md:mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-near-black text-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-border"
        >
          <p className="text-white/60 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2">Total Managed Funds</p>
          <h2 className="font-billboard text-3xl md:text-5xl text-wise-green truncate">
            ${totalFunds.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-border"
        >
          <p className="text-muted font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2">Active Sub-Accounts</p>
          <h2 className="font-billboard text-3xl md:text-5xl text-near-black">
            {workers.length}
          </h2>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-border flex flex-col justify-center sm:col-span-2 md:col-span-1"
        >
           <p className="text-muted font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
            <Activity size={16} /> Pending Transfers
          </p>
          <p className="font-bold text-xl text-amber-600 flex items-center gap-2">
             <span className={`w-3 h-3 rounded-full ${pendingTransfers.length > 0 ? 'bg-amber-500 animate-pulse' : 'bg-positive'}`} /> 
             {pendingTransfers.length > 0 ? `${pendingTransfers.length} Awaiting Action` : 'All Clear'}
          </p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* PENDING TRANSFERS MANAGEMENT PANEL */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {pendingTransfers.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="text-amber-600" size={20} />
            </div>
            <div>
              <h2 className="font-section text-3xl">Pending Transfers</h2>
              <p className="text-muted font-semibold text-sm">Manage gas fees, wallet addresses, and transfer codes</p>
            </div>
          </div>

          <div className="space-y-4">
            {pendingTransfers.map(tx => {
              const colors = getStatusColor(tx.status);
              const isExpanded = expandedTxId === tx.id;
              const feeInput = feeInputs[tx.id] || { amount: '', wallet: '', network: 'Bitcoin Network (BTC)', currency: '' };

              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[24px] border border-border shadow-sm overflow-hidden"
                >
                  {/* Header Row — Always Visible */}
                  <button
                    onClick={() => setExpandedTxId(isExpanded ? null : tx.id)}
                    className="w-full flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 text-left hover:bg-black/[0.02] transition-colors cursor-pointer gap-4 md:gap-0"
                  >
                    <div className="flex items-center gap-3 md:gap-4 w-full md:flex-1 min-w-0 justify-between md:justify-start">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${colors.bg} flex items-center justify-center shrink-0`}>
                          <DollarSign className={colors.text} size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-base md:text-lg text-near-black truncate">{tx.user.name}</p>
                          <p className="text-muted font-semibold text-[10px] md:text-xs truncate">{tx.user.email}</p>
                        </div>
                      </div>
                      <div className="md:hidden text-right shrink-0">
                        <p className="font-black text-sm text-near-black">{tx.currency} {Number(tx.amount).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 shrink-0 w-full md:w-auto border-t border-border/50 md:border-0 pt-3 md:pt-0">
                      <div className="text-right hidden md:block">
                        <p className="font-black text-xl text-near-black">{tx.currency} {Number(tx.amount).toLocaleString()}</p>
                        <p className="text-muted text-xs font-semibold">{new Date(tx.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`${colors.bg} ${colors.text} px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5`}>
                        <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${colors.dot} animate-pulse`} />
                        {tx.status.replace(/_/g, ' ')}
                      </span>
                      {isExpanded ? <ChevronUp size={20} className="text-muted shrink-0" /> : <ChevronDown size={20} className="text-muted shrink-0" />}
                    </div>
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 border-t border-border pt-4 space-y-5">
                          
                          {/* Transfer Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted font-semibold text-xs uppercase tracking-wider mb-1">Amount</p>
                              <p className="font-black text-near-black">{tx.currency} {Number(tx.amount).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted font-semibold text-xs uppercase tracking-wider mb-1">Type</p>
                              <p className="font-bold text-near-black">{tx.reference?.includes('Crypto') ? 'Crypto' : 'Local'}</p>
                            </div>
                            <div>
                              <p className="text-muted font-semibold text-xs uppercase tracking-wider mb-1">Date</p>
                              <p className="font-bold text-near-black">{new Date(tx.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted font-semibold text-xs uppercase tracking-wider mb-1">Recipient</p>
                              <p className="font-bold text-near-black truncate">{tx.recipient?.name || 'Wallet Transfer'}</p>
                            </div>
                          </div>

                          {tx.reference && (
                            <div className="bg-bg-page rounded-xl p-3">
                              <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-1">Reference</p>
                              <p className="text-xs font-semibold text-near-black break-all">{tx.reference}</p>
                            </div>
                          )}

                          {/* ──── AWAITING_FEE: Admin sets fee + wallet ──── */}
                          {tx.status === 'AWAITING_FEE' && (
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-4">
                              <div className="flex items-center gap-2">
                                <DollarSign className="text-amber-600" size={18} />
                                <h4 className="font-black text-amber-800 text-sm">Set Gas Fee & Payment Details</h4>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-amber-800 font-bold text-xs block">Fee Amount (USD)</label>
                                  <input
                                    type="number"
                                    placeholder="0.00"
                                    value={feeInput.amount}
                                    onChange={(e) => updateFeeInput(tx.id, 'amount', e.target.value)}
                                    className="w-full bg-white border border-amber-200 rounded-xl py-2.5 px-3 font-black text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-amber-800 font-bold text-xs block">Crypto Currency</label>
                                  <select
                                    value={feeInput.currency}
                                    onChange={(e) => updateFeeInput(tx.id, 'currency', e.target.value)}
                                    className="w-full bg-white border border-amber-200 rounded-xl py-2.5 px-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                                  >
                                    <option value="">-- Select Currency --</option>
                                    <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
                                    <option value="Ethereum (ETH)">Ethereum (ETH)</option>
                                    <option value="Tether (USDT)">Tether (USDT)</option>
                                    <option value="USD Coin (USDC)">USD Coin (USDC)</option>
                                    <option value="BNB (BNB)">BNB (BNB)</option>
                                    <option value="XRP (XRP)">XRP (XRP)</option>
                                    <option value="Solana (SOL)">Solana (SOL)</option>
                                    <option value="Dogecoin (DOGE)">Dogecoin (DOGE)</option>
                                    <option value="Cardano (ADA)">Cardano (ADA)</option>
                                    <option value="TRON (TRX)">TRON (TRX)</option>
                                    <option value="Litecoin (LTC)">Litecoin (LTC)</option>
                                    <option value="Polkadot (DOT)">Polkadot (DOT)</option>
                                    <option value="Avalanche (AVAX)">Avalanche (AVAX)</option>
                                    <option value="Chainlink (LINK)">Chainlink (LINK)</option>
                                    <option value="DAI (DAI)">DAI (DAI)</option>
                                  </select>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-amber-800 font-bold text-xs block">Wallet Address</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. 1A1zP1eP5QGefi..."
                                    value={feeInput.wallet}
                                    onChange={(e) => updateFeeInput(tx.id, 'wallet', e.target.value)}
                                    className="w-full bg-white border border-amber-200 rounded-xl py-2.5 px-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-amber-800 font-bold text-xs block">Network</label>
                                  <select
                                    value={feeInput.network}
                                    onChange={(e) => updateFeeInput(tx.id, 'network', e.target.value)}
                                    className="w-full bg-white border border-amber-200 rounded-xl py-2.5 px-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                                  >
                                    <optgroup label="Bitcoin">
                                      <option value="Bitcoin Network (BTC)">Bitcoin Network (BTC)</option>
                                      <option value="Bitcoin Lightning Network">Bitcoin Lightning Network</option>
                                    </optgroup>
                                    <optgroup label="Ethereum & EVM">
                                      <option value="Ethereum (ERC-20)">Ethereum (ERC-20)</option>
                                      <option value="BNB Smart Chain (BEP-20)">BNB Smart Chain (BEP-20)</option>
                                      <option value="Polygon (MATIC)">Polygon (MATIC)</option>
                                      <option value="Arbitrum One">Arbitrum One</option>
                                      <option value="Optimism">Optimism</option>
                                      <option value="Avalanche C-Chain">Avalanche C-Chain</option>
                                      <option value="Fantom (FTM)">Fantom (FTM)</option>
                                    </optgroup>
                                    <optgroup label="TRON">
                                      <option value="TRON (TRC-20)">TRON (TRC-20)</option>
                                    </optgroup>
                                    <optgroup label="Solana">
                                      <option value="Solana (SOL)">Solana (SOL)</option>
                                    </optgroup>
                                    <optgroup label="Other Networks">
                                      <option value="XRP Ledger">XRP Ledger</option>
                                      <option value="Litecoin (LTC)">Litecoin (LTC)</option>
                                      <option value="Cardano (ADA)">Cardano (ADA)</option>
                                      <option value="Polkadot (DOT)">Polkadot (DOT)</option>
                                      <option value="Cosmos (ATOM)">Cosmos (ATOM)</option>
                                      <option value="TON Network">TON Network</option>
                                      <option value="Near Protocol">Near Protocol</option>
                                    </optgroup>
                                  </select>
                                </div>
                              </div>

                              <button
                                onClick={() => handleSetFee(tx.id)}
                                disabled={actionLoading === tx.id || !feeInput.amount}
                                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                              >
                                {actionLoading === tx.id ? <Loader2 className="animate-spin" size={16} /> : <DollarSign size={16} />}
                                Confirm Gas Fee & Send to User
                              </button>
                            </div>
                          )}

                          {/* ──── PENDING_FEE_PAYMENT: Waiting for user ──── */}
                          {tx.status === 'PENDING_FEE_PAYMENT' && (
                            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 space-y-3">
                              <div className="flex items-center gap-2">
                                <Clock className="text-orange-600 animate-pulse" size={18} />
                                <h4 className="font-black text-orange-800 text-sm">Waiting for User Payment</h4>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                <div className="bg-white border border-orange-200 rounded-xl p-3">
                                  <p className="text-orange-600 font-bold text-[10px] uppercase tracking-wider mb-1">Fee Amount</p>
                                  <p className="font-black text-orange-900 text-lg">${Number(tx.feeAmount).toLocaleString()}</p>
                                </div>
                                <div className="bg-white border border-orange-200 rounded-xl p-3">
                                  <p className="text-orange-600 font-bold text-[10px] uppercase tracking-wider mb-1">Currency</p>
                                  <p className="font-bold text-sm text-orange-900">{tx.feeWalletCurrency || 'Bitcoin'}</p>
                                </div>
                                <div className="bg-white border border-orange-200 rounded-xl p-3">
                                  <p className="text-orange-600 font-bold text-[10px] uppercase tracking-wider mb-1">Network</p>
                                  <p className="font-bold text-sm text-orange-900">{tx.feeWalletNetwork || 'Bitcoin (BTC)'}</p>
                                </div>
                                <div className="bg-white border border-orange-200 rounded-xl p-3 col-span-2 md:col-span-1">
                                  <p className="text-orange-600 font-bold text-[10px] uppercase tracking-wider mb-1">Wallet</p>
                                  <p className="font-mono font-bold text-xs text-orange-900 break-all">{tx.feeWalletAddress || 'Not set'}</p>
                                </div>
                              </div>
                              <p className="text-orange-700 font-semibold text-xs">
                                The user has been notified. Awaiting their payment confirmation.
                              </p>
                            </div>
                          )}

                          {/* ──── AWAITING_CODE: User paid, admin generates code ──── */}
                          {tx.status === 'AWAITING_CODE' && (
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-4">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-blue-600" size={18} />
                                <h4 className="font-black text-blue-800 text-sm">User Confirmed Payment</h4>
                                {tx.feePaidAt && (
                                  <span className="text-blue-600 text-[10px] font-bold ml-auto">
                                    Paid at: {new Date(tx.feePaidAt).toLocaleString()}
                                  </span>
                                )}
                              </div>

                              {tx.transferCode ? (
                                <div className="bg-white border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                                  <div>
                                    <p className="text-blue-600 font-bold text-[10px] uppercase tracking-wider mb-1">Transfer Code</p>
                                    <p className="font-black text-3xl tracking-[0.3em] text-blue-900">{tx.transferCode}</p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(tx.transferCode || '');
                                      alert("Code copied!");
                                    }}
                                    className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                                  >
                                    <Copy className="text-blue-700" size={18} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleGenerateCode(tx.id)}
                                  disabled={actionLoading === tx.id}
                                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                                >
                                  {actionLoading === tx.id ? <Loader2 className="animate-spin" size={16} /> : <Key size={16} />}
                                  Generate Transfer Code
                                </button>
                              )}
                            </div>
                          )}

                          {/* Transaction ID */}
                          <div className="flex items-center gap-2 text-[10px] text-muted font-semibold">
                            <Hash size={12} />
                            <span>TX ID:</span>
                            <code className="bg-bg-page px-2 py-0.5 rounded font-mono text-near-black select-all">{tx.id}</code>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Workers Ledger */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <h2 className="font-section text-2xl md:text-3xl">Active Ledgers</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border rounded-full py-2.5 md:py-3 pl-11 pr-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-wise-green transition-all font-semibold"
            />
          </div>
        </div>

        <div className="bg-white rounded-[24px] md:rounded-[32px] border border-border overflow-hidden shadow-sm">
          {filteredWorkers.length === 0 ? (
            <div className="p-8 md:p-12 text-center text-muted font-bold text-sm md:text-lg">
              No sub-accounts found. Create one to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="border-b border-border bg-bg-page/50 text-muted uppercase tracking-widest text-[10px] md:text-xs">
                    <th className="px-4 py-3 md:p-6 font-bold">Worker</th>
                    <th className="px-4 py-3 md:p-6 font-bold">Account No.</th>
                    <th className="px-4 py-3 md:p-6 font-bold text-right">Current Balance</th>
                    <th className="px-4 py-3 md:p-6 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkers.map((worker) => (
                    <motion.tr 
                      key={worker.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-border hover:bg-black/5 transition-colors group"
                    >
                      <td className="px-4 py-4 md:p-6 font-bold text-sm md:text-lg">{worker.name}</td>
                      <td className="px-4 py-4 md:p-6 font-mono font-semibold text-[10px] md:text-sm text-muted tracking-widest">{worker.accountNumber || 'N/A'}</td>
                      <td className="px-4 py-4 md:p-6 text-right">
                        <span className="font-black text-base md:text-xl">
                          {worker.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-muted ml-1 font-bold text-[10px] md:text-sm">{worker.currency}</span>
                      </td>
                      <td className="px-4 py-4 md:p-6 text-center flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleAdjustBalance(worker.id, worker.balance || 0)}
                          className="bg-bg-page border border-border rounded-full px-3 py-1.5 md:px-4 md:py-2 font-bold text-[10px] md:text-sm hover:bg-wise-green hover:border-wise-green hover:text-dark-green transition-colors whitespace-nowrap"
                        >
                          Adjust Funds
                        </button>
                        <button
                          onClick={() => {
                            setActiveChatUser({ id: worker.id, name: worker.name });
                            setChatOpen(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer"
                          title="Message Worker"
                        >
                          <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <CreateAccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchUsers} 
      />

      <AdminChatPanel 
        isOpen={chatOpen} 
        onClose={() => {
          setChatOpen(false);
          setActiveChatUser(null);
        }}
        userId={activeChatUser?.id || null}
        userName={activeChatUser?.name || null}
      />
    </div>
  );
}
