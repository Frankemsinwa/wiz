"use client";

import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Loader2, Clock, CheckCircle, XCircle } from "lucide-react";
import api from "@/lib/api";

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
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
                    <span className="font-bold">{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
