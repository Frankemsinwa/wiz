import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Copy, DollarSign, AlertCircle } from "lucide-react";
import { useState } from "react";
import api from "@/lib/api";

interface GasFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  tx: any;
  onSuccess: () => void;
}

export default function GasFeeModal({ isOpen, onClose, tx, onSuccess }: GasFeeModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!tx) return null;

  const walletAddress = tx.feeWalletAddress || "—";
  const network = tx.feeWalletNetwork || "—";
  const currency = tx.feeWalletCurrency || "—";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="bg-white rounded-3xl border border-border p-6 md:p-8 max-w-md w-full shadow-2xl relative z-10 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-black text-near-black flex items-center gap-2">
                <DollarSign className="text-amber-500" size={28} />
                Pay Gas Fee
              </h3>
              <p className="text-muted font-semibold text-sm mt-2">
                A network fee is required to process your transaction. Please send the exact amount below.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-amber-200/50 pb-3">
                <span className="text-amber-800 font-bold text-xs uppercase tracking-wider">Required Fee</span>
                <span className="font-black text-xl text-amber-900">${Number(tx.feeAmount).toLocaleString()} USD</span>
              </div>

              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-white/60 p-2 rounded-lg border border-amber-200/50">
                    <span className="text-amber-800 font-bold text-[10px] uppercase block mb-0.5">Currency</span>
                    <span className="text-amber-900 font-black text-sm">{currency}</span>
                  </div>
                  <div className="bg-white/60 p-2 rounded-lg border border-amber-200/50">
                    <span className="text-amber-800 font-bold text-[10px] uppercase block mb-0.5">Network</span>
                    <span className="text-amber-900 font-black text-sm">{network}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-amber-800 font-bold text-xs">Wallet Address</span>
                  </div>
                  <div className="bg-white border border-amber-200 p-3 rounded-xl flex items-center justify-between gap-2 shadow-inner">
                    <code className="text-[11px] font-mono font-bold text-near-black break-all select-all">
                      {walletAddress}
                    </code>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(walletAddress);
                        alert("Wallet Address Copied!");
                      }}
                      className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors shrink-0"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100">
              <AlertCircle className="shrink-0 mt-0.5 text-blue-600" size={18} />
              <p className="text-xs font-semibold leading-relaxed">
                Have you completed the transfer to the wallet above? Click "I Have Paid" below so our network can verify your payment and release your funds.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 text-sm font-black border-2 border-border hover:border-gray-400 rounded-xl cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    await api.post(`/accounts/transfer/${tx.id}/mark-fee-paid`);
                    onSuccess();
                  } catch (err: any) {
                    alert(err.response?.data?.message || "Error verifying fee. Please try again.");
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={isLoading}
                className="flex-[2] py-3 text-sm font-black bg-amber-500 hover:bg-amber-600 text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : "I Have Paid"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
