"use client";

import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Loader2, Clock, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import GasFeeModal from "@/components/GasFeeModal";

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  type: "TRANSFER_IN" | "TRANSFER_OUT" | "DEPOSIT" | "WITHDRAWAL";
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  createdAt: string;
  reference?: string;
}

export default function UserTransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modals state
  const [isGasFeeModalOpen, setIsGasFeeModalOpen] = useState(false);
  const [selectedFeeTx, setSelectedFeeTx] = useState<any>(null);
  
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [selectedCodeTx, setSelectedCodeTx] = useState<any>(null);
  const [transferCode, setTransferCode] = useState("");

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/accounts/transactions");
      setTransactions(res.data.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="text-positive" size={20} />;
      case 'PENDING': return <Clock className="text-orange-500" size={20} />;
      case 'FAILED': return <XCircle className="text-negative" size={20} />;
      default: return null;
    }
  };

  if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <h1 className="font-section text-4xl mb-8">Transaction History</h1>
      <div className="bg-white rounded-3xl border border-border overflow-hidden">
        {transactions.length === 0 ? (
          <p className="p-12 text-center text-muted font-bold">No transactions found.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left font-bold text-muted">Type</th>
                <th className="p-4 text-left font-bold text-muted">Reference</th>
                <th className="p-4 text-right font-bold text-muted">Amount</th>
                <th className="p-4 text-center font-bold text-muted">Status</th>
                <th className="p-4 text-center font-bold text-muted">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-bold capitalize">{tx.type.toLowerCase().replace('_', ' ')}</td>
                  <td className="p-4 text-muted">{tx.reference || '-'}</td>
                  <td className="p-4 text-right font-black">
                    {tx.type === 'TRANSFER_OUT' || tx.type === 'WITHDRAWAL' ? '-' : '+'}
                    {Number(tx.amount).toFixed(2)} {tx.currency}
                  </td>
                  <td className="p-4 text-center flex items-center justify-center gap-2">
                    {getStatusIcon(tx.status)}
                    <span className="font-bold">{tx.status.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="p-4 text-center">
                    {tx.status === 'PENDING_FEE_PAYMENT' && (
                      <button 
                        onClick={() => {
                          setSelectedFeeTx(tx);
                          setIsGasFeeModalOpen(true);
                        }}
                        className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-black hover:bg-amber-600 transition-colors shadow-sm"
                      >
                        Pay Fee
                      </button>
                    )}
                    {tx.status === 'AWAITING_CODE' && (
                      <button 
                        onClick={() => {
                          setSelectedCodeTx(tx);
                          setIsCodeModalOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        Enter Code
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      <GasFeeModal 
        isOpen={isGasFeeModalOpen} 
        onClose={() => { setIsGasFeeModalOpen(false); setSelectedFeeTx(null); }} 
        tx={selectedFeeTx} 
        onSuccess={() => {
          setIsGasFeeModalOpen(false);
          setSelectedFeeTx(null);
          fetchHistory();
        }} 
      />

      <AnimatePresence>
        {isCodeModalOpen && selectedCodeTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsCodeModalOpen(false); setSelectedCodeTx(null); }}
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
                className="w-full text-center bg-bg-page border border-border focus:border-wise-green rounded-xl py-4 text-3xl font-black tracking-[0.5em] focus:outline-none"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => { setIsCodeModalOpen(false); setSelectedCodeTx(null); setTransferCode(""); }}
                  className="flex-1 py-3 text-sm font-black border-2 border-border hover:border-gray-400 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      setActionLoading(true);
                      await api.post(`/accounts/transfer/${selectedCodeTx.id}/verify-code`, { code: transferCode });
                      setIsCodeModalOpen(false);
                      setSelectedCodeTx(null);
                      setTransferCode("");
                      fetchHistory();
                    } catch (err: any) {
                      alert(err.response?.data?.message || "Invalid code");
                    } finally {
                      setActionLoading(false);
                    }
                  }}
                  disabled={transferCode.length < 4 || actionLoading}
                  className="flex-1 py-3 text-sm font-black bg-wise-green text-white hover:bg-emerald-600 rounded-xl flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="animate-spin" size={18} /> : "Verify"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
